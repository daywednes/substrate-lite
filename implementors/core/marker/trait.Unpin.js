(function() {var implementors = {};
implementors["full_node"] = [{"text":"impl Unpin for CliOptions","synthetic":true,"types":[]},{"text":"impl Unpin for ColorChoiceParseError","synthetic":true,"types":[]},{"text":"impl Unpin for NodeKey","synthetic":true,"types":[]},{"text":"impl Unpin for CliChain","synthetic":true,"types":[]},{"text":"impl Unpin for ColorChoice","synthetic":true,"types":[]},{"text":"impl Unpin for NodeKeyParseError","synthetic":true,"types":[]},{"text":"impl Unpin for Config","synthetic":true,"types":[]},{"text":"impl Unpin for NetworkService","synthetic":true,"types":[]},{"text":"impl Unpin for Guarded","synthetic":true,"types":[]},{"text":"impl Unpin for Event","synthetic":true,"types":[]},{"text":"impl Unpin for InitError","synthetic":true,"types":[]},{"text":"impl Unpin for ToConnection","synthetic":true,"types":[]},{"text":"impl Unpin for FromBackground","synthetic":true,"types":[]},{"text":"impl Unpin for HandshakeError","synthetic":true,"types":[]},{"text":"impl Unpin for Config","synthetic":true,"types":[]},{"text":"impl Unpin for BlocksRequestId","synthetic":true,"types":[]},{"text":"impl Unpin for SyncState","synthetic":true,"types":[]},{"text":"impl Unpin for SyncService","synthetic":true,"types":[]},{"text":"impl Unpin for Event","synthetic":true,"types":[]},{"text":"impl Unpin for ToBackground","synthetic":true,"types":[]},{"text":"impl Unpin for FromBackground","synthetic":true,"types":[]},{"text":"impl Unpin for ToDatabase","synthetic":true,"types":[]}];
implementors["substrate_lite"] = [{"text":"impl&lt;'a&gt; Unpin for Config&lt;'a&gt;","synthetic":true,"types":[]},{"text":"impl Unpin for Success","synthetic":true,"types":[]},{"text":"impl Unpin for InherentExtrinsics","synthetic":true,"types":[]},{"text":"impl Unpin for InherentData","synthetic":true,"types":[]},{"text":"impl Unpin for ApplyExtrinsic","synthetic":true,"types":[]},{"text":"impl Unpin for StorageGet","synthetic":true,"types":[]},{"text":"impl Unpin for PrefixKeys","synthetic":true,"types":[]},{"text":"impl Unpin for NextKey","synthetic":true,"types":[]},{"text":"impl&lt;'a&gt; Unpin for ConfigPreRuntime&lt;'a&gt;","synthetic":true,"types":[]},{"text":"impl Unpin for Error","synthetic":true,"types":[]},{"text":"impl Unpin for BlockBuild","synthetic":true,"types":[]},{"text":"impl Unpin for InherentDataConsensus","synthetic":true,"types":[]},{"text":"impl Unpin for TransactionValidityError","synthetic":true,"types":[]},{"text":"impl Unpin for InvalidTransaction","synthetic":true,"types":[]},{"text":"impl Unpin for UnknownTransaction","synthetic":true,"types":[]},{"text":"impl Unpin for DispatchError","synthetic":true,"types":[]},{"text":"impl&lt;'c, T&gt; Unpin for JustificationApply&lt;'c, T&gt;","synthetic":true,"types":[]},{"text":"impl&lt;'a, T&gt; Unpin for SetFinalizedBlockIter&lt;'a, T&gt;","synthetic":true,"types":[]},{"text":"impl&lt;T, I&gt; Unpin for BodyVerifyRuntimeRequired&lt;T, I&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;I: Unpin,<br>&nbsp;&nbsp;&nbsp;&nbsp;T: Unpin,&nbsp;</span>","synthetic":true,"types":[]},{"text":"impl&lt;T&gt; Unpin for StorageGet&lt;T&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;T: Unpin,&nbsp;</span>","synthetic":true,"types":[]},{"text":"impl&lt;T&gt; Unpin for StoragePrefixKeys&lt;T&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;T: Unpin,&nbsp;</span>","synthetic":true,"types":[]},{"text":"impl&lt;T&gt; Unpin for StorageNextKey&lt;T&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;T: Unpin,&nbsp;</span>","synthetic":true,"types":[]},{"text":"impl&lt;'c, T&gt; Unpin for HeaderInsert&lt;'c, T&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;T: Unpin,&nbsp;</span>","synthetic":true,"types":[]},{"text":"impl&lt;T&gt; Unpin for BodyInsert&lt;T&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;T: Unpin,&nbsp;</span>","synthetic":true,"types":[]},{"text":"impl Unpin for Config","synthetic":true,"types":[]},{"text":"impl&lt;T&gt; Unpin for NonFinalizedTree&lt;T&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;T: Unpin,&nbsp;</span>","synthetic":true,"types":[]},{"text":"impl&lt;'a, T&gt; Unpin for BlockAccess&lt;'a, T&gt;","synthetic":true,"types":[]},{"text":"impl Unpin for JustificationVerifyError","synthetic":true,"types":[]},{"text":"impl Unpin for SetFinalizedError","synthetic":true,"types":[]},{"text":"impl&lt;T, I&gt; Unpin for BodyVerifyStep1&lt;T, I&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;I: Unpin,<br>&nbsp;&nbsp;&nbsp;&nbsp;T: Unpin,&nbsp;</span>","synthetic":true,"types":[]},{"text":"impl&lt;T&gt; Unpin for BodyVerifyStep2&lt;T&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;T: Unpin,&nbsp;</span>","synthetic":true,"types":[]},{"text":"impl&lt;'c, T&gt; Unpin for HeaderVerifySuccess&lt;'c, T&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;T: Unpin,&nbsp;</span>","synthetic":true,"types":[]},{"text":"impl Unpin for HeaderVerifyError","synthetic":true,"types":[]},{"text":"impl Unpin for ChainInformation","synthetic":true,"types":[]},{"text":"impl Unpin for BabeEpochInformation","synthetic":true,"types":[]},{"text":"impl Unpin for FinalizedScheduledChange","synthetic":true,"types":[]},{"text":"impl&lt;'a&gt; Unpin for ChainInformationRef&lt;'a&gt;","synthetic":true,"types":[]},{"text":"impl&lt;'a&gt; Unpin for BabeEpochInformationRef&lt;'a&gt;","synthetic":true,"types":[]},{"text":"impl Unpin for ChainInformationConsensus","synthetic":true,"types":[]},{"text":"impl Unpin for ChainInformationFinality","synthetic":true,"types":[]},{"text":"impl Unpin for FromGenesisStorageError","synthetic":true,"types":[]},{"text":"impl&lt;'a&gt; Unpin for ChainInformationConsensusRef&lt;'a&gt;","synthetic":true,"types":[]},{"text":"impl&lt;'a&gt; Unpin for ChainInformationFinalityRef&lt;'a&gt;","synthetic":true,"types":[]},{"text":"impl Unpin for AuraGenesisConfiguration","synthetic":true,"types":[]},{"text":"impl Unpin for FromGenesisStorageError","synthetic":true,"types":[]},{"text":"impl Unpin for FromVmPrototypeError","synthetic":true,"types":[]},{"text":"impl Unpin for BabeGenesisConfiguration","synthetic":true,"types":[]},{"text":"impl Unpin for FromGenesisStorageError","synthetic":true,"types":[]},{"text":"impl Unpin for FromVmPrototypeError","synthetic":true,"types":[]},{"text":"impl&lt;T&gt; Unpin for ForkTree&lt;T&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;T: Unpin,&nbsp;</span>","synthetic":true,"types":[]},{"text":"impl&lt;'a, T&gt; Unpin for PruneAncestorsIter&lt;'a, T&gt;","synthetic":true,"types":[]},{"text":"impl&lt;T&gt; Unpin for PrunedNode&lt;T&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;T: Unpin,&nbsp;</span>","synthetic":true,"types":[]},{"text":"impl Unpin for NodeIndex","synthetic":true,"types":[]},{"text":"impl Unpin for Config","synthetic":true,"types":[]},{"text":"impl&lt;TRq, TSrc&gt; Unpin for OptimisticFullSync&lt;TRq, TSrc&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;TRq: Unpin,<br>&nbsp;&nbsp;&nbsp;&nbsp;TSrc: Unpin,&nbsp;</span>","synthetic":true,"types":[]},{"text":"impl Unpin for Block","synthetic":true,"types":[]},{"text":"impl Unpin for RequestSuccessBlock","synthetic":true,"types":[]},{"text":"impl&lt;TRq, TBl&gt; Unpin for StorageGet&lt;TRq, TBl&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;TBl: Unpin,<br>&nbsp;&nbsp;&nbsp;&nbsp;TRq: Unpin,&nbsp;</span>","synthetic":true,"types":[]},{"text":"impl&lt;TRq, TBl&gt; Unpin for StoragePrefixKeys&lt;TRq, TBl&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;TBl: Unpin,<br>&nbsp;&nbsp;&nbsp;&nbsp;TRq: Unpin,&nbsp;</span>","synthetic":true,"types":[]},{"text":"impl&lt;TRq, TBl&gt; Unpin for StorageNextKey&lt;TRq, TBl&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;TBl: Unpin,<br>&nbsp;&nbsp;&nbsp;&nbsp;TRq: Unpin,&nbsp;</span>","synthetic":true,"types":[]},{"text":"impl&lt;TRq, TBl&gt; Unpin for InProgress&lt;TRq, TBl&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;TBl: Unpin,<br>&nbsp;&nbsp;&nbsp;&nbsp;TRq: Unpin,&nbsp;</span>","synthetic":true,"types":[]},{"text":"impl&lt;TRq, TSrc&gt; Unpin for ProcessOne&lt;TRq, TSrc&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;TRq: Unpin,<br>&nbsp;&nbsp;&nbsp;&nbsp;TSrc: Unpin,&nbsp;</span>","synthetic":true,"types":[]},{"text":"impl Unpin for Config","synthetic":true,"types":[]},{"text":"impl&lt;TRq, TSrc&gt; Unpin for OptimisticHeadersSync&lt;TRq, TSrc&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;TRq: Unpin,<br>&nbsp;&nbsp;&nbsp;&nbsp;TSrc: Unpin,&nbsp;</span>","synthetic":true,"types":[]},{"text":"impl Unpin for RequestSuccessBlock","synthetic":true,"types":[]},{"text":"impl&lt;'a&gt; Unpin for ProcessOneOutcome&lt;'a&gt;","synthetic":true,"types":[]},{"text":"impl Unpin for ResetCause","synthetic":true,"types":[]},{"text":"impl Unpin for Config","synthetic":true,"types":[]},{"text":"impl&lt;TRq, TSrc, TBl&gt; Unpin for OptimisticSync&lt;TRq, TSrc, TBl&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;TBl: Unpin,<br>&nbsp;&nbsp;&nbsp;&nbsp;TRq: Unpin,<br>&nbsp;&nbsp;&nbsp;&nbsp;TSrc: Unpin,&nbsp;</span>","synthetic":true,"types":[]},{"text":"impl Unpin for RequestId","synthetic":true,"types":[]},{"text":"impl Unpin for SourceId","synthetic":true,"types":[]},{"text":"impl&lt;'a, TRq, TSrc, TBl&gt; Unpin for Start&lt;'a, TRq, TSrc, TBl&gt;","synthetic":true,"types":[]},{"text":"impl&lt;'a, TRq, TBl&gt; Unpin for RequestsDrain&lt;'a, TRq, TBl&gt;","synthetic":true,"types":[]},{"text":"impl&lt;TRq, TSrc, TBl&gt; Unpin for ProcessOne&lt;TRq, TSrc, TBl&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;TBl: Unpin,<br>&nbsp;&nbsp;&nbsp;&nbsp;TRq: Unpin,<br>&nbsp;&nbsp;&nbsp;&nbsp;TSrc: Unpin,&nbsp;</span>","synthetic":true,"types":[]},{"text":"impl&lt;TRq, TSrc, TBl&gt; Unpin for ProcessOneReport&lt;TRq, TSrc, TBl&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;TBl: Unpin,<br>&nbsp;&nbsp;&nbsp;&nbsp;TRq: Unpin,<br>&nbsp;&nbsp;&nbsp;&nbsp;TSrc: Unpin,&nbsp;</span>","synthetic":true,"types":[]},{"text":"impl&lt;'a, TRq, TSrc, TBl&gt; Unpin for RequestAction&lt;'a, TRq, TSrc, TBl&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;TRq: Unpin,&nbsp;</span>","synthetic":true,"types":[]},{"text":"impl&lt;'a, TSrc&gt; Unpin for FinishRequestOutcome&lt;'a, TSrc&gt;","synthetic":true,"types":[]},{"text":"impl Unpin for RequestFail","synthetic":true,"types":[]},{"text":"impl Unpin for LightSyncState","synthetic":true,"types":[]},{"text":"impl Unpin for ChainSpec","synthetic":true,"types":[]},{"text":"impl Unpin for ParseError","synthetic":true,"types":[]},{"text":"impl Unpin for CorruptedError","synthetic":true,"types":[]},{"text":"impl&lt;'a&gt; Unpin for Config&lt;'a&gt;","synthetic":true,"types":[]},{"text":"impl Unpin for DatabaseEmpty","synthetic":true,"types":[]},{"text":"impl Unpin for SledFullDatabase","synthetic":true,"types":[]},{"text":"impl Unpin for VarLenBytes","synthetic":true,"types":[]},{"text":"impl Unpin for SledError","synthetic":true,"types":[]},{"text":"impl Unpin for DatabaseOpen","synthetic":true,"types":[]},{"text":"impl Unpin for AccessError","synthetic":true,"types":[]},{"text":"impl Unpin for InsertError","synthetic":true,"types":[]},{"text":"impl Unpin for SetFinalizedError","synthetic":true,"types":[]},{"text":"impl Unpin for FinalizedAccessError","synthetic":true,"types":[]},{"text":"impl Unpin for CorruptedError","synthetic":true,"types":[]},{"text":"impl Unpin for CoreVersion","synthetic":true,"types":[]},{"text":"impl Unpin for HostVmPrototype","synthetic":true,"types":[]},{"text":"impl Unpin for ReadyToRun","synthetic":true,"types":[]},{"text":"impl Unpin for Finished","synthetic":true,"types":[]},{"text":"impl Unpin for ExternalStorageGet","synthetic":true,"types":[]},{"text":"impl Unpin for ExternalStorageSet","synthetic":true,"types":[]},{"text":"impl Unpin for ExternalStorageAppend","synthetic":true,"types":[]},{"text":"impl Unpin for ExternalStorageClearPrefix","synthetic":true,"types":[]},{"text":"impl Unpin for ExternalStorageRoot","synthetic":true,"types":[]},{"text":"impl Unpin for ExternalStorageChangesRoot","synthetic":true,"types":[]},{"text":"impl Unpin for ExternalStorageNextKey","synthetic":true,"types":[]},{"text":"impl Unpin for CallRuntimeVersion","synthetic":true,"types":[]},{"text":"impl Unpin for ExternalOffchainStorageSet","synthetic":true,"types":[]},{"text":"impl Unpin for LogEmit","synthetic":true,"types":[]},{"text":"impl Unpin for StartStorageTransaction","synthetic":true,"types":[]},{"text":"impl Unpin for EndStorageTransaction","synthetic":true,"types":[]},{"text":"impl Unpin for HostVm","synthetic":true,"types":[]},{"text":"impl Unpin for NewErr","synthetic":true,"types":[]},{"text":"impl Unpin for StartErr","synthetic":true,"types":[]},{"text":"impl Unpin for Error","synthetic":true,"types":[]},{"text":"impl&lt;'a, TParams&gt; Unpin for Config&lt;'a, TParams&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;TParams: Unpin,&nbsp;</span>","synthetic":true,"types":[]},{"text":"impl Unpin for Success","synthetic":true,"types":[]},{"text":"impl Unpin for SuccessVirtualMachine","synthetic":true,"types":[]},{"text":"impl Unpin for StorageGet","synthetic":true,"types":[]},{"text":"impl Unpin for PrefixKeys","synthetic":true,"types":[]},{"text":"impl Unpin for NextKey","synthetic":true,"types":[]},{"text":"impl Unpin for Error","synthetic":true,"types":[]},{"text":"impl Unpin for RuntimeHostVm","synthetic":true,"types":[]},{"text":"impl Unpin for VirtualMachinePrototype","synthetic":true,"types":[]},{"text":"impl Unpin for VirtualMachine","synthetic":true,"types":[]},{"text":"impl Unpin for Signature","synthetic":true,"types":[]},{"text":"impl Unpin for UnsupportedTypeError","synthetic":true,"types":[]},{"text":"impl Unpin for Trap","synthetic":true,"types":[]},{"text":"impl Unpin for ModuleError","synthetic":true,"types":[]},{"text":"impl Unpin for OutOfBoundsError","synthetic":true,"types":[]},{"text":"impl Unpin for ExecHint","synthetic":true,"types":[]},{"text":"impl Unpin for WasmValue","synthetic":true,"types":[]},{"text":"impl Unpin for ValueType","synthetic":true,"types":[]},{"text":"impl Unpin for ExecOutcome","synthetic":true,"types":[]},{"text":"impl Unpin for NewErr","synthetic":true,"types":[]},{"text":"impl Unpin for StartErr","synthetic":true,"types":[]},{"text":"impl Unpin for RunErr","synthetic":true,"types":[]},{"text":"impl Unpin for GlobalValueErr","synthetic":true,"types":[]},{"text":"impl Unpin for GrandpaGenesisConfiguration","synthetic":true,"types":[]},{"text":"impl Unpin for FromGenesisStorageError","synthetic":true,"types":[]},{"text":"impl Unpin for FromVmPrototypeError","synthetic":true,"types":[]},{"text":"impl&lt;'a&gt; Unpin for JustificationRef&lt;'a&gt;","synthetic":true,"types":[]},{"text":"impl Unpin for Justification","synthetic":true,"types":[]},{"text":"impl&lt;'a&gt; Unpin for PrecommitsRef&lt;'a&gt;","synthetic":true,"types":[]},{"text":"impl&lt;'a&gt; Unpin for PrecommitRef&lt;'a&gt;","synthetic":true,"types":[]},{"text":"impl Unpin for Precommit","synthetic":true,"types":[]},{"text":"impl&lt;'a&gt; Unpin for VotesAncestriesIter&lt;'a&gt;","synthetic":true,"types":[]},{"text":"impl Unpin for Error","synthetic":true,"types":[]},{"text":"impl&lt;'a, I&gt; Unpin for Config&lt;'a, I&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;I: Unpin,&nbsp;</span>","synthetic":true,"types":[]},{"text":"impl Unpin for Error","synthetic":true,"types":[]},{"text":"impl&lt;'a&gt; Unpin for AuraAuthoritiesIter&lt;'a&gt;","synthetic":true,"types":[]},{"text":"impl&lt;'a&gt; Unpin for AuraAuthorityRef&lt;'a&gt;","synthetic":true,"types":[]},{"text":"impl Unpin for AuraAuthority","synthetic":true,"types":[]},{"text":"impl Unpin for AuraPreDigest","synthetic":true,"types":[]},{"text":"impl&lt;'a&gt; Unpin for BabeNextEpochRef&lt;'a&gt;","synthetic":true,"types":[]},{"text":"impl Unpin for BabeNextEpoch","synthetic":true,"types":[]},{"text":"impl&lt;'a&gt; Unpin for BabeAuthoritiesIter&lt;'a&gt;","synthetic":true,"types":[]},{"text":"impl&lt;'a&gt; Unpin for BabeAuthorityRef&lt;'a&gt;","synthetic":true,"types":[]},{"text":"impl Unpin for BabeAuthority","synthetic":true,"types":[]},{"text":"impl Unpin for BabeNextConfig","synthetic":true,"types":[]},{"text":"impl&lt;'a&gt; Unpin for BabePrimaryPreDigestRef&lt;'a&gt;","synthetic":true,"types":[]},{"text":"impl Unpin for BabePrimaryPreDigest","synthetic":true,"types":[]},{"text":"impl Unpin for BabeSecondaryPlainPreDigest","synthetic":true,"types":[]},{"text":"impl&lt;'a&gt; Unpin for BabeSecondaryVRFPreDigestRef&lt;'a&gt;","synthetic":true,"types":[]},{"text":"impl Unpin for BabeSecondaryVRFPreDigest","synthetic":true,"types":[]},{"text":"impl&lt;'a&gt; Unpin for GrandpaScheduledChangeRef&lt;'a&gt;","synthetic":true,"types":[]},{"text":"impl Unpin for GrandpaScheduledChange","synthetic":true,"types":[]},{"text":"impl&lt;'a&gt; Unpin for GrandpaAuthoritiesIter&lt;'a&gt;","synthetic":true,"types":[]},{"text":"impl&lt;'a&gt; Unpin for GrandpaAuthorityRef&lt;'a&gt;","synthetic":true,"types":[]},{"text":"impl Unpin for GrandpaAuthority","synthetic":true,"types":[]},{"text":"impl&lt;'a&gt; Unpin for HeaderRef&lt;'a&gt;","synthetic":true,"types":[]},{"text":"impl Unpin for Header","synthetic":true,"types":[]},{"text":"impl&lt;'a&gt; Unpin for DigestRef&lt;'a&gt;","synthetic":true,"types":[]},{"text":"impl Unpin for Digest","synthetic":true,"types":[]},{"text":"impl&lt;'a&gt; Unpin for LogsIter&lt;'a&gt;","synthetic":true,"types":[]},{"text":"impl Unpin for ChangesTrieConfiguration","synthetic":true,"types":[]},{"text":"impl&lt;'a&gt; Unpin for AuraConsensusLogRef&lt;'a&gt;","synthetic":true,"types":[]},{"text":"impl Unpin for AuraConsensusLog","synthetic":true,"types":[]},{"text":"impl&lt;'a&gt; Unpin for BabeConsensusLogRef&lt;'a&gt;","synthetic":true,"types":[]},{"text":"impl Unpin for BabeConsensusLog","synthetic":true,"types":[]},{"text":"impl Unpin for BabeAllowedSlots","synthetic":true,"types":[]},{"text":"impl&lt;'a&gt; Unpin for BabePreDigestRef&lt;'a&gt;","synthetic":true,"types":[]},{"text":"impl Unpin for BabePreDigest","synthetic":true,"types":[]},{"text":"impl&lt;'a&gt; Unpin for GrandpaConsensusLogRef&lt;'a&gt;","synthetic":true,"types":[]},{"text":"impl Unpin for GrandpaConsensusLog","synthetic":true,"types":[]},{"text":"impl Unpin for Error","synthetic":true,"types":[]},{"text":"impl&lt;'a&gt; Unpin for Seal&lt;'a&gt;","synthetic":true,"types":[]},{"text":"impl&lt;'a&gt; Unpin for DigestItemRef&lt;'a&gt;","synthetic":true,"types":[]},{"text":"impl Unpin for DigestItem","synthetic":true,"types":[]},{"text":"impl Unpin for ChangesTrieSignal","synthetic":true,"types":[]},{"text":"impl&lt;'a&gt; Unpin for InformantLine&lt;'a&gt;","synthetic":true,"types":[]},{"text":"impl&lt;'a&gt; Unpin for RelayChain&lt;'a&gt;","synthetic":true,"types":[]},{"text":"impl Unpin for JsonRpcParseError","synthetic":true,"types":[]},{"text":"impl Unpin for HexString","synthetic":true,"types":[]},{"text":"impl Unpin for HashHexString","synthetic":true,"types":[]},{"text":"impl Unpin for Block","synthetic":true,"types":[]},{"text":"impl Unpin for Header","synthetic":true,"types":[]},{"text":"impl Unpin for HeaderDigest","synthetic":true,"types":[]},{"text":"impl Unpin for RpcMethods","synthetic":true,"types":[]},{"text":"impl Unpin for RuntimeVersion","synthetic":true,"types":[]},{"text":"impl Unpin for StorageChangeSet","synthetic":true,"types":[]},{"text":"impl Unpin for SystemHealth","synthetic":true,"types":[]},{"text":"impl Unpin for SystemPeer","synthetic":true,"types":[]},{"text":"impl Unpin for ParseError","synthetic":true,"types":[]},{"text":"impl Unpin for MethodCall","synthetic":true,"types":[]},{"text":"impl&lt;'a&gt; Unpin for Response&lt;'a&gt;","synthetic":true,"types":[]},{"text":"impl&lt;'a&gt; Unpin for Call&lt;'a&gt;","synthetic":true,"types":[]},{"text":"impl Unpin for ParseError","synthetic":true,"types":[]},{"text":"impl Unpin for Config","synthetic":true,"types":[]},{"text":"impl Unpin for ConnectionId","synthetic":true,"types":[]},{"text":"impl&lt;T&gt; Unpin for WsServer&lt;T&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;T: Unpin,&nbsp;</span>","synthetic":true,"types":[]},{"text":"impl&lt;'a, T&gt; Unpin for Event&lt;'a, T&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;T: Unpin,&nbsp;</span>","synthetic":true,"types":[]},{"text":"impl Unpin for Error","synthetic":true,"types":[]},{"text":"impl&lt;'a&gt; Unpin for MetadataRef&lt;'a&gt;","synthetic":true,"types":[]},{"text":"impl&lt;'a&gt; Unpin for ModuleMetadataRef&lt;'a&gt;","synthetic":true,"types":[]},{"text":"impl&lt;'a&gt; Unpin for StorageMetadataRef&lt;'a&gt;","synthetic":true,"types":[]},{"text":"impl&lt;'a&gt; Unpin for StorageEntryMetadataRef&lt;'a&gt;","synthetic":true,"types":[]},{"text":"impl&lt;'a&gt; Unpin for FunctionMetadataRef&lt;'a&gt;","synthetic":true,"types":[]},{"text":"impl&lt;'a&gt; Unpin for FunctionArgumentMetadataRef&lt;'a&gt;","synthetic":true,"types":[]},{"text":"impl&lt;'a&gt; Unpin for EventMetadataRef&lt;'a&gt;","synthetic":true,"types":[]},{"text":"impl&lt;'a&gt; Unpin for ModuleConstantMetadataRef&lt;'a&gt;","synthetic":true,"types":[]},{"text":"impl&lt;'a&gt; Unpin for ErrorMetadataRef&lt;'a&gt;","synthetic":true,"types":[]},{"text":"impl&lt;'a&gt; Unpin for ExtrinsicMetadataRef&lt;'a&gt;","synthetic":true,"types":[]},{"text":"impl&lt;'a&gt; Unpin for DecodeError&lt;'a&gt;","synthetic":true,"types":[]},{"text":"impl&lt;'a, T&gt; Unpin for UndecodedIter&lt;'a, T&gt;","synthetic":true,"types":[]},{"text":"impl Unpin for StorageEntryModifier","synthetic":true,"types":[]},{"text":"impl&lt;'a&gt; Unpin for StorageEntryTypeRef&lt;'a&gt;","synthetic":true,"types":[]},{"text":"impl Unpin for StorageHasher","synthetic":true,"types":[]},{"text":"impl&lt;TNow, TRqUd, TNotifUd&gt; Unpin for Established&lt;TNow, TRqUd, TNotifUd&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;TNotifUd: Unpin,<br>&nbsp;&nbsp;&nbsp;&nbsp;TNow: Unpin,<br>&nbsp;&nbsp;&nbsp;&nbsp;TRqUd: Unpin,&nbsp;</span>","synthetic":true,"types":[]},{"text":"impl Unpin for SubstreamId","synthetic":true,"types":[]},{"text":"impl&lt;TNow, TRqUd, TNotifUd&gt; Unpin for ReadWrite&lt;TNow, TRqUd, TNotifUd&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;TNotifUd: Unpin,<br>&nbsp;&nbsp;&nbsp;&nbsp;TNow: Unpin,<br>&nbsp;&nbsp;&nbsp;&nbsp;TRqUd: Unpin,&nbsp;</span>","synthetic":true,"types":[]},{"text":"impl Unpin for ConnectionPrototype","synthetic":true,"types":[]},{"text":"impl Unpin for Config","synthetic":true,"types":[]},{"text":"impl Unpin for ConfigRequestResponse","synthetic":true,"types":[]},{"text":"impl Unpin for ConfigNotifications","synthetic":true,"types":[]},{"text":"impl&lt;TRqUd, TNotifUd&gt; Unpin for Event&lt;TRqUd, TNotifUd&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;TNotifUd: Unpin,<br>&nbsp;&nbsp;&nbsp;&nbsp;TRqUd: Unpin,&nbsp;</span>","synthetic":true,"types":[]},{"text":"impl Unpin for Error","synthetic":true,"types":[]},{"text":"impl Unpin for RequestError","synthetic":true,"types":[]},{"text":"impl Unpin for HealthyHandshake","synthetic":true,"types":[]},{"text":"impl Unpin for NoiseKeyRequired","synthetic":true,"types":[]},{"text":"impl Unpin for Handshake","synthetic":true,"types":[]},{"text":"impl Unpin for HandshakeError","synthetic":true,"types":[]},{"text":"impl&lt;I, P&gt; Unpin for InProgress&lt;I, P&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;I: Unpin,<br>&nbsp;&nbsp;&nbsp;&nbsp;P: Unpin,&nbsp;</span>","synthetic":true,"types":[]},{"text":"impl&lt;I, P&gt; Unpin for Config&lt;I, P&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;I: Unpin,<br>&nbsp;&nbsp;&nbsp;&nbsp;P: Unpin,&nbsp;</span>","synthetic":true,"types":[]},{"text":"impl&lt;I, P&gt; Unpin for Negotiation&lt;I, P&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;I: Unpin,<br>&nbsp;&nbsp;&nbsp;&nbsp;P: Unpin,&nbsp;</span>","synthetic":true,"types":[]},{"text":"impl Unpin for Error","synthetic":true,"types":[]},{"text":"impl&lt;I, P&gt; Unpin for MessageOut&lt;I, P&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;I: Unpin,<br>&nbsp;&nbsp;&nbsp;&nbsp;P: Unpin,&nbsp;</span>","synthetic":true,"types":[]},{"text":"impl Unpin for NoiseKey","synthetic":true,"types":[]},{"text":"impl Unpin for UnsignedNoiseKey","synthetic":true,"types":[]},{"text":"impl Unpin for Noise","synthetic":true,"types":[]},{"text":"impl Unpin for HandshakeInProgress","synthetic":true,"types":[]},{"text":"impl Unpin for CipherError","synthetic":true,"types":[]},{"text":"impl Unpin for PayloadDecodeError","synthetic":true,"types":[]},{"text":"impl Unpin for NoiseHandshake","synthetic":true,"types":[]},{"text":"impl Unpin for HandshakeError","synthetic":true,"types":[]},{"text":"impl&lt;T&gt; Unpin for Yamux&lt;T&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;T: Unpin,&nbsp;</span>","synthetic":true,"types":[]},{"text":"impl Unpin for Config","synthetic":true,"types":[]},{"text":"impl&lt;'a, T&gt; Unpin for SubstreamMut&lt;'a, T&gt;","synthetic":true,"types":[]},{"text":"impl&lt;'a, T&gt; Unpin for ExtractOut&lt;'a, T&gt;","synthetic":true,"types":[]},{"text":"impl Unpin for SubstreamId","synthetic":true,"types":[]},{"text":"impl&lt;T&gt; Unpin for IncomingDataOutcome&lt;T&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;T: Unpin,&nbsp;</span>","synthetic":true,"types":[]},{"text":"impl&lt;T&gt; Unpin for IncomingDataDetail&lt;T&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;T: Unpin,&nbsp;</span>","synthetic":true,"types":[]},{"text":"impl Unpin for Error","synthetic":true,"types":[]},{"text":"impl Unpin for Kademlia","synthetic":true,"types":[]},{"text":"impl Unpin for FramedInProgress","synthetic":true,"types":[]},{"text":"impl Unpin for Framed","synthetic":true,"types":[]},{"text":"impl Unpin for FramedError","synthetic":true,"types":[]},{"text":"impl Unpin for PeerId","synthetic":true,"types":[]},{"text":"impl Unpin for Bs58DecodeError","synthetic":true,"types":[]},{"text":"impl Unpin for PublicKey","synthetic":true,"types":[]},{"text":"impl Unpin for FromProtobufEncodingError","synthetic":true,"types":[]},{"text":"impl Unpin for FromBytesError","synthetic":true,"types":[]},{"text":"impl Unpin for FromMultihashError","synthetic":true,"types":[]},{"text":"impl Unpin for ParseError","synthetic":true,"types":[]},{"text":"impl Unpin for Config","synthetic":true,"types":[]},{"text":"impl&lt;TPeer, TConn, TPending, TSub, TPendingSub&gt; Unpin for Peerset&lt;TPeer, TConn, TPending, TSub, TPendingSub&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;TConn: Unpin,<br>&nbsp;&nbsp;&nbsp;&nbsp;TPeer: Unpin,<br>&nbsp;&nbsp;&nbsp;&nbsp;TPending: Unpin,<br>&nbsp;&nbsp;&nbsp;&nbsp;TPendingSub: Unpin,<br>&nbsp;&nbsp;&nbsp;&nbsp;TSub: Unpin,&nbsp;</span>","synthetic":true,"types":[]},{"text":"impl Unpin for ConnectionId","synthetic":true,"types":[]},{"text":"impl&lt;'a, TPeer, TConn, TPending, TSub, TPendingSub&gt; Unpin for ConnectionMut&lt;'a, TPeer, TConn, TPending, TSub, TPendingSub&gt;","synthetic":true,"types":[]},{"text":"impl Unpin for PendingId","synthetic":true,"types":[]},{"text":"impl&lt;'a, TPeer, TConn, TPending, TSub, TPendingSub&gt; Unpin for PendingMut&lt;'a, TPeer, TConn, TPending, TSub, TPendingSub&gt;","synthetic":true,"types":[]},{"text":"impl&lt;'a, TPeer, TConn, TPending, TSub, TPendingSub&gt; Unpin for NodeMutKnown&lt;'a, TPeer, TConn, TPending, TSub, TPendingSub&gt;","synthetic":true,"types":[]},{"text":"impl&lt;'a, TPeer, TConn, TPending, TSub, TPendingSub&gt; Unpin for NodeMutUnknown&lt;'a, TPeer, TConn, TPending, TSub, TPendingSub&gt;","synthetic":true,"types":[]},{"text":"impl&lt;'a, TPeer, TConn, TPending, TSub, TPendingSub&gt; Unpin for NodeMut&lt;'a, TPeer, TConn, TPending, TSub, TPendingSub&gt;","synthetic":true,"types":[]},{"text":"impl Unpin for BlocksRequestConfig","synthetic":true,"types":[]},{"text":"impl Unpin for BlocksRequestFields","synthetic":true,"types":[]},{"text":"impl Unpin for BlockData","synthetic":true,"types":[]},{"text":"impl Unpin for ProtobufDecodeError","synthetic":true,"types":[]},{"text":"impl&lt;'a&gt; Unpin for BlockAnnouncesHandshakeRef&lt;'a&gt;","synthetic":true,"types":[]},{"text":"impl&lt;'a&gt; Unpin for BlockAnnouncesDecodeError&lt;'a&gt;","synthetic":true,"types":[]},{"text":"impl Unpin for BlocksRequestDirection","synthetic":true,"types":[]},{"text":"impl Unpin for BlocksRequestConfigStart","synthetic":true,"types":[]},{"text":"impl Unpin for DecodeBlockResponseError","synthetic":true,"types":[]},{"text":"impl Unpin for Role","synthetic":true,"types":[]},{"text":"impl&lt;I&gt; Unpin for BytesToNibbles&lt;I&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;I: Unpin,&nbsp;</span>","synthetic":true,"types":[]},{"text":"impl Unpin for Nibble","synthetic":true,"types":[]},{"text":"impl Unpin for Trie","synthetic":true,"types":[]},{"text":"impl Unpin for NibbleFromU8Error","synthetic":true,"types":[]},{"text":"impl Unpin for CalculationCache","synthetic":true,"types":[]},{"text":"impl Unpin for AllKeys","synthetic":true,"types":[]},{"text":"impl Unpin for StorageValue","synthetic":true,"types":[]},{"text":"impl Unpin for RootMerkleValueCalculation","synthetic":true,"types":[]},{"text":"impl&lt;TChIter, TPKey, TVal&gt; Unpin for Config&lt;TChIter, TPKey, TVal&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;TChIter: Unpin,<br>&nbsp;&nbsp;&nbsp;&nbsp;TPKey: Unpin,<br>&nbsp;&nbsp;&nbsp;&nbsp;TVal: Unpin,&nbsp;</span>","synthetic":true,"types":[]},{"text":"impl Unpin for Output","synthetic":true,"types":[]},{"text":"impl&lt;TPKey&gt; Unpin for NodeTy&lt;TPKey&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;TPKey: Unpin,&nbsp;</span>","synthetic":true,"types":[]},{"text":"impl&lt;'a, I&gt; Unpin for Config&lt;'a, I&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;I: Unpin,&nbsp;</span>","synthetic":true,"types":[]},{"text":"impl Unpin for Error","synthetic":true,"types":[]},{"text":"impl&lt;TUd&gt; Unpin for TrieStructure&lt;TUd&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;TUd: Unpin,&nbsp;</span>","synthetic":true,"types":[]},{"text":"impl Unpin for NodeIndex","synthetic":true,"types":[]},{"text":"impl&lt;'a, TUd&gt; Unpin for StorageNodeAccess&lt;'a, TUd&gt;","synthetic":true,"types":[]},{"text":"impl&lt;'a, TUd&gt; Unpin for BranchNodeAccess&lt;'a, TUd&gt;","synthetic":true,"types":[]},{"text":"impl&lt;'a, TUd, TKIter&gt; Unpin for Vacant&lt;'a, TUd, TKIter&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;TKIter: Unpin,&nbsp;</span>","synthetic":true,"types":[]},{"text":"impl&lt;'a, TUd&gt; Unpin for PrepareInsertOne&lt;'a, TUd&gt;","synthetic":true,"types":[]},{"text":"impl&lt;'a, TUd&gt; Unpin for PrepareInsertTwo&lt;'a, TUd&gt;","synthetic":true,"types":[]},{"text":"impl&lt;'a, TUd, TKIter&gt; Unpin for Entry&lt;'a, TUd, TKIter&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;TKIter: Unpin,&nbsp;</span>","synthetic":true,"types":[]},{"text":"impl&lt;'a, TUd&gt; Unpin for NodeAccess&lt;'a, TUd&gt;","synthetic":true,"types":[]},{"text":"impl&lt;'a, TUd&gt; Unpin for Remove&lt;'a, TUd&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;TUd: Unpin,&nbsp;</span>","synthetic":true,"types":[]},{"text":"impl&lt;'a, TUd&gt; Unpin for PrepareInsert&lt;'a, TUd&gt;","synthetic":true,"types":[]},{"text":"impl&lt;'a, TAuthList&gt; Unpin for VerifyConfig&lt;'a, TAuthList&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;TAuthList: Unpin,&nbsp;</span>","synthetic":true,"types":[]},{"text":"impl Unpin for VerifySuccess","synthetic":true,"types":[]},{"text":"impl Unpin for VerifyError","synthetic":true,"types":[]},{"text":"impl&lt;'a&gt; Unpin for VerifyConfig&lt;'a&gt;","synthetic":true,"types":[]},{"text":"impl Unpin for VerifySuccess","synthetic":true,"types":[]},{"text":"impl Unpin for VerifyError","synthetic":true,"types":[]},{"text":"impl&lt;'a, TBody&gt; Unpin for Config&lt;'a, TBody&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;TBody: Unpin,&nbsp;</span>","synthetic":true,"types":[]},{"text":"impl Unpin for Success","synthetic":true,"types":[]},{"text":"impl Unpin for StorageGet","synthetic":true,"types":[]},{"text":"impl Unpin for StoragePrefixKeys","synthetic":true,"types":[]},{"text":"impl Unpin for StorageNextKey","synthetic":true,"types":[]},{"text":"impl&lt;'a&gt; Unpin for ConfigConsensus&lt;'a&gt;","synthetic":true,"types":[]},{"text":"impl Unpin for SuccessConsensus","synthetic":true,"types":[]},{"text":"impl Unpin for Error","synthetic":true,"types":[]},{"text":"impl Unpin for Verify","synthetic":true,"types":[]},{"text":"impl&lt;'a&gt; Unpin for Config&lt;'a&gt;","synthetic":true,"types":[]},{"text":"impl&lt;'a&gt; Unpin for ConfigConsensus&lt;'a&gt;","synthetic":true,"types":[]},{"text":"impl Unpin for Success","synthetic":true,"types":[]},{"text":"impl Unpin for Error","synthetic":true,"types":[]},{"text":"impl&lt;'pin, T&gt; Unpin for WithBuffers&lt;T&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;__WithBuffers&lt;'pin, T&gt;: Unpin,&nbsp;</span>","synthetic":false,"types":[]}];
implementors["substrate_lite_js"] = [{"text":"impl Unpin for Delay","synthetic":true,"types":[]},{"text":"impl Unpin for Instant","synthetic":true,"types":[]},{"text":"impl !Unpin for WebSocket","synthetic":true,"types":[]}];
if (window.register_implementors) {window.register_implementors(implementors);} else {window.pending_implementors = implementors;}})()