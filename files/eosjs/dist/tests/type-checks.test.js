"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var eosjs_jsonrpc_1 = require("../eosjs-jsonrpc");
var eosjs_jssig_1 = require("../eosjs-jssig");
var eosjs_api_1 = require("../eosjs-api");
var ser = require("../eosjs-serialize");
var node_fetch_1 = require("node-fetch");
var _a = require('util'), TextEncoder = _a.TextEncoder, TextDecoder = _a.TextDecoder;
require("jest-extended");
var privateKey = '5JuH9fCXmU3xbj8nRmhPZaVrxxXrdPaRmZLW1cznNTmTQR2Kg5Z';
var rpc = new eosjs_jsonrpc_1.JsonRpc('http://localhost:8888', { fetch: node_fetch_1.default });
var signatureProvider = new eosjs_jssig_1.JsSignatureProvider([privateKey]);
var api = new eosjs_api_1.Api({ rpc: rpc, signatureProvider: signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });
/** Checking types with verifyType/complexOrPrimitive
 * To ensure that the data structure coming from eos matches the declared types in eosjs for developers and documentation
 * Since typescript is not a runtime language, it's required to test with javascript format
 * Create an object matching the typescript type with some requirements:
 * nullable: make the key a string and add a `&` character to the end
 * optional: make the key a string and add a `?` character to the end (same as typescript)
 * []: remove array symbols from simple/complex types, use arrays for std::pair
 * Map<>: use Map<> in the value field
 * |: operates the same as typescript but does not work for complex types
 */
describe('Chain API Plugin Endpoints', function () {
    it('validates return type of abi_bin_to_json', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result, abiBinToJsonResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, rpc.abi_bin_to_json('returnvalue', 'sum', '0500000005000000')];
                case 1:
                    result = _a.sent();
                    abiBinToJsonResult = {
                        args: 'any'
                    };
                    verifyType(result, abiBinToJsonResult);
                    return [2 /*return*/];
            }
        });
    }); });
    it('validates return type of abi_json_to_bin', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result, abiJsonToBinResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, rpc.abi_json_to_bin('returnvalue', 'sum', [5, 5])];
                case 1:
                    result = _a.sent();
                    abiJsonToBinResult = {
                        binargs: 'string'
                    };
                    verifyType(result, abiJsonToBinResult);
                    return [2 /*return*/];
            }
        });
    }); });
    it('validates return type of get_abi', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result, getAbiResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, rpc.get_abi('todo')];
                case 1:
                    result = _a.sent();
                    getAbiResult = {
                        account_name: 'string',
                        'abi?': {
                            version: 'string',
                            types: {
                                new_type_name: 'string',
                                type: 'string',
                            },
                            structs: {
                                name: 'string',
                                base: 'string',
                                fields: {
                                    name: 'string',
                                    type: 'string',
                                },
                            },
                            actions: {
                                name: 'string',
                                type: 'string',
                                ricardian_contract: 'string',
                            },
                            tables: {
                                name: 'string',
                                type: 'string',
                                index_type: 'string',
                                key_names: 'string',
                                key_types: 'string',
                            },
                            ricardian_clauses: {
                                id: 'string',
                                body: 'string',
                            },
                            error_messages: {
                                error_code: 'number',
                                error_msg: 'string',
                            },
                            abi_extensions: {
                                tag: 'number',
                                value: 'string',
                            },
                            'variants?': {
                                name: 'string',
                                types: 'string',
                            },
                            'action_results?': {
                                name: 'string',
                                result_type: 'string',
                            },
                            'kv_tables?': {
                                todo: {
                                    type: 'string',
                                    primary_index: {
                                        name: 'string',
                                        type: 'string',
                                    },
                                    secondary_indices: {
                                        'todo?': {
                                            type: 'string',
                                        },
                                    },
                                },
                            },
                        },
                    };
                    verifyType(result, getAbiResult);
                    return [2 /*return*/];
            }
        });
    }); });
    it('validates return type of get_account', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result, getAccountResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, rpc.get_account('eosio')];
                case 1:
                    result = _a.sent();
                    getAccountResult = {
                        account_name: 'string',
                        head_block_num: 'number',
                        head_block_time: 'string',
                        privileged: 'boolean',
                        last_code_update: 'string',
                        created: 'string',
                        'core_liquid_balance?': 'string',
                        ram_quota: 'number',
                        net_weight: 'number',
                        cpu_weight: 'number',
                        net_limit: {
                            used: 'number',
                            available: 'number',
                            max: 'number',
                            'last_usage_update_time?': 'string',
                            'current_used?': 'number',
                        },
                        cpu_limit: {
                            used: 'number',
                            available: 'number',
                            max: 'number',
                            'last_usage_update_time?': 'string',
                            'current_used?': 'number',
                        },
                        ram_usage: 'number',
                        permissions: {
                            perm_name: 'string',
                            parent: 'string',
                            required_auth: {
                                threshold: 'number',
                                keys: {
                                    key: 'string',
                                    weight: 'number',
                                },
                                accounts: {
                                    permission: {
                                        actor: 'string',
                                        permission: 'string',
                                    },
                                    weight: 'number',
                                },
                                waits: {
                                    wait_sec: 'number',
                                    weight: 'number',
                                }
                            }
                        },
                        'total_resources&': {
                            owner: 'string',
                            ram_bytes: 'number',
                            net_weight: 'string',
                            cpu_weight: 'string',
                        },
                        'self_delegated_bandwidth&': {
                            from: 'string',
                            to: 'string',
                            net_weight: 'string',
                            cpu_weight: 'string',
                        },
                        'refund_request&': {
                            owner: 'string',
                            request_time: 'string',
                            net_amount: 'string',
                            cpu_amount: 'string',
                        },
                        'voter_info&': {
                            owner: 'string',
                            proxy: 'string',
                            producers: 'string',
                            staked: 'number',
                            last_vote_weight: 'string',
                            proxied_vote_weight: 'string',
                            is_proxy: 'number',
                            flags1: 'number',
                            reserved2: 'number',
                            reserved3: 'string',
                        },
                        'rex_info&': {
                            version: 'number',
                            owner: 'string',
                            vote_stake: 'string',
                            rex_balance: 'string',
                            matured_rex: 'number',
                            rex_maturities: 'any',
                        },
                    };
                    verifyType(result, getAccountResult);
                    return [2 /*return*/];
            }
        });
    }); });
    it('validates return type of get_accounts_by_authorizers', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result, getAccountsByAuthorizersResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, rpc.get_accounts_by_authorizers([
                        { actor: 'bob', permission: 'active' },
                        { actor: 'cfhello', permission: 'active' }
                    ], ['EOS7bxrQUTbQ4mqcoefhWPz1aFieN4fA9RQAiozRz7FrUChHZ7Rb8', 'EOS6nVrBASwwviMy3CntKsb1cD5Ai2gRZnyrxJDqypL3JLL7KCKrK'])];
                case 1:
                    result = _a.sent();
                    getAccountsByAuthorizersResult = {
                        accounts: {
                            account_name: 'string',
                            permission_name: 'string',
                            'authorizing_key?': 'string',
                            'authorizing_account?': {
                                actor: 'string',
                                permission: 'string',
                            },
                            weight: 'number',
                            threshold: 'number',
                        }
                    };
                    verifyType(result, getAccountsByAuthorizersResult);
                    return [2 /*return*/];
            }
        });
    }); });
    it('validates return type of get_activated_protocol_features', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result, getActivatedProtocolFeaturesResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, rpc.get_activated_protocol_features({})];
                case 1:
                    result = _a.sent();
                    getActivatedProtocolFeaturesResult = {
                        activated_protocol_features: {
                            feature_digest: 'string',
                            activation_ordinal: 'number',
                            activation_block_num: 'number',
                            description_digest: 'string',
                            dependencies: 'string',
                            protocol_feature_type: 'string',
                            specification: {
                                name: 'string',
                                value: 'string',
                            },
                        },
                        'more?': 'number',
                    };
                    verifyType(result, getActivatedProtocolFeaturesResult);
                    return [2 /*return*/];
            }
        });
    }); });
    it('validates return type of get_block_header_state', function () { return __awaiter(void 0, void 0, void 0, function () {
        var info, result, getBlockHeaderStateResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, rpc.get_info()];
                case 1:
                    info = _a.sent();
                    return [4 /*yield*/, rpc.get_block_header_state(info.head_block_id)];
                case 2:
                    result = _a.sent();
                    getBlockHeaderStateResult = {
                        id: 'string',
                        header: {
                            timestamp: 'string',
                            producer: 'string',
                            confirmed: 'number',
                            previous: 'string',
                            transaction_mroot: 'string',
                            action_mroot: 'string',
                            schedule_version: 'number',
                            'new_producers?': {
                                version: 'number',
                                producers: {
                                    producer_name: 'string',
                                    block_signing_key: 'string',
                                },
                            },
                            header_extensions: 'any',
                            producer_signature: 'string',
                        },
                        pending_schedule: {
                            schedule_lib_num: 'number',
                            schedule_hash: 'string',
                            schedule: {
                                version: 'number',
                                producers: {
                                    producer_name: 'string',
                                    block_signing_key: 'string',
                                },
                            },
                        },
                        activated_protocol_features: {
                            protocol_features: 'string',
                        },
                        additional_signatures: 'string',
                        block_num: 'number',
                        dpos_proposed_irreversible_blocknum: 'number',
                        dpos_irreversible_blocknum: 'number',
                        active_schedule: {
                            version: 'number',
                            producers: {
                                producer_name: 'string',
                                authority: ['number|string', {
                                        threshold: 'number',
                                        keys: {
                                            key: 'string',
                                            weight: 'number',
                                        },
                                    }],
                            },
                        },
                        blockroot_merkle: {
                            _active_nodes: 'string',
                            _node_count: 'number',
                        },
                        producer_to_last_produced: 'Map<string, number>',
                        producer_to_last_implied_irb: 'Map<string, number>',
                        valid_block_signing_authority: ['number|string', {
                                threshold: 'number',
                                keys: {
                                    key: 'string',
                                    weight: 'number',
                                },
                            }],
                        confirm_count: 'number',
                        state_extension: ['number', {
                                security_group_info: {
                                    version: 'number',
                                    participants: 'string',
                                },
                            }]
                    };
                    verifyType(result, getBlockHeaderStateResult);
                    return [2 /*return*/];
            }
        });
    }); });
    it('validates return type of get_block_info', function () { return __awaiter(void 0, void 0, void 0, function () {
        var info, result, getBlockInfoResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, rpc.get_info()];
                case 1:
                    info = _a.sent();
                    return [4 /*yield*/, rpc.get_block_info(info.last_irreversible_block_num)];
                case 2:
                    result = _a.sent();
                    getBlockInfoResult = {
                        timestamp: 'string',
                        producer: 'string',
                        confirmed: 'number',
                        previous: 'string',
                        transaction_mroot: 'string',
                        action_mroot: 'string',
                        schedule_version: 'number',
                        producer_signature: 'string',
                        id: 'string',
                        block_num: 'number',
                        ref_block_num: 'number',
                        ref_block_prefix: 'number',
                    };
                    verifyType(result, getBlockInfoResult);
                    return [2 /*return*/];
            }
        });
    }); });
    it('validates return type of get_block', function () { return __awaiter(void 0, void 0, void 0, function () {
        var info, result, getBlockResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, rpc.get_info()];
                case 1:
                    info = _a.sent();
                    return [4 /*yield*/, rpc.get_block(info.last_irreversible_block_num)];
                case 2:
                    result = _a.sent();
                    getBlockResult = {
                        timestamp: 'string',
                        producer: 'string',
                        confirmed: 'number',
                        previous: 'string',
                        transaction_mroot: 'string',
                        action_mroot: 'string',
                        schedule_version: 'number',
                        'new_producers&': {
                            version: 'number',
                            producers: {
                                producer_name: 'string',
                                block_signing_key: 'string'
                            }
                        },
                        producer_signature: 'string',
                        transactions: {
                            status: 'string',
                            cpu_usage_us: 'number',
                            net_usage_words: 'number',
                            trx: {
                                id: 'string',
                                signatures: 'string',
                                compression: 'number|string',
                                packed_context_free_data: 'string',
                                context_free_data: 'string',
                                packed_trx: 'string',
                                transaction: {
                                    'expiration?': 'string',
                                    'ref_block_num?': 'number',
                                    'ref_block_prefix?': 'number',
                                    'max_net_usage_words?': 'number',
                                    'max_cpu_usage_ms?': 'number',
                                    'delay_sec?': 'number',
                                    'context_free_actions?': {
                                        account: 'string',
                                        name: 'string',
                                        authorization: {
                                            actor: 'string',
                                            permission: 'string',
                                        },
                                        'data?': 'any',
                                        'hex_data?': 'string',
                                    },
                                    'context_free_data?': 'number',
                                    actions: {
                                        account: 'string',
                                        name: 'string',
                                        authorization: {
                                            actor: 'string',
                                            permission: 'string',
                                        },
                                        'data?': 'any',
                                        'hex_data?': 'string',
                                    },
                                    'transaction_extensions?': '[number, string]',
                                },
                            },
                        },
                        id: 'string',
                        block_num: 'number',
                        ref_block_prefix: 'number',
                    };
                    verifyType(result, getBlockResult);
                    return [2 /*return*/];
            }
        });
    }); });
    it('validates return type of get_code', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result, getCodeResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, rpc.get_code('todo')];
                case 1:
                    result = _a.sent();
                    getCodeResult = {
                        account_name: 'string',
                        code_hash: 'string',
                        wast: 'string',
                        wasm: 'string',
                        'abi?': {
                            version: 'string',
                            types: {
                                new_type_name: 'string',
                                type: 'string',
                            },
                            structs: {
                                name: 'string',
                                base: 'string',
                                fields: {
                                    name: 'string',
                                    type: 'string',
                                },
                            },
                            actions: {
                                name: 'string',
                                type: 'string',
                                ricardian_contract: 'string',
                            },
                            tables: {
                                name: 'string',
                                type: 'string',
                                index_type: 'string',
                                key_names: 'string',
                                key_types: 'string',
                            },
                            ricardian_clauses: {
                                id: 'string',
                                body: 'string',
                            },
                            error_messages: {
                                error_code: 'number',
                                error_msg: 'string',
                            },
                            abi_extensions: {
                                tag: 'number',
                                value: 'string',
                            },
                            'variants?': {
                                name: 'string',
                                types: 'string',
                            },
                            'action_results?': {
                                name: 'string',
                                result_type: 'string',
                            },
                            'kv_tables?': {
                                todo: {
                                    type: 'string',
                                    primary_index: {
                                        name: 'string',
                                        type: 'string',
                                    },
                                    secondary_indices: {
                                        'todo?': {
                                            type: 'string',
                                        },
                                    },
                                },
                            },
                        },
                    };
                    verifyType(result, getCodeResult);
                    return [2 /*return*/];
            }
        });
    }); });
    it('validates return type of get_code_hash', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result, getCodeHashResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, rpc.get_code_hash('todo')];
                case 1:
                    result = _a.sent();
                    getCodeHashResult = {
                        account_name: 'string',
                        code_hash: 'string',
                    };
                    verifyType(result, getCodeHashResult);
                    return [2 /*return*/];
            }
        });
    }); });
    it('validates return type of get_currency_balance', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, rpc.get_currency_balance('eosio.token', 'bob', 'SYS')];
                case 1:
                    result = _a.sent();
                    result.forEach(function (element) {
                        expect(typeof element).toEqual('string');
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it('validates return type of get_currency_stats', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result, getCurrencyStatsResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, rpc.get_currency_stats('eosio.token', 'SYS')];
                case 1:
                    result = _a.sent();
                    getCurrencyStatsResult = {
                        SYS: {
                            supply: 'string',
                            max_supply: 'string',
                            issuer: 'string',
                        }
                    };
                    verifyType(result, getCurrencyStatsResult);
                    return [2 /*return*/];
            }
        });
    }); });
    it('validates return type of get_info', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result, getInfoResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, rpc.get_info()];
                case 1:
                    result = _a.sent();
                    getInfoResult = {
                        server_version: 'string',
                        chain_id: 'string',
                        head_block_num: 'number',
                        last_irreversible_block_num: 'number',
                        last_irreversible_block_id: 'string',
                        'last_irreversible_block_time?': 'string',
                        head_block_id: 'string',
                        head_block_time: 'string',
                        head_block_producer: 'string',
                        virtual_block_cpu_limit: 'number',
                        virtual_block_net_limit: 'number',
                        block_cpu_limit: 'number',
                        block_net_limit: 'number',
                        'server_version_string?': 'string',
                        'fork_db_head_block_num?': 'number',
                        'fork_db_head_block_id?': 'string',
                        'server_full_version_string?': 'string',
                        'first_block_num?': 'number',
                    };
                    verifyType(result, getInfoResult);
                    return [2 /*return*/];
            }
        });
    }); });
    it('validates return type of get_producer_schedule', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result, getProducerScheduleResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, rpc.get_producer_schedule()];
                case 1:
                    result = _a.sent();
                    getProducerScheduleResult = {
                        'active&': {
                            version: 'number',
                            producers: {
                                producer_name: 'string',
                                authority: ['number|string', {
                                        threshold: 'number',
                                        keys: {
                                            key: 'string',
                                            weight: 'number',
                                        },
                                    }],
                            },
                        },
                        'pending&': {
                            version: 'number',
                            producers: {
                                producer_name: 'string',
                                authority: ['number|string', {
                                        threshold: 'number',
                                        keys: {
                                            key: 'string',
                                            weight: 'number',
                                        },
                                    }],
                            },
                        },
                        'proposed&': {
                            version: 'number',
                            producers: {
                                producer_name: 'string',
                                authority: ['number|string', {
                                        threshold: 'number',
                                        keys: {
                                            key: 'string',
                                            weight: 'number',
                                        },
                                    }],
                            },
                        },
                    };
                    verifyType(result, getProducerScheduleResult);
                    return [2 /*return*/];
            }
        });
    }); });
    it('validates return type of get_producers', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result, getProducersResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, rpc.get_producers()];
                case 1:
                    result = _a.sent();
                    getProducersResult = {
                        rows: {
                            owner: 'string',
                            'producer_authority?': ['number|string', {
                                    threshold: 'number',
                                    keys: {
                                        key: 'string',
                                        weight: 'number',
                                    },
                                }],
                            url: 'string',
                            'is_active?': 'number',
                            total_votes: 'string',
                            producer_key: 'string',
                            'unpaid_blocks?': 'number',
                            'last_claim_time?': 'string',
                            'location?': 'number',
                        },
                        total_producer_vote_weight: 'string',
                        more: 'string',
                    };
                    verifyType(result, getProducersResult);
                    return [2 /*return*/];
            }
        });
    }); });
    it('validates return type of get_raw_code_and_abi', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result, getRawCodeAndAbiResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, rpc.get_raw_code_and_abi('eosio')];
                case 1:
                    result = _a.sent();
                    getRawCodeAndAbiResult = {
                        account_name: 'string',
                        wasm: 'string',
                        abi: 'string',
                    };
                    verifyType(result, getRawCodeAndAbiResult);
                    return [2 /*return*/];
            }
        });
    }); });
    it('validates return type of get_raw_abi', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result, getRawAbiResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, rpc.get_raw_abi('eosio')];
                case 1:
                    result = _a.sent();
                    getRawAbiResult = {
                        account_name: 'string',
                        code_hash: 'string',
                        abi_hash: 'string',
                        abi: 'string',
                    };
                    verifyType(result, getRawAbiResult);
                    return [2 /*return*/];
            }
        });
    }); });
    it('validates return type of get_scheduled_transactions', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result, getScheduledTransactionsResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, rpc.get_scheduled_transactions()];
                case 1:
                    result = _a.sent();
                    getScheduledTransactionsResult = {
                        transactions: {
                            trx_id: 'string',
                            sender: 'string',
                            sender_id: 'string',
                            payer: 'string',
                            delay_until: 'string',
                            expiration: 'string',
                            published: 'string',
                            'packed_trx?': 'string',
                            'transaction?': {
                                'expiration?': 'string',
                                'ref_block_num?': 'number',
                                'ref_block_prefix?': 'number',
                                'max_net_usage_words?': 'number',
                                'max_cpu_usage_ms?': 'number',
                                'delay_sec?': 'number',
                                'context_free_actions?': {
                                    account: 'string',
                                    name: 'string',
                                    authorization: {
                                        actor: 'string',
                                        permission: 'string',
                                    },
                                    'data?': 'any',
                                    'hex_data?': 'string',
                                },
                                'context_free_data?': 'number',
                                'actions': {
                                    account: 'string',
                                    name: 'string',
                                    authorization: {
                                        actor: 'string',
                                        permission: 'string',
                                    },
                                    'data?': 'any',
                                    'hex_data?': 'string',
                                },
                                'transaction_extensions?': '[number, string]',
                                'deferred_transaction_generation?': {
                                    sender_trx_id: 'string',
                                    sender_id: 'string',
                                    sender: 'string',
                                },
                            },
                        },
                        more: 'string',
                    };
                    verifyType(result, getScheduledTransactionsResult);
                    return [2 /*return*/];
            }
        });
    }); });
    it('validates return type of get_table_rows', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result, getTableRowsResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, rpc.get_table_rows({
                        code: 'eosio.token',
                        scope: 'eosio.token',
                        table: 'accounts',
                    })];
                case 1:
                    result = _a.sent();
                    getTableRowsResult = {
                        rows: 'any',
                        more: 'boolean',
                        next_key: 'string',
                        next_key_bytes: 'string',
                    };
                    verifyType(result, getTableRowsResult);
                    return [2 /*return*/];
            }
        });
    }); });
    it('validates return type of get_kv_table_rows', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result, getTableRowsResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, rpc.get_kv_table_rows({
                        code: 'todo',
                        table: 'todo',
                        index_name: 'map.index',
                        encode_type: 'string',
                    })];
                case 1:
                    result = _a.sent();
                    getTableRowsResult = {
                        rows: 'any',
                        more: 'boolean',
                        next_key: 'string',
                        next_key_bytes: 'string',
                    };
                    verifyType(result, getTableRowsResult);
                    return [2 /*return*/];
            }
        });
    }); });
    it('validates return type of get_table_by_scope', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result, getTableByScopeResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, rpc.get_table_by_scope({
                        code: 'eosio.token',
                        table: 'accounts',
                    })];
                case 1:
                    result = _a.sent();
                    getTableByScopeResult = {
                        rows: 'any',
                        more: 'string',
                    };
                    verifyType(result, getTableByScopeResult);
                    return [2 /*return*/];
            }
        });
    }); });
    it('validates return type of get_required_keys', function () { return __awaiter(void 0, void 0, void 0, function () {
        var info, transaction, _a, availableKeys, result;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, rpc.get_info()];
                case 1:
                    info = _c.sent();
                    transaction = {
                        actions: [{
                                account: 'eosio.token',
                                name: 'transfer',
                                authorization: [{
                                        actor: 'bob',
                                        permission: 'active',
                                    }],
                                data: {
                                    from: 'bob',
                                    to: 'alice',
                                    quantity: '0.0001 SYS',
                                    memo: '',
                                },
                            }],
                        context_free_actions: []
                    };
                    _a = [__assign({}, ser.transactionHeader({
                            block_num: info.last_irreversible_block_num,
                            id: info.last_irreversible_block_id,
                            timestamp: info.last_irreversible_block_time,
                        }, 30))];
                    _b = {};
                    return [4 /*yield*/, api.serializeActions(transaction.context_free_actions || [])];
                case 2:
                    _b.context_free_actions = _c.sent();
                    return [4 /*yield*/, api.serializeActions(transaction.actions)];
                case 3:
                    transaction = __assign.apply(void 0, [__assign.apply(void 0, _a.concat([(_b.actions = _c.sent(), _b)])), transaction]);
                    return [4 /*yield*/, signatureProvider.getAvailableKeys()];
                case 4:
                    availableKeys = _c.sent();
                    return [4 /*yield*/, rpc.getRequiredKeys({ transaction: transaction, availableKeys: availableKeys })];
                case 5:
                    result = _c.sent();
                    result.forEach(function (element) {
                        expect(typeof element).toEqual('string');
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it('validates return type of push_transaction', function () { return __awaiter(void 0, void 0, void 0, function () {
        var transaction, result, transactResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, api.transact({
                        actions: [{
                                account: 'eosio.token',
                                name: 'transfer',
                                authorization: [{
                                        actor: 'bob',
                                        permission: 'active',
                                    }],
                                data: {
                                    from: 'bob',
                                    to: 'alice',
                                    quantity: '0.0001 SYS',
                                    memo: '',
                                },
                            }],
                    }, {
                        sign: true,
                        broadcast: false,
                        useLastIrreversible: true,
                        expireSeconds: 30,
                    })];
                case 1:
                    transaction = _a.sent();
                    return [4 /*yield*/, rpc.push_transaction(transaction)];
                case 2:
                    result = _a.sent();
                    transactResult = {
                        transaction_id: 'string',
                        processed: {
                            id: 'string',
                            block_num: 'number',
                            block_time: 'string',
                            'producer_block_id&': 'string',
                            'receipt&': {
                                status: 'string',
                                cpu_usage_us: 'number',
                                net_usage_words: 'number',
                            },
                            elapsed: 'number',
                            net_usage: 'number',
                            scheduled: 'boolean',
                            action_traces: {
                                action_ordinal: 'number',
                                creator_action_ordinal: 'number',
                                closest_unnotified_ancestor_action_ordinal: 'number',
                                receipt: {
                                    receiver: 'string',
                                    act_digest: 'string',
                                    global_sequence: 'number',
                                    recv_sequence: 'number',
                                    auth_sequence: ['string', 'number'],
                                    code_sequence: 'number',
                                    abi_sequence: 'number',
                                },
                                receiver: 'string',
                                act: {
                                    account: 'string',
                                    name: 'string',
                                    authorization: {
                                        actor: 'string',
                                        permission: 'string',
                                    },
                                    'data?': 'any',
                                    'hex_data?': 'string',
                                },
                                context_free: 'boolean',
                                elapsed: 'number',
                                console: 'string',
                                trx_id: 'string',
                                block_num: 'number',
                                block_time: 'string',
                                'producer_block_id&': 'string',
                                account_ram_deltas: {
                                    account: 'string',
                                    delta: 'number',
                                },
                                account_disk_deltas: {
                                    account: 'string',
                                    delta: 'number',
                                },
                                except: 'any',
                                'error_code&': 'number',
                                'return_value?': 'any',
                                'return_value_hex_data?': 'string',
                                'return_value_data?': 'any',
                                'inline_traces?': 'any', // ActionTrace, recursive?
                            },
                            'account_ram_delta&': {
                                account: 'string',
                                delta: 'number',
                            },
                            'except&': 'string',
                            'error_code&': 'number',
                            bill_to_accounts: 'string',
                        },
                    };
                    verifyType(result, transactResult);
                    return [2 /*return*/];
            }
        });
    }); });
    it('validates return type of push_ro_transaction', function () { return __awaiter(void 0, void 0, void 0, function () {
        var transaction, result, readOnlyTransactResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, api.transact({
                        actions: [{
                                account: 'readonly',
                                name: 'get',
                                authorization: [{
                                        actor: 'readonly',
                                        permission: 'active',
                                    }],
                                data: {},
                            }],
                    }, {
                        sign: true,
                        broadcast: false,
                        useLastIrreversible: true,
                        expireSeconds: 30,
                    })];
                case 1:
                    transaction = _a.sent();
                    return [4 /*yield*/, rpc.push_ro_transaction(transaction)];
                case 2:
                    result = _a.sent();
                    readOnlyTransactResult = {
                        head_block_num: 'number',
                        head_block_id: 'string',
                        last_irreversible_block_num: 'number',
                        last_irreversible_block_id: 'string',
                        code_hash: 'string',
                        pending_transactions: 'string',
                        result: {
                            id: 'string',
                            block_num: 'number',
                            block_time: 'string',
                            'producer_block_id&': 'string',
                            'receipt&': {
                                status: 'string',
                                cpu_usage_us: 'number',
                                net_usage_words: 'number',
                            },
                            elapsed: 'number',
                            net_usage: 'number',
                            scheduled: 'boolean',
                            action_traces: {
                                action_ordinal: 'number',
                                creator_action_ordinal: 'number',
                                closest_unnotified_ancestor_action_ordinal: 'number',
                                receipt: {
                                    receiver: 'string',
                                    act_digest: 'string',
                                    global_sequence: 'number',
                                    recv_sequence: 'number',
                                    auth_sequence: ['string', 'number'],
                                    code_sequence: 'number',
                                    abi_sequence: 'number',
                                },
                                receiver: 'string',
                                act: {
                                    account: 'string',
                                    name: 'string',
                                    authorization: {
                                        actor: 'string',
                                        permission: 'string',
                                    },
                                    'data?': 'any',
                                    'hex_data?': 'string',
                                },
                                context_free: 'boolean',
                                elapsed: 'number',
                                console: 'string',
                                trx_id: 'string',
                                block_num: 'number',
                                block_time: 'string',
                                'producer_block_id&': 'string',
                                account_ram_deltas: {
                                    account: 'string',
                                    delta: 'number',
                                },
                                account_disk_deltas: {
                                    account: 'string',
                                    delta: 'number',
                                },
                                except: 'any',
                                'error_code&': 'number',
                                'return_value?': 'any',
                                'return_value_hex_data?': 'string',
                                'return_value_data?': 'any',
                                'inline_traces?': 'any', // ActionTrace, recursive?
                            },
                            'account_ram_delta&': {
                                account: 'string',
                                delta: 'number',
                            },
                            'except&': 'string',
                            'error_code&': 'number',
                            bill_to_accounts: 'string',
                        }
                    };
                    verifyType(result, readOnlyTransactResult);
                    return [2 /*return*/];
            }
        });
    }); });
    it('validates return type of push_transactions', function () { return __awaiter(void 0, void 0, void 0, function () {
        var transactionA, transactionB, result, transactResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, api.transact({
                        actions: [{
                                account: 'eosio.token',
                                name: 'transfer',
                                authorization: [{
                                        actor: 'bob',
                                        permission: 'active',
                                    }],
                                data: {
                                    from: 'bob',
                                    to: 'alice',
                                    quantity: '0.0001 SYS',
                                    memo: 'A',
                                },
                            }],
                    }, {
                        sign: true,
                        broadcast: false,
                        useLastIrreversible: true,
                        expireSeconds: 30,
                    })];
                case 1:
                    transactionA = _a.sent();
                    return [4 /*yield*/, api.transact({
                            actions: [{
                                    account: 'eosio.token',
                                    name: 'transfer',
                                    authorization: [{
                                            actor: 'bob',
                                            permission: 'active',
                                        }],
                                    data: {
                                        from: 'bob',
                                        to: 'alice',
                                        quantity: '0.0001 SYS',
                                        memo: 'B',
                                    },
                                }],
                        }, {
                            sign: true,
                            broadcast: false,
                            useLastIrreversible: true,
                            expireSeconds: 30,
                        })];
                case 2:
                    transactionB = _a.sent();
                    return [4 /*yield*/, rpc.push_transactions([transactionA, transactionB])];
                case 3:
                    result = _a.sent();
                    transactResult = {
                        transaction_id: 'string',
                        processed: {
                            id: 'string',
                            block_num: 'number',
                            block_time: 'string',
                            'producer_block_id&': 'string',
                            'receipt&': {
                                status: 'string',
                                cpu_usage_us: 'number',
                                net_usage_words: 'number',
                            },
                            elapsed: 'number',
                            net_usage: 'number',
                            scheduled: 'boolean',
                            action_traces: {
                                action_ordinal: 'number',
                                creator_action_ordinal: 'number',
                                closest_unnotified_ancestor_action_ordinal: 'number',
                                receipt: {
                                    receiver: 'string',
                                    act_digest: 'string',
                                    global_sequence: 'number',
                                    recv_sequence: 'number',
                                    auth_sequence: ['string', 'number'],
                                    code_sequence: 'number',
                                    abi_sequence: 'number',
                                },
                                receiver: 'string',
                                act: {
                                    account: 'string',
                                    name: 'string',
                                    authorization: {
                                        actor: 'string',
                                        permission: 'string',
                                    },
                                    'data?': 'any',
                                    'hex_data?': 'string',
                                },
                                context_free: 'boolean',
                                elapsed: 'number',
                                console: 'string',
                                trx_id: 'string',
                                block_num: 'number',
                                block_time: 'string',
                                'producer_block_id&': 'string',
                                account_ram_deltas: {
                                    account: 'string',
                                    delta: 'number',
                                },
                                account_disk_deltas: {
                                    account: 'string',
                                    delta: 'number',
                                },
                                except: 'any',
                                'error_code&': 'number',
                                'return_value?': 'any',
                                'return_value_hex_data?': 'string',
                                'return_value_data?': 'any',
                                'inline_traces?': 'any', // ActionTrace, recursive?
                            },
                            'account_ram_delta&': {
                                account: 'string',
                                delta: 'number',
                            },
                            'except&': 'string',
                            'error_code&': 'number',
                            bill_to_accounts: 'string',
                        },
                    };
                    result.forEach(function (transaction) {
                        verifyType(transaction, transactResult);
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it('validates return type of send_transaction', function () { return __awaiter(void 0, void 0, void 0, function () {
        var transaction, result, transactResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, api.transact({
                        actions: [{
                                account: 'eosio.token',
                                name: 'transfer',
                                authorization: [{
                                        actor: 'alice',
                                        permission: 'active',
                                    }],
                                data: {
                                    from: 'alice',
                                    to: 'bob',
                                    quantity: '0.0001 SYS',
                                    memo: '',
                                },
                            }],
                    }, {
                        sign: true,
                        broadcast: false,
                        useLastIrreversible: true,
                        expireSeconds: 30,
                    })];
                case 1:
                    transaction = _a.sent();
                    return [4 /*yield*/, rpc.send_transaction(transaction)];
                case 2:
                    result = _a.sent();
                    transactResult = {
                        transaction_id: 'string',
                        processed: {
                            id: 'string',
                            block_num: 'number',
                            block_time: 'string',
                            'producer_block_id&': 'string',
                            'receipt&': {
                                status: 'string',
                                cpu_usage_us: 'number',
                                net_usage_words: 'number',
                            },
                            elapsed: 'number',
                            net_usage: 'number',
                            scheduled: 'boolean',
                            action_traces: {
                                action_ordinal: 'number',
                                creator_action_ordinal: 'number',
                                closest_unnotified_ancestor_action_ordinal: 'number',
                                receipt: {
                                    receiver: 'string',
                                    act_digest: 'string',
                                    global_sequence: 'number',
                                    recv_sequence: 'number',
                                    auth_sequence: ['string', 'number'],
                                    code_sequence: 'number',
                                    abi_sequence: 'number',
                                },
                                receiver: 'string',
                                act: {
                                    account: 'string',
                                    name: 'string',
                                    authorization: {
                                        actor: 'string',
                                        permission: 'string',
                                    },
                                    'data?': 'any',
                                    'hex_data?': 'string',
                                },
                                context_free: 'boolean',
                                elapsed: 'number',
                                console: 'string',
                                trx_id: 'string',
                                block_num: 'number',
                                block_time: 'string',
                                'producer_block_id&': 'string',
                                account_ram_deltas: {
                                    account: 'string',
                                    delta: 'number',
                                },
                                account_disk_deltas: {
                                    account: 'string',
                                    delta: 'number',
                                },
                                except: 'any',
                                'error_code&': 'number',
                                'return_value?': 'any',
                                'return_value_hex_data?': 'string',
                                'return_value_data?': 'any',
                                'inline_traces?': 'any', // ActionTrace, recursive?
                            },
                            'account_ram_delta&': {
                                account: 'string',
                                delta: 'number',
                            },
                            'except&': 'string',
                            'error_code&': 'number',
                            bill_to_accounts: 'string',
                        },
                    };
                    verifyType(result, transactResult);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('DB Size API Plugin Endpoints', function () {
    it('validates return type of get', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result, dbSizeGetResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, rpc.db_size_get()];
                case 1:
                    result = _a.sent();
                    dbSizeGetResult = {
                        free_bytes: 'number',
                        used_bytes: 'number',
                        size: 'number',
                        indices: {
                            index: 'string',
                            row_count: 'number',
                        },
                    };
                    verifyType(result, dbSizeGetResult);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('Trace API Plugin Endpoints', function () {
    it('validates return type of get_block', function () { return __awaiter(void 0, void 0, void 0, function () {
        var info, result, traceApiGetBlockResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, rpc.get_info()];
                case 1:
                    info = _a.sent();
                    return [4 /*yield*/, rpc.trace_get_block(info.last_irreversible_block_num)];
                case 2:
                    result = _a.sent();
                    traceApiGetBlockResult = {
                        id: 'string',
                        number: 'number',
                        previous_id: 'string',
                        status: 'string',
                        timestamp: 'string',
                        producer: 'string',
                        transaction_mroot: 'string',
                        action_mroot: 'string',
                        schedule_version: 'number',
                        transactions: {
                            id: 'string',
                            actions: {
                                global_sequence: 'number',
                                receiver: 'string',
                                account: 'string',
                                action: 'string',
                                authorization: {
                                    account: 'string',
                                    permission: 'string'
                                },
                                data: 'string',
                                return_value: 'string',
                            },
                            status: 'string',
                            cpu_usage_us: 'number',
                            net_usage_words: 'number',
                            signatures: 'string',
                            transaction_header: 'any',
                            bill_to_accounts: 'string',
                        },
                    };
                    verifyType(result, traceApiGetBlockResult);
                    return [2 /*return*/];
            }
        });
    }); });
});
var verifyType = function (data, type) {
    var verifiedKeys = Object.keys(type).filter(function (key) {
        var formattedKey = key.replace('?', '').replace('&', '');
        if (key.includes('?')) {
            if (!data.hasOwnProperty(formattedKey))
                return false;
        }
        return true;
    }).map(function (key) {
        var formattedKey = key.replace('?', '').replace('&', '');
        if (Array.isArray(data[formattedKey])) {
            if (Array.isArray(type[key])) {
                data[formattedKey].forEach(function (element, index) {
                    if (Array.isArray(element)) {
                        element.forEach(function (secondElement, secondIndex) {
                            complexOrPrimitive(secondElement, type[key][secondIndex], formattedKey);
                        });
                    }
                    else {
                        complexOrPrimitive(element, type[key][index], formattedKey);
                    }
                });
            }
            else {
                data[formattedKey].forEach(function (element) {
                    complexOrPrimitive(element, type[key], formattedKey);
                });
            }
        }
        else if (key.includes('&')) {
            if (data[formattedKey] !== null) {
                complexOrPrimitive(data[formattedKey], type[key], formattedKey);
            }
        }
        else {
            complexOrPrimitive(data[formattedKey], type[key], formattedKey);
        }
        return formattedKey;
    });
    expect(data).toContainAllKeys(verifiedKeys);
};
var complexOrPrimitive = function (data, type, formattedKey) {
    if (typeof type === 'object') {
        verifyType(data, type);
    }
    else if (type.includes('Map')) {
        var types_1 = type.replace('Map<', '').replace('>', '').split(', ');
        data.forEach(function (value, index) {
            complexOrPrimitive(value, types_1[index], formattedKey);
        });
    }
    else if (type.includes('|')) {
        var types = type.split('|');
        expect(typeof data).toBeOneOf(types);
    }
    else if (type !== 'any') {
        expect(typeof data).toEqual(type);
    }
};
//# sourceMappingURL=type-checks.test.js.map