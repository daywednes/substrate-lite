// Substrate-lite
// Copyright (C) 2019-2020  Parity Technologies (UK) Ltd.
// SPDX-License-Identifier: GPL-3.0-or-later WITH Classpath-exception-2.0

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

//! Extension module containing the API and implementation of everything related to verifying
//! blocks.

// TODO: clean up this module

use crate::{
    chain::{chain_information, fork_tree},
    executor::host,
    header,
    trie::calculate_root,
    verify,
};

use super::*;

impl<T> NonFinalizedTree<T> {
    /// Verifies the given block.
    ///
    /// The verification is performed in the context of the chain. In particular, the
    /// verification will fail if the parent block isn't already in the chain.
    ///
    /// If the verification succeeds, an [`HeaderInsert`] object might be returned which can be
    /// used to then insert the block in the chain.
    ///
    /// Must be passed the current UNIX time in order to verify that the block doesn't pretend to
    /// come from the future.
    #[must_use]
    pub fn verify_header(
        &mut self,
        scale_encoded_header: Vec<u8>,
        now_from_unix_epoch: Duration,
    ) -> Result<HeaderVerifySuccess<T>, HeaderVerifyError> {
        let self_inner = self.inner.take().unwrap();
        match self_inner.verify(
            scale_encoded_header,
            now_from_unix_epoch,
            None::<iter::Empty<Vec<u8>>>,
        ) {
            VerifyOut::Header(Err(err)) => return Err(err),
            VerifyOut::Header(Ok((context, is_new_best, consensus))) => {
                let hash = context.header.hash();
                Ok(HeaderVerifySuccess::Insert {
                    block_height: context.header.number,
                    is_new_best,
                    insert: HeaderInsert {
                        chain: self,
                        context,
                        is_new_best,
                        hash,
                        consensus,
                    },
                })
            }
            VerifyOut::Duplicate => Ok(HeaderVerifySuccess::Duplicate),
            _ => unreachable!(),
        }
    }

    /// Verifies the given block.
    ///
    /// The verification is performed in the context of the chain. In particular, the
    /// verification will fail if the parent block isn't already in the chain.
    ///
    /// This method takes ownership of both the block's information and the [`NonFinalizedTree`].
    /// It turns an object that must be driver by the user, until either the verification is
    /// finished or the process aborted, at which point the [`NonFinalizedTree`] can be retrieved
    /// back. The state of the [`NonFinalizedTree`] isn't modified until [`BodyInsert::insert`] is
    /// called after the end of the verification.
    ///
    /// Must be passed the current UNIX time in order to verify that the block doesn't pretend to
    /// come from the future.
    pub fn verify_body<I, E>(
        self,
        scale_encoded_header: Vec<u8>,
        now_from_unix_epoch: Duration,
        body: I,
    ) -> BodyVerifyStep1<T, I>
    where
        I: ExactSizeIterator<Item = E> + Clone,
        E: AsRef<[u8]> + Clone,
    {
        match self
            .inner
            .unwrap()
            .verify(scale_encoded_header, now_from_unix_epoch, Some(body))
        {
            VerifyOut::Body(step) => step,
            _ => unreachable!(),
        }
    }
}

impl<T> NonFinalizedTreeInner<T> {
    /// Common implementation for both [`NonFinalizedTree::verify_header`] and
    /// [`NonFinalizedTree::verify_body`].
    fn verify<I, E>(
        self,
        scale_encoded_header: Vec<u8>,
        now_from_unix_epoch: Duration,
        body: Option<I>,
    ) -> VerifyOut<T, I>
    where
        I: ExactSizeIterator<Item = E> + Clone,
        E: AsRef<[u8]> + Clone,
    {
        let decoded_header = match header::decode(&scale_encoded_header) {
            Ok(h) => h,
            Err(err) => {
                return if body.is_some() {
                    VerifyOut::Body(BodyVerifyStep1::InvalidHeader(
                        NonFinalizedTree { inner: Some(self) },
                        err,
                    ))
                } else {
                    VerifyOut::Header(Err(HeaderVerifyError::InvalidHeader(err)))
                }
            }
        };

        let hash = header::hash_from_scale_encoded_header(&scale_encoded_header);

        if self.blocks.find(|b| b.hash == hash).is_some() {
            return if body.is_some() {
                VerifyOut::Body(BodyVerifyStep1::Duplicate(NonFinalizedTree {
                    inner: Some(self),
                }))
            } else {
                VerifyOut::Duplicate
            };
        }

        // Try to find the parent block in the tree of known blocks.
        // `Some` with an index of the parent within the tree of unfinalized blocks.
        // `None` means that the parent is the finalized block.
        //
        // The parent hash is first checked against `self.current_best`, as it is most likely
        // that new blocks are built on top of the current best.
        let parent_tree_index = if self.current_best.map_or(false, |best| {
            *decoded_header.parent_hash == self.blocks.get(best).unwrap().hash
        }) {
            Some(self.current_best.unwrap())
        } else if *decoded_header.parent_hash == self.finalized_block_hash {
            None
        } else {
            let parent_hash = *decoded_header.parent_hash;
            match self.blocks.find(|b| b.hash == parent_hash) {
                Some(parent) => Some(parent),
                None => {
                    return if body.is_some() {
                        VerifyOut::Body(BodyVerifyStep1::BadParent {
                            chain: NonFinalizedTree { inner: Some(self) },
                            parent_hash,
                        })
                    } else {
                        VerifyOut::Header(Err(HeaderVerifyError::BadParent { parent_hash }))
                    }
                }
            }
        };

        // Some consensus-specific information must be fetched from the tree of ancestry. The
        // information is found either in the parent block, or in the finalized block.
        let consensus = if let Some(parent_tree_index) = parent_tree_index {
            match &self.blocks.get(parent_tree_index).unwrap().consensus {
                BlockConsensus::AllAuthorized => VerifyConsensusSpecific::AllAuthorized,
                BlockConsensus::Aura { authorities_list } => VerifyConsensusSpecific::Aura {
                    authorities_list: authorities_list.clone(),
                },
                BlockConsensus::Babe {
                    current_epoch,
                    next_epoch,
                } => VerifyConsensusSpecific::Babe {
                    current_epoch: current_epoch.clone(),
                    next_epoch: next_epoch.clone(),
                },
            }
        } else {
            match &self.finalized_consensus {
                FinalizedConsensus::AllAuthorized => VerifyConsensusSpecific::AllAuthorized,
                FinalizedConsensus::Aura {
                    authorities_list, ..
                } => VerifyConsensusSpecific::Aura {
                    authorities_list: authorities_list.clone(),
                },
                FinalizedConsensus::Babe {
                    block_epoch_information,
                    next_epoch_transition,
                    ..
                } => VerifyConsensusSpecific::Babe {
                    current_epoch: block_epoch_information.clone(),
                    next_epoch: next_epoch_transition.clone(),
                },
            }
        };

        let mut context = VerifyContext {
            chain: self,
            header: decoded_header.into(),
            parent_tree_index,
            consensus,
        };

        if let Some(body) = body {
            VerifyOut::Body(BodyVerifyStep1::ParentRuntimeRequired(
                BodyVerifyRuntimeRequired {
                    context,
                    body,
                    now_from_unix_epoch,
                },
            ))
        } else {
            let parent_block_header = if let Some(parent_tree_index) = parent_tree_index {
                &context.chain.blocks.get(parent_tree_index).unwrap().header
            } else {
                &context.chain.finalized_block_header
            };

            let result = verify::header_only::verify(verify::header_only::Config {
                consensus: match (&context.chain.finalized_consensus, &context.consensus) {
                    (
                        FinalizedConsensus::Aura { slot_duration, .. },
                        VerifyConsensusSpecific::Aura { authorities_list },
                    ) => {
                        verify::header_only::ConfigConsensus::Aura {
                            // TODO: meh for allocating :-/
                            current_authorities: authorities_list
                                .iter()
                                .map(|a| a.into())
                                .collect(),
                            now_from_unix_epoch,
                            slot_duration: *slot_duration,
                        }
                    }
                    (
                        FinalizedConsensus::Babe {
                            slots_per_epoch, ..
                        },
                        VerifyConsensusSpecific::Babe {
                            current_epoch,
                            next_epoch,
                        },
                    ) => verify::header_only::ConfigConsensus::Babe {
                        parent_block_epoch: current_epoch.as_ref().map(|v| (&**v).into()),
                        parent_block_next_epoch: (&**next_epoch).into(),
                        slots_per_epoch: *slots_per_epoch,
                        now_from_unix_epoch,
                    },
                    // TODO: don't panic! this is before any verification
                    _ => unreachable!(),
                },
                block_header: (&context.header).into(), // TODO: inefficiency ; in case of header only verify we do an extra allocation to build the context above
                parent_block_header: parent_block_header.into(),
            })
            .map_err(HeaderVerifyError::VerificationFailed)
            .unwrap(); // TODO: no unwrap

            let (is_new_best, consensus) = context.apply_success_header(result);
            VerifyOut::Header(Ok((context, is_new_best, consensus)))
        }
    }
}

enum VerifyOut<T, I> {
    Header(Result<(VerifyContext<T>, bool, BlockConsensus), HeaderVerifyError>),
    Duplicate,
    Body(BodyVerifyStep1<T, I>),
}

struct VerifyContext<T> {
    chain: NonFinalizedTreeInner<T>,
    parent_tree_index: Option<fork_tree::NodeIndex>,
    header: header::Header,
    consensus: VerifyConsensusSpecific,
}

impl<T> VerifyContext<T> {
    fn apply_success_header(
        &mut self,
        success_consensus: verify::header_only::Success,
    ) -> (bool, BlockConsensus) {
        let success_consensus = match success_consensus {
            verify::header_only::Success::AllAuthorized => {
                verify::header_body::SuccessConsensus::AllAuthorized
            }
            verify::header_only::Success::Aura { authorities_change } => {
                verify::header_body::SuccessConsensus::Aura { authorities_change }
            }
            verify::header_only::Success::Babe {
                epoch_transition_target,
                slot_number,
            } => verify::header_body::SuccessConsensus::Babe {
                epoch_transition_target,
                slot_number,
            },
        };

        self.apply_success_body(success_consensus)
    }

    fn apply_success_body(
        &mut self,
        success_consensus: verify::header_body::SuccessConsensus,
    ) -> (bool, BlockConsensus) {
        let is_new_best = if let Some(current_best) = self.chain.current_best {
            best_block::is_better_block(
                &self.chain.blocks,
                current_best,
                self.parent_tree_index,
                (&self.header).into(),
            )
        } else {
            true
        };

        let consensus = match (
            success_consensus,
            &self.consensus,
            self.chain.finalized_consensus.clone(),
            self.parent_tree_index
                .map(|idx| self.chain.blocks.get(idx).unwrap().consensus.clone()),
        ) {
            (
                verify::header_body::SuccessConsensus::AllAuthorized,
                VerifyConsensusSpecific::AllAuthorized,
                FinalizedConsensus::AllAuthorized,
                _,
            ) => BlockConsensus::AllAuthorized,
            (
                verify::header_body::SuccessConsensus::Aura { authorities_change },
                VerifyConsensusSpecific::Aura {
                    authorities_list: parent_authorities,
                },
                FinalizedConsensus::Aura { .. },
                _,
            ) => {
                if authorities_change {
                    BlockConsensus::Aura {
                        authorities_list: todo!(), // TODO: fetch from header
                    }
                } else {
                    BlockConsensus::Aura {
                        authorities_list: parent_authorities.clone(),
                    }
                }
            }

            (
                verify::header_body::SuccessConsensus::Babe {
                    epoch_transition_target: Some(epoch_transition_target),
                    ..
                },
                VerifyConsensusSpecific::Babe { .. },
                FinalizedConsensus::Babe { .. },
                Some(BlockConsensus::Babe { next_epoch, .. }),
            ) => BlockConsensus::Babe {
                current_epoch: Some(next_epoch),
                next_epoch: Arc::new(epoch_transition_target),
            },

            (
                verify::header_body::SuccessConsensus::Babe {
                    epoch_transition_target: None,
                    ..
                },
                VerifyConsensusSpecific::Babe { .. },
                FinalizedConsensus::Babe { .. },
                Some(BlockConsensus::Babe {
                    current_epoch,
                    next_epoch,
                }),
            ) => BlockConsensus::Babe {
                current_epoch,
                next_epoch,
            },

            (
                verify::header_body::SuccessConsensus::Babe {
                    epoch_transition_target: Some(epoch_transition_target),
                    ..
                },
                VerifyConsensusSpecific::Babe { .. },
                FinalizedConsensus::Babe {
                    next_epoch_transition,
                    ..
                },
                None,
            ) => BlockConsensus::Babe {
                current_epoch: Some(next_epoch_transition),
                next_epoch: Arc::new(epoch_transition_target),
            },

            (
                verify::header_body::SuccessConsensus::Babe {
                    epoch_transition_target: None,
                    ..
                },
                VerifyConsensusSpecific::Babe { .. },
                FinalizedConsensus::Babe {
                    block_epoch_information,
                    next_epoch_transition,
                    ..
                },
                None,
            ) => BlockConsensus::Babe {
                current_epoch: block_epoch_information.clone(),
                next_epoch: next_epoch_transition.clone(),
            },

            // Any mismatch between consensus algorithms should have been detected by the
            // block verification.
            _ => unreachable!(),
        };

        (is_new_best, consensus)
    }

    fn with_body_verify(mut self, inner: verify::header_body::Verify) -> BodyVerifyStep2<T> {
        loop {
            match inner {
                verify::header_body::Verify::Finished(Ok(success)) => {
                    // TODO: lots of code in common with header verification

                    // Block verification is successful!
                    let (is_new_best, consensus) = self.apply_success_body(success.consensus);
                    let hash = self.header.hash();

                    return BodyVerifyStep2::Finished {
                        parent_runtime: success.parent_runtime,
                        storage_top_trie_changes: success.storage_top_trie_changes,
                        offchain_storage_changes: success.offchain_storage_changes,
                        top_trie_root_calculation_cache: success.top_trie_root_calculation_cache,
                        result: Ok(BodyInsert {
                            context: self,
                            is_new_best,
                            hash,
                            consensus,
                        }),
                    };
                }
                verify::header_body::Verify::Finished(Err(err)) => todo!("verify err: {:?}", err),
                verify::header_body::Verify::StorageGet(inner) => {
                    return BodyVerifyStep2::StorageGet(StorageGet {
                        context: self,
                        inner,
                    })
                }
                verify::header_body::Verify::StorageNextKey(inner) => {
                    return BodyVerifyStep2::StorageNextKey(StorageNextKey {
                        context: self,
                        inner,
                    })
                }
                verify::header_body::Verify::StoragePrefixKeys(inner) => {
                    return BodyVerifyStep2::StoragePrefixKeys(StoragePrefixKeys {
                        context: self,
                        inner,
                    })
                }
            }
        }
    }
}

/// Block verification, either just finished or still in progress.
///
/// Holds ownership of both the block to verify and the [`NonFinalizedTree`].
#[must_use]
#[derive(Debug)]
pub enum BodyVerifyStep1<T, I> {
    /// Block is already known.
    Duplicate(NonFinalizedTree<T>),

    /// Error while decoding the header.
    InvalidHeader(NonFinalizedTree<T>, header::Error),

    /// The parent of the block isn't known.
    BadParent {
        chain: NonFinalizedTree<T>,
        /// Hash of the parent block in question.
        parent_hash: [u8; 32],
    },

    /// Verification is pending. In order to continue, a [`host::HostVmPrototype`] of the
    /// runtime of the parent block must be provided.
    ParentRuntimeRequired(BodyVerifyRuntimeRequired<T, I>),
}

#[derive(Debug)]
enum VerifyConsensusSpecific {
    AllAuthorized,
    Aura {
        authorities_list: Arc<Vec<header::AuraAuthority>>,
    },
    Babe {
        current_epoch: Option<Arc<chain_information::BabeEpochInformation>>,
        next_epoch: Arc<chain_information::BabeEpochInformation>,
    },
}

/// Verification is pending. In order to continue, a [`host::HostVmPrototype`] of the runtime
/// of the parent block must be provided.
#[must_use]
pub struct BodyVerifyRuntimeRequired<T, I> {
    context: VerifyContext<T>,
    body: I,
    now_from_unix_epoch: Duration,
}

impl<T, I, E> BodyVerifyRuntimeRequired<T, I>
where
    I: ExactSizeIterator<Item = E> + Clone,
    E: AsRef<[u8]> + Clone,
{
    /// Access to the parent block's information and hierarchy. Returns `None` if the parent is
    /// the finalized block.
    pub fn parent_block(&mut self) -> Option<BlockAccess<T>> {
        Some(BlockAccess {
            tree: &mut self.context.chain,
            node_index: self.context.parent_tree_index?,
        })
    }

    /// Access to the Nth ancestor's information and hierarchy. Returns `None` if `n` is too
    /// large. A value of `0` for `n` corresponds to the parent block. A value of `1` corresponds
    /// to the parent's parent. And so on.
    pub fn nth_ancestor(&mut self, n: u64) -> Option<BlockAccess<T>> {
        let parent_index = self.context.parent_tree_index?;
        let n = usize::try_from(n).ok()?;
        let ret = self
            .context
            .chain
            .blocks
            .node_to_root_path(parent_index)
            .nth(n)?;
        Some(BlockAccess {
            tree: &mut self.context.chain,
            node_index: ret,
        })
    }

    /// Returns the number of non-finalized blocks in the tree that are ancestors to the block
    /// being verified.
    pub fn num_non_finalized_ancestors(&self) -> u64 {
        let parent_index = match self.context.parent_tree_index {
            Some(p) => p,
            None => return 0,
        };

        u64::try_from(
            self.context
                .chain
                .blocks
                .node_to_root_path(parent_index)
                .count(),
        )
        .unwrap()
    }

    /// Resume the verification process by passing the requested information.
    ///
    /// `parent_runtime` must be a Wasm virtual machine containing the runtime code of the parent
    /// block.
    ///
    /// The value of `top_trie_root_calculation_cache` can be the one provided by the
    /// [`BodyVerifyStep2::Finished`] variant when the parent block has been verified. `None` can
    /// be passed if this information isn't available.
    ///
    /// While `top_trie_root_calculation_cache` is optional, providing a value will considerably
    /// speed up the calculation.
    pub fn resume(
        self,
        parent_runtime: host::HostVmPrototype,
        top_trie_root_calculation_cache: Option<calculate_root::CalculationCache>,
    ) -> BodyVerifyStep2<T> {
        let parent_block_header = if let Some(parent_tree_index) = self.context.parent_tree_index {
            &self
                .context
                .chain
                .blocks
                .get(parent_tree_index)
                .unwrap()
                .header
        } else {
            &self.context.chain.finalized_block_header
        };

        let process = verify::header_body::verify(verify::header_body::Config {
            parent_runtime,
            consensus: match (
                &self.context.chain.finalized_consensus,
                &self.context.consensus,
            ) {
                (FinalizedConsensus::AllAuthorized, VerifyConsensusSpecific::AllAuthorized) => {
                    verify::header_body::ConfigConsensus::AllAuthorized
                }
                (
                    FinalizedConsensus::Aura { slot_duration, .. },
                    VerifyConsensusSpecific::Aura { authorities_list },
                ) => {
                    verify::header_body::ConfigConsensus::Aura {
                        // TODO: meh for allocation
                        current_authorities: authorities_list.iter().map(|a| a.into()).collect(),
                        now_from_unix_epoch: self.now_from_unix_epoch,
                        slot_duration: *slot_duration,
                    }
                }
                (
                    FinalizedConsensus::Babe {
                        slots_per_epoch, ..
                    },
                    VerifyConsensusSpecific::Babe {
                        current_epoch,
                        next_epoch,
                    },
                ) => verify::header_body::ConfigConsensus::Babe {
                    parent_block_epoch: current_epoch.as_ref().map(|v| (&**v).into()),
                    parent_block_next_epoch: (&**next_epoch).into(),
                    slots_per_epoch: *slots_per_epoch,
                    now_from_unix_epoch: self.now_from_unix_epoch,
                },
                // TODO: don't panic /!\ this is before the verification
                _ => unreachable!(),
            },
            block_header: (&self.context.header).into(),
            parent_block_header: parent_block_header.into(),
            block_body: self.body,
            top_trie_root_calculation_cache,
        });

        self.context.with_body_verify(process)
    }

    /// Abort the verification and return the unmodified tree.
    pub fn abort(self) -> NonFinalizedTree<T> {
        NonFinalizedTree {
            inner: Some(self.context.chain),
        }
    }
}

impl<T, I> fmt::Debug for BodyVerifyRuntimeRequired<T, I> {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        f.debug_tuple("BodyVerifyRuntimeRequired").finish()
    }
}

/// Block verification, either just finished or still in progress.
///
/// Holds ownership of both the block to verify and the [`NonFinalizedTree`].
#[must_use]
pub enum BodyVerifyStep2<T> {
    /// Verification is over.
    ///
    /// Use the provided [`BodyInsert`] to insert the block in the chain if desired.
    Finished {
        /// Value that was passed to [`BodyVerifyRuntimeRequired::resume`].
        parent_runtime: host::HostVmPrototype,
        /// List of changes to the storage top trie that the block performs.
        storage_top_trie_changes: HashMap<Vec<u8>, Option<Vec<u8>>, fnv::FnvBuildHasher>,
        /// List of changes to the offchain storage that this block performs.
        offchain_storage_changes: HashMap<Vec<u8>, Option<Vec<u8>>, fnv::FnvBuildHasher>,
        /// Cache of calculation for the storage trie of the best block.
        /// Pass this value to [`BodyVerifyRuntimeRequired::resume`] when verifying a children of
        /// this block in order to considerably speed up the verification.
        top_trie_root_calculation_cache: calculate_root::CalculationCache,
        /// Outcome of the verification.
        result: Result<BodyInsert<T>, HeaderVerifyError>, // TODO: BodyVerifyError, or rename the error to be common
    },
    /// Loading a storage value is required in order to continue.
    StorageGet(StorageGet<T>),
    /// Fetching the list of keys with a given prefix is required in order to continue.
    StoragePrefixKeys(StoragePrefixKeys<T>),
    /// Fetching the key that follows a given one is required in order to continue.
    StorageNextKey(StorageNextKey<T>),
}

/// Loading a storage value is required in order to continue.
#[must_use]
pub struct StorageGet<T> {
    inner: verify::header_body::StorageGet,
    context: VerifyContext<T>,
}

impl<T> StorageGet<T> {
    /// Returns the key whose value must be passed to [`StorageGet::inject_value`].
    pub fn key<'b>(&'b self) -> impl Iterator<Item = impl AsRef<[u8]> + 'b> + 'b {
        self.inner.key()
    }

    /// Returns the key whose value must be passed to [`StorageGet::inject_value`].
    ///
    /// This method is a shortcut for calling `key` and concatenating the returned slices.
    pub fn key_as_vec(&self) -> Vec<u8> {
        self.inner.key_as_vec()
    }

    /// Access to the Nth ancestor's information and hierarchy. Returns `None` if `n` is too
    /// large. A value of `0` for `n` corresponds to the parent block. A value of `1` corresponds
    /// to the parent's parent. And so on.
    pub fn nth_ancestor(&mut self, n: u64) -> Option<BlockAccess<T>> {
        let parent_index = self.context.parent_tree_index?;
        let n = usize::try_from(n).ok()?;
        let ret = self
            .context
            .chain
            .blocks
            .node_to_root_path(parent_index)
            .nth(n)?;
        Some(BlockAccess {
            tree: &mut self.context.chain,
            node_index: ret,
        })
    }

    /// Returns the number of non-finalized blocks in the tree that are ancestors to the block
    /// being verified.
    pub fn num_non_finalized_ancestors(&self) -> u64 {
        let parent_index = match self.context.parent_tree_index {
            Some(p) => p,
            None => return 0,
        };

        u64::try_from(
            self.context
                .chain
                .blocks
                .node_to_root_path(parent_index)
                .count(),
        )
        .unwrap()
    }

    /// Injects the corresponding storage value.
    // TODO: change API, see execute_block::StorageGet
    pub fn inject_value(self, value: Option<&[u8]>) -> BodyVerifyStep2<T> {
        let inner = self.inner.inject_value(value);
        self.context.with_body_verify(inner)
    }
}

/// Fetching the list of keys with a given prefix is required in order to continue.
#[must_use]
pub struct StoragePrefixKeys<T> {
    inner: verify::header_body::StoragePrefixKeys,
    context: VerifyContext<T>,
}

impl<T> StoragePrefixKeys<T> {
    /// Returns the prefix whose keys to load.
    pub fn prefix(&self) -> &[u8] {
        self.inner.prefix()
    }

    /// Access to the Nth ancestor's information and hierarchy. Returns `None` if `n` is too
    /// large. A value of `0` for `n` corresponds to the parent block. A value of `1` corresponds
    /// to the parent's parent. And so on.
    pub fn nth_ancestor(&mut self, n: u64) -> Option<BlockAccess<T>> {
        let parent_index = self.context.parent_tree_index?;
        let n = usize::try_from(n).ok()?;
        let ret = self
            .context
            .chain
            .blocks
            .node_to_root_path(parent_index)
            .nth(n)?;
        Some(BlockAccess {
            tree: &mut self.context.chain,
            node_index: ret,
        })
    }

    /// Returns the number of non-finalized blocks in the tree that are ancestors to the block
    /// being verified.
    pub fn num_non_finalized_ancestors(&self) -> u64 {
        let parent_index = match self.context.parent_tree_index {
            Some(p) => p,
            None => return 0,
        };

        u64::try_from(
            self.context
                .chain
                .blocks
                .node_to_root_path(parent_index)
                .count(),
        )
        .unwrap()
    }

    /// Injects the list of keys.
    pub fn inject_keys(self, keys: impl Iterator<Item = impl AsRef<[u8]>>) -> BodyVerifyStep2<T> {
        let inner = self.inner.inject_keys(keys);
        self.context.with_body_verify(inner)
    }
}

/// Fetching the key that follows a given one is required in order to continue.
#[must_use]
pub struct StorageNextKey<T> {
    inner: verify::header_body::StorageNextKey,
    context: VerifyContext<T>,
}

impl<T> StorageNextKey<T> {
    /// Returns the key whose next key must be passed back.
    pub fn key(&self) -> &[u8] {
        self.inner.key()
    }

    /// Access to the Nth ancestor's information and hierarchy. Returns `None` if `n` is too
    /// large. A value of `0` for `n` corresponds to the parent block. A value of `1` corresponds
    /// to the parent's parent. And so on.
    pub fn nth_ancestor(&mut self, n: u64) -> Option<BlockAccess<T>> {
        let parent_index = self.context.parent_tree_index?;
        let n = usize::try_from(n).ok()?;
        let ret = self
            .context
            .chain
            .blocks
            .node_to_root_path(parent_index)
            .nth(n)?;
        Some(BlockAccess {
            tree: &mut self.context.chain,
            node_index: ret,
        })
    }

    /// Returns the number of non-finalized blocks in the tree that are ancestors to the block
    /// being verified.
    pub fn num_non_finalized_ancestors(&self) -> u64 {
        let parent_index = match self.context.parent_tree_index {
            Some(p) => p,
            None => return 0,
        };

        u64::try_from(
            self.context
                .chain
                .blocks
                .node_to_root_path(parent_index)
                .count(),
        )
        .unwrap()
    }

    /// Injects the key.
    ///
    /// # Panic
    ///
    /// Panics if the key passed as parameter isn't strictly superior to the requested key.
    ///
    pub fn inject_key(self, key: Option<impl AsRef<[u8]>>) -> BodyVerifyStep2<T> {
        let inner = self.inner.inject_key(key);
        self.context.with_body_verify(inner)
    }
}

///
#[derive(Debug)]
pub enum HeaderVerifySuccess<'c, T> {
    /// Block is already known.
    Duplicate,
    /// Block wasn't known and is ready to be inserted.
    Insert {
        /// Height of the verified block.
        block_height: u64,
        /// True if the verified block will become the new "best" block after being inserted.
        is_new_best: bool,
        /// Use this struct to insert the block in the chain after its successful verification.
        insert: HeaderInsert<'c, T>,
    },
}

/// Mutably borrows the [`NonFinalizedTree`] and allows insert a successfully-verified block
/// into it.
#[must_use]
pub struct HeaderInsert<'c, T> {
    chain: &'c mut NonFinalizedTree<T>,
    context: VerifyContext<T>,
    hash: [u8; 32],
    is_new_best: bool,
    consensus: BlockConsensus,
}

impl<'c, T> HeaderInsert<'c, T> {
    /// Inserts the block with the given user data.
    pub fn insert(mut self, user_data: T) {
        let new_node_index = self.context.chain.blocks.insert(
            self.context.parent_tree_index,
            Block {
                header: self.context.header,
                hash: self.hash,
                consensus: self.consensus,
                user_data,
            },
        );

        if self.is_new_best {
            self.context.chain.current_best = Some(new_node_index);
        }

        self.chain.inner = Some(self.context.chain);
    }

    /// Destroys the object without inserting the block in the chain. Returns the block header.
    pub fn into_header(self) -> header::Header {
        self.chain.inner = Some(self.context.chain);
        self.context.header
    }
}

impl<'c, T> fmt::Debug for HeaderInsert<'c, T> {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        f.debug_tuple("HeaderInsert")
            .field(&self.context.header)
            .finish()
    }
}

// TODO: restore self.chain.inner
/*impl<'c, T> Drop for HeaderInsert<'c, T> {
    fn drop(&mut self) {
    }
}*/

/// Error that can happen when verifying a block header.
#[derive(Debug, derive_more::Display)]
pub enum HeaderVerifyError {
    /// Error while decoding the header.
    InvalidHeader(header::Error),
    /// The parent of the block isn't known.
    #[display(fmt = "The parent of the block isn't known.")]
    BadParent {
        /// Hash of the parent block in question.
        parent_hash: [u8; 32],
    },
    /// The block verification has failed. The block is invalid and should be thrown away.
    VerificationFailed(verify::header_only::Error),
}

/// Holds the [`NonFinalizedTree`] and allows insert a successfully-verified block into it.
#[must_use]
pub struct BodyInsert<T> {
    context: VerifyContext<T>,
    hash: [u8; 32],
    is_new_best: bool,
    consensus: BlockConsensus,
}

impl<T> BodyInsert<T> {
    /// Returns the header of the block about to be inserted.
    pub fn header(&self) -> header::HeaderRef {
        (&self.context.header).into()
    }

    /// Inserts the block with the given user data.
    pub fn insert(mut self, user_data: T) -> NonFinalizedTree<T> {
        let new_node_index = self.context.chain.blocks.insert(
            self.context.parent_tree_index,
            Block {
                header: self.context.header,
                hash: self.hash,
                consensus: self.consensus,
                user_data,
            },
        );

        if self.is_new_best {
            self.context.chain.current_best = Some(new_node_index);
        }

        NonFinalizedTree {
            inner: Some(self.context.chain),
        }
    }

    /// Destroys the object without inserting the block in the chain.
    pub fn abort(self) -> NonFinalizedTree<T> {
        NonFinalizedTree {
            inner: Some(self.context.chain),
        }
    }
}

impl<T> fmt::Debug for BodyInsert<T> {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        f.debug_tuple("BodyInsert")
            .field(&self.context.header)
            .finish()
    }
}
