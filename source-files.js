var N = null;var sourcesIndex = {};
sourcesIndex["full_node"] = {"name":"","files":["cli.rs","main.rs","network_service.rs","sync_service.rs"]};
sourcesIndex["substrate_lite"] = {"name":"","dirs":[{"name":"author","files":["build.rs"]},{"name":"chain","dirs":[{"name":"blocks_tree","files":["best_block.rs","finality.rs","verify.rs"]},{"name":"chain_information","files":["aura.rs","babe.rs"]},{"name":"sync","files":["full_optimistic.rs","headers_optimistic.rs","optimistic.rs"]}],"files":["blocks_tree.rs","chain_information.rs","fork_tree.rs","sync.rs"]},{"name":"chain_spec","files":["light_sync_state.rs","structs.rs"]},{"name":"database","dirs":[{"name":"finalized_serialize","files":["defs.rs"]},{"name":"full_sled","files":["open.rs"]}],"files":["finalized_serialize.rs","full_sled.rs"]},{"name":"executor","dirs":[{"name":"vm","files":["interpreter.rs","jit.rs"]}],"files":["allocator.rs","host.rs","runtime_host.rs","vm.rs"]},{"name":"finality","dirs":[{"name":"grandpa","files":["chain_config.rs"]},{"name":"justification","files":["decode.rs","verify.rs"]}],"files":["grandpa.rs","justification.rs"]},{"name":"header","files":["aura.rs","babe.rs","grandpa.rs"]},{"name":"json_rpc","files":["methods.rs","parse.rs","websocket_server.rs"]},{"name":"metadata","files":["decode.rs","query.rs"]},{"name":"network","dirs":[{"name":"connection","files":["established.rs","handshake.rs","multistream_select.rs","noise.rs","yamux.rs"]},{"name":"discovery","files":["kademlia.rs"]}],"files":["connection.rs","discovery.rs","leb128.rs","peer_id.rs","peerset.rs","protocol.rs","with_buffers.rs"]},{"name":"trie","files":["calculate_root.rs","nibble.rs","node_value.rs","proof_verify.rs","trie_structure.rs"]},{"name":"verify","files":["aura.rs","babe.rs","execute_block.rs","header_body.rs","header_only.rs"]}],"files":["author.rs","chain.rs","chain_spec.rs","database.rs","executor.rs","finality.rs","header.rs","informant.rs","json_rpc.rs","lib.rs","metadata.rs","network.rs","trie.rs","util.rs","verify.rs"]};
sourcesIndex["substrate_lite_js"] = {"name":"","dirs":[{"name":"ffi","files":["bindings.rs"]}],"files":["ffi.rs","lib.rs","network_service.rs","sync_service.rs"]};
createSourceSidebar();