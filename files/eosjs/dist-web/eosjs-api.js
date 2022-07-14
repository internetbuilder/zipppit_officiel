var eosjs_api;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/eosjs-api.ts":
/*!**************************!*\
  !*** ./src/eosjs-api.ts ***!
  \**************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


/**
 * @module API
 */
// copyright defined in eosjs/LICENSE.txt
/* eslint-disable max-classes-per-file */
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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ActionBuilder = exports.TransactionBuilder = exports.Api = void 0;
var pako_1 = __webpack_require__(/*! pako */ "./node_modules/pako/index.js");
var ser = __webpack_require__(/*! ./eosjs-serialize */ "./src/eosjs-serialize.ts");
var Api = /** @class */ (function () {
    /**
     * @param args
     * * `rpc`: Issues RPC calls
     * * `authorityProvider`: Get public keys needed to meet authorities in a transaction
     * * `abiProvider`: Supplies ABIs in raw form (binary)
     * * `signatureProvider`: Signs transactions
     * * `chainId`: Identifies chain
     * * `textEncoder`: `TextEncoder` instance to use. Pass in `null` if running in a browser
     * * `textDecoder`: `TextDecoder` instance to use. Pass in `null` if running in a browser
     */
    function Api(args) {
        /** Holds information needed to serialize contract actions */
        this.contracts = new Map();
        /** Fetched abis */
        this.cachedAbis = new Map();
        this.transactionExtensions = [
            { id: 1, type: 'resource_payer', keys: ['payer', 'max_net_bytes', 'max_cpu_us', 'max_memory_bytes'] },
        ];
        this.rpc = args.rpc;
        this.authorityProvider = args.authorityProvider || args.rpc;
        this.abiProvider = args.abiProvider || args.rpc;
        this.signatureProvider = args.signatureProvider;
        this.chainId = args.chainId;
        this.textEncoder = args.textEncoder;
        this.textDecoder = args.textDecoder;
        this.abiTypes = ser.getTypesFromAbi(ser.createAbiTypes());
        this.transactionTypes = ser.getTypesFromAbi(ser.createTransactionTypes());
    }
    /** Decodes an abi as Uint8Array into json. */
    Api.prototype.rawAbiToJson = function (rawAbi) {
        var buffer = new ser.SerialBuffer({
            textEncoder: this.textEncoder,
            textDecoder: this.textDecoder,
            array: rawAbi,
        });
        if (!ser.supportedAbiVersion(buffer.getString())) {
            throw new Error('Unsupported abi version');
        }
        buffer.restartRead();
        return this.abiTypes.get('abi_def').deserialize(buffer);
    };
    /** Encodes a json abi as Uint8Array. */
    Api.prototype.jsonToRawAbi = function (jsonAbi) {
        var buffer = new ser.SerialBuffer({
            textEncoder: this.textEncoder,
            textDecoder: this.textDecoder,
        });
        this.abiTypes.get('abi_def').serialize(buffer, jsonAbi);
        if (!ser.supportedAbiVersion(buffer.getString())) {
            throw new Error('Unsupported abi version');
        }
        return buffer.asUint8Array();
    };
    /** Get abi in both binary and structured forms. Fetch when needed. */
    Api.prototype.getCachedAbi = function (accountName, reload) {
        if (reload === void 0) { reload = false; }
        return __awaiter(this, void 0, void 0, function () {
            var cachedAbi, rawAbi, abi, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!reload && this.cachedAbis.get(accountName)) {
                            return [2 /*return*/, this.cachedAbis.get(accountName)];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.abiProvider.getRawAbi(accountName)];
                    case 2:
                        rawAbi = (_a.sent()).abi;
                        abi = this.rawAbiToJson(rawAbi);
                        cachedAbi = { rawAbi: rawAbi, abi: abi };
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        e_1.message = "fetching abi for " + accountName + ": " + e_1.message;
                        throw e_1;
                    case 4:
                        if (!cachedAbi) {
                            throw new Error("Missing abi for " + accountName);
                        }
                        this.cachedAbis.set(accountName, cachedAbi);
                        return [2 /*return*/, cachedAbi];
                }
            });
        });
    };
    /** Get abi in structured form. Fetch when needed. */
    Api.prototype.getAbi = function (accountName, reload) {
        if (reload === void 0) { reload = false; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getCachedAbi(accountName, reload)];
                    case 1: return [2 /*return*/, (_a.sent()).abi];
                }
            });
        });
    };
    /** Get abis needed by a transaction */
    Api.prototype.getTransactionAbis = function (transaction, reload) {
        if (reload === void 0) { reload = false; }
        return __awaiter(this, void 0, void 0, function () {
            var actions, accounts, uniqueAccounts, actionPromises;
            var _this = this;
            return __generator(this, function (_a) {
                actions = (transaction.context_free_actions || []).concat(transaction.actions);
                accounts = actions.map(function (action) { return action.account; });
                uniqueAccounts = new Set(accounts);
                actionPromises = __spreadArray([], __read(uniqueAccounts)).map(function (account) { return __awaiter(_this, void 0, void 0, function () {
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _a = {
                                    accountName: account
                                };
                                return [4 /*yield*/, this.getCachedAbi(account, reload)];
                            case 1: return [2 /*return*/, (_a.abi = (_b.sent()).rawAbi,
                                    _a)];
                        }
                    });
                }); });
                return [2 /*return*/, Promise.all(actionPromises)];
            });
        });
    };
    /** Get data needed to serialize actions in a contract */
    Api.prototype.getContract = function (accountName, reload) {
        if (reload === void 0) { reload = false; }
        return __awaiter(this, void 0, void 0, function () {
            var abi, types, actions, _a, _b, _c, name_1, type, result;
            var e_2, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (!reload && this.contracts.get(accountName)) {
                            return [2 /*return*/, this.contracts.get(accountName)];
                        }
                        return [4 /*yield*/, this.getAbi(accountName, reload)];
                    case 1:
                        abi = _e.sent();
                        types = ser.getTypesFromAbi(ser.createInitialTypes(), abi);
                        actions = new Map();
                        try {
                            for (_a = __values(abi.actions), _b = _a.next(); !_b.done; _b = _a.next()) {
                                _c = _b.value, name_1 = _c.name, type = _c.type;
                                actions.set(name_1, ser.getType(types, type));
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                        result = { types: types, actions: actions };
                        this.contracts.set(accountName, result);
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /** Convert `value` to binary form. `type` must be a built-in abi type or in `transaction.abi.json`. */
    Api.prototype.serialize = function (buffer, type, value) {
        this.transactionTypes.get(type).serialize(buffer, value);
    };
    /** Convert data in `buffer` to structured form. `type` must be a built-in abi type or in `transaction.abi.json`. */
    Api.prototype.deserialize = function (buffer, type) {
        return this.transactionTypes.get(type).deserialize(buffer);
    };
    /** Convert a transaction to binary */
    Api.prototype.serializeTransaction = function (transaction) {
        var buffer = new ser.SerialBuffer({ textEncoder: this.textEncoder, textDecoder: this.textDecoder });
        this.serialize(buffer, 'transaction', __assign({ max_net_usage_words: 0, max_cpu_usage_ms: 0, delay_sec: 0, context_free_actions: [], actions: [], transaction_extensions: [] }, transaction));
        return buffer.asUint8Array();
    };
    /** Serialize context-free data */
    Api.prototype.serializeContextFreeData = function (contextFreeData) {
        var e_3, _a;
        if (!contextFreeData || !contextFreeData.length) {
            return null;
        }
        var buffer = new ser.SerialBuffer({ textEncoder: this.textEncoder, textDecoder: this.textDecoder });
        buffer.pushVaruint32(contextFreeData.length);
        try {
            for (var contextFreeData_1 = __values(contextFreeData), contextFreeData_1_1 = contextFreeData_1.next(); !contextFreeData_1_1.done; contextFreeData_1_1 = contextFreeData_1.next()) {
                var data = contextFreeData_1_1.value;
                buffer.pushBytes(data);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (contextFreeData_1_1 && !contextFreeData_1_1.done && (_a = contextFreeData_1.return)) _a.call(contextFreeData_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return buffer.asUint8Array();
    };
    /** Convert a transaction from binary. Leaves actions in hex. */
    Api.prototype.deserializeTransaction = function (transaction) {
        var buffer = new ser.SerialBuffer({ textEncoder: this.textEncoder, textDecoder: this.textDecoder });
        buffer.pushArray(transaction);
        return this.deserialize(buffer, 'transaction');
    };
    // Order of adding to transaction_extension is transaction_extension id ascending
    Api.prototype.serializeTransactionExtensions = function (transaction) {
        var transaction_extensions = [];
        if (transaction.resource_payer) {
            var extensionBuffer = new ser.SerialBuffer({ textEncoder: this.textEncoder, textDecoder: this.textDecoder });
            var types = ser.getTypesFromAbi(ser.createTransactionExtensionTypes());
            types.get('resource_payer').serialize(extensionBuffer, transaction.resource_payer);
            transaction_extensions = __spreadArray(__spreadArray([], __read(transaction_extensions)), [[1, ser.arrayToHex(extensionBuffer.asUint8Array())]]);
        }
        return transaction_extensions;
    };
    ;
    // Usage: transaction = {...transaction, ...this.deserializeTransactionExtensions(transaction.transaction_extensions)}
    Api.prototype.deserializeTransactionExtensions = function (data) {
        var _this = this;
        var transaction = {};
        data.forEach(function (extensionData) {
            var transactionExtension = _this.transactionExtensions.find(function (extension) { return extension.id === extensionData[0]; });
            if (transactionExtension === undefined) {
                throw new Error("Transaction Extension could not be determined: " + extensionData);
            }
            var types = ser.getTypesFromAbi(ser.createTransactionExtensionTypes());
            var extensionBuffer = new ser.SerialBuffer({ textEncoder: _this.textEncoder, textDecoder: _this.textDecoder });
            extensionBuffer.pushArray(ser.hexToUint8Array(extensionData[1]));
            var deserializedObj = types.get(transactionExtension.type).deserialize(extensionBuffer);
            if (extensionData[0] === 1) {
                deserializedObj.max_net_bytes = Number(deserializedObj.max_net_bytes);
                deserializedObj.max_cpu_us = Number(deserializedObj.max_cpu_us);
                deserializedObj.max_memory_bytes = Number(deserializedObj.max_memory_bytes);
                transaction.resource_payer = deserializedObj;
            }
        });
        return transaction;
    };
    ;
    // Transaction extensions are serialized and moved to `transaction_extensions`, deserialized objects are not needed on the transaction
    Api.prototype.deleteTransactionExtensionObjects = function (transaction) {
        delete transaction.resource_payer;
        return transaction;
    };
    /** Convert actions to hex */
    Api.prototype.serializeActions = function (actions) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all(actions.map(function (action) { return __awaiter(_this, void 0, void 0, function () {
                            var account, name, authorization, data, contract;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        account = action.account, name = action.name, authorization = action.authorization, data = action.data;
                                        return [4 /*yield*/, this.getContract(account)];
                                    case 1:
                                        contract = _a.sent();
                                        if (typeof data !== 'object') {
                                            return [2 /*return*/, action];
                                        }
                                        return [2 /*return*/, ser.serializeAction(contract, account, name, authorization, data, this.textEncoder, this.textDecoder)];
                                }
                            });
                        }); }))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /** Convert actions from hex */
    Api.prototype.deserializeActions = function (actions) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all(actions.map(function (_a) {
                            var account = _a.account, name = _a.name, authorization = _a.authorization, data = _a.data;
                            return __awaiter(_this, void 0, void 0, function () {
                                var contract;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0: return [4 /*yield*/, this.getContract(account)];
                                        case 1:
                                            contract = _b.sent();
                                            return [2 /*return*/, ser.deserializeAction(contract, account, name, authorization, data, this.textEncoder, this.textDecoder)];
                                    }
                                });
                            });
                        }))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /** Convert a transaction from binary. Also deserializes actions. */
    Api.prototype.deserializeTransactionWithActions = function (transaction) {
        return __awaiter(this, void 0, void 0, function () {
            var deserializedTransaction, deserializedCFActions, deserializedActions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (typeof transaction === 'string') {
                            transaction = ser.hexToUint8Array(transaction);
                        }
                        deserializedTransaction = this.deserializeTransaction(transaction);
                        return [4 /*yield*/, this.deserializeActions(deserializedTransaction.context_free_actions)];
                    case 1:
                        deserializedCFActions = _a.sent();
                        return [4 /*yield*/, this.deserializeActions(deserializedTransaction.actions)];
                    case 2:
                        deserializedActions = _a.sent();
                        return [2 /*return*/, __assign(__assign({}, deserializedTransaction), { context_free_actions: deserializedCFActions, actions: deserializedActions })];
                }
            });
        });
    };
    /** Deflate a serialized object */
    Api.prototype.deflateSerializedArray = function (serializedArray) {
        return pako_1.deflate(serializedArray, { level: 9 });
    };
    /** Inflate a compressed serialized object */
    Api.prototype.inflateSerializedArray = function (compressedSerializedArray) {
        return pako_1.inflate(compressedSerializedArray);
    };
    /**
     * Create and optionally broadcast a transaction.
     *
     * Named Parameters:
     * `broadcast`: broadcast this transaction?
     * `sign`: sign this transaction?
     * `compression`: compress this transaction?
     * `readOnlyTrx`: read only transaction?
     * `returnFailureTraces`: return failure traces? (only available for read only transactions currently)
     *
     * If both `blocksBehind` and `expireSeconds` are present,
     * then fetch the block which is `blocksBehind` behind head block,
     * use it as a reference for TAPoS, and expire the transaction `expireSeconds` after that block's time.
     *
     * If both `useLastIrreversible` and `expireSeconds` are present,
     * then fetch the last irreversible block, use it as a reference for TAPoS,
     * and expire the transaction `expireSeconds` after that block's time.
     *
     * @returns node response if `broadcast`, `{signatures, serializedTransaction}` if `!broadcast`
     */
    Api.prototype.transact = function (transaction, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.broadcast, broadcast = _c === void 0 ? true : _c, _d = _b.sign, sign = _d === void 0 ? true : _d, readOnlyTrx = _b.readOnlyTrx, returnFailureTraces = _b.returnFailureTraces, requiredKeys = _b.requiredKeys, compression = _b.compression, blocksBehind = _b.blocksBehind, useLastIrreversible = _b.useLastIrreversible, expireSeconds = _b.expireSeconds;
        return __awaiter(this, void 0, void 0, function () {
            var info, abis, _e, serializedTransaction, serializedContextFreeData, pushTransactionArgs, availableKeys;
            var _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        if (typeof blocksBehind === 'number' && useLastIrreversible) {
                            throw new Error('Use either blocksBehind or useLastIrreversible');
                        }
                        if (!!this.chainId) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.rpc.get_info()];
                    case 1:
                        info = _g.sent();
                        this.chainId = info.chain_id;
                        _g.label = 2;
                    case 2:
                        if (!((typeof blocksBehind === 'number' || useLastIrreversible) && expireSeconds)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.generateTapos(info, transaction, blocksBehind, useLastIrreversible, expireSeconds)];
                    case 3:
                        transaction = _g.sent();
                        _g.label = 4;
                    case 4:
                        if (!this.hasRequiredTaposFields(transaction)) {
                            throw new Error('Required configuration or TAPOS fields are not present');
                        }
                        return [4 /*yield*/, this.getTransactionAbis(transaction)];
                    case 5:
                        abis = _g.sent();
                        _e = [__assign({}, transaction)];
                        _f = {};
                        return [4 /*yield*/, this.serializeTransactionExtensions(transaction)];
                    case 6:
                        _f.transaction_extensions = _g.sent();
                        return [4 /*yield*/, this.serializeActions(transaction.context_free_actions || [])];
                    case 7:
                        _f.context_free_actions = _g.sent();
                        return [4 /*yield*/, this.serializeActions(transaction.actions)];
                    case 8:
                        transaction = __assign.apply(void 0, _e.concat([(_f.actions = _g.sent(), _f)]));
                        transaction = this.deleteTransactionExtensionObjects(transaction);
                        serializedTransaction = this.serializeTransaction(transaction);
                        serializedContextFreeData = this.serializeContextFreeData(transaction.context_free_data);
                        pushTransactionArgs = {
                            serializedTransaction: serializedTransaction,
                            serializedContextFreeData: serializedContextFreeData,
                            signatures: []
                        };
                        if (!sign) return [3 /*break*/, 13];
                        if (!!requiredKeys) return [3 /*break*/, 11];
                        return [4 /*yield*/, this.signatureProvider.getAvailableKeys()];
                    case 9:
                        availableKeys = _g.sent();
                        return [4 /*yield*/, this.authorityProvider.getRequiredKeys({ transaction: transaction, availableKeys: availableKeys })];
                    case 10:
                        requiredKeys = _g.sent();
                        _g.label = 11;
                    case 11: return [4 /*yield*/, this.signatureProvider.sign({
                            chainId: this.chainId,
                            requiredKeys: requiredKeys,
                            serializedTransaction: serializedTransaction,
                            serializedContextFreeData: serializedContextFreeData,
                            abis: abis,
                        })];
                    case 12:
                        pushTransactionArgs = _g.sent();
                        _g.label = 13;
                    case 13:
                        if (broadcast) {
                            if (compression) {
                                return [2 /*return*/, this.pushCompressedSignedTransaction(pushTransactionArgs, readOnlyTrx, returnFailureTraces)];
                            }
                            return [2 /*return*/, this.pushSignedTransaction(pushTransactionArgs, readOnlyTrx, returnFailureTraces)];
                        }
                        return [2 /*return*/, pushTransactionArgs];
                }
            });
        });
    };
    Api.prototype.query = function (account, short, query, _a) {
        var sign = _a.sign, requiredKeys = _a.requiredKeys, _b = _a.authorization, authorization = _b === void 0 ? [] : _b;
        return __awaiter(this, void 0, void 0, function () {
            var info, refBlock, queryBuffer, transaction, serializedTransaction, signatures, abis, availableKeys, signResponse, response, returnBuffer;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.rpc.get_info()];
                    case 1:
                        info = _c.sent();
                        return [4 /*yield*/, this.tryRefBlockFromGetInfo(info)];
                    case 2:
                        refBlock = _c.sent();
                        queryBuffer = new ser.SerialBuffer({ textEncoder: this.textEncoder, textDecoder: this.textDecoder });
                        ser.serializeQuery(queryBuffer, query);
                        transaction = __assign(__assign({}, ser.transactionHeader(refBlock, 60 * 30)), { context_free_actions: [], actions: [{
                                    account: account,
                                    name: 'queryit',
                                    authorization: authorization,
                                    data: ser.arrayToHex(queryBuffer.asUint8Array()),
                                }] });
                        serializedTransaction = this.serializeTransaction(transaction);
                        signatures = [];
                        if (!sign) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.getTransactionAbis(transaction)];
                    case 3:
                        abis = _c.sent();
                        if (!!requiredKeys) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.signatureProvider.getAvailableKeys()];
                    case 4:
                        availableKeys = _c.sent();
                        return [4 /*yield*/, this.authorityProvider.getRequiredKeys({ transaction: transaction, availableKeys: availableKeys })];
                    case 5:
                        requiredKeys = _c.sent();
                        _c.label = 6;
                    case 6: return [4 /*yield*/, this.signatureProvider.sign({
                            chainId: this.chainId,
                            requiredKeys: requiredKeys,
                            serializedTransaction: serializedTransaction,
                            serializedContextFreeData: null,
                            abis: abis,
                        })];
                    case 7:
                        signResponse = _c.sent();
                        signatures = signResponse.signatures;
                        _c.label = 8;
                    case 8: return [4 /*yield*/, this.rpc.send_transaction({
                            signatures: signatures,
                            compression: 0,
                            serializedTransaction: serializedTransaction
                        })];
                    case 9:
                        response = _c.sent();
                        returnBuffer = new ser.SerialBuffer({
                            textEncoder: this.textEncoder,
                            textDecoder: this.textDecoder,
                            array: ser.hexToUint8Array(response.processed.action_traces[0][1].return_value)
                        });
                        if (short) {
                            return [2 /*return*/, ser.deserializeAnyvarShort(returnBuffer)];
                        }
                        else {
                            return [2 /*return*/, ser.deserializeAnyvar(returnBuffer)];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /** Broadcast a signed transaction */
    Api.prototype.pushSignedTransaction = function (_a, readOnlyTrx, returnFailureTraces) {
        var signatures = _a.signatures, serializedTransaction = _a.serializedTransaction, serializedContextFreeData = _a.serializedContextFreeData;
        if (readOnlyTrx === void 0) { readOnlyTrx = false; }
        if (returnFailureTraces === void 0) { returnFailureTraces = false; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                if (readOnlyTrx) {
                    return [2 /*return*/, this.rpc.push_ro_transaction({
                            signatures: signatures,
                            serializedTransaction: serializedTransaction,
                            serializedContextFreeData: serializedContextFreeData,
                        }, returnFailureTraces)];
                }
                return [2 /*return*/, this.rpc.push_transaction({
                        signatures: signatures,
                        serializedTransaction: serializedTransaction,
                        serializedContextFreeData: serializedContextFreeData
                    })];
            });
        });
    };
    Api.prototype.pushCompressedSignedTransaction = function (_a, readOnlyTrx, returnFailureTraces) {
        var signatures = _a.signatures, serializedTransaction = _a.serializedTransaction, serializedContextFreeData = _a.serializedContextFreeData;
        if (readOnlyTrx === void 0) { readOnlyTrx = false; }
        if (returnFailureTraces === void 0) { returnFailureTraces = false; }
        return __awaiter(this, void 0, void 0, function () {
            var compressedSerializedTransaction, compressedSerializedContextFreeData;
            return __generator(this, function (_b) {
                compressedSerializedTransaction = this.deflateSerializedArray(serializedTransaction);
                compressedSerializedContextFreeData = this.deflateSerializedArray(serializedContextFreeData || new Uint8Array(0));
                if (readOnlyTrx) {
                    return [2 /*return*/, this.rpc.push_ro_transaction({
                            signatures: signatures,
                            compression: 1,
                            serializedTransaction: compressedSerializedTransaction,
                            serializedContextFreeData: compressedSerializedContextFreeData
                        }, returnFailureTraces)];
                }
                return [2 /*return*/, this.rpc.push_transaction({
                        signatures: signatures,
                        compression: 1,
                        serializedTransaction: compressedSerializedTransaction,
                        serializedContextFreeData: compressedSerializedContextFreeData
                    })];
            });
        });
    };
    Api.prototype.generateTapos = function (info, transaction, blocksBehind, useLastIrreversible, expireSeconds) {
        return __awaiter(this, void 0, void 0, function () {
            var block, taposBlockNumber, refBlock, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!!info) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.rpc.get_info()];
                    case 1:
                        info = _b.sent();
                        _b.label = 2;
                    case 2:
                        if (!useLastIrreversible) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.tryRefBlockFromGetInfo(info)];
                    case 3:
                        block = _b.sent();
                        return [2 /*return*/, __assign(__assign({}, ser.transactionHeader(block, expireSeconds)), transaction)];
                    case 4:
                        taposBlockNumber = info.head_block_num - blocksBehind;
                        if (!(taposBlockNumber <= info.last_irreversible_block_num)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.tryGetBlockInfo(taposBlockNumber)];
                    case 5:
                        _a = _b.sent();
                        return [3 /*break*/, 8];
                    case 6: return [4 /*yield*/, this.tryGetBlockHeaderState(taposBlockNumber)];
                    case 7:
                        _a = _b.sent();
                        _b.label = 8;
                    case 8:
                        refBlock = _a;
                        return [2 /*return*/, __assign(__assign({}, ser.transactionHeader(refBlock, expireSeconds)), transaction)];
                }
            });
        });
    };
    // eventually break out into TransactionValidator class
    Api.prototype.hasRequiredTaposFields = function (_a) {
        var expiration = _a.expiration, ref_block_num = _a.ref_block_num, ref_block_prefix = _a.ref_block_prefix;
        return !!(expiration && typeof (ref_block_num) === 'number' && typeof (ref_block_prefix) === 'number');
    };
    Api.prototype.tryGetBlockHeaderState = function (taposBlockNumber) {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 4]);
                        return [4 /*yield*/, this.rpc.get_block_header_state(taposBlockNumber)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        error_1 = _a.sent();
                        return [4 /*yield*/, this.tryGetBlockInfo(taposBlockNumber)];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Api.prototype.tryGetBlockInfo = function (blockNumber) {
        return __awaiter(this, void 0, void 0, function () {
            var error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 4]);
                        return [4 /*yield*/, this.rpc.get_block_info(blockNumber)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        error_2 = _a.sent();
                        return [4 /*yield*/, this.rpc.get_block(blockNumber)];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Api.prototype.tryRefBlockFromGetInfo = function (info) {
        return __awaiter(this, void 0, void 0, function () {
            var block;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(info.hasOwnProperty('last_irreversible_block_id') &&
                            info.hasOwnProperty('last_irreversible_block_num') &&
                            info.hasOwnProperty('last_irreversible_block_time'))) return [3 /*break*/, 1];
                        return [2 /*return*/, {
                                block_num: info.last_irreversible_block_num,
                                id: info.last_irreversible_block_id,
                                timestamp: info.last_irreversible_block_time,
                            }];
                    case 1: return [4 /*yield*/, this.tryGetBlockInfo(info.last_irreversible_block_num)];
                    case 2:
                        block = _a.sent();
                        return [2 /*return*/, {
                                block_num: block.block_num,
                                id: block.id,
                                timestamp: block.timestamp,
                            }];
                }
            });
        });
    };
    Api.prototype.with = function (accountName) {
        return new ActionBuilder(this, accountName);
    };
    Api.prototype.buildTransaction = function (cb) {
        var tx = new TransactionBuilder(this);
        if (cb) {
            return cb(tx);
        }
        return tx;
    };
    return Api;
}()); // Api
exports.Api = Api;
var TransactionBuilder = /** @class */ (function () {
    function TransactionBuilder(api) {
        this.actions = [];
        this.contextFreeGroups = [];
        this.api = api;
    }
    TransactionBuilder.prototype.with = function (accountName) {
        var actionBuilder = new ActionBuilder(this.api, accountName);
        this.actions.push(actionBuilder);
        return actionBuilder;
    };
    TransactionBuilder.prototype.associateContextFree = function (contextFreeGroup) {
        this.contextFreeGroups.push(contextFreeGroup);
        return this;
    };
    TransactionBuilder.prototype.send = function (config) {
        return __awaiter(this, void 0, void 0, function () {
            var contextFreeDataSet, contextFreeActions, actions;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        contextFreeDataSet = [];
                        contextFreeActions = [];
                        actions = this.actions.map(function (actionBuilder) { return actionBuilder.serializedData; });
                        return [4 /*yield*/, Promise.all(this.contextFreeGroups.map(function (contextFreeCallback) { return __awaiter(_this, void 0, void 0, function () {
                                var _a, action, contextFreeAction, contextFreeData;
                                return __generator(this, function (_b) {
                                    _a = contextFreeCallback({
                                        cfd: contextFreeDataSet.length,
                                        cfa: contextFreeActions.length
                                    }), action = _a.action, contextFreeAction = _a.contextFreeAction, contextFreeData = _a.contextFreeData;
                                    if (action) {
                                        actions.push(action);
                                    }
                                    if (contextFreeAction) {
                                        contextFreeActions.push(contextFreeAction);
                                    }
                                    if (contextFreeData) {
                                        contextFreeDataSet.push(contextFreeData);
                                    }
                                    return [2 /*return*/];
                                });
                            }); }))];
                    case 1:
                        _a.sent();
                        this.contextFreeGroups = [];
                        this.actions = [];
                        return [4 /*yield*/, this.api.transact({
                                context_free_data: contextFreeDataSet,
                                context_free_actions: contextFreeActions,
                                actions: actions
                            }, config)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return TransactionBuilder;
}());
exports.TransactionBuilder = TransactionBuilder;
var ActionBuilder = /** @class */ (function () {
    function ActionBuilder(api, accountName) {
        this.api = api;
        this.accountName = accountName;
    }
    ActionBuilder.prototype.as = function (actorName) {
        if (actorName === void 0) { actorName = []; }
        var authorization = [];
        if (actorName && typeof actorName === 'string') {
            authorization = [{ actor: actorName, permission: 'active' }];
        }
        else {
            authorization = actorName;
        }
        return new ActionSerializer(this, this.api, this.accountName, authorization);
    };
    return ActionBuilder;
}());
exports.ActionBuilder = ActionBuilder;
var ActionSerializer = /** @class */ (function () {
    function ActionSerializer(parent, api, accountName, authorization) {
        var e_4, _a;
        var _this = this;
        var jsonAbi = api.cachedAbis.get(accountName);
        if (!jsonAbi) {
            throw new Error('ABI must be cached before using ActionBuilder, run api.getAbi()');
        }
        var types = ser.getTypesFromAbi(ser.createInitialTypes(), jsonAbi.abi);
        var actions = new Map();
        try {
            for (var _b = __values(jsonAbi.abi.actions), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = _c.value, name_2 = _d.name, type = _d.type;
                actions.set(name_2, ser.getType(types, type));
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_4) throw e_4.error; }
        }
        actions.forEach(function (type, name) {
            var _a;
            Object.assign(_this, (_a = {},
                _a[name] = function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    var data = {};
                    args.forEach(function (arg, index) {
                        var field = type.fields[index];
                        data[field.name] = arg;
                    });
                    var serializedData = ser.serializeAction({ types: types, actions: actions }, accountName, name, authorization, data, api.textEncoder, api.textDecoder);
                    parent.serializedData = serializedData;
                    return serializedData;
                },
                _a));
        });
    }
    return ActionSerializer;
}());


/***/ }),

/***/ "./src/eosjs-numeric.ts":
/*!******************************!*\
  !*** ./src/eosjs-numeric.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.signatureToString = exports.stringToSignature = exports.privateKeyToString = exports.privateKeyToLegacyString = exports.stringToPrivateKey = exports.convertLegacyPublicKeys = exports.convertLegacyPublicKey = exports.publicKeyToString = exports.publicKeyToLegacyString = exports.stringToPublicKey = exports.signatureDataSize = exports.privateKeyDataSize = exports.publicKeyDataSize = exports.KeyType = exports.base64ToBinary = exports.binaryToBase58 = exports.base58ToBinary = exports.signedBinaryToDecimal = exports.binaryToDecimal = exports.signedDecimalToBinary = exports.decimalToBinary = exports.negate = exports.isNegative = void 0;
/**
 * @module Numeric
 */
var hash_js_1 = __webpack_require__(/*! hash.js */ "./node_modules/hash.js/lib/hash.js");
// copyright defined in eosjs/LICENSE.txt
var ripemd160 = (__webpack_require__(/*! ./ripemd */ "./src/ripemd.js").RIPEMD160.hash);
var base58Chars = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
var base64Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
var create_base58_map = function () {
    var base58M = Array(256).fill(-1);
    for (var i = 0; i < base58Chars.length; ++i) {
        base58M[base58Chars.charCodeAt(i)] = i;
    }
    return base58M;
};
var base58Map = create_base58_map();
var create_base64_map = function () {
    var base64M = Array(256).fill(-1);
    for (var i = 0; i < base64Chars.length; ++i) {
        base64M[base64Chars.charCodeAt(i)] = i;
    }
    base64M['='.charCodeAt(0)] = 0;
    return base64M;
};
var base64Map = create_base64_map();
/** Is `bignum` a negative number? */
var isNegative = function (bignum) {
    return (bignum[bignum.length - 1] & 0x80) !== 0;
};
exports.isNegative = isNegative;
/** Negate `bignum` */
var negate = function (bignum) {
    var carry = 1;
    for (var i = 0; i < bignum.length; ++i) {
        var x = (~bignum[i] & 0xff) + carry;
        bignum[i] = x;
        carry = x >> 8;
    }
};
exports.negate = negate;
/**
 * Convert an unsigned decimal number in `s` to a bignum
 *
 * @param size bignum size (bytes)
 */
var decimalToBinary = function (size, s) {
    var result = new Uint8Array(size);
    for (var i = 0; i < s.length; ++i) {
        var srcDigit = s.charCodeAt(i);
        if (srcDigit < '0'.charCodeAt(0) || srcDigit > '9'.charCodeAt(0)) {
            throw new Error('invalid number');
        }
        var carry = srcDigit - '0'.charCodeAt(0);
        for (var j = 0; j < size; ++j) {
            var x = result[j] * 10 + carry;
            result[j] = x;
            carry = x >> 8;
        }
        if (carry) {
            throw new Error('number is out of range');
        }
    }
    return result;
};
exports.decimalToBinary = decimalToBinary;
/**
 * Convert a signed decimal number in `s` to a bignum
 *
 * @param size bignum size (bytes)
 */
var signedDecimalToBinary = function (size, s) {
    var negative = s[0] === '-';
    if (negative) {
        s = s.substr(1);
    }
    var result = exports.decimalToBinary(size, s);
    if (negative) {
        exports.negate(result);
        if (!exports.isNegative(result)) {
            throw new Error('number is out of range');
        }
    }
    else if (exports.isNegative(result)) {
        throw new Error('number is out of range');
    }
    return result;
};
exports.signedDecimalToBinary = signedDecimalToBinary;
/**
 * Convert `bignum` to an unsigned decimal number
 *
 * @param minDigits 0-pad result to this many digits
 */
var binaryToDecimal = function (bignum, minDigits) {
    if (minDigits === void 0) { minDigits = 1; }
    var result = Array(minDigits).fill('0'.charCodeAt(0));
    for (var i = bignum.length - 1; i >= 0; --i) {
        var carry = bignum[i];
        for (var j = 0; j < result.length; ++j) {
            var x = ((result[j] - '0'.charCodeAt(0)) << 8) + carry;
            result[j] = '0'.charCodeAt(0) + x % 10;
            carry = (x / 10) | 0;
        }
        while (carry) {
            result.push('0'.charCodeAt(0) + carry % 10);
            carry = (carry / 10) | 0;
        }
    }
    result.reverse();
    return String.fromCharCode.apply(String, __spreadArray([], __read(result)));
};
exports.binaryToDecimal = binaryToDecimal;
/**
 * Convert `bignum` to a signed decimal number
 *
 * @param minDigits 0-pad result to this many digits
 */
var signedBinaryToDecimal = function (bignum, minDigits) {
    if (minDigits === void 0) { minDigits = 1; }
    if (exports.isNegative(bignum)) {
        var x = bignum.slice();
        exports.negate(x);
        return '-' + exports.binaryToDecimal(x, minDigits);
    }
    return exports.binaryToDecimal(bignum, minDigits);
};
exports.signedBinaryToDecimal = signedBinaryToDecimal;
var base58ToBinaryVarSize = function (s) {
    var e_1, _a;
    var result = [];
    for (var i = 0; i < s.length; ++i) {
        var carry = base58Map[s.charCodeAt(i)];
        if (carry < 0) {
            throw new Error('invalid base-58 value');
        }
        for (var j = 0; j < result.length; ++j) {
            var x = result[j] * 58 + carry;
            result[j] = x & 0xff;
            carry = x >> 8;
        }
        if (carry) {
            result.push(carry);
        }
    }
    try {
        for (var s_1 = __values(s), s_1_1 = s_1.next(); !s_1_1.done; s_1_1 = s_1.next()) {
            var ch = s_1_1.value;
            if (ch === '1') {
                result.push(0);
            }
            else {
                break;
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (s_1_1 && !s_1_1.done && (_a = s_1.return)) _a.call(s_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    result.reverse();
    return new Uint8Array(result);
};
/**
 * Convert an unsigned base-58 number in `s` to a bignum
 *
 * @param size bignum size (bytes)
 */
var base58ToBinary = function (size, s) {
    if (!size) {
        return base58ToBinaryVarSize(s);
    }
    var result = new Uint8Array(size);
    for (var i = 0; i < s.length; ++i) {
        var carry = base58Map[s.charCodeAt(i)];
        if (carry < 0) {
            throw new Error('invalid base-58 value');
        }
        for (var j = 0; j < size; ++j) {
            var x = result[j] * 58 + carry;
            result[j] = x;
            carry = x >> 8;
        }
        if (carry) {
            throw new Error('base-58 value is out of range');
        }
    }
    result.reverse();
    return result;
};
exports.base58ToBinary = base58ToBinary;
/**
 * Convert `bignum` to a base-58 number
 *
 * @param minDigits 0-pad result to this many digits
 */
var binaryToBase58 = function (bignum, minDigits) {
    var e_2, _a, e_3, _b;
    if (minDigits === void 0) { minDigits = 1; }
    var result = [];
    try {
        for (var bignum_1 = __values(bignum), bignum_1_1 = bignum_1.next(); !bignum_1_1.done; bignum_1_1 = bignum_1.next()) {
            var byte = bignum_1_1.value;
            var carry = byte;
            for (var j = 0; j < result.length; ++j) {
                var x = (base58Map[result[j]] << 8) + carry;
                result[j] = base58Chars.charCodeAt(x % 58);
                carry = (x / 58) | 0;
            }
            while (carry) {
                result.push(base58Chars.charCodeAt(carry % 58));
                carry = (carry / 58) | 0;
            }
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (bignum_1_1 && !bignum_1_1.done && (_a = bignum_1.return)) _a.call(bignum_1);
        }
        finally { if (e_2) throw e_2.error; }
    }
    try {
        for (var bignum_2 = __values(bignum), bignum_2_1 = bignum_2.next(); !bignum_2_1.done; bignum_2_1 = bignum_2.next()) {
            var byte = bignum_2_1.value;
            if (byte) {
                break;
            }
            else {
                result.push('1'.charCodeAt(0));
            }
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (bignum_2_1 && !bignum_2_1.done && (_b = bignum_2.return)) _b.call(bignum_2);
        }
        finally { if (e_3) throw e_3.error; }
    }
    result.reverse();
    return String.fromCharCode.apply(String, __spreadArray([], __read(result)));
};
exports.binaryToBase58 = binaryToBase58;
/** Convert an unsigned base-64 number in `s` to a bignum */
var base64ToBinary = function (s) {
    var len = s.length;
    if ((len & 3) === 1 && s[len - 1] === '=') {
        len -= 1;
    } // fc appends an extra '='
    if ((len & 3) !== 0) {
        throw new Error('base-64 value is not padded correctly');
    }
    var groups = len >> 2;
    var bytes = groups * 3;
    if (len > 0 && s[len - 1] === '=') {
        if (s[len - 2] === '=') {
            bytes -= 2;
        }
        else {
            bytes -= 1;
        }
    }
    var result = new Uint8Array(bytes);
    for (var group = 0; group < groups; ++group) {
        var digit0 = base64Map[s.charCodeAt(group * 4 + 0)];
        var digit1 = base64Map[s.charCodeAt(group * 4 + 1)];
        var digit2 = base64Map[s.charCodeAt(group * 4 + 2)];
        var digit3 = base64Map[s.charCodeAt(group * 4 + 3)];
        result[group * 3 + 0] = (digit0 << 2) | (digit1 >> 4);
        if (group * 3 + 1 < bytes) {
            result[group * 3 + 1] = ((digit1 & 15) << 4) | (digit2 >> 2);
        }
        if (group * 3 + 2 < bytes) {
            result[group * 3 + 2] = ((digit2 & 3) << 6) | digit3;
        }
    }
    return result;
};
exports.base64ToBinary = base64ToBinary;
/** Key types this library supports */
var KeyType;
(function (KeyType) {
    KeyType[KeyType["k1"] = 0] = "k1";
    KeyType[KeyType["r1"] = 1] = "r1";
    KeyType[KeyType["wa"] = 2] = "wa";
})(KeyType = exports.KeyType || (exports.KeyType = {}));
/** Public key data size, excluding type field */
exports.publicKeyDataSize = 33;
/** Private key data size, excluding type field */
exports.privateKeyDataSize = 32;
/** Signature data size, excluding type field */
exports.signatureDataSize = 65;
var digestSuffixRipemd160 = function (data, suffix) {
    var d = new Uint8Array(data.length + suffix.length);
    for (var i = 0; i < data.length; ++i) {
        d[i] = data[i];
    }
    for (var i = 0; i < suffix.length; ++i) {
        d[data.length + i] = suffix.charCodeAt(i);
    }
    return ripemd160(d);
};
var stringToKey = function (s, type, size, suffix) {
    var whole = exports.base58ToBinary(size ? size + 4 : 0, s);
    var result = { type: type, data: new Uint8Array(whole.buffer, 0, whole.length - 4) };
    var digest = new Uint8Array(digestSuffixRipemd160(result.data, suffix));
    if (digest[0] !== whole[whole.length - 4] || digest[1] !== whole[whole.length - 3]
        || digest[2] !== whole[whole.length - 2] || digest[3] !== whole[whole.length - 1]) {
        throw new Error('checksum doesn\'t match');
    }
    return result;
};
var keyToString = function (key, suffix, prefix) {
    var digest = new Uint8Array(digestSuffixRipemd160(key.data, suffix));
    var whole = new Uint8Array(key.data.length + 4);
    for (var i = 0; i < key.data.length; ++i) {
        whole[i] = key.data[i];
    }
    for (var i = 0; i < 4; ++i) {
        whole[i + key.data.length] = digest[i];
    }
    return prefix + exports.binaryToBase58(whole);
};
/** Convert key in `s` to binary form */
var stringToPublicKey = function (s) {
    if (typeof s !== 'string') {
        throw new Error('expected string containing public key');
    }
    if (s.substr(0, 3) === 'EOS') {
        var whole = exports.base58ToBinary(exports.publicKeyDataSize + 4, s.substr(3));
        var key = { type: KeyType.k1, data: new Uint8Array(exports.publicKeyDataSize) };
        for (var i = 0; i < exports.publicKeyDataSize; ++i) {
            key.data[i] = whole[i];
        }
        var digest = new Uint8Array(ripemd160(key.data));
        if (digest[0] !== whole[exports.publicKeyDataSize] || digest[1] !== whole[34]
            || digest[2] !== whole[35] || digest[3] !== whole[36]) {
            throw new Error('checksum doesn\'t match');
        }
        return key;
    }
    else if (s.substr(0, 7) === 'PUB_K1_') {
        return stringToKey(s.substr(7), KeyType.k1, exports.publicKeyDataSize, 'K1');
    }
    else if (s.substr(0, 7) === 'PUB_R1_') {
        return stringToKey(s.substr(7), KeyType.r1, exports.publicKeyDataSize, 'R1');
    }
    else if (s.substr(0, 7) === 'PUB_WA_') {
        return stringToKey(s.substr(7), KeyType.wa, 0, 'WA');
    }
    else {
        throw new Error('unrecognized public key format');
    }
};
exports.stringToPublicKey = stringToPublicKey;
/** Convert public `key` to legacy string (base-58) form */
var publicKeyToLegacyString = function (key) {
    if (key.type === KeyType.k1 && key.data.length === exports.publicKeyDataSize) {
        return keyToString(key, '', 'EOS');
    }
    else if (key.type === KeyType.r1 || key.type === KeyType.wa) {
        throw new Error('Key format not supported in legacy conversion');
    }
    else {
        throw new Error('unrecognized public key format');
    }
};
exports.publicKeyToLegacyString = publicKeyToLegacyString;
/** Convert `key` to string (base-58) form */
var publicKeyToString = function (key) {
    if (key.type === KeyType.k1 && key.data.length === exports.publicKeyDataSize) {
        return keyToString(key, 'K1', 'PUB_K1_');
    }
    else if (key.type === KeyType.r1 && key.data.length === exports.publicKeyDataSize) {
        return keyToString(key, 'R1', 'PUB_R1_');
    }
    else if (key.type === KeyType.wa) {
        return keyToString(key, 'WA', 'PUB_WA_');
    }
    else {
        throw new Error('unrecognized public key format');
    }
};
exports.publicKeyToString = publicKeyToString;
/** If a key is in the legacy format (`EOS` prefix), then convert it to the new format (`PUB_K1_`).
 * Leaves other formats untouched
 */
var convertLegacyPublicKey = function (s) {
    if (s.substr(0, 3) === 'EOS') {
        return exports.publicKeyToString(exports.stringToPublicKey(s));
    }
    return s;
};
exports.convertLegacyPublicKey = convertLegacyPublicKey;
/** If a key is in the legacy format (`EOS` prefix), then convert it to the new format (`PUB_K1_`).
 * Leaves other formats untouched
 */
var convertLegacyPublicKeys = function (keys) {
    return keys.map(exports.convertLegacyPublicKey);
};
exports.convertLegacyPublicKeys = convertLegacyPublicKeys;
/** Convert key in `s` to binary form */
var stringToPrivateKey = function (s) {
    if (typeof s !== 'string') {
        throw new Error('expected string containing private key');
    }
    if (s.substr(0, 7) === 'PVT_R1_') {
        return stringToKey(s.substr(7), KeyType.r1, exports.privateKeyDataSize, 'R1');
    }
    else if (s.substr(0, 7) === 'PVT_K1_') {
        return stringToKey(s.substr(7), KeyType.k1, exports.privateKeyDataSize, 'K1');
    }
    else {
        // todo: Verify checksum: sha256(sha256(key.data)).
        //       Not critical since a bad key will fail to produce a
        //       valid signature anyway.
        var whole = exports.base58ToBinary(exports.privateKeyDataSize + 5, s);
        var key = { type: KeyType.k1, data: new Uint8Array(exports.privateKeyDataSize) };
        if (whole[0] !== 0x80) {
            throw new Error('unrecognized private key type');
        }
        for (var i = 0; i < exports.privateKeyDataSize; ++i) {
            key.data[i] = whole[i + 1];
        }
        return key;
    }
};
exports.stringToPrivateKey = stringToPrivateKey;
/** Convert private `key` to legacy string (base-58) form */
var privateKeyToLegacyString = function (key) {
    if (key.type === KeyType.k1 && key.data.length === exports.privateKeyDataSize) {
        var whole_1 = [];
        whole_1.push(128);
        key.data.forEach(function (byte) { return whole_1.push(byte); });
        var digest = new Uint8Array(hash_js_1.sha256().update(hash_js_1.sha256().update(whole_1).digest()).digest());
        var result = new Uint8Array(exports.privateKeyDataSize + 5);
        for (var i = 0; i < whole_1.length; i++) {
            result[i] = whole_1[i];
        }
        for (var i = 0; i < 4; i++) {
            result[i + whole_1.length] = digest[i];
        }
        return exports.binaryToBase58(result);
    }
    else if (key.type === KeyType.r1 || key.type === KeyType.wa) {
        throw new Error('Key format not supported in legacy conversion');
    }
    else {
        throw new Error('unrecognized public key format');
    }
};
exports.privateKeyToLegacyString = privateKeyToLegacyString;
/** Convert `key` to string (base-58) form */
var privateKeyToString = function (key) {
    if (key.type === KeyType.r1) {
        return keyToString(key, 'R1', 'PVT_R1_');
    }
    else if (key.type === KeyType.k1) {
        return keyToString(key, 'K1', 'PVT_K1_');
    }
    else {
        throw new Error('unrecognized private key format');
    }
};
exports.privateKeyToString = privateKeyToString;
/** Convert key in `s` to binary form */
var stringToSignature = function (s) {
    if (typeof s !== 'string') {
        throw new Error('expected string containing signature');
    }
    if (s.substr(0, 7) === 'SIG_K1_') {
        return stringToKey(s.substr(7), KeyType.k1, exports.signatureDataSize, 'K1');
    }
    else if (s.substr(0, 7) === 'SIG_R1_') {
        return stringToKey(s.substr(7), KeyType.r1, exports.signatureDataSize, 'R1');
    }
    else if (s.substr(0, 7) === 'SIG_WA_') {
        return stringToKey(s.substr(7), KeyType.wa, 0, 'WA');
    }
    else {
        throw new Error('unrecognized signature format');
    }
};
exports.stringToSignature = stringToSignature;
/** Convert `signature` to string (base-58) form */
var signatureToString = function (signature) {
    if (signature.type === KeyType.k1) {
        return keyToString(signature, 'K1', 'SIG_K1_');
    }
    else if (signature.type === KeyType.r1) {
        return keyToString(signature, 'R1', 'SIG_R1_');
    }
    else if (signature.type === KeyType.wa) {
        return keyToString(signature, 'WA', 'SIG_WA_');
    }
    else {
        throw new Error('unrecognized signature format');
    }
};
exports.signatureToString = signatureToString;


/***/ }),

/***/ "./src/eosjs-serialize.ts":
/*!********************************!*\
  !*** ./src/eosjs-serialize.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


/**
 * @module Serialize
 */
// copyright defined in eosjs/LICENSE.txt
/* eslint-disable max-classes-per-file */
/* eslint-disable jsdoc/check-indentation */
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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.serializeQuery = exports.deserializeAnyArray = exports.serializeAnyArray = exports.deserializeAnyObject = exports.serializeAnyObject = exports.deserializeAnyvarShort = exports.deserializeAnyvar = exports.serializeAnyvar = exports.deserializeAction = exports.deserializeActionData = exports.serializeAction = exports.serializeActionData = exports.transactionHeader = exports.getTypesFromAbi = exports.getType = exports.createTransactionTypes = exports.createTransactionExtensionTypes = exports.createAbiTypes = exports.createInitialTypes = exports.hexToUint8Array = exports.arrayToHex = exports.symbolToString = exports.stringToSymbol = exports.blockTimestampToDate = exports.dateToBlockTimestamp = exports.timePointSecToDate = exports.dateToTimePointSec = exports.timePointToDate = exports.dateToTimePoint = exports.supportedAbiVersion = exports.SerialBuffer = exports.SerializerState = void 0;
var numeric = __webpack_require__(/*! ./eosjs-numeric */ "./src/eosjs-numeric.ts");
/** State for serialize() and deserialize() */
var SerializerState = /** @class */ (function () {
    function SerializerState(options) {
        if (options === void 0) { options = {}; }
        /** Have any binary extensions been skipped? */
        this.skippedBinaryExtension = false;
        this.options = options;
    }
    return SerializerState;
}());
exports.SerializerState = SerializerState;
/** Serialize and deserialize data */
var SerialBuffer = /** @class */ (function () {
    /**
     * @param __namedParameters
     * `array`: `null` if serializing, or binary data to deserialize
     * `textEncoder`: `TextEncoder` instance to use. Pass in `null` if running in a browser
     * `textDecoder`: `TextDecider` instance to use. Pass in `null` if running in a browser
     */
    function SerialBuffer(_a) {
        var _b = _a === void 0 ? {} : _a, textEncoder = _b.textEncoder, textDecoder = _b.textDecoder, array = _b.array;
        /** Current position while reading (deserializing) */
        this.readPos = 0;
        this.array = array || new Uint8Array(1024);
        this.length = array ? array.length : 0;
        this.textEncoder = textEncoder || new TextEncoder();
        this.textDecoder = textDecoder || new TextDecoder('utf-8', { fatal: true });
    }
    /** Resize `array` if needed to have at least `size` bytes free */
    SerialBuffer.prototype.reserve = function (size) {
        if (this.length + size <= this.array.length) {
            return;
        }
        var l = this.array.length;
        while (this.length + size > l) {
            l = Math.ceil(l * 1.5);
        }
        var newArray = new Uint8Array(l);
        newArray.set(this.array);
        this.array = newArray;
    };
    /** Is there data available to read? */
    SerialBuffer.prototype.haveReadData = function () {
        return this.readPos < this.length;
    };
    /** Restart reading from the beginning */
    SerialBuffer.prototype.restartRead = function () {
        this.readPos = 0;
    };
    /** Return data with excess storage trimmed away */
    SerialBuffer.prototype.asUint8Array = function () {
        return new Uint8Array(this.array.buffer, this.array.byteOffset, this.length);
    };
    /** Append bytes */
    SerialBuffer.prototype.pushArray = function (v) {
        this.reserve(v.length);
        this.array.set(v, this.length);
        this.length += v.length;
    };
    /** Append bytes */
    SerialBuffer.prototype.push = function () {
        var v = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            v[_i] = arguments[_i];
        }
        this.pushArray(v);
    };
    /** Get a single byte */
    SerialBuffer.prototype.get = function () {
        if (this.readPos < this.length) {
            return this.array[this.readPos++];
        }
        throw new Error('Read past end of buffer');
    };
    /** Append bytes in `v`. Throws if `len` doesn't match `v.length` */
    SerialBuffer.prototype.pushUint8ArrayChecked = function (v, len) {
        if (v.length !== len) {
            throw new Error('Binary data has incorrect size');
        }
        this.pushArray(v);
    };
    /** Get `len` bytes */
    SerialBuffer.prototype.getUint8Array = function (len) {
        if (this.readPos + len > this.length) {
            throw new Error('Read past end of buffer');
        }
        var result = new Uint8Array(this.array.buffer, this.array.byteOffset + this.readPos, len);
        this.readPos += len;
        return result;
    };
    /** Skip `len` bytes */
    SerialBuffer.prototype.skip = function (len) {
        if (this.readPos + len > this.length) {
            throw new Error('Read past end of buffer');
        }
        this.readPos += len;
    };
    /** Append a `uint16` */
    SerialBuffer.prototype.pushUint16 = function (v) {
        this.push((v >> 0) & 0xff, (v >> 8) & 0xff);
    };
    /** Get a `uint16` */
    SerialBuffer.prototype.getUint16 = function () {
        var v = 0;
        v |= this.get() << 0;
        v |= this.get() << 8;
        return v;
    };
    /** Append a `uint32` */
    SerialBuffer.prototype.pushUint32 = function (v) {
        this.push((v >> 0) & 0xff, (v >> 8) & 0xff, (v >> 16) & 0xff, (v >> 24) & 0xff);
    };
    /** Get a `uint32` */
    SerialBuffer.prototype.getUint32 = function () {
        var v = 0;
        v |= this.get() << 0;
        v |= this.get() << 8;
        v |= this.get() << 16;
        v |= this.get() << 24;
        return v >>> 0;
    };
    /** Append a `uint64`. *Caution*: `number` only has 53 bits of precision */
    SerialBuffer.prototype.pushNumberAsUint64 = function (v) {
        this.pushUint32(v >>> 0);
        this.pushUint32(Math.floor(v / 4294967296) >>> 0);
    };
    /**
     * Get a `uint64` as a `number`. *Caution*: `number` only has 53 bits of precision; some values will change.
     * `numeric.binaryToDecimal(serialBuffer.getUint8Array(8))` recommended instead
     */
    SerialBuffer.prototype.getUint64AsNumber = function () {
        var low = this.getUint32();
        var high = this.getUint32();
        return (high >>> 0) * 4294967296 + (low >>> 0);
    };
    /** Append a `varuint32` */
    SerialBuffer.prototype.pushVaruint32 = function (v) {
        while (true) {
            if (v >>> 7) {
                this.push(0x80 | (v & 0x7f));
                v = v >>> 7;
            }
            else {
                this.push(v);
                break;
            }
        }
    };
    /** Get a `varuint32` */
    SerialBuffer.prototype.getVaruint32 = function () {
        var v = 0;
        var bit = 0;
        while (true) {
            var b = this.get();
            v |= (b & 0x7f) << bit;
            bit += 7;
            if (!(b & 0x80)) {
                break;
            }
        }
        return v >>> 0;
    };
    /** Append a `varint32` */
    SerialBuffer.prototype.pushVarint32 = function (v) {
        this.pushVaruint32((v << 1) ^ (v >> 31));
    };
    /** Get a `varint32` */
    SerialBuffer.prototype.getVarint32 = function () {
        var v = this.getVaruint32();
        if (v & 1) {
            return ((~v) >> 1) | 2147483648;
        }
        else {
            return v >>> 1;
        }
    };
    /** Append a `float32` */
    SerialBuffer.prototype.pushFloat32 = function (v) {
        this.pushArray(new Uint8Array((new Float32Array([v])).buffer));
    };
    /** Get a `float32` */
    SerialBuffer.prototype.getFloat32 = function () {
        return new Float32Array(this.getUint8Array(4).slice().buffer)[0];
    };
    /** Append a `float64` */
    SerialBuffer.prototype.pushFloat64 = function (v) {
        this.pushArray(new Uint8Array((new Float64Array([v])).buffer));
    };
    /** Get a `float64` */
    SerialBuffer.prototype.getFloat64 = function () {
        return new Float64Array(this.getUint8Array(8).slice().buffer)[0];
    };
    /** Append a `name` */
    SerialBuffer.prototype.pushName = function (s) {
        if (typeof s !== 'string') {
            throw new Error('Expected string containing name');
        }
        var regex = new RegExp(/^[.1-5a-z]{0,12}[.1-5a-j]?$/);
        if (!regex.test(s)) {
            throw new Error('Name should be less than 13 characters, or less than 14 if last character is between 1-5 or a-j, and only contain the following symbols .12345abcdefghijklmnopqrstuvwxyz'); // eslint-disable-line
        }
        var charToSymbol = function (c) {
            if (c >= 'a'.charCodeAt(0) && c <= 'z'.charCodeAt(0)) {
                return (c - 'a'.charCodeAt(0)) + 6;
            }
            if (c >= '1'.charCodeAt(0) && c <= '5'.charCodeAt(0)) {
                return (c - '1'.charCodeAt(0)) + 1;
            }
            return 0;
        };
        var a = new Uint8Array(8);
        var bit = 63;
        for (var i = 0; i < s.length; ++i) {
            var c = charToSymbol(s.charCodeAt(i));
            if (bit < 5) {
                c = c << 1;
            }
            for (var j = 4; j >= 0; --j) {
                if (bit >= 0) {
                    a[Math.floor(bit / 8)] |= ((c >> j) & 1) << (bit % 8);
                    --bit;
                }
            }
        }
        this.pushArray(a);
    };
    /** Get a `name` */
    SerialBuffer.prototype.getName = function () {
        var a = this.getUint8Array(8);
        var result = '';
        for (var bit = 63; bit >= 0;) {
            var c = 0;
            for (var i = 0; i < 5; ++i) {
                if (bit >= 0) {
                    c = (c << 1) | ((a[Math.floor(bit / 8)] >> (bit % 8)) & 1);
                    --bit;
                }
            }
            if (c >= 6) {
                result += String.fromCharCode(c + 'a'.charCodeAt(0) - 6);
            }
            else if (c >= 1) {
                result += String.fromCharCode(c + '1'.charCodeAt(0) - 1);
            }
            else {
                result += '.';
            }
        }
        while (result.endsWith('.')) {
            result = result.substr(0, result.length - 1);
        }
        return result;
    };
    /** Append length-prefixed binary data */
    SerialBuffer.prototype.pushBytes = function (v) {
        this.pushVaruint32(v.length);
        this.pushArray(v);
    };
    /** Get length-prefixed binary data */
    SerialBuffer.prototype.getBytes = function () {
        return this.getUint8Array(this.getVaruint32());
    };
    /** Append a string */
    SerialBuffer.prototype.pushString = function (v) {
        this.pushBytes(this.textEncoder.encode(v));
    };
    /** Get a string */
    SerialBuffer.prototype.getString = function () {
        return this.textDecoder.decode(this.getBytes());
    };
    /** Append a `symbol_code`. Unlike `symbol`, `symbol_code` doesn't include a precision. */
    SerialBuffer.prototype.pushSymbolCode = function (name) {
        if (typeof name !== 'string') {
            throw new Error('Expected string containing symbol_code');
        }
        var a = [];
        a.push.apply(a, __spreadArray([], __read(this.textEncoder.encode(name))));
        while (a.length < 8) {
            a.push(0);
        }
        this.pushArray(a.slice(0, 8));
    };
    /** Get a `symbol_code`. Unlike `symbol`, `symbol_code` doesn't include a precision. */
    SerialBuffer.prototype.getSymbolCode = function () {
        var a = this.getUint8Array(8);
        var len;
        for (len = 0; len < a.length; ++len) {
            if (!a[len]) {
                break;
            }
        }
        var name = this.textDecoder.decode(new Uint8Array(a.buffer, a.byteOffset, len));
        return name;
    };
    /** Append a `symbol` */
    SerialBuffer.prototype.pushSymbol = function (_a) {
        var name = _a.name, precision = _a.precision;
        if (!/^[A-Z]{1,7}$/.test(name)) {
            throw new Error('Expected symbol to be A-Z and between one and seven characters');
        }
        var a = [precision & 0xff];
        a.push.apply(a, __spreadArray([], __read(this.textEncoder.encode(name))));
        while (a.length < 8) {
            a.push(0);
        }
        this.pushArray(a.slice(0, 8));
    };
    /** Get a `symbol` */
    SerialBuffer.prototype.getSymbol = function () {
        var precision = this.get();
        var a = this.getUint8Array(7);
        var len;
        for (len = 0; len < a.length; ++len) {
            if (!a[len]) {
                break;
            }
        }
        var name = this.textDecoder.decode(new Uint8Array(a.buffer, a.byteOffset, len));
        return { name: name, precision: precision };
    };
    /** Append an asset */
    SerialBuffer.prototype.pushAsset = function (s) {
        if (typeof s !== 'string') {
            throw new Error('Expected string containing asset');
        }
        s = s.trim();
        var pos = 0;
        var amount = '';
        var precision = 0;
        if (s[pos] === '-') {
            amount += '-';
            ++pos;
        }
        var foundDigit = false;
        while (pos < s.length && s.charCodeAt(pos) >= '0'.charCodeAt(0) && s.charCodeAt(pos) <= '9'.charCodeAt(0)) {
            foundDigit = true;
            amount += s[pos];
            ++pos;
        }
        if (!foundDigit) {
            throw new Error('Asset must begin with a number');
        }
        if (s[pos] === '.') {
            ++pos;
            while (pos < s.length && s.charCodeAt(pos) >= '0'.charCodeAt(0) && s.charCodeAt(pos) <= '9'.charCodeAt(0)) {
                amount += s[pos];
                ++precision;
                ++pos;
            }
        }
        var name = s.substr(pos).trim();
        this.pushArray(numeric.signedDecimalToBinary(8, amount));
        this.pushSymbol({ name: name, precision: precision });
    };
    /** Get an asset */
    SerialBuffer.prototype.getAsset = function () {
        var amount = this.getUint8Array(8);
        var _a = this.getSymbol(), name = _a.name, precision = _a.precision;
        var s = numeric.signedBinaryToDecimal(amount, precision + 1);
        if (precision) {
            s = s.substr(0, s.length - precision) + '.' + s.substr(s.length - precision);
        }
        return s + ' ' + name;
    };
    /** Append a public key */
    SerialBuffer.prototype.pushPublicKey = function (s) {
        var key = numeric.stringToPublicKey(s);
        this.push(key.type);
        this.pushArray(key.data);
    };
    /** Get a public key */
    SerialBuffer.prototype.getPublicKey = function () {
        var type = this.get();
        var data;
        if (type === numeric.KeyType.wa) {
            var begin = this.readPos;
            this.skip(34);
            this.skip(this.getVaruint32());
            data = new Uint8Array(this.array.buffer, this.array.byteOffset + begin, this.readPos - begin);
        }
        else {
            data = this.getUint8Array(numeric.publicKeyDataSize);
        }
        return numeric.publicKeyToString({ type: type, data: data });
    };
    /** Append a private key */
    SerialBuffer.prototype.pushPrivateKey = function (s) {
        var key = numeric.stringToPrivateKey(s);
        this.push(key.type);
        this.pushArray(key.data);
    };
    /** Get a private key */
    SerialBuffer.prototype.getPrivateKey = function () {
        var type = this.get();
        var data = this.getUint8Array(numeric.privateKeyDataSize);
        return numeric.privateKeyToString({ type: type, data: data });
    };
    /** Append a signature */
    SerialBuffer.prototype.pushSignature = function (s) {
        var key = numeric.stringToSignature(s);
        this.push(key.type);
        this.pushArray(key.data);
    };
    /** Get a signature */
    SerialBuffer.prototype.getSignature = function () {
        var type = this.get();
        var data;
        if (type === numeric.KeyType.wa) {
            var begin = this.readPos;
            this.skip(65);
            this.skip(this.getVaruint32());
            this.skip(this.getVaruint32());
            data = new Uint8Array(this.array.buffer, this.array.byteOffset + begin, this.readPos - begin);
        }
        else {
            data = this.getUint8Array(numeric.signatureDataSize);
        }
        return numeric.signatureToString({ type: type, data: data });
    };
    return SerialBuffer;
}()); // SerialBuffer
exports.SerialBuffer = SerialBuffer;
/** Is this a supported ABI version? */
var supportedAbiVersion = function (version) {
    return version.startsWith('eosio::abi/1.');
};
exports.supportedAbiVersion = supportedAbiVersion;
var checkDateParse = function (date) {
    var result = Date.parse(date);
    if (Number.isNaN(result)) {
        throw new Error('Invalid time format');
    }
    return result;
};
/** Convert date in ISO format to `time_point` (miliseconds since epoch) */
var dateToTimePoint = function (date) {
    return Math.round(checkDateParse(date + 'Z') * 1000);
};
exports.dateToTimePoint = dateToTimePoint;
/** Convert `time_point` (miliseconds since epoch) to date in ISO format */
var timePointToDate = function (us) {
    var s = (new Date(us / 1000)).toISOString();
    return s.substr(0, s.length - 1);
};
exports.timePointToDate = timePointToDate;
/** Convert date in ISO format to `time_point_sec` (seconds since epoch) */
var dateToTimePointSec = function (date) {
    return Math.round(checkDateParse(date + 'Z') / 1000);
};
exports.dateToTimePointSec = dateToTimePointSec;
/** Convert `time_point_sec` (seconds since epoch) to to date in ISO format */
var timePointSecToDate = function (sec) {
    var s = (new Date(sec * 1000)).toISOString();
    return s.substr(0, s.length - 1);
};
exports.timePointSecToDate = timePointSecToDate;
/** Convert date in ISO format to `block_timestamp_type` (half-seconds since a different epoch) */
var dateToBlockTimestamp = function (date) {
    return Math.round((checkDateParse(date + 'Z') - 946684800000) / 500);
};
exports.dateToBlockTimestamp = dateToBlockTimestamp;
/** Convert `block_timestamp_type` (half-seconds since a different epoch) to to date in ISO format */
var blockTimestampToDate = function (slot) {
    var s = (new Date(slot * 500 + 946684800000)).toISOString();
    return s.substr(0, s.length - 1);
};
exports.blockTimestampToDate = blockTimestampToDate;
/** Convert `string` to `Symbol`. format: `precision,NAME`. */
var stringToSymbol = function (s) {
    if (typeof s !== 'string') {
        throw new Error('Expected string containing symbol');
    }
    var m = s.match(/^([0-9]+),([A-Z]+)$/);
    if (!m) {
        throw new Error('Invalid symbol');
    }
    return { name: m[2], precision: +m[1] };
};
exports.stringToSymbol = stringToSymbol;
/** Convert `Symbol` to `string`. format: `precision,NAME`. */
var symbolToString = function (_a) {
    var name = _a.name, precision = _a.precision;
    return precision + ',' + name;
};
exports.symbolToString = symbolToString;
/** Convert binary data to hex */
var arrayToHex = function (data) {
    var e_1, _a;
    var result = '';
    try {
        for (var data_1 = __values(data), data_1_1 = data_1.next(); !data_1_1.done; data_1_1 = data_1.next()) {
            var x = data_1_1.value;
            result += ('00' + x.toString(16)).slice(-2);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (data_1_1 && !data_1_1.done && (_a = data_1.return)) _a.call(data_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return result.toUpperCase();
};
exports.arrayToHex = arrayToHex;
/** Convert hex to binary data */
var hexToUint8Array = function (hex) {
    if (typeof hex !== 'string') {
        throw new Error('Expected string containing hex digits');
    }
    if (hex.length % 2) {
        throw new Error('Odd number of hex digits');
    }
    var l = hex.length / 2;
    var result = new Uint8Array(l);
    for (var i = 0; i < l; ++i) {
        var x = parseInt(hex.substr(i * 2, 2), 16);
        if (Number.isNaN(x)) {
            throw new Error('Expected hex string');
        }
        result[i] = x;
    }
    return result;
};
exports.hexToUint8Array = hexToUint8Array;
function serializeUnknown(buffer, data) {
    throw new Error('Don\'t know how to serialize ' + this.name);
}
function deserializeUnknown(buffer) {
    throw new Error('Don\'t know how to deserialize ' + this.name);
}
function serializeStruct(buffer, data, state, allowExtensions) {
    var e_2, _a;
    if (state === void 0) { state = new SerializerState(); }
    if (allowExtensions === void 0) { allowExtensions = true; }
    if (typeof data !== 'object') {
        throw new Error('expected object containing data: ' + JSON.stringify(data));
    }
    if (this.base) {
        this.base.serialize(buffer, data, state, allowExtensions);
    }
    try {
        for (var _b = __values(this.fields), _c = _b.next(); !_c.done; _c = _b.next()) {
            var field = _c.value;
            if (field.name in data) {
                if (state.skippedBinaryExtension) {
                    throw new Error('unexpected ' + this.name + '.' + field.name);
                }
                field.type.serialize(buffer, data[field.name], state, allowExtensions && field === this.fields[this.fields.length - 1]);
            }
            else {
                if (allowExtensions && field.type.extensionOf) {
                    state.skippedBinaryExtension = true;
                }
                else {
                    throw new Error('missing ' + this.name + '.' + field.name + ' (type=' + field.type.name + ')');
                }
            }
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_2) throw e_2.error; }
    }
}
function deserializeStruct(buffer, state, allowExtensions) {
    var e_3, _a;
    if (state === void 0) { state = new SerializerState(); }
    if (allowExtensions === void 0) { allowExtensions = true; }
    var result;
    if (this.base) {
        result = this.base.deserialize(buffer, state, allowExtensions);
    }
    else {
        result = {};
    }
    try {
        for (var _b = __values(this.fields), _c = _b.next(); !_c.done; _c = _b.next()) {
            var field = _c.value;
            if (allowExtensions && field.type.extensionOf && !buffer.haveReadData()) {
                state.skippedBinaryExtension = true;
            }
            else {
                result[field.name] = field.type.deserialize(buffer, state, allowExtensions);
            }
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_3) throw e_3.error; }
    }
    return result;
}
function serializeVariant(buffer, data, state, allowExtensions) {
    if (!Array.isArray(data) || data.length !== 2 || typeof data[0] !== 'string') {
        throw new Error('expected variant: ["type", value]');
    }
    var i = this.fields.findIndex(function (field) { return field.name === data[0]; });
    if (i < 0) {
        throw new Error("type \"" + data[0] + "\" is not valid for variant");
    }
    buffer.pushVaruint32(i);
    this.fields[i].type.serialize(buffer, data[1], state, allowExtensions);
}
function deserializeVariant(buffer, state, allowExtensions) {
    var i = buffer.getVaruint32();
    if (i >= this.fields.length) {
        throw new Error("type index " + i + " is not valid for variant");
    }
    var field = this.fields[i];
    return [field.name, field.type.deserialize(buffer, state, allowExtensions)];
}
function serializeArray(buffer, data, state, allowExtensions) {
    var e_4, _a;
    buffer.pushVaruint32(data.length);
    try {
        for (var data_2 = __values(data), data_2_1 = data_2.next(); !data_2_1.done; data_2_1 = data_2.next()) {
            var item = data_2_1.value;
            this.arrayOf.serialize(buffer, item, state, false);
        }
    }
    catch (e_4_1) { e_4 = { error: e_4_1 }; }
    finally {
        try {
            if (data_2_1 && !data_2_1.done && (_a = data_2.return)) _a.call(data_2);
        }
        finally { if (e_4) throw e_4.error; }
    }
}
function deserializeArray(buffer, state, allowExtensions) {
    var len = buffer.getVaruint32();
    var result = [];
    for (var i = 0; i < len; ++i) {
        result.push(this.arrayOf.deserialize(buffer, state, false));
    }
    return result;
}
function serializeOptional(buffer, data, state, allowExtensions) {
    if (data === null || data === undefined) {
        buffer.push(0);
    }
    else {
        buffer.push(1);
        this.optionalOf.serialize(buffer, data, state, allowExtensions);
    }
}
function deserializeOptional(buffer, state, allowExtensions) {
    if (buffer.get()) {
        return this.optionalOf.deserialize(buffer, state, allowExtensions);
    }
    else {
        return null;
    }
}
function serializeExtension(buffer, data, state, allowExtensions) {
    this.extensionOf.serialize(buffer, data, state, allowExtensions);
}
function deserializeExtension(buffer, state, allowExtensions) {
    return this.extensionOf.deserialize(buffer, state, allowExtensions);
}
function serializeObject(buffer, data, state, allowExtensions) {
    var e_5, _a;
    var entries = Object.entries(data);
    buffer.pushVaruint32(entries.length);
    try {
        for (var entries_1 = __values(entries), entries_1_1 = entries_1.next(); !entries_1_1.done; entries_1_1 = entries_1.next()) {
            var _b = __read(entries_1_1.value, 2), key = _b[0], value = _b[1];
            var keyType = this.fields[0].type;
            var dataType = this.fields[1].type;
            keyType.serialize(buffer, key, state, allowExtensions);
            dataType.serialize(buffer, value, state, allowExtensions);
        }
    }
    catch (e_5_1) { e_5 = { error: e_5_1 }; }
    finally {
        try {
            if (entries_1_1 && !entries_1_1.done && (_a = entries_1.return)) _a.call(entries_1);
        }
        finally { if (e_5) throw e_5.error; }
    }
}
function deserializeObject(buffer, state, allowExtensions) {
    var len = buffer.getVaruint32();
    var result = {};
    for (var i = 0; i < len; ++i) {
        var keyType = this.fields[0].type;
        var dataType = this.fields[1].type;
        var key = keyType.deserialize(buffer, state, allowExtensions);
        result[key] = dataType.deserialize(buffer, state, allowExtensions);
    }
    return result;
}
function serializePair(buffer, data, state, allowExtensions) {
    var _this = this;
    buffer.pushVaruint32(data.length);
    data.forEach(function (item) {
        _this.fields[0].type.serialize(buffer, item[0], state, allowExtensions);
        _this.fields[1].type.serialize(buffer, item[1], state, allowExtensions);
    });
}
function deserializePair(buffer, state, allowExtensions) {
    var result = [];
    var len = buffer.getVaruint32();
    for (var i = 0; i < len; ++i) {
        result.push(this.fields[0].type.deserialize(buffer, state, allowExtensions));
        result.push(this.fields[1].type.deserialize(buffer, state, allowExtensions));
    }
    return result;
}
var createType = function (attrs) {
    return __assign({ name: '<missing name>', aliasOfName: '', arrayOf: null, optionalOf: null, extensionOf: null, baseName: '', base: null, fields: [], serialize: serializeUnknown, deserialize: deserializeUnknown }, attrs);
};
var checkRange = function (orig, converted) {
    if (Number.isNaN(+orig) || Number.isNaN(+converted) || (typeof orig !== 'number' && typeof orig !== 'string')) {
        throw new Error('Expected number');
    }
    if (+orig !== +converted) {
        throw new Error('Number is out of range');
    }
    return +orig;
};
/** Create the set of types built-in to the abi format */
var createInitialTypes = function () {
    var result = new Map(Object.entries({
        bool: createType({
            name: 'bool',
            serialize: function (buffer, data) {
                if (!(typeof data === 'boolean' || typeof data === 'number' && (data === 1 || data === 0))) {
                    throw new Error('Expected boolean or number equal to 1 or 0');
                }
                buffer.push(data ? 1 : 0);
            },
            deserialize: function (buffer) { return !!buffer.get(); },
        }),
        uint8: createType({
            name: 'uint8',
            serialize: function (buffer, data) { buffer.push(checkRange(data, data & 0xff)); },
            deserialize: function (buffer) { return buffer.get(); },
        }),
        int8: createType({
            name: 'int8',
            serialize: function (buffer, data) { buffer.push(checkRange(data, data << 24 >> 24)); },
            deserialize: function (buffer) { return buffer.get() << 24 >> 24; },
        }),
        uint16: createType({
            name: 'uint16',
            serialize: function (buffer, data) { buffer.pushUint16(checkRange(data, data & 0xffff)); },
            deserialize: function (buffer) { return buffer.getUint16(); },
        }),
        int16: createType({
            name: 'int16',
            serialize: function (buffer, data) { buffer.pushUint16(checkRange(data, data << 16 >> 16)); },
            deserialize: function (buffer) { return buffer.getUint16() << 16 >> 16; },
        }),
        uint32: createType({
            name: 'uint32',
            serialize: function (buffer, data) { buffer.pushUint32(checkRange(data, data >>> 0)); },
            deserialize: function (buffer) { return buffer.getUint32(); },
        }),
        uint64: createType({
            name: 'uint64',
            serialize: function (buffer, data) {
                buffer.pushArray(numeric.decimalToBinary(8, '' + data));
            },
            deserialize: function (buffer) { return numeric.binaryToDecimal(buffer.getUint8Array(8)); },
        }),
        int64: createType({
            name: 'int64',
            serialize: function (buffer, data) {
                buffer.pushArray(numeric.signedDecimalToBinary(8, '' + data));
            },
            deserialize: function (buffer) { return numeric.signedBinaryToDecimal(buffer.getUint8Array(8)); },
        }),
        int32: createType({
            name: 'int32',
            serialize: function (buffer, data) { buffer.pushUint32(checkRange(data, data | 0)); },
            deserialize: function (buffer) { return buffer.getUint32() | 0; },
        }),
        varuint32: createType({
            name: 'varuint32',
            serialize: function (buffer, data) { buffer.pushVaruint32(checkRange(data, data >>> 0)); },
            deserialize: function (buffer) { return buffer.getVaruint32(); },
        }),
        varint32: createType({
            name: 'varint32',
            serialize: function (buffer, data) { buffer.pushVarint32(checkRange(data, data | 0)); },
            deserialize: function (buffer) { return buffer.getVarint32(); },
        }),
        uint128: createType({
            name: 'uint128',
            serialize: function (buffer, data) { buffer.pushArray(numeric.decimalToBinary(16, '' + data)); },
            deserialize: function (buffer) { return numeric.binaryToDecimal(buffer.getUint8Array(16)); },
        }),
        int128: createType({
            name: 'int128',
            serialize: function (buffer, data) {
                buffer.pushArray(numeric.signedDecimalToBinary(16, '' + data));
            },
            deserialize: function (buffer) { return numeric.signedBinaryToDecimal(buffer.getUint8Array(16)); },
        }),
        float32: createType({
            name: 'float32',
            serialize: function (buffer, data) { buffer.pushFloat32(data); },
            deserialize: function (buffer) { return buffer.getFloat32(); },
        }),
        float64: createType({
            name: 'float64',
            serialize: function (buffer, data) { buffer.pushFloat64(data); },
            deserialize: function (buffer) { return buffer.getFloat64(); },
        }),
        float128: createType({
            name: 'float128',
            serialize: function (buffer, data) { buffer.pushUint8ArrayChecked(exports.hexToUint8Array(data), 16); },
            deserialize: function (buffer) { return exports.arrayToHex(buffer.getUint8Array(16)); },
        }),
        bytes: createType({
            name: 'bytes',
            serialize: function (buffer, data) {
                if (data instanceof Uint8Array || Array.isArray(data)) {
                    buffer.pushBytes(data);
                }
                else {
                    buffer.pushBytes(exports.hexToUint8Array(data));
                }
            },
            deserialize: function (buffer, state) {
                if (state && state.options.bytesAsUint8Array) {
                    return buffer.getBytes();
                }
                else {
                    return exports.arrayToHex(buffer.getBytes());
                }
            },
        }),
        string: createType({
            name: 'string',
            serialize: function (buffer, data) { buffer.pushString(data); },
            deserialize: function (buffer) { return buffer.getString(); },
        }),
        name: createType({
            name: 'name',
            serialize: function (buffer, data) { buffer.pushName(data); },
            deserialize: function (buffer) { return buffer.getName(); },
        }),
        time_point: createType({
            name: 'time_point',
            serialize: function (buffer, data) { buffer.pushNumberAsUint64(exports.dateToTimePoint(data)); },
            deserialize: function (buffer) { return exports.timePointToDate(buffer.getUint64AsNumber()); },
        }),
        time_point_sec: createType({
            name: 'time_point_sec',
            serialize: function (buffer, data) { buffer.pushUint32(exports.dateToTimePointSec(data)); },
            deserialize: function (buffer) { return exports.timePointSecToDate(buffer.getUint32()); },
        }),
        block_timestamp_type: createType({
            name: 'block_timestamp_type',
            serialize: function (buffer, data) { buffer.pushUint32(exports.dateToBlockTimestamp(data)); },
            deserialize: function (buffer) { return exports.blockTimestampToDate(buffer.getUint32()); },
        }),
        symbol_code: createType({
            name: 'symbol_code',
            serialize: function (buffer, data) { buffer.pushSymbolCode(data); },
            deserialize: function (buffer) { return buffer.getSymbolCode(); },
        }),
        symbol: createType({
            name: 'symbol',
            serialize: function (buffer, data) { buffer.pushSymbol(exports.stringToSymbol(data)); },
            deserialize: function (buffer) { return exports.symbolToString(buffer.getSymbol()); },
        }),
        asset: createType({
            name: 'asset',
            serialize: function (buffer, data) { buffer.pushAsset(data); },
            deserialize: function (buffer) { return buffer.getAsset(); },
        }),
        checksum160: createType({
            name: 'checksum160',
            serialize: function (buffer, data) { buffer.pushUint8ArrayChecked(exports.hexToUint8Array(data), 20); },
            deserialize: function (buffer) { return exports.arrayToHex(buffer.getUint8Array(20)); },
        }),
        checksum256: createType({
            name: 'checksum256',
            serialize: function (buffer, data) { buffer.pushUint8ArrayChecked(exports.hexToUint8Array(data), 32); },
            deserialize: function (buffer) { return exports.arrayToHex(buffer.getUint8Array(32)); },
        }),
        checksum512: createType({
            name: 'checksum512',
            serialize: function (buffer, data) { buffer.pushUint8ArrayChecked(exports.hexToUint8Array(data), 64); },
            deserialize: function (buffer) { return exports.arrayToHex(buffer.getUint8Array(64)); },
        }),
        public_key: createType({
            name: 'public_key',
            serialize: function (buffer, data) { buffer.pushPublicKey(data); },
            deserialize: function (buffer) { return buffer.getPublicKey(); },
        }),
        private_key: createType({
            name: 'private_key',
            serialize: function (buffer, data) { buffer.pushPrivateKey(data); },
            deserialize: function (buffer) { return buffer.getPrivateKey(); },
        }),
        signature: createType({
            name: 'signature',
            serialize: function (buffer, data) { buffer.pushSignature(data); },
            deserialize: function (buffer) { return buffer.getSignature(); },
        }),
    }));
    result.set('extended_asset', createType({
        name: 'extended_asset',
        baseName: '',
        fields: [
            { name: 'quantity', typeName: 'asset', type: result.get('asset') },
            { name: 'contract', typeName: 'name', type: result.get('name') },
        ],
        serialize: serializeStruct,
        deserialize: deserializeStruct,
    }));
    return result;
}; // createInitialTypes()
exports.createInitialTypes = createInitialTypes;
var createAbiTypes = function () {
    var initialTypes = exports.createInitialTypes();
    initialTypes.set('extensions_entry', createType({
        name: 'extensions_entry',
        baseName: '',
        fields: [
            { name: 'tag', typeName: 'uint16', type: null },
            { name: 'value', typeName: 'bytes', type: null }
        ],
        serialize: serializeStruct,
        deserialize: deserializeStruct,
    }));
    initialTypes.set('type_def', createType({
        name: 'type_def',
        baseName: '',
        fields: [
            { name: 'new_type_name', typeName: 'string', type: null },
            { name: 'type', typeName: 'string', type: null }
        ],
        serialize: serializeStruct,
        deserialize: deserializeStruct,
    }));
    initialTypes.set('field_def', createType({
        name: 'field_def',
        baseName: '',
        fields: [
            { name: 'name', typeName: 'string', type: null },
            { name: 'type', typeName: 'string', type: null }
        ],
        serialize: serializeStruct,
        deserialize: deserializeStruct,
    }));
    initialTypes.set('struct_def', createType({
        name: 'struct_def',
        baseName: '',
        fields: [
            { name: 'name', typeName: 'string', type: null },
            { name: 'base', typeName: 'string', type: null },
            { name: 'fields', typeName: 'field_def[]', type: null }
        ],
        serialize: serializeStruct,
        deserialize: deserializeStruct,
    }));
    initialTypes.set('action_def', createType({
        name: 'action_def',
        baseName: '',
        fields: [
            { name: 'name', typeName: 'name', type: null },
            { name: 'type', typeName: 'string', type: null },
            { name: 'ricardian_contract', typeName: 'string', type: null }
        ],
        serialize: serializeStruct,
        deserialize: deserializeStruct,
    }));
    initialTypes.set('table_def', createType({
        name: 'table_def',
        baseName: '',
        fields: [
            { name: 'name', typeName: 'name', type: null },
            { name: 'index_type', typeName: 'string', type: null },
            { name: 'key_names', typeName: 'string[]', type: null },
            { name: 'key_types', typeName: 'string[]', type: null },
            { name: 'type', typeName: 'string', type: null }
        ],
        serialize: serializeStruct,
        deserialize: deserializeStruct,
    }));
    initialTypes.set('clause_pair', createType({
        name: 'clause_pair',
        baseName: '',
        fields: [
            { name: 'id', typeName: 'string', type: null },
            { name: 'body', typeName: 'string', type: null }
        ],
        serialize: serializeStruct,
        deserialize: deserializeStruct,
    }));
    initialTypes.set('error_message', createType({
        name: 'error_message',
        baseName: '',
        fields: [
            { name: 'error_code', typeName: 'uint64', type: null },
            { name: 'error_msg', typeName: 'string', type: null }
        ],
        serialize: serializeStruct,
        deserialize: deserializeStruct,
    }));
    initialTypes.set('variant_def', createType({
        name: 'variant_def',
        baseName: '',
        fields: [
            { name: 'name', typeName: 'string', type: null },
            { name: 'types', typeName: 'string[]', type: null }
        ],
        serialize: serializeStruct,
        deserialize: deserializeStruct,
    }));
    initialTypes.set('action_result', createType({
        name: 'action_result',
        baseName: '',
        fields: [
            { name: 'name', typeName: 'name', type: null },
            { name: 'result_type', typeName: 'string', type: null }
        ],
        serialize: serializeStruct,
        deserialize: deserializeStruct,
    }));
    initialTypes.set('primary_key_index_def', createType({
        name: 'primary_key_index_def',
        baseName: '',
        fields: [
            { name: 'name', typeName: 'name', type: null },
            { name: 'type', typeName: 'string', type: null }
        ],
        serialize: serializeStruct,
        deserialize: deserializeStruct,
    }));
    initialTypes.set('secondary_index_def', createType({
        name: 'secondary_index_def',
        baseName: '',
        fields: [
            { name: 'type', typeName: 'string', type: null },
        ],
        serialize: serializeStruct,
        deserialize: deserializeStruct,
    }));
    initialTypes.set('secondary_indices', createType({
        name: 'secondary_indices',
        baseName: '',
        fields: [
            { name: 'name', typeName: 'name', type: null },
            { name: 'secondary_index_def', typeName: 'secondary_index_def', type: null }
        ],
        serialize: serializeObject,
        deserialize: deserializeObject,
    }));
    initialTypes.set('kv_table_entry_def', createType({
        name: 'kv_table_entry_def',
        baseName: '',
        fields: [
            { name: 'type', typeName: 'string', type: null },
            { name: 'primary_index', typeName: 'primary_key_index_def', type: null },
            { name: 'secondary_indices', typeName: 'secondary_indices', type: null }
        ],
        serialize: serializeStruct,
        deserialize: deserializeStruct,
    }));
    initialTypes.set('kv_table', createType({
        name: 'kv_table',
        baseName: '',
        fields: [
            { name: 'name', typeName: 'name', type: null },
            { name: 'kv_table_entry_def', typeName: 'kv_table_entry_def', type: null }
        ],
        serialize: serializeObject,
        deserialize: deserializeObject
    }));
    initialTypes.set('abi_def', createType({
        name: 'abi_def',
        baseName: '',
        fields: [
            { name: 'version', typeName: 'string', type: null },
            { name: 'types', typeName: 'type_def[]', type: null },
            { name: 'structs', typeName: 'struct_def[]', type: null },
            { name: 'actions', typeName: 'action_def[]', type: null },
            { name: 'tables', typeName: 'table_def[]', type: null },
            { name: 'ricardian_clauses', typeName: 'clause_pair[]', type: null },
            { name: 'error_messages', typeName: 'error_message[]', type: null },
            { name: 'abi_extensions', typeName: 'extensions_entry[]', type: null },
            { name: 'variants', typeName: 'variant_def[]$', type: null },
            { name: 'action_results', typeName: 'action_result[]$', type: null },
            { name: 'kv_tables', typeName: 'kv_table$', type: null },
        ],
        serialize: serializeStruct,
        deserialize: deserializeStruct,
    }));
    return initialTypes;
};
exports.createAbiTypes = createAbiTypes;
var createTransactionExtensionTypes = function () {
    var initialTypes = exports.createInitialTypes();
    initialTypes.set('resource_payer', createType({
        name: 'resource_payer',
        baseName: '',
        fields: [
            { name: 'payer', typeName: 'name', type: null },
            { name: 'max_net_bytes', typeName: 'uint64', type: null },
            { name: 'max_cpu_us', typeName: 'uint64', type: null },
            { name: 'max_memory_bytes', typeName: 'uint64', type: null },
        ],
        serialize: serializeStruct,
        deserialize: deserializeStruct,
    }));
    return initialTypes;
};
exports.createTransactionExtensionTypes = createTransactionExtensionTypes;
var createTransactionTypes = function () {
    var initialTypes = exports.createInitialTypes();
    initialTypes.set('permission_level', createType({
        name: 'permission_level',
        baseName: '',
        fields: [
            { name: 'actor', typeName: 'name', type: null },
            { name: 'permission', typeName: 'name', type: null },
        ],
        serialize: serializeStruct,
        deserialize: deserializeStruct,
    }));
    initialTypes.set('action', createType({
        name: 'action',
        baseName: '',
        fields: [
            { name: 'account', typeName: 'name', type: null },
            { name: 'name', typeName: 'name', type: null },
            { name: 'authorization', typeName: 'permission_level[]', type: null },
            { name: 'data', typeName: 'bytes', type: null },
        ],
        serialize: serializeStruct,
        deserialize: deserializeStruct,
    }));
    initialTypes.set('extension', createType({
        name: 'extension',
        baseName: '',
        fields: [
            { name: 'type', typeName: 'uint16', type: null },
            { name: 'data', typeName: 'bytes', type: null },
        ],
        serialize: serializePair,
        deserialize: deserializePair,
    }));
    initialTypes.set('transaction_header', createType({
        name: 'transaction_header',
        baseName: '',
        fields: [
            { name: 'expiration', typeName: 'time_point_sec', type: null },
            { name: 'ref_block_num', typeName: 'uint16', type: null },
            { name: 'ref_block_prefix', typeName: 'uint32', type: null },
            { name: 'max_net_usage_words', typeName: 'varuint32', type: null },
            { name: 'max_cpu_usage_ms', typeName: 'uint8', type: null },
            { name: 'delay_sec', typeName: 'varuint32', type: null },
        ],
        serialize: serializeStruct,
        deserialize: deserializeStruct,
    }));
    initialTypes.set('transaction', createType({
        name: 'transaction',
        baseName: 'transaction_header',
        fields: [
            { name: 'context_free_actions', typeName: 'action[]', type: null },
            { name: 'actions', typeName: 'action[]', type: null },
            { name: 'transaction_extensions', typeName: 'extension', type: null }
        ],
        serialize: serializeStruct,
        deserialize: deserializeStruct,
    }));
    return initialTypes;
};
exports.createTransactionTypes = createTransactionTypes;
/** Get type from `types` */
var getType = function (types, name) {
    var type = types.get(name);
    if (type && type.aliasOfName) {
        return exports.getType(types, type.aliasOfName);
    }
    if (type) {
        return type;
    }
    if (name.endsWith('[]')) {
        return createType({
            name: name,
            arrayOf: exports.getType(types, name.substr(0, name.length - 2)),
            serialize: serializeArray,
            deserialize: deserializeArray,
        });
    }
    if (name.endsWith('?')) {
        return createType({
            name: name,
            optionalOf: exports.getType(types, name.substr(0, name.length - 1)),
            serialize: serializeOptional,
            deserialize: deserializeOptional,
        });
    }
    if (name.endsWith('$')) {
        return createType({
            name: name,
            extensionOf: exports.getType(types, name.substr(0, name.length - 1)),
            serialize: serializeExtension,
            deserialize: deserializeExtension,
        });
    }
    throw new Error('Unknown type: ' + name);
};
exports.getType = getType;
/**
 * Get types from abi
 *
 * @param initialTypes Set of types to build on.
 * In most cases, it's best to fill this from a fresh call to `getTypesFromAbi()`.
 */
var getTypesFromAbi = function (initialTypes, abi) {
    var e_6, _a, e_7, _b, e_8, _c, e_9, _d, e_10, _e;
    var types = new Map(initialTypes);
    if (abi && abi.types) {
        try {
            for (var _f = __values(abi.types), _g = _f.next(); !_g.done; _g = _f.next()) {
                var _h = _g.value, new_type_name = _h.new_type_name, type = _h.type;
                types.set(new_type_name, createType({ name: new_type_name, aliasOfName: type }));
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (_g && !_g.done && (_a = _f.return)) _a.call(_f);
            }
            finally { if (e_6) throw e_6.error; }
        }
    }
    if (abi && abi.structs) {
        try {
            for (var _j = __values(abi.structs), _k = _j.next(); !_k.done; _k = _j.next()) {
                var _l = _k.value, name_1 = _l.name, base = _l.base, fields = _l.fields;
                types.set(name_1, createType({
                    name: name_1,
                    baseName: base,
                    fields: fields.map(function (_a) {
                        var n = _a.name, type = _a.type;
                        return ({ name: n, typeName: type, type: null });
                    }),
                    serialize: serializeStruct,
                    deserialize: deserializeStruct,
                }));
            }
        }
        catch (e_7_1) { e_7 = { error: e_7_1 }; }
        finally {
            try {
                if (_k && !_k.done && (_b = _j.return)) _b.call(_j);
            }
            finally { if (e_7) throw e_7.error; }
        }
    }
    if (abi && abi.variants) {
        try {
            for (var _m = __values(abi.variants), _o = _m.next(); !_o.done; _o = _m.next()) {
                var _p = _o.value, name_2 = _p.name, t = _p.types;
                types.set(name_2, createType({
                    name: name_2,
                    fields: t.map(function (s) { return ({ name: s, typeName: s, type: null }); }),
                    serialize: serializeVariant,
                    deserialize: deserializeVariant,
                }));
            }
        }
        catch (e_8_1) { e_8 = { error: e_8_1 }; }
        finally {
            try {
                if (_o && !_o.done && (_c = _m.return)) _c.call(_m);
            }
            finally { if (e_8) throw e_8.error; }
        }
    }
    try {
        for (var types_1 = __values(types), types_1_1 = types_1.next(); !types_1_1.done; types_1_1 = types_1.next()) {
            var _q = __read(types_1_1.value, 2), name_3 = _q[0], type = _q[1];
            if (type.baseName) {
                type.base = exports.getType(types, type.baseName);
            }
            try {
                for (var _r = (e_10 = void 0, __values(type.fields)), _s = _r.next(); !_s.done; _s = _r.next()) {
                    var field = _s.value;
                    field.type = exports.getType(types, field.typeName);
                }
            }
            catch (e_10_1) { e_10 = { error: e_10_1 }; }
            finally {
                try {
                    if (_s && !_s.done && (_e = _r.return)) _e.call(_r);
                }
                finally { if (e_10) throw e_10.error; }
            }
        }
    }
    catch (e_9_1) { e_9 = { error: e_9_1 }; }
    finally {
        try {
            if (types_1_1 && !types_1_1.done && (_d = types_1.return)) _d.call(types_1);
        }
        finally { if (e_9) throw e_9.error; }
    }
    return types;
}; // getTypesFromAbi
exports.getTypesFromAbi = getTypesFromAbi;
var reverseHex = function (h) {
    return h.substr(6, 2) + h.substr(4, 2) + h.substr(2, 2) + h.substr(0, 2);
};
/** TAPoS: Return transaction fields which reference `refBlock` and expire `expireSeconds` after `timestamp` */
var transactionHeader = function (refBlock, expireSeconds) {
    var timestamp = refBlock.header ? refBlock.header.timestamp : refBlock.timestamp;
    var prefix = parseInt(reverseHex(refBlock.id.substr(16, 8)), 16);
    return {
        expiration: exports.timePointSecToDate(exports.dateToTimePointSec(timestamp) + expireSeconds),
        ref_block_num: refBlock.block_num & 0xffff,
        ref_block_prefix: prefix,
    };
};
exports.transactionHeader = transactionHeader;
/** Convert action data to serialized form (hex) */
var serializeActionData = function (contract, account, name, data, textEncoder, textDecoder) {
    var action = contract.actions.get(name);
    if (!action) {
        throw new Error("Unknown action " + name + " in contract " + account);
    }
    var buffer = new SerialBuffer({ textEncoder: textEncoder, textDecoder: textDecoder });
    action.serialize(buffer, data);
    return exports.arrayToHex(buffer.asUint8Array());
};
exports.serializeActionData = serializeActionData;
/** Return action in serialized form */
var serializeAction = function (contract, account, name, authorization, data, textEncoder, textDecoder) {
    return {
        account: account,
        name: name,
        authorization: authorization,
        data: exports.serializeActionData(contract, account, name, data, textEncoder, textDecoder),
    };
};
exports.serializeAction = serializeAction;
/** Deserialize action data. If `data` is a `string`, then it's assumed to be in hex. */
var deserializeActionData = function (contract, account, name, data, textEncoder, textDecoder) {
    var action = contract.actions.get(name);
    if (typeof data === 'string') {
        data = exports.hexToUint8Array(data);
    }
    if (!action) {
        throw new Error("Unknown action " + name + " in contract " + account);
    }
    var buffer = new SerialBuffer({ textDecoder: textDecoder, textEncoder: textEncoder });
    buffer.pushArray(data);
    return action.deserialize(buffer);
};
exports.deserializeActionData = deserializeActionData;
/** Deserialize action. If `data` is a `string`, then it's assumed to be in hex. */
var deserializeAction = function (contract, account, name, authorization, data, textEncoder, textDecoder) {
    return {
        account: account,
        name: name,
        authorization: authorization,
        data: exports.deserializeActionData(contract, account, name, data, textEncoder, textDecoder),
    };
};
exports.deserializeAction = deserializeAction;
var serializeAnyvar = function (buffer, anyvar) {
    var _a, _b, _c, _d, _e, _f, _g;
    var def;
    var value;
    if (anyvar === null) {
        _a = __read([anyvarDefs.null_t, anyvar], 2), def = _a[0], value = _a[1];
    }
    else if (typeof anyvar === 'string') {
        _b = __read([anyvarDefs.string, anyvar], 2), def = _b[0], value = _b[1];
    }
    else if (typeof anyvar === 'number') {
        _c = __read([anyvarDefs.int32, anyvar], 2), def = _c[0], value = _c[1];
    }
    else if (anyvar instanceof Uint8Array) {
        _d = __read([anyvarDefs.bytes, anyvar], 2), def = _d[0], value = _d[1];
    }
    else if (Array.isArray(anyvar)) {
        _e = __read([anyvarDefs.any_array, anyvar], 2), def = _e[0], value = _e[1];
    }
    else if (Object.keys(anyvar).length === 2 && anyvar.hasOwnProperty('type') && anyvar.hasOwnProperty('value')) {
        _f = __read([anyvarDefs[anyvar.type], anyvar.value], 2), def = _f[0], value = _f[1];
    }
    else {
        _g = __read([anyvarDefs.any_object, anyvar], 2), def = _g[0], value = _g[1];
    }
    buffer.pushVaruint32(def.index);
    def.type.serialize(buffer, value);
};
exports.serializeAnyvar = serializeAnyvar;
var deserializeAnyvar = function (buffer, state) {
    var defIndex = buffer.getVaruint32();
    if (defIndex >= anyvarDefsByIndex.length) {
        throw new Error('Tried to deserialize unknown anyvar type');
    }
    var def = anyvarDefsByIndex[defIndex];
    var value = def.type.deserialize(buffer, state);
    if (state && state.options.useShortForm || def.useShortForm) {
        return value;
    }
    else {
        return { type: def.type.name, value: value };
    }
};
exports.deserializeAnyvar = deserializeAnyvar;
var deserializeAnyvarShort = function (buffer) {
    return exports.deserializeAnyvar(buffer, new SerializerState({ useShortForm: true }));
};
exports.deserializeAnyvarShort = deserializeAnyvarShort;
var serializeAnyObject = function (buffer, obj) {
    var e_11, _a;
    var entries = Object.entries(obj);
    buffer.pushVaruint32(entries.length);
    try {
        for (var entries_2 = __values(entries), entries_2_1 = entries_2.next(); !entries_2_1.done; entries_2_1 = entries_2.next()) {
            var _b = __read(entries_2_1.value, 2), key = _b[0], value = _b[1];
            buffer.pushString(key);
            exports.serializeAnyvar(buffer, value);
        }
    }
    catch (e_11_1) { e_11 = { error: e_11_1 }; }
    finally {
        try {
            if (entries_2_1 && !entries_2_1.done && (_a = entries_2.return)) _a.call(entries_2);
        }
        finally { if (e_11) throw e_11.error; }
    }
};
exports.serializeAnyObject = serializeAnyObject;
var deserializeAnyObject = function (buffer, state) {
    var len = buffer.getVaruint32();
    var result = {};
    for (var i = 0; i < len; ++i) {
        var key = buffer.getString();
        if (key in result) {
            var j = 1;
            while (key + '_' + j in result) {
                ++j;
            }
            key = key + '_' + j;
        }
        result[key] = exports.deserializeAnyvar(buffer, state);
    }
    return result;
};
exports.deserializeAnyObject = deserializeAnyObject;
var serializeAnyArray = function (buffer, arr) {
    var e_12, _a;
    buffer.pushVaruint32(arr.length);
    try {
        for (var arr_1 = __values(arr), arr_1_1 = arr_1.next(); !arr_1_1.done; arr_1_1 = arr_1.next()) {
            var x = arr_1_1.value;
            exports.serializeAnyvar(buffer, x);
        }
    }
    catch (e_12_1) { e_12 = { error: e_12_1 }; }
    finally {
        try {
            if (arr_1_1 && !arr_1_1.done && (_a = arr_1.return)) _a.call(arr_1);
        }
        finally { if (e_12) throw e_12.error; }
    }
};
exports.serializeAnyArray = serializeAnyArray;
var deserializeAnyArray = function (buffer, state) {
    var len = buffer.getVaruint32();
    var result = [];
    for (var i = 0; i < len; ++i) {
        result.push(exports.deserializeAnyvar(buffer, state));
    }
    return result;
};
exports.deserializeAnyArray = deserializeAnyArray;
var addAdditionalTypes = function () {
    var initialTypes = exports.createInitialTypes();
    initialTypes.set('null_t', createType({
        name: 'null_t',
        serialize: function (buffer, anyvar) { },
        deserialize: function (buffer, state) { }
    }));
    initialTypes.set('any_object', createType({
        name: 'any_object',
        serialize: exports.serializeAnyObject,
        deserialize: exports.deserializeAnyObject
    }));
    initialTypes.set('any_array', createType({
        name: 'any_array',
        serialize: exports.serializeAnyArray,
        deserialize: exports.deserializeAnyArray
    }));
    return initialTypes;
};
var additionalTypes = addAdditionalTypes();
var anyvarDefs = {
    null_t: { index: 0, useShortForm: true, type: additionalTypes.get('null_t') },
    int64: { index: 1, useShortForm: false, type: additionalTypes.get('int64') },
    uint64: { index: 2, useShortForm: false, type: additionalTypes.get('uint64') },
    int32: { index: 3, useShortForm: true, type: additionalTypes.get('int32') },
    uint32: { index: 4, useShortForm: false, type: additionalTypes.get('uint32') },
    int16: { index: 5, useShortForm: false, type: additionalTypes.get('int16') },
    uint16: { index: 6, useShortForm: false, type: additionalTypes.get('uint16') },
    int8: { index: 7, useShortForm: false, type: additionalTypes.get('int8') },
    uint8: { index: 8, useShortForm: false, type: additionalTypes.get('uint8') },
    time_point: { index: 9, useShortForm: false, type: additionalTypes.get('time_point') },
    checksum256: { index: 10, useShortForm: false, type: additionalTypes.get('checksum256') },
    float64: { index: 11, useShortForm: false, type: additionalTypes.get('float64') },
    string: { index: 12, useShortForm: true, type: additionalTypes.get('string') },
    any_object: { index: 13, useShortForm: true, type: additionalTypes.get('any_object') },
    any_array: { index: 14, useShortForm: true, type: additionalTypes.get('any_array') },
    bytes: { index: 15, useShortForm: false, type: additionalTypes.get('bytes') },
    symbol: { index: 16, useShortForm: false, type: additionalTypes.get('symbol') },
    symbol_code: { index: 17, useShortForm: false, type: additionalTypes.get('symbol_code') },
    asset: { index: 18, useShortForm: false, type: additionalTypes.get('asset') },
};
var anyvarDefsByIndex = [
    anyvarDefs.null_t,
    anyvarDefs.int64,
    anyvarDefs.uint64,
    anyvarDefs.int32,
    anyvarDefs.uint32,
    anyvarDefs.int16,
    anyvarDefs.uint16,
    anyvarDefs.int8,
    anyvarDefs.uint8,
    anyvarDefs.time_point,
    anyvarDefs.checksum256,
    anyvarDefs.float64,
    anyvarDefs.string,
    anyvarDefs.any_object,
    anyvarDefs.any_array,
    anyvarDefs.bytes,
    anyvarDefs.symbol,
    anyvarDefs.symbol_code,
    anyvarDefs.asset,
];
var serializeQuery = function (buffer, query) {
    var _a, _b, _c, e_13, _d;
    var method;
    var arg;
    var filter;
    if (typeof query === 'string') {
        method = query;
    }
    else if (Array.isArray(query) && query.length === 2) {
        _a = __read(query, 2), method = _a[0], filter = _a[1];
    }
    else if (Array.isArray(query) && query.length === 3) {
        _b = __read(query, 3), method = _b[0], arg = _b[1], filter = _b[2];
    }
    else {
        _c = __read([query.method, query.arg, query.filter], 3), method = _c[0], arg = _c[1], filter = _c[2];
    }
    buffer.pushString(method);
    if (arg === undefined) {
        buffer.push(0);
    }
    else {
        buffer.push(1);
        exports.serializeAnyvar(buffer, arg);
    }
    if (filter === undefined) {
        buffer.push(0);
    }
    else {
        buffer.pushVaruint32(filter.length);
        try {
            for (var filter_1 = __values(filter), filter_1_1 = filter_1.next(); !filter_1_1.done; filter_1_1 = filter_1.next()) {
                var q = filter_1_1.value;
                exports.serializeQuery(buffer, q);
            }
        }
        catch (e_13_1) { e_13 = { error: e_13_1 }; }
        finally {
            try {
                if (filter_1_1 && !filter_1_1.done && (_d = filter_1.return)) _d.call(filter_1);
            }
            finally { if (e_13) throw e_13.error; }
        }
    }
};
exports.serializeQuery = serializeQuery;


/***/ }),

/***/ "./src/ripemd.js":
/*!***********************!*\
  !*** ./src/ripemd.js ***!
  \***********************/
/***/ ((module) => {

// https://gist.githubusercontent.com/wlzla000/bac83df6d3c51916c4dd0bc947e46947/raw/7ee3462b095ab22580ddaf191f44a590da6fe33b/RIPEMD-160.js

/*
	RIPEMD-160.js

		developed
			by K. (https://github.com/wlzla000)
			on December 27-29, 2017,

		licensed under


		the MIT license

		Copyright (c) 2017 K.

		 Permission is hereby granted, free of charge, to any person
		obtaining a copy of this software and associated documentation
		files (the "Software"), to deal in the Software without
		restriction, including without limitation the rights to use,
		copy, modify, merge, publish, distribute, sublicense, and/or
		sell copies of the Software, and to permit persons to whom the
		Software is furnished to do so, subject to the following
		conditions:

		 The above copyright notice and this permission notice shall be
		included in all copies or substantial portions of the Software.

		 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
		EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
		OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
		NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
		HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
		WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
		FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
		OTHER DEALINGS IN THE SOFTWARE.
*/



class RIPEMD160
{
    constructor()
    {
        // https://webcache.googleusercontent.com/search?q=cache:CnLOgolTHYEJ:https://www.cosic.esat.kuleuven.be/publications/article-317.pdf
        // http://shodhganga.inflibnet.ac.in/bitstream/10603/22978/13/13_appendix.pdf
    }

    static get_n_pad_bytes(message_size /* in bytes, 1 byte is 8 bits. */)
    {
        //  Obtain the number of bytes needed to pad the message.
        // It does not contain the size of the message size information.
        /*
			https://webcache.googleusercontent.com/search?q=cache:CnLOgolTHYEJ:https://www.cosic.esat.kuleuven.be/publications/article-317.pdf

			The Cryptographic Hash Function RIPEMD-160

			written by
				Bart Preneel,
				Hans Dobbertin,
				Antoon Bosselaers
			in
				1997.

			--------------------------------------------------

			§5     Description of RIPEMD-160

			......

			 In order to guarantee that the total input size is a
			multiple of 512 bits, the input is padded in the same
			way as for all the members of the MD4-family: one
			appends a single 1 followed by a string of 0s (the
			number of 0s lies between 0 and 511); the last 64 bits
			of the extended input contain the binary representation
			of the input size in bits, least significant byte first.
		*/
        /*
			https://tools.ietf.org/rfc/rfc1186.txt

			RFC 1186: MD4 Message Digest Algorithm.

			written by
				Ronald Linn Rivest
			in
				October 1990.

			--------------------------------------------------

			§3     MD4 Algorithm Description

			......

			Step 1. Append padding bits

			 The message is "padded" (extended) so that its length
			(in bits) is congruent to 448, modulo 512. That is, the
			message is extended so that it is just 64 bits shy of
			being a multiple of 512 bits long. Padding is always
			performed, even if the length of the message is already
			congruent to 448, modulo 512 (in which case 512 bits of
			padding are added).

			 Padding is performed as follows: a single "1" bit is
			appended to the message, and then enough zero bits are
			appended so that the length in bits of the padded
			message becomes congruent to 448, modulo 512.

			Step 2. Append length

			 A 64-bit representation of b (the length of the message
			before the padding bits were added) is appended to the
			result of the previous step. In the unlikely event that
			b is greater than 2^64, then only the low-order 64 bits
			of b are used. (These bits are appended as two 32-bit
			words and appended low-order word first in accordance
			with the previous conventions.)

			 At this point the resulting message (after padding with
			bits and with b) has a length that is an exact multiple
			of 512 bits. Equivalently, this message has a length
			that is an exact multiple of 16 (32-bit) words. Let
			M[0 ... N-1] denote the words of the resulting message,
			where N is a multiple of 16.
		*/
        // https://crypto.stackexchange.com/a/32407/54568
        /*
			Example case  # 1
				[0 bit: message.]
				[1 bit: 1.]
				[447 bits: 0.]
				[64 bits: message size information.]

			Example case  # 2
				[512-bits: message]
				[1 bit: 1.]
				[447 bits: 0.]
				[64 bits: message size information.]

			Example case  # 3
				[(512 - 64 = 448) bits: message.]
				[1 bit: 1.]
				[511 bits: 0.]
				[64 bits: message size information.]

			Example case  # 4
				[(512 - 65 = 447) bits: message.]
				[1 bit: 1.]
				[0 bit: 0.]
				[64 bits: message size information.]
		*/
        // The number of padding zero bits:
        //      511 - [{(message size in bits) + 64} (mod 512)]
        return 64 - ((message_size + 8) & 0b00111111 /* 63 */);
    }
    static pad(message /* An ArrayBuffer. */)
    {
        const message_size = message.byteLength;
        const n_pad = RIPEMD160.get_n_pad_bytes(message_size);

        //  `Number.MAX_SAFE_INTEGER` is ((2 ** 53) - 1) and
        // bitwise operation in Javascript is done on 32-bits operands.
        const divmod = (dividend, divisor) => [
            Math.floor(dividend / divisor),
            dividend % divisor
        ];
        /*
To shift

   00000000 000????? ???????? ???????? ???????? ???????? ???????? ????????
                                     t o
   00000000 ???????? ???????? ???????? ???????? ???????? ???????? ?????000

--------------------------------------------------------------------------------

Method #1

    00000000 000????? ???????? ????????  ???????? ???????? ???????? ????????
   [00000000 000AAAAA AAAAAAAA AAAAAAAA] (<A> captured)
   [00000000 AAAAAAAA AAAAAAAA AAAAA000] (<A> shifted)
                         (<B> captured) [BBBBBBBB BBBBBBBB BBBBBBBB BBBBBBBB]
                     (<B> shifted) [BBB][BBBBBBBB BBBBBBBB BBBBBBBB BBBBB000]
   [00000000 AAAAAAAA AAAAAAAA AAAAABBB] (<A> & <B_2> merged)
   [00000000 AAAAAAAA AAAAAAAA AAAAABBB][BBBBBBBB BBBBBBBB BBBBBBBB BBBBB000]
    00000000 ???????? ???????? ????????  ???????? ???????? ???????? ?????000

		const uint32_max_plus_1 = 0x100000000; // (2 ** 32)
		const [
			msg_byte_size_most, // Value range [0, (2 ** 21) - 1].
			msg_byte_size_least // Value range [0, (2 ** 32) - 1].
		] = divmod(message_size, uint32_max_plus_1);
		const [
			carry, // Value range [0, 7].
			msg_bit_size_least // Value range [0, (2 ** 32) - 8].
		] = divmod(message_byte_size_least * 8, uint32_max_plus_1);
		const message_bit_size_most = message_byte_size_most * 8
			+ carry; // Value range [0, (2 ** 24) - 1].

--------------------------------------------------------------------------------

Method #2
    00000000 000????? ???????? ????????  ???????? ???????? ???????? ????????
      [00000 000AAAAA AAAAAAAA AAAAAAAA  AAA] (<A> captured)
                         (<B> captured) [000BBBBB BBBBBBBB BBBBBBBB BBBBBBBB]
                          (<B> shifted) [BBBBBBBB BBBBBBBB BBBBBBBB BBBBB000]
   [00000000 AAAAAAAA AAAAAAAA AAAAAAAA][BBBBBBBB BBBBBBBB BBBBBBBB BBBBB000]
    00000000 ???????? ???????? ????????  ???????? ???????? ???????? ?????000

		*/
        const [
            msg_bit_size_most,
            msg_bit_size_least
        ] = divmod(message_size, 536870912 /* (2 ** 29) */)
            .map((x, index) => (index ? (x * 8) : x));

        // `ArrayBuffer.transfer()` is not supported.
        const padded = new Uint8Array(message_size + n_pad + 8);
        padded.set(new Uint8Array(message), 0);
        const data_view = new DataView(padded.buffer);
        data_view.setUint8(message_size, 0b10000000);
        data_view.setUint32(
            message_size + n_pad,
            msg_bit_size_least,
            true // Little-endian
        );
        data_view.setUint32(
            message_size + n_pad + 4,
            msg_bit_size_most,
            true // Little-endian
        );

        return padded.buffer;
    }

    static f(j, x, y, z)
    {
        if(0 <= j && j <= 15)
        { // Exclusive-OR
            return x ^ y ^ z;
        }
        if(16 <= j && j <= 31)
        { // Multiplexing (muxing)
            return (x & y) | (~x & z);
        }
        if(32 <= j && j <= 47)
        {
            return (x | ~y) ^ z;
        }
        if(48 <= j && j <= 63)
        { // Multiplexing (muxing)
            return (x & z) | (y & ~z);
        }
        if(64 <= j && j <= 79)
        {
            return x ^ (y | ~z);
        }
    }
    static K(j)
    {
        if(0 <= j && j <= 15)
        {
            return 0x00000000;
        }
        if(16 <= j && j <= 31)
        {
            // Math.floor((2 ** 30) * Math.SQRT2)
            return 0x5A827999;
        }
        if(32 <= j && j <= 47)
        {
            // Math.floor((2 ** 30) * Math.sqrt(3))
            return 0x6ED9EBA1;
        }
        if(48 <= j && j <= 63)
        {
            // Math.floor((2 ** 30) * Math.sqrt(5))
            return 0x8F1BBCDC;
        }
        if(64 <= j && j <= 79)
        {
            // Math.floor((2 ** 30) * Math.sqrt(7))
            return 0xA953FD4E;
        }
    }
    static KP(j) // K'
    {
        if(0 <= j && j <= 15)
        {
            // Math.floor((2 ** 30) * Math.cbrt(2))
            return 0x50A28BE6;
        }
        if(16 <= j && j <= 31)
        {
            // Math.floor((2 ** 30) * Math.cbrt(3))
            return 0x5C4DD124;
        }
        if(32 <= j && j <= 47)
        {
            // Math.floor((2 ** 30) * Math.cbrt(5))
            return 0x6D703EF3;
        }
        if(48 <= j && j <= 63)
        {
            // Math.floor((2 ** 30) * Math.cbrt(7))
            return 0x7A6D76E9;
        }
        if(64 <= j && j <= 79)
        {
            return 0x00000000;
        }
    }
    static add_modulo32(/* ...... */)
    {
        // 1.  Modulo addition (addition modulo) is associative.
        //    https://proofwiki.org/wiki/Modulo_Addition_is_Associative
 		// 2.  Bitwise operation in Javascript
        //    is done on 32-bits operands
        //    and results in a 32-bits value.
        return Array
            .from(arguments)
            .reduce((a, b) => (a + b), 0) | 0;
    }
    static rol32(value, count)
    { // Cyclic left shift (rotate) on 32-bits value.
        return (value << count) | (value >>> (32 - count));
    }
    static hash(message /* An ArrayBuffer. */)
    {
        // ////////       Padding       //////////

        // The padded message.
        const padded = RIPEMD160.pad(message);

        // ////////     Compression     //////////

        // Message word selectors.
        const r = [
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
            7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8,
            3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12,
            1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2,
            4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13
        ];
        const rP = [ // r'
            5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12,
            6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2,
            15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13,
            8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14,
            12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11
        ];

        // Amounts for 'rotate left' operation.
        const s = [
            11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8,
            7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12,
            11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5,
            11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12,
            9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6
        ];
        const sP = [ // s'
            8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6,
            9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11,
            9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5,
            15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8,
            8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11
        ];

        // The size, in bytes, of a word.
        const word_size = 4;

        // The size, in bytes, of a 16-words block.
        const block_size = 64;

        // The number of the 16-words blocks.
        const t = padded.byteLength / block_size;

        //  The message after padding consists of t 16-word blocks that
        // are denoted with X_i[j], with 0≤i≤(t − 1) and 0≤j≤15.
        const X = (new Array(t))
            .fill(undefined)
            .map((_, i) => j => (
                new DataView(
                    padded, i * block_size, block_size
                ).getUint32(
                    j * word_size,
                    true // Little-endian
                )
            ));

        //  The result of RIPEMD-160 is contained in five 32-bit words,
        // which form the internal state of the algorithm. The final
        // content of these five 32-bit words is converted to a 160-bit
        // string, again using the little-endian convention.
        const h = [
            0x67452301, // h_0
            0xEFCDAB89, // h_1
            0x98BADCFE, // h_2
            0x10325476, // h_3
            0xC3D2E1F0  // h_4
        ];

        for(let i = 0; i < t; ++i)
        {
            let A = h[0]; let B = h[1]; let C = h[2]; let D = h[3]; let E = h[4];
            let AP = A; let BP = B; let CP = C; let DP = D; let EP = E;
            for(let j = 0; j < 80; ++j)
            {
                // Left rounds
                let T = RIPEMD160.add_modulo32( // eslint-disable-line no-shadow
                    RIPEMD160.rol32(
                        RIPEMD160.add_modulo32(
                            A,
                            RIPEMD160.f(j, B, C, D),
                            X[i](r[j]),
                            RIPEMD160.K(j)
                        ),
                        s[j]
                    ),
                    E
                );
                A = E;
                E = D;
                D = RIPEMD160.rol32(C, 10);
                C = B;
                B = T;

                // Right rounds
                T = RIPEMD160.add_modulo32(
                    RIPEMD160.rol32(
                        RIPEMD160.add_modulo32(
                            AP,
                            RIPEMD160.f(
                                79 - j,
                                BP,
                                CP,
                                DP
                            ),
                            X[i](rP[j]),
                            RIPEMD160.KP(j)
                        ),
                        sP[j]
                    ),
                    EP
                );
                AP = EP;
                EP = DP;
                DP = RIPEMD160.rol32(CP, 10);
                CP = BP;
                BP = T;
            }
            const T = RIPEMD160.add_modulo32(h[1], C, DP);
            h[1] = RIPEMD160.add_modulo32(h[2], D, EP);
            h[2] = RIPEMD160.add_modulo32(h[3], E, AP);
            h[3] = RIPEMD160.add_modulo32(h[4], A, BP);
            h[4] = RIPEMD160.add_modulo32(h[0], B, CP);
            h[0] = T;
        }

        //  The final output string then consists of the concatenatation
        // of h_0, h_1, h_2, h_3, and h_4 after converting each h_i to a
        // 4-byte string using the little-endian convention.
        const result = new ArrayBuffer(20);
        const data_view = new DataView(result);
        h.forEach((h_i, i) => data_view.setUint32(i * 4, h_i, true));
        return result;
    }
}

module.exports = {
    RIPEMD160
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"eosjs_api": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkeosjs"] = self["webpackChunkeosjs"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["externals"], () => (__webpack_require__("./src/eosjs-api.ts")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	eosjs_api = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3RkFBd0Y7QUFDeEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLEtBQUs7QUFDaEQ7QUFDQSx5TUFBeU07QUFDek07QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGNBQWM7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsUUFBUTtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsU0FB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QTtBQUNBO0FBQ0E7QUFDQSxjQUFjLDRDQUE0QztBQUMxRCxjQUFjLDhDQUE4QztBQUM1RCxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyw0Q0FBNEM7QUFDMUQsY0FBYyxvREFBb0Q7QUFDbEUsY0FBYyxxREFBcUQ7QUFDbkUsY0FBYyxxREFBcUQ7QUFDbkUsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsNENBQTRDO0FBQzFELGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLG9EQUFvRDtBQUNsRSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyw4Q0FBOEM7QUFDNUQsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsNENBQTRDO0FBQzFELGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLDRDQUE0QztBQUMxRCxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyw4Q0FBOEM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyw0Q0FBNEM7QUFDMUQsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsOENBQThDO0FBQzVELGNBQWMsc0VBQXNFO0FBQ3BGLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLDRDQUE0QztBQUMxRCxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxpREFBaUQ7QUFDL0QsY0FBYyxtREFBbUQ7QUFDakUsY0FBYyx1REFBdUQ7QUFDckUsY0FBYyx1REFBdUQ7QUFDckUsY0FBYyxxREFBcUQ7QUFDbkUsY0FBYyxrRUFBa0U7QUFDaEYsY0FBYyxpRUFBaUU7QUFDL0UsY0FBYyxvRUFBb0U7QUFDbEYsY0FBYywwREFBMEQ7QUFDeEUsY0FBYyxrRUFBa0U7QUFDaEYsY0FBYyxzREFBc0Q7QUFDcEU7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyw2Q0FBNkM7QUFDM0QsY0FBYyx1REFBdUQ7QUFDckUsY0FBYyxvREFBb0Q7QUFDbEUsY0FBYywwREFBMEQ7QUFDeEU7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSx1Q0FBdUM7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyw2Q0FBNkM7QUFDM0QsY0FBYyxrREFBa0Q7QUFDaEU7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYywrQ0FBK0M7QUFDN0QsY0FBYyw0Q0FBNEM7QUFDMUQsY0FBYyxtRUFBbUU7QUFDakYsY0FBYyw2Q0FBNkM7QUFDM0Q7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyw4Q0FBOEM7QUFDNUQsY0FBYyw2Q0FBNkM7QUFDM0Q7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyw0REFBNEQ7QUFDMUUsY0FBYyx1REFBdUQ7QUFDckUsY0FBYywwREFBMEQ7QUFDeEUsY0FBYyxnRUFBZ0U7QUFDOUUsY0FBYyx5REFBeUQ7QUFDdkUsY0FBYyxzREFBc0Q7QUFDcEU7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxnRUFBZ0U7QUFDOUUsY0FBYyxtREFBbUQ7QUFDakUsY0FBYztB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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsNkJBQTZCO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHlDQUF5QztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZOztBQUVaOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHVCQUF1QixPQUFPO0FBQzlCO0FBQ0EsMEJBQTBCLGNBQWMsY0FBYyxjQUFjO0FBQ3BFLHdCQUF3QixZQUFZLFlBQVksWUFBWTtBQUM1RCwyQkFBMkIsUUFBUTtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7O1VDdmRBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOzs7OztXQzVCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLCtCQUErQix3Q0FBd0M7V0FDdkU7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQkFBaUIscUJBQXFCO1dBQ3RDO1dBQ0E7V0FDQSxrQkFBa0IscUJBQXFCO1dBQ3ZDO1dBQ0E7V0FDQSxLQUFLO1dBQ0w7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQzNCQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQ0pBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxNQUFNLHFCQUFxQjtXQUMzQjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQTs7Ozs7VUVoREE7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2Vvc2pzLy4vc3JjL2Vvc2pzLWFwaS50cyIsIndlYnBhY2s6Ly9lb3Nqcy8uL3NyYy9lb3Nqcy1udW1lcmljLnRzIiwid2VicGFjazovL2Vvc2pzLy4vc3JjL2Vvc2pzLXNlcmlhbGl6ZS50cyIsIndlYnBhY2s6Ly9lb3Nqcy8uL3NyYy9yaXBlbWQuanMiLCJ3ZWJwYWNrOi8vZW9zanMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZW9zanMvd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9lb3Nqcy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2Vvc2pzL3dlYnBhY2svcnVudGltZS9ub2RlIG1vZHVsZSBkZWNvcmF0b3IiLCJ3ZWJwYWNrOi8vZW9zanMvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vZW9zanMvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9lb3Nqcy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vZW9zanMvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuLyoqXG4gKiBAbW9kdWxlIEFQSVxuICovXG4vLyBjb3B5cmlnaHQgZGVmaW5lZCBpbiBlb3Nqcy9MSUNFTlNFLnR4dFxuLyogZXNsaW50LWRpc2FibGUgbWF4LWNsYXNzZXMtcGVyLWZpbGUgKi9cbnZhciBfX2Fzc2lnbiA9ICh0aGlzICYmIHRoaXMuX19hc3NpZ24pIHx8IGZ1bmN0aW9uICgpIHtcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24odCkge1xuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpXG4gICAgICAgICAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHQ7XG4gICAgfTtcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcbiAgICB9XG59O1xudmFyIF9fcmVhZCA9ICh0aGlzICYmIHRoaXMuX19yZWFkKSB8fCBmdW5jdGlvbiAobywgbikge1xuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcbiAgICBpZiAoIW0pIHJldHVybiBvO1xuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xuICAgIHRyeSB7XG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xuICAgIH1cbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cbiAgICBmaW5hbGx5IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxuICAgIH1cbiAgICByZXR1cm4gYXI7XG59O1xudmFyIF9fc3ByZWFkQXJyYXkgPSAodGhpcyAmJiB0aGlzLl9fc3ByZWFkQXJyYXkpIHx8IGZ1bmN0aW9uICh0bywgZnJvbSkge1xuICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IGZyb20ubGVuZ3RoLCBqID0gdG8ubGVuZ3RoOyBpIDwgaWw7IGkrKywgaisrKVxuICAgICAgICB0b1tqXSA9IGZyb21baV07XG4gICAgcmV0dXJuIHRvO1xufTtcbnZhciBfX3ZhbHVlcyA9ICh0aGlzICYmIHRoaXMuX192YWx1ZXMpIHx8IGZ1bmN0aW9uKG8pIHtcbiAgICB2YXIgcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IsIG0gPSBzICYmIG9bc10sIGkgPSAwO1xuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xuICAgIGlmIChvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHtcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihzID8gXCJPYmplY3QgaXMgbm90IGl0ZXJhYmxlLlwiIDogXCJTeW1ib2wuaXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQWN0aW9uQnVpbGRlciA9IGV4cG9ydHMuVHJhbnNhY3Rpb25CdWlsZGVyID0gZXhwb3J0cy5BcGkgPSB2b2lkIDA7XG52YXIgcGFrb18xID0gcmVxdWlyZShcInBha29cIik7XG52YXIgc2VyID0gcmVxdWlyZShcIi4vZW9zanMtc2VyaWFsaXplXCIpO1xudmFyIEFwaSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gYXJnc1xuICAgICAqICogYHJwY2A6IElzc3VlcyBSUEMgY2FsbHNcbiAgICAgKiAqIGBhdXRob3JpdHlQcm92aWRlcmA6IEdldCBwdWJsaWMga2V5cyBuZWVkZWQgdG8gbWVldCBhdXRob3JpdGllcyBpbiBhIHRyYW5zYWN0aW9uXG4gICAgICogKiBgYWJpUHJvdmlkZXJgOiBTdXBwbGllcyBBQklzIGluIHJhdyBmb3JtIChiaW5hcnkpXG4gICAgICogKiBgc2lnbmF0dXJlUHJvdmlkZXJgOiBTaWducyB0cmFuc2FjdGlvbnNcbiAgICAgKiAqIGBjaGFpbklkYDogSWRlbnRpZmllcyBjaGFpblxuICAgICAqICogYHRleHRFbmNvZGVyYDogYFRleHRFbmNvZGVyYCBpbnN0YW5jZSB0byB1c2UuIFBhc3MgaW4gYG51bGxgIGlmIHJ1bm5pbmcgaW4gYSBicm93c2VyXG4gICAgICogKiBgdGV4dERlY29kZXJgOiBgVGV4dERlY29kZXJgIGluc3RhbmNlIHRvIHVzZS4gUGFzcyBpbiBgbnVsbGAgaWYgcnVubmluZyBpbiBhIGJyb3dzZXJcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBBcGkoYXJncykge1xuICAgICAgICAvKiogSG9sZHMgaW5mb3JtYXRpb24gbmVlZGVkIHRvIHNlcmlhbGl6ZSBjb250cmFjdCBhY3Rpb25zICovXG4gICAgICAgIHRoaXMuY29udHJhY3RzID0gbmV3IE1hcCgpO1xuICAgICAgICAvKiogRmV0Y2hlZCBhYmlzICovXG4gICAgICAgIHRoaXMuY2FjaGVkQWJpcyA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy50cmFuc2FjdGlvbkV4dGVuc2lvbnMgPSBbXG4gICAgICAgICAgICB7IGlkOiAxLCB0eXBlOiAncmVzb3VyY2VfcGF5ZXInLCBrZXlzOiBbJ3BheWVyJywgJ21heF9uZXRfYnl0ZXMnLCAnbWF4X2NwdV91cycsICdtYXhfbWVtb3J5X2J5dGVzJ10gfSxcbiAgICAgICAgXTtcbiAgICAgICAgdGhpcy5ycGMgPSBhcmdzLnJwYztcbiAgICAgICAgdGhpcy5hdXRob3JpdHlQcm92aWRlciA9IGFyZ3MuYXV0aG9yaXR5UHJvdmlkZXIgfHwgYXJncy5ycGM7XG4gICAgICAgIHRoaXMuYWJpUHJvdmlkZXIgPSBhcmdzLmFiaVByb3ZpZGVyIHx8IGFyZ3MucnBjO1xuICAgICAgICB0aGlzLnNpZ25hdHVyZVByb3ZpZGVyID0gYXJncy5zaWduYXR1cmVQcm92aWRlcjtcbiAgICAgICAgdGhpcy5jaGFpbklkID0gYXJncy5jaGFpbklkO1xuICAgICAgICB0aGlzLnRleHRFbmNvZGVyID0gYXJncy50ZXh0RW5jb2RlcjtcbiAgICAgICAgdGhpcy50ZXh0RGVjb2RlciA9IGFyZ3MudGV4dERlY29kZXI7XG4gICAgICAgIHRoaXMuYWJpVHlwZXMgPSBzZXIuZ2V0VHlwZXNGcm9tQWJpKHNlci5jcmVhdGVBYmlUeXBlcygpKTtcbiAgICAgICAgdGhpcy50cmFuc2FjdGlvblR5cGVzID0gc2VyLmdldFR5cGVzRnJvbUFiaShzZXIuY3JlYXRlVHJhbnNhY3Rpb25UeXBlcygpKTtcbiAgICB9XG4gICAgLyoqIERlY29kZXMgYW4gYWJpIGFzIFVpbnQ4QXJyYXkgaW50byBqc29uLiAqL1xuICAgIEFwaS5wcm90b3R5cGUucmF3QWJpVG9Kc29uID0gZnVuY3Rpb24gKHJhd0FiaSkge1xuICAgICAgICB2YXIgYnVmZmVyID0gbmV3IHNlci5TZXJpYWxCdWZmZXIoe1xuICAgICAgICAgICAgdGV4dEVuY29kZXI6IHRoaXMudGV4dEVuY29kZXIsXG4gICAgICAgICAgICB0ZXh0RGVjb2RlcjogdGhpcy50ZXh0RGVjb2RlcixcbiAgICAgICAgICAgIGFycmF5OiByYXdBYmksXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoIXNlci5zdXBwb3J0ZWRBYmlWZXJzaW9uKGJ1ZmZlci5nZXRTdHJpbmcoKSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5zdXBwb3J0ZWQgYWJpIHZlcnNpb24nKTtcbiAgICAgICAgfVxuICAgICAgICBidWZmZXIucmVzdGFydFJlYWQoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWJpVHlwZXMuZ2V0KCdhYmlfZGVmJykuZGVzZXJpYWxpemUoYnVmZmVyKTtcbiAgICB9O1xuICAgIC8qKiBFbmNvZGVzIGEganNvbiBhYmkgYXMgVWludDhBcnJheS4gKi9cbiAgICBBcGkucHJvdG90eXBlLmpzb25Ub1Jhd0FiaSA9IGZ1bmN0aW9uIChqc29uQWJpKSB7XG4gICAgICAgIHZhciBidWZmZXIgPSBuZXcgc2VyLlNlcmlhbEJ1ZmZlcih7XG4gICAgICAgICAgICB0ZXh0RW5jb2RlcjogdGhpcy50ZXh0RW5jb2RlcixcbiAgICAgICAgICAgIHRleHREZWNvZGVyOiB0aGlzLnRleHREZWNvZGVyLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5hYmlUeXBlcy5nZXQoJ2FiaV9kZWYnKS5zZXJpYWxpemUoYnVmZmVyLCBqc29uQWJpKTtcbiAgICAgICAgaWYgKCFzZXIuc3VwcG9ydGVkQWJpVmVyc2lvbihidWZmZXIuZ2V0U3RyaW5nKCkpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vuc3VwcG9ydGVkIGFiaSB2ZXJzaW9uJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJ1ZmZlci5hc1VpbnQ4QXJyYXkoKTtcbiAgICB9O1xuICAgIC8qKiBHZXQgYWJpIGluIGJvdGggYmluYXJ5IGFuZCBzdHJ1Y3R1cmVkIGZvcm1zLiBGZXRjaCB3aGVuIG5lZWRlZC4gKi9cbiAgICBBcGkucHJvdG90eXBlLmdldENhY2hlZEFiaSA9IGZ1bmN0aW9uIChhY2NvdW50TmFtZSwgcmVsb2FkKSB7XG4gICAgICAgIGlmIChyZWxvYWQgPT09IHZvaWQgMCkgeyByZWxvYWQgPSBmYWxzZTsgfVxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgY2FjaGVkQWJpLCByYXdBYmksIGFiaSwgZV8xO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFyZWxvYWQgJiYgdGhpcy5jYWNoZWRBYmlzLmdldChhY2NvdW50TmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgdGhpcy5jYWNoZWRBYmlzLmdldChhY2NvdW50TmFtZSldO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgX2EubGFiZWwgPSAxO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYS50cnlzLnB1c2goWzEsIDMsICwgNF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5hYmlQcm92aWRlci5nZXRSYXdBYmkoYWNjb3VudE5hbWUpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmF3QWJpID0gKF9hLnNlbnQoKSkuYWJpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYWJpID0gdGhpcy5yYXdBYmlUb0pzb24ocmF3QWJpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhY2hlZEFiaSA9IHsgcmF3QWJpOiByYXdBYmksIGFiaTogYWJpIH07XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMgLypicmVhayovLCA0XTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICAgICAgZV8xID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZV8xLm1lc3NhZ2UgPSBcImZldGNoaW5nIGFiaSBmb3IgXCIgKyBhY2NvdW50TmFtZSArIFwiOiBcIiArIGVfMS5tZXNzYWdlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgZV8xO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWNhY2hlZEFiaSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk1pc3NpbmcgYWJpIGZvciBcIiArIGFjY291bnROYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2FjaGVkQWJpcy5zZXQoYWNjb3VudE5hbWUsIGNhY2hlZEFiaSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgY2FjaGVkQWJpXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICAvKiogR2V0IGFiaSBpbiBzdHJ1Y3R1cmVkIGZvcm0uIEZldGNoIHdoZW4gbmVlZGVkLiAqL1xuICAgIEFwaS5wcm90b3R5cGUuZ2V0QWJpID0gZnVuY3Rpb24gKGFjY291bnROYW1lLCByZWxvYWQpIHtcbiAgICAgICAgaWYgKHJlbG9hZCA9PT0gdm9pZCAwKSB7IHJlbG9hZCA9IGZhbHNlOyB9XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5nZXRDYWNoZWRBYmkoYWNjb3VudE5hbWUsIHJlbG9hZCldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6IHJldHVybiBbMiAvKnJldHVybiovLCAoX2Euc2VudCgpKS5hYmldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIC8qKiBHZXQgYWJpcyBuZWVkZWQgYnkgYSB0cmFuc2FjdGlvbiAqL1xuICAgIEFwaS5wcm90b3R5cGUuZ2V0VHJhbnNhY3Rpb25BYmlzID0gZnVuY3Rpb24gKHRyYW5zYWN0aW9uLCByZWxvYWQpIHtcbiAgICAgICAgaWYgKHJlbG9hZCA9PT0gdm9pZCAwKSB7IHJlbG9hZCA9IGZhbHNlOyB9XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBhY3Rpb25zLCBhY2NvdW50cywgdW5pcXVlQWNjb3VudHMsIGFjdGlvblByb21pc2VzO1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBhY3Rpb25zID0gKHRyYW5zYWN0aW9uLmNvbnRleHRfZnJlZV9hY3Rpb25zIHx8IFtdKS5jb25jYXQodHJhbnNhY3Rpb24uYWN0aW9ucyk7XG4gICAgICAgICAgICAgICAgYWNjb3VudHMgPSBhY3Rpb25zLm1hcChmdW5jdGlvbiAoYWN0aW9uKSB7IHJldHVybiBhY3Rpb24uYWNjb3VudDsgfSk7XG4gICAgICAgICAgICAgICAgdW5pcXVlQWNjb3VudHMgPSBuZXcgU2V0KGFjY291bnRzKTtcbiAgICAgICAgICAgICAgICBhY3Rpb25Qcm9taXNlcyA9IF9fc3ByZWFkQXJyYXkoW10sIF9fcmVhZCh1bmlxdWVBY2NvdW50cykpLm1hcChmdW5jdGlvbiAoYWNjb3VudCkgeyByZXR1cm4gX19hd2FpdGVyKF90aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoX2IubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9hID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWNjb3VudE5hbWU6IGFjY291bnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5nZXRDYWNoZWRBYmkoYWNjb3VudCwgcmVsb2FkKV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxOiByZXR1cm4gWzIgLypyZXR1cm4qLywgKF9hLmFiaSA9IChfYi5zZW50KCkpLnJhd0FiaSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9hKV07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pOyB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgUHJvbWlzZS5hbGwoYWN0aW9uUHJvbWlzZXMpXTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIC8qKiBHZXQgZGF0YSBuZWVkZWQgdG8gc2VyaWFsaXplIGFjdGlvbnMgaW4gYSBjb250cmFjdCAqL1xuICAgIEFwaS5wcm90b3R5cGUuZ2V0Q29udHJhY3QgPSBmdW5jdGlvbiAoYWNjb3VudE5hbWUsIHJlbG9hZCkge1xuICAgICAgICBpZiAocmVsb2FkID09PSB2b2lkIDApIHsgcmVsb2FkID0gZmFsc2U7IH1cbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGFiaSwgdHlwZXMsIGFjdGlvbnMsIF9hLCBfYiwgX2MsIG5hbWVfMSwgdHlwZSwgcmVzdWx0O1xuICAgICAgICAgICAgdmFyIGVfMiwgX2Q7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9lKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfZS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXJlbG9hZCAmJiB0aGlzLmNvbnRyYWN0cy5nZXQoYWNjb3VudE5hbWUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHRoaXMuY29udHJhY3RzLmdldChhY2NvdW50TmFtZSldO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5nZXRBYmkoYWNjb3VudE5hbWUsIHJlbG9hZCldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICBhYmkgPSBfZS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlcyA9IHNlci5nZXRUeXBlc0Zyb21BYmkoc2VyLmNyZWF0ZUluaXRpYWxUeXBlcygpLCBhYmkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9ucyA9IG5ldyBNYXAoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChfYSA9IF9fdmFsdWVzKGFiaS5hY3Rpb25zKSwgX2IgPSBfYS5uZXh0KCk7ICFfYi5kb25lOyBfYiA9IF9hLm5leHQoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyA9IF9iLnZhbHVlLCBuYW1lXzEgPSBfYy5uYW1lLCB0eXBlID0gX2MudHlwZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9ucy5zZXQobmFtZV8xLCBzZXIuZ2V0VHlwZSh0eXBlcywgdHlwZSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhdGNoIChlXzJfMSkgeyBlXzIgPSB7IGVycm9yOiBlXzJfMSB9OyB9XG4gICAgICAgICAgICAgICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoX2IgJiYgIV9iLmRvbmUgJiYgKF9kID0gX2EucmV0dXJuKSkgX2QuY2FsbChfYSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV8yKSB0aHJvdyBlXzIuZXJyb3I7IH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHsgdHlwZXM6IHR5cGVzLCBhY3Rpb25zOiBhY3Rpb25zIH07XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRyYWN0cy5zZXQoYWNjb3VudE5hbWUsIHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgcmVzdWx0XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICAvKiogQ29udmVydCBgdmFsdWVgIHRvIGJpbmFyeSBmb3JtLiBgdHlwZWAgbXVzdCBiZSBhIGJ1aWx0LWluIGFiaSB0eXBlIG9yIGluIGB0cmFuc2FjdGlvbi5hYmkuanNvbmAuICovXG4gICAgQXBpLnByb3RvdHlwZS5zZXJpYWxpemUgPSBmdW5jdGlvbiAoYnVmZmVyLCB0eXBlLCB2YWx1ZSkge1xuICAgICAgICB0aGlzLnRyYW5zYWN0aW9uVHlwZXMuZ2V0KHR5cGUpLnNlcmlhbGl6ZShidWZmZXIsIHZhbHVlKTtcbiAgICB9O1xuICAgIC8qKiBDb252ZXJ0IGRhdGEgaW4gYGJ1ZmZlcmAgdG8gc3RydWN0dXJlZCBmb3JtLiBgdHlwZWAgbXVzdCBiZSBhIGJ1aWx0LWluIGFiaSB0eXBlIG9yIGluIGB0cmFuc2FjdGlvbi5hYmkuanNvbmAuICovXG4gICAgQXBpLnByb3RvdHlwZS5kZXNlcmlhbGl6ZSA9IGZ1bmN0aW9uIChidWZmZXIsIHR5cGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNhY3Rpb25UeXBlcy5nZXQodHlwZSkuZGVzZXJpYWxpemUoYnVmZmVyKTtcbiAgICB9O1xuICAgIC8qKiBDb252ZXJ0IGEgdHJhbnNhY3Rpb24gdG8gYmluYXJ5ICovXG4gICAgQXBpLnByb3RvdHlwZS5zZXJpYWxpemVUcmFuc2FjdGlvbiA9IGZ1bmN0aW9uICh0cmFuc2FjdGlvbikge1xuICAgICAgICB2YXIgYnVmZmVyID0gbmV3IHNlci5TZXJpYWxCdWZmZXIoeyB0ZXh0RW5jb2RlcjogdGhpcy50ZXh0RW5jb2RlciwgdGV4dERlY29kZXI6IHRoaXMudGV4dERlY29kZXIgfSk7XG4gICAgICAgIHRoaXMuc2VyaWFsaXplKGJ1ZmZlciwgJ3RyYW5zYWN0aW9uJywgX19hc3NpZ24oeyBtYXhfbmV0X3VzYWdlX3dvcmRzOiAwLCBtYXhfY3B1X3VzYWdlX21zOiAwLCBkZWxheV9zZWM6IDAsIGNvbnRleHRfZnJlZV9hY3Rpb25zOiBbXSwgYWN0aW9uczogW10sIHRyYW5zYWN0aW9uX2V4dGVuc2lvbnM6IFtdIH0sIHRyYW5zYWN0aW9uKSk7XG4gICAgICAgIHJldHVybiBidWZmZXIuYXNVaW50OEFycmF5KCk7XG4gICAgfTtcbiAgICAvKiogU2VyaWFsaXplIGNvbnRleHQtZnJlZSBkYXRhICovXG4gICAgQXBpLnByb3RvdHlwZS5zZXJpYWxpemVDb250ZXh0RnJlZURhdGEgPSBmdW5jdGlvbiAoY29udGV4dEZyZWVEYXRhKSB7XG4gICAgICAgIHZhciBlXzMsIF9hO1xuICAgICAgICBpZiAoIWNvbnRleHRGcmVlRGF0YSB8fCAhY29udGV4dEZyZWVEYXRhLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGJ1ZmZlciA9IG5ldyBzZXIuU2VyaWFsQnVmZmVyKHsgdGV4dEVuY29kZXI6IHRoaXMudGV4dEVuY29kZXIsIHRleHREZWNvZGVyOiB0aGlzLnRleHREZWNvZGVyIH0pO1xuICAgICAgICBidWZmZXIucHVzaFZhcnVpbnQzMihjb250ZXh0RnJlZURhdGEubGVuZ3RoKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZvciAodmFyIGNvbnRleHRGcmVlRGF0YV8xID0gX192YWx1ZXMoY29udGV4dEZyZWVEYXRhKSwgY29udGV4dEZyZWVEYXRhXzFfMSA9IGNvbnRleHRGcmVlRGF0YV8xLm5leHQoKTsgIWNvbnRleHRGcmVlRGF0YV8xXzEuZG9uZTsgY29udGV4dEZyZWVEYXRhXzFfMSA9IGNvbnRleHRGcmVlRGF0YV8xLm5leHQoKSkge1xuICAgICAgICAgICAgICAgIHZhciBkYXRhID0gY29udGV4dEZyZWVEYXRhXzFfMS52YWx1ZTtcbiAgICAgICAgICAgICAgICBidWZmZXIucHVzaEJ5dGVzKGRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlXzNfMSkgeyBlXzMgPSB7IGVycm9yOiBlXzNfMSB9OyB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBpZiAoY29udGV4dEZyZWVEYXRhXzFfMSAmJiAhY29udGV4dEZyZWVEYXRhXzFfMS5kb25lICYmIChfYSA9IGNvbnRleHRGcmVlRGF0YV8xLnJldHVybikpIF9hLmNhbGwoY29udGV4dEZyZWVEYXRhXzEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzMpIHRocm93IGVfMy5lcnJvcjsgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBidWZmZXIuYXNVaW50OEFycmF5KCk7XG4gICAgfTtcbiAgICAvKiogQ29udmVydCBhIHRyYW5zYWN0aW9uIGZyb20gYmluYXJ5LiBMZWF2ZXMgYWN0aW9ucyBpbiBoZXguICovXG4gICAgQXBpLnByb3RvdHlwZS5kZXNlcmlhbGl6ZVRyYW5zYWN0aW9uID0gZnVuY3Rpb24gKHRyYW5zYWN0aW9uKSB7XG4gICAgICAgIHZhciBidWZmZXIgPSBuZXcgc2VyLlNlcmlhbEJ1ZmZlcih7IHRleHRFbmNvZGVyOiB0aGlzLnRleHRFbmNvZGVyLCB0ZXh0RGVjb2RlcjogdGhpcy50ZXh0RGVjb2RlciB9KTtcbiAgICAgICAgYnVmZmVyLnB1c2hBcnJheSh0cmFuc2FjdGlvbik7XG4gICAgICAgIHJldHVybiB0aGlzLmRlc2VyaWFsaXplKGJ1ZmZlciwgJ3RyYW5zYWN0aW9uJyk7XG4gICAgfTtcbiAgICAvLyBPcmRlciBvZiBhZGRpbmcgdG8gdHJhbnNhY3Rpb25fZXh0ZW5zaW9uIGlzIHRyYW5zYWN0aW9uX2V4dGVuc2lvbiBpZCBhc2NlbmRpbmdcbiAgICBBcGkucHJvdG90eXBlLnNlcmlhbGl6ZVRyYW5zYWN0aW9uRXh0ZW5zaW9ucyA9IGZ1bmN0aW9uICh0cmFuc2FjdGlvbikge1xuICAgICAgICB2YXIgdHJhbnNhY3Rpb25fZXh0ZW5zaW9ucyA9IFtdO1xuICAgICAgICBpZiAodHJhbnNhY3Rpb24ucmVzb3VyY2VfcGF5ZXIpIHtcbiAgICAgICAgICAgIHZhciBleHRlbnNpb25CdWZmZXIgPSBuZXcgc2VyLlNlcmlhbEJ1ZmZlcih7IHRleHRFbmNvZGVyOiB0aGlzLnRleHRFbmNvZGVyLCB0ZXh0RGVjb2RlcjogdGhpcy50ZXh0RGVjb2RlciB9KTtcbiAgICAgICAgICAgIHZhciB0eXBlcyA9IHNlci5nZXRUeXBlc0Zyb21BYmkoc2VyLmNyZWF0ZVRyYW5zYWN0aW9uRXh0ZW5zaW9uVHlwZXMoKSk7XG4gICAgICAgICAgICB0eXBlcy5nZXQoJ3Jlc291cmNlX3BheWVyJykuc2VyaWFsaXplKGV4dGVuc2lvbkJ1ZmZlciwgdHJhbnNhY3Rpb24ucmVzb3VyY2VfcGF5ZXIpO1xuICAgICAgICAgICAgdHJhbnNhY3Rpb25fZXh0ZW5zaW9ucyA9IF9fc3ByZWFkQXJyYXkoX19zcHJlYWRBcnJheShbXSwgX19yZWFkKHRyYW5zYWN0aW9uX2V4dGVuc2lvbnMpKSwgW1sxLCBzZXIuYXJyYXlUb0hleChleHRlbnNpb25CdWZmZXIuYXNVaW50OEFycmF5KCkpXV0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cmFuc2FjdGlvbl9leHRlbnNpb25zO1xuICAgIH07XG4gICAgO1xuICAgIC8vIFVzYWdlOiB0cmFuc2FjdGlvbiA9IHsuLi50cmFuc2FjdGlvbiwgLi4udGhpcy5kZXNlcmlhbGl6ZVRyYW5zYWN0aW9uRXh0ZW5zaW9ucyh0cmFuc2FjdGlvbi50cmFuc2FjdGlvbl9leHRlbnNpb25zKX1cbiAgICBBcGkucHJvdG90eXBlLmRlc2VyaWFsaXplVHJhbnNhY3Rpb25FeHRlbnNpb25zID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIHRyYW5zYWN0aW9uID0ge307XG4gICAgICAgIGRhdGEuZm9yRWFjaChmdW5jdGlvbiAoZXh0ZW5zaW9uRGF0YSkge1xuICAgICAgICAgICAgdmFyIHRyYW5zYWN0aW9uRXh0ZW5zaW9uID0gX3RoaXMudHJhbnNhY3Rpb25FeHRlbnNpb25zLmZpbmQoZnVuY3Rpb24gKGV4dGVuc2lvbikgeyByZXR1cm4gZXh0ZW5zaW9uLmlkID09PSBleHRlbnNpb25EYXRhWzBdOyB9KTtcbiAgICAgICAgICAgIGlmICh0cmFuc2FjdGlvbkV4dGVuc2lvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVHJhbnNhY3Rpb24gRXh0ZW5zaW9uIGNvdWxkIG5vdCBiZSBkZXRlcm1pbmVkOiBcIiArIGV4dGVuc2lvbkRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHR5cGVzID0gc2VyLmdldFR5cGVzRnJvbUFiaShzZXIuY3JlYXRlVHJhbnNhY3Rpb25FeHRlbnNpb25UeXBlcygpKTtcbiAgICAgICAgICAgIHZhciBleHRlbnNpb25CdWZmZXIgPSBuZXcgc2VyLlNlcmlhbEJ1ZmZlcih7IHRleHRFbmNvZGVyOiBfdGhpcy50ZXh0RW5jb2RlciwgdGV4dERlY29kZXI6IF90aGlzLnRleHREZWNvZGVyIH0pO1xuICAgICAgICAgICAgZXh0ZW5zaW9uQnVmZmVyLnB1c2hBcnJheShzZXIuaGV4VG9VaW50OEFycmF5KGV4dGVuc2lvbkRhdGFbMV0pKTtcbiAgICAgICAgICAgIHZhciBkZXNlcmlhbGl6ZWRPYmogPSB0eXBlcy5nZXQodHJhbnNhY3Rpb25FeHRlbnNpb24udHlwZSkuZGVzZXJpYWxpemUoZXh0ZW5zaW9uQnVmZmVyKTtcbiAgICAgICAgICAgIGlmIChleHRlbnNpb25EYXRhWzBdID09PSAxKSB7XG4gICAgICAgICAgICAgICAgZGVzZXJpYWxpemVkT2JqLm1heF9uZXRfYnl0ZXMgPSBOdW1iZXIoZGVzZXJpYWxpemVkT2JqLm1heF9uZXRfYnl0ZXMpO1xuICAgICAgICAgICAgICAgIGRlc2VyaWFsaXplZE9iai5tYXhfY3B1X3VzID0gTnVtYmVyKGRlc2VyaWFsaXplZE9iai5tYXhfY3B1X3VzKTtcbiAgICAgICAgICAgICAgICBkZXNlcmlhbGl6ZWRPYmoubWF4X21lbW9yeV9ieXRlcyA9IE51bWJlcihkZXNlcmlhbGl6ZWRPYmoubWF4X21lbW9yeV9ieXRlcyk7XG4gICAgICAgICAgICAgICAgdHJhbnNhY3Rpb24ucmVzb3VyY2VfcGF5ZXIgPSBkZXNlcmlhbGl6ZWRPYmo7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdHJhbnNhY3Rpb247XG4gICAgfTtcbiAgICA7XG4gICAgLy8gVHJhbnNhY3Rpb24gZXh0ZW5zaW9ucyBhcmUgc2VyaWFsaXplZCBhbmQgbW92ZWQgdG8gYHRyYW5zYWN0aW9uX2V4dGVuc2lvbnNgLCBkZXNlcmlhbGl6ZWQgb2JqZWN0cyBhcmUgbm90IG5lZWRlZCBvbiB0aGUgdHJhbnNhY3Rpb25cbiAgICBBcGkucHJvdG90eXBlLmRlbGV0ZVRyYW5zYWN0aW9uRXh0ZW5zaW9uT2JqZWN0cyA9IGZ1bmN0aW9uICh0cmFuc2FjdGlvbikge1xuICAgICAgICBkZWxldGUgdHJhbnNhY3Rpb24ucmVzb3VyY2VfcGF5ZXI7XG4gICAgICAgIHJldHVybiB0cmFuc2FjdGlvbjtcbiAgICB9O1xuICAgIC8qKiBDb252ZXJ0IGFjdGlvbnMgdG8gaGV4ICovXG4gICAgQXBpLnByb3RvdHlwZS5zZXJpYWxpemVBY3Rpb25zID0gZnVuY3Rpb24gKGFjdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgUHJvbWlzZS5hbGwoYWN0aW9ucy5tYXAoZnVuY3Rpb24gKGFjdGlvbikgeyByZXR1cm4gX19hd2FpdGVyKF90aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhY2NvdW50LCBuYW1lLCBhdXRob3JpemF0aW9uLCBkYXRhLCBjb250cmFjdDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY2NvdW50ID0gYWN0aW9uLmFjY291bnQsIG5hbWUgPSBhY3Rpb24ubmFtZSwgYXV0aG9yaXphdGlvbiA9IGFjdGlvbi5hdXRob3JpemF0aW9uLCBkYXRhID0gYWN0aW9uLmRhdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5nZXRDb250cmFjdChhY2NvdW50KV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udHJhY3QgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBkYXRhICE9PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgYWN0aW9uXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHNlci5zZXJpYWxpemVBY3Rpb24oY29udHJhY3QsIGFjY291bnQsIG5hbWUsIGF1dGhvcml6YXRpb24sIGRhdGEsIHRoaXMudGV4dEVuY29kZXIsIHRoaXMudGV4dERlY29kZXIpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7IH0pKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIFsyIC8qcmV0dXJuKi8sIF9hLnNlbnQoKV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgLyoqIENvbnZlcnQgYWN0aW9ucyBmcm9tIGhleCAqL1xuICAgIEFwaS5wcm90b3R5cGUuZGVzZXJpYWxpemVBY3Rpb25zID0gZnVuY3Rpb24gKGFjdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgUHJvbWlzZS5hbGwoYWN0aW9ucy5tYXAoZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFjY291bnQgPSBfYS5hY2NvdW50LCBuYW1lID0gX2EubmFtZSwgYXV0aG9yaXphdGlvbiA9IF9hLmF1dGhvcml6YXRpb24sIGRhdGEgPSBfYS5kYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfX2F3YWl0ZXIoX3RoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb250cmFjdDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChfYi5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5nZXRDb250cmFjdChhY2NvdW50KV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250cmFjdCA9IF9iLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHNlci5kZXNlcmlhbGl6ZUFjdGlvbihjb250cmFjdCwgYWNjb3VudCwgbmFtZSwgYXV0aG9yaXphdGlvbiwgZGF0YSwgdGhpcy50ZXh0RW5jb2RlciwgdGhpcy50ZXh0RGVjb2RlcildO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIFsyIC8qcmV0dXJuKi8sIF9hLnNlbnQoKV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgLyoqIENvbnZlcnQgYSB0cmFuc2FjdGlvbiBmcm9tIGJpbmFyeS4gQWxzbyBkZXNlcmlhbGl6ZXMgYWN0aW9ucy4gKi9cbiAgICBBcGkucHJvdG90eXBlLmRlc2VyaWFsaXplVHJhbnNhY3Rpb25XaXRoQWN0aW9ucyA9IGZ1bmN0aW9uICh0cmFuc2FjdGlvbikge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgZGVzZXJpYWxpemVkVHJhbnNhY3Rpb24sIGRlc2VyaWFsaXplZENGQWN0aW9ucywgZGVzZXJpYWxpemVkQWN0aW9ucztcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdHJhbnNhY3Rpb24gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNhY3Rpb24gPSBzZXIuaGV4VG9VaW50OEFycmF5KHRyYW5zYWN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2VyaWFsaXplZFRyYW5zYWN0aW9uID0gdGhpcy5kZXNlcmlhbGl6ZVRyYW5zYWN0aW9uKHRyYW5zYWN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuZGVzZXJpYWxpemVBY3Rpb25zKGRlc2VyaWFsaXplZFRyYW5zYWN0aW9uLmNvbnRleHRfZnJlZV9hY3Rpb25zKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2VyaWFsaXplZENGQWN0aW9ucyA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuZGVzZXJpYWxpemVBY3Rpb25zKGRlc2VyaWFsaXplZFRyYW5zYWN0aW9uLmFjdGlvbnMpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzZXJpYWxpemVkQWN0aW9ucyA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgZGVzZXJpYWxpemVkVHJhbnNhY3Rpb24pLCB7IGNvbnRleHRfZnJlZV9hY3Rpb25zOiBkZXNlcmlhbGl6ZWRDRkFjdGlvbnMsIGFjdGlvbnM6IGRlc2VyaWFsaXplZEFjdGlvbnMgfSldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIC8qKiBEZWZsYXRlIGEgc2VyaWFsaXplZCBvYmplY3QgKi9cbiAgICBBcGkucHJvdG90eXBlLmRlZmxhdGVTZXJpYWxpemVkQXJyYXkgPSBmdW5jdGlvbiAoc2VyaWFsaXplZEFycmF5KSB7XG4gICAgICAgIHJldHVybiBwYWtvXzEuZGVmbGF0ZShzZXJpYWxpemVkQXJyYXksIHsgbGV2ZWw6IDkgfSk7XG4gICAgfTtcbiAgICAvKiogSW5mbGF0ZSBhIGNvbXByZXNzZWQgc2VyaWFsaXplZCBvYmplY3QgKi9cbiAgICBBcGkucHJvdG90eXBlLmluZmxhdGVTZXJpYWxpemVkQXJyYXkgPSBmdW5jdGlvbiAoY29tcHJlc3NlZFNlcmlhbGl6ZWRBcnJheSkge1xuICAgICAgICByZXR1cm4gcGFrb18xLmluZmxhdGUoY29tcHJlc3NlZFNlcmlhbGl6ZWRBcnJheSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYW5kIG9wdGlvbmFsbHkgYnJvYWRjYXN0IGEgdHJhbnNhY3Rpb24uXG4gICAgICpcbiAgICAgKiBOYW1lZCBQYXJhbWV0ZXJzOlxuICAgICAqIGBicm9hZGNhc3RgOiBicm9hZGNhc3QgdGhpcyB0cmFuc2FjdGlvbj9cbiAgICAgKiBgc2lnbmA6IHNpZ24gdGhpcyB0cmFuc2FjdGlvbj9cbiAgICAgKiBgY29tcHJlc3Npb25gOiBjb21wcmVzcyB0aGlzIHRyYW5zYWN0aW9uP1xuICAgICAqIGByZWFkT25seVRyeGA6IHJlYWQgb25seSB0cmFuc2FjdGlvbj9cbiAgICAgKiBgcmV0dXJuRmFpbHVyZVRyYWNlc2A6IHJldHVybiBmYWlsdXJlIHRyYWNlcz8gKG9ubHkgYXZhaWxhYmxlIGZvciByZWFkIG9ubHkgdHJhbnNhY3Rpb25zIGN1cnJlbnRseSlcbiAgICAgKlxuICAgICAqIElmIGJvdGggYGJsb2Nrc0JlaGluZGAgYW5kIGBleHBpcmVTZWNvbmRzYCBhcmUgcHJlc2VudCxcbiAgICAgKiB0aGVuIGZldGNoIHRoZSBibG9jayB3aGljaCBpcyBgYmxvY2tzQmVoaW5kYCBiZWhpbmQgaGVhZCBibG9jayxcbiAgICAgKiB1c2UgaXQgYXMgYSByZWZlcmVuY2UgZm9yIFRBUG9TLCBhbmQgZXhwaXJlIHRoZSB0cmFuc2FjdGlvbiBgZXhwaXJlU2Vjb25kc2AgYWZ0ZXIgdGhhdCBibG9jaydzIHRpbWUuXG4gICAgICpcbiAgICAgKiBJZiBib3RoIGB1c2VMYXN0SXJyZXZlcnNpYmxlYCBhbmQgYGV4cGlyZVNlY29uZHNgIGFyZSBwcmVzZW50LFxuICAgICAqIHRoZW4gZmV0Y2ggdGhlIGxhc3QgaXJyZXZlcnNpYmxlIGJsb2NrLCB1c2UgaXQgYXMgYSByZWZlcmVuY2UgZm9yIFRBUG9TLFxuICAgICAqIGFuZCBleHBpcmUgdGhlIHRyYW5zYWN0aW9uIGBleHBpcmVTZWNvbmRzYCBhZnRlciB0aGF0IGJsb2NrJ3MgdGltZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIG5vZGUgcmVzcG9uc2UgaWYgYGJyb2FkY2FzdGAsIGB7c2lnbmF0dXJlcywgc2VyaWFsaXplZFRyYW5zYWN0aW9ufWAgaWYgYCFicm9hZGNhc3RgXG4gICAgICovXG4gICAgQXBpLnByb3RvdHlwZS50cmFuc2FjdCA9IGZ1bmN0aW9uICh0cmFuc2FjdGlvbiwgX2EpIHtcbiAgICAgICAgdmFyIF9iID0gX2EgPT09IHZvaWQgMCA/IHt9IDogX2EsIF9jID0gX2IuYnJvYWRjYXN0LCBicm9hZGNhc3QgPSBfYyA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9jLCBfZCA9IF9iLnNpZ24sIHNpZ24gPSBfZCA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9kLCByZWFkT25seVRyeCA9IF9iLnJlYWRPbmx5VHJ4LCByZXR1cm5GYWlsdXJlVHJhY2VzID0gX2IucmV0dXJuRmFpbHVyZVRyYWNlcywgcmVxdWlyZWRLZXlzID0gX2IucmVxdWlyZWRLZXlzLCBjb21wcmVzc2lvbiA9IF9iLmNvbXByZXNzaW9uLCBibG9ja3NCZWhpbmQgPSBfYi5ibG9ja3NCZWhpbmQsIHVzZUxhc3RJcnJldmVyc2libGUgPSBfYi51c2VMYXN0SXJyZXZlcnNpYmxlLCBleHBpcmVTZWNvbmRzID0gX2IuZXhwaXJlU2Vjb25kcztcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGluZm8sIGFiaXMsIF9lLCBzZXJpYWxpemVkVHJhbnNhY3Rpb24sIHNlcmlhbGl6ZWRDb250ZXh0RnJlZURhdGEsIHB1c2hUcmFuc2FjdGlvbkFyZ3MsIGF2YWlsYWJsZUtleXM7XG4gICAgICAgICAgICB2YXIgX2Y7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9nKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfZy5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGJsb2Nrc0JlaGluZCA9PT0gJ251bWJlcicgJiYgdXNlTGFzdElycmV2ZXJzaWJsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVXNlIGVpdGhlciBibG9ja3NCZWhpbmQgb3IgdXNlTGFzdElycmV2ZXJzaWJsZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEhdGhpcy5jaGFpbklkKSByZXR1cm4gWzMgLypicmVhayovLCAyXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMucnBjLmdldF9pbmZvKCldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmZvID0gX2cuc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFpbklkID0gaW5mby5jaGFpbl9pZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9nLmxhYmVsID0gMjtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEoKHR5cGVvZiBibG9ja3NCZWhpbmQgPT09ICdudW1iZXInIHx8IHVzZUxhc3RJcnJldmVyc2libGUpICYmIGV4cGlyZVNlY29uZHMpKSByZXR1cm4gWzMgLypicmVhayovLCA0XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuZ2VuZXJhdGVUYXBvcyhpbmZvLCB0cmFuc2FjdGlvbiwgYmxvY2tzQmVoaW5kLCB1c2VMYXN0SXJyZXZlcnNpYmxlLCBleHBpcmVTZWNvbmRzKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zYWN0aW9uID0gX2cuc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2cubGFiZWwgPSA0O1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaGFzUmVxdWlyZWRUYXBvc0ZpZWxkcyh0cmFuc2FjdGlvbikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JlcXVpcmVkIGNvbmZpZ3VyYXRpb24gb3IgVEFQT1MgZmllbGRzIGFyZSBub3QgcHJlc2VudCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5nZXRUcmFuc2FjdGlvbkFiaXModHJhbnNhY3Rpb24pXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgICAgICAgICAgYWJpcyA9IF9nLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9lID0gW19fYXNzaWduKHt9LCB0cmFuc2FjdGlvbildO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2YgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuc2VyaWFsaXplVHJhbnNhY3Rpb25FeHRlbnNpb25zKHRyYW5zYWN0aW9uKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNjpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9mLnRyYW5zYWN0aW9uX2V4dGVuc2lvbnMgPSBfZy5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnNlcmlhbGl6ZUFjdGlvbnModHJhbnNhY3Rpb24uY29udGV4dF9mcmVlX2FjdGlvbnMgfHwgW10pXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA3OlxuICAgICAgICAgICAgICAgICAgICAgICAgX2YuY29udGV4dF9mcmVlX2FjdGlvbnMgPSBfZy5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnNlcmlhbGl6ZUFjdGlvbnModHJhbnNhY3Rpb24uYWN0aW9ucyldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDg6XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2FjdGlvbiA9IF9fYXNzaWduLmFwcGx5KHZvaWQgMCwgX2UuY29uY2F0KFsoX2YuYWN0aW9ucyA9IF9nLnNlbnQoKSwgX2YpXSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNhY3Rpb24gPSB0aGlzLmRlbGV0ZVRyYW5zYWN0aW9uRXh0ZW5zaW9uT2JqZWN0cyh0cmFuc2FjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJpYWxpemVkVHJhbnNhY3Rpb24gPSB0aGlzLnNlcmlhbGl6ZVRyYW5zYWN0aW9uKHRyYW5zYWN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcmlhbGl6ZWRDb250ZXh0RnJlZURhdGEgPSB0aGlzLnNlcmlhbGl6ZUNvbnRleHRGcmVlRGF0YSh0cmFuc2FjdGlvbi5jb250ZXh0X2ZyZWVfZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBwdXNoVHJhbnNhY3Rpb25BcmdzID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcmlhbGl6ZWRUcmFuc2FjdGlvbjogc2VyaWFsaXplZFRyYW5zYWN0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcmlhbGl6ZWRDb250ZXh0RnJlZURhdGE6IHNlcmlhbGl6ZWRDb250ZXh0RnJlZURhdGEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2lnbmF0dXJlczogW11cbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXNpZ24pIHJldHVybiBbMyAvKmJyZWFrKi8sIDEzXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghIXJlcXVpcmVkS2V5cykgcmV0dXJuIFszIC8qYnJlYWsqLywgMTFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5zaWduYXR1cmVQcm92aWRlci5nZXRBdmFpbGFibGVLZXlzKCldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDk6XG4gICAgICAgICAgICAgICAgICAgICAgICBhdmFpbGFibGVLZXlzID0gX2cuc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5hdXRob3JpdHlQcm92aWRlci5nZXRSZXF1aXJlZEtleXMoeyB0cmFuc2FjdGlvbjogdHJhbnNhY3Rpb24sIGF2YWlsYWJsZUtleXM6IGF2YWlsYWJsZUtleXMgfSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDEwOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWRLZXlzID0gX2cuc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2cubGFiZWwgPSAxMTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxMTogcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5zaWduYXR1cmVQcm92aWRlci5zaWduKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFpbklkOiB0aGlzLmNoYWluSWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWRLZXlzOiByZXF1aXJlZEtleXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VyaWFsaXplZFRyYW5zYWN0aW9uOiBzZXJpYWxpemVkVHJhbnNhY3Rpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VyaWFsaXplZENvbnRleHRGcmVlRGF0YTogc2VyaWFsaXplZENvbnRleHRGcmVlRGF0YSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhYmlzOiBhYmlzLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDEyOlxuICAgICAgICAgICAgICAgICAgICAgICAgcHVzaFRyYW5zYWN0aW9uQXJncyA9IF9nLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9nLmxhYmVsID0gMTM7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTM6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYnJvYWRjYXN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbXByZXNzaW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCB0aGlzLnB1c2hDb21wcmVzc2VkU2lnbmVkVHJhbnNhY3Rpb24ocHVzaFRyYW5zYWN0aW9uQXJncywgcmVhZE9ubHlUcngsIHJldHVybkZhaWx1cmVUcmFjZXMpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHRoaXMucHVzaFNpZ25lZFRyYW5zYWN0aW9uKHB1c2hUcmFuc2FjdGlvbkFyZ3MsIHJlYWRPbmx5VHJ4LCByZXR1cm5GYWlsdXJlVHJhY2VzKV07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgcHVzaFRyYW5zYWN0aW9uQXJnc107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgQXBpLnByb3RvdHlwZS5xdWVyeSA9IGZ1bmN0aW9uIChhY2NvdW50LCBzaG9ydCwgcXVlcnksIF9hKSB7XG4gICAgICAgIHZhciBzaWduID0gX2Euc2lnbiwgcmVxdWlyZWRLZXlzID0gX2EucmVxdWlyZWRLZXlzLCBfYiA9IF9hLmF1dGhvcml6YXRpb24sIGF1dGhvcml6YXRpb24gPSBfYiA9PT0gdm9pZCAwID8gW10gOiBfYjtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGluZm8sIHJlZkJsb2NrLCBxdWVyeUJ1ZmZlciwgdHJhbnNhY3Rpb24sIHNlcmlhbGl6ZWRUcmFuc2FjdGlvbiwgc2lnbmF0dXJlcywgYWJpcywgYXZhaWxhYmxlS2V5cywgc2lnblJlc3BvbnNlLCByZXNwb25zZSwgcmV0dXJuQnVmZmVyO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYykge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2MubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnJwYy5nZXRfaW5mbygpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgaW5mbyA9IF9jLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMudHJ5UmVmQmxvY2tGcm9tR2V0SW5mbyhpbmZvKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZkJsb2NrID0gX2Muc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcXVlcnlCdWZmZXIgPSBuZXcgc2VyLlNlcmlhbEJ1ZmZlcih7IHRleHRFbmNvZGVyOiB0aGlzLnRleHRFbmNvZGVyLCB0ZXh0RGVjb2RlcjogdGhpcy50ZXh0RGVjb2RlciB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlci5zZXJpYWxpemVRdWVyeShxdWVyeUJ1ZmZlciwgcXVlcnkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNhY3Rpb24gPSBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgc2VyLnRyYW5zYWN0aW9uSGVhZGVyKHJlZkJsb2NrLCA2MCAqIDMwKSksIHsgY29udGV4dF9mcmVlX2FjdGlvbnM6IFtdLCBhY3Rpb25zOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWNjb3VudDogYWNjb3VudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICdxdWVyeWl0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dGhvcml6YXRpb246IGF1dGhvcml6YXRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBzZXIuYXJyYXlUb0hleChxdWVyeUJ1ZmZlci5hc1VpbnQ4QXJyYXkoKSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1dIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VyaWFsaXplZFRyYW5zYWN0aW9uID0gdGhpcy5zZXJpYWxpemVUcmFuc2FjdGlvbih0cmFuc2FjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaWduYXR1cmVzID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXNpZ24pIHJldHVybiBbMyAvKmJyZWFrKi8sIDhdO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5nZXRUcmFuc2FjdGlvbkFiaXModHJhbnNhY3Rpb24pXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICAgICAgYWJpcyA9IF9jLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghIXJlcXVpcmVkS2V5cykgcmV0dXJuIFszIC8qYnJlYWsqLywgNl07XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnNpZ25hdHVyZVByb3ZpZGVyLmdldEF2YWlsYWJsZUtleXMoKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGF2YWlsYWJsZUtleXMgPSBfYy5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLmF1dGhvcml0eVByb3ZpZGVyLmdldFJlcXVpcmVkS2V5cyh7IHRyYW5zYWN0aW9uOiB0cmFuc2FjdGlvbiwgYXZhaWxhYmxlS2V5czogYXZhaWxhYmxlS2V5cyB9KV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVpcmVkS2V5cyA9IF9jLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jLmxhYmVsID0gNjtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA2OiByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnNpZ25hdHVyZVByb3ZpZGVyLnNpZ24oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYWluSWQ6IHRoaXMuY2hhaW5JZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1aXJlZEtleXM6IHJlcXVpcmVkS2V5cyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJpYWxpemVkVHJhbnNhY3Rpb246IHNlcmlhbGl6ZWRUcmFuc2FjdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJpYWxpemVkQ29udGV4dEZyZWVEYXRhOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFiaXM6IGFiaXMsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpZ25SZXNwb25zZSA9IF9jLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpZ25hdHVyZXMgPSBzaWduUmVzcG9uc2Uuc2lnbmF0dXJlcztcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jLmxhYmVsID0gODtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA4OiByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnJwYy5zZW5kX3RyYW5zYWN0aW9uKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaWduYXR1cmVzOiBzaWduYXR1cmVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXByZXNzaW9uOiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcmlhbGl6ZWRUcmFuc2FjdGlvbjogc2VyaWFsaXplZFRyYW5zYWN0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICB9KV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgOTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gX2Muc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuQnVmZmVyID0gbmV3IHNlci5TZXJpYWxCdWZmZXIoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHRFbmNvZGVyOiB0aGlzLnRleHRFbmNvZGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHREZWNvZGVyOiB0aGlzLnRleHREZWNvZGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycmF5OiBzZXIuaGV4VG9VaW50OEFycmF5KHJlc3BvbnNlLnByb2Nlc3NlZC5hY3Rpb25fdHJhY2VzWzBdWzFdLnJldHVybl92YWx1ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNob3J0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHNlci5kZXNlcmlhbGl6ZUFueXZhclNob3J0KHJldHVybkJ1ZmZlcildO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHNlci5kZXNlcmlhbGl6ZUFueXZhcihyZXR1cm5CdWZmZXIpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICAvKiogQnJvYWRjYXN0IGEgc2lnbmVkIHRyYW5zYWN0aW9uICovXG4gICAgQXBpLnByb3RvdHlwZS5wdXNoU2lnbmVkVHJhbnNhY3Rpb24gPSBmdW5jdGlvbiAoX2EsIHJlYWRPbmx5VHJ4LCByZXR1cm5GYWlsdXJlVHJhY2VzKSB7XG4gICAgICAgIHZhciBzaWduYXR1cmVzID0gX2Euc2lnbmF0dXJlcywgc2VyaWFsaXplZFRyYW5zYWN0aW9uID0gX2Euc2VyaWFsaXplZFRyYW5zYWN0aW9uLCBzZXJpYWxpemVkQ29udGV4dEZyZWVEYXRhID0gX2Euc2VyaWFsaXplZENvbnRleHRGcmVlRGF0YTtcbiAgICAgICAgaWYgKHJlYWRPbmx5VHJ4ID09PSB2b2lkIDApIHsgcmVhZE9ubHlUcnggPSBmYWxzZTsgfVxuICAgICAgICBpZiAocmV0dXJuRmFpbHVyZVRyYWNlcyA9PT0gdm9pZCAwKSB7IHJldHVybkZhaWx1cmVUcmFjZXMgPSBmYWxzZTsgfVxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9iKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJlYWRPbmx5VHJ4KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCB0aGlzLnJwYy5wdXNoX3JvX3RyYW5zYWN0aW9uKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaWduYXR1cmVzOiBzaWduYXR1cmVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcmlhbGl6ZWRUcmFuc2FjdGlvbjogc2VyaWFsaXplZFRyYW5zYWN0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcmlhbGl6ZWRDb250ZXh0RnJlZURhdGE6IHNlcmlhbGl6ZWRDb250ZXh0RnJlZURhdGEsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCByZXR1cm5GYWlsdXJlVHJhY2VzKV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCB0aGlzLnJwYy5wdXNoX3RyYW5zYWN0aW9uKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpZ25hdHVyZXM6IHNpZ25hdHVyZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJpYWxpemVkVHJhbnNhY3Rpb246IHNlcmlhbGl6ZWRUcmFuc2FjdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcmlhbGl6ZWRDb250ZXh0RnJlZURhdGE6IHNlcmlhbGl6ZWRDb250ZXh0RnJlZURhdGFcbiAgICAgICAgICAgICAgICAgICAgfSldO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgQXBpLnByb3RvdHlwZS5wdXNoQ29tcHJlc3NlZFNpZ25lZFRyYW5zYWN0aW9uID0gZnVuY3Rpb24gKF9hLCByZWFkT25seVRyeCwgcmV0dXJuRmFpbHVyZVRyYWNlcykge1xuICAgICAgICB2YXIgc2lnbmF0dXJlcyA9IF9hLnNpZ25hdHVyZXMsIHNlcmlhbGl6ZWRUcmFuc2FjdGlvbiA9IF9hLnNlcmlhbGl6ZWRUcmFuc2FjdGlvbiwgc2VyaWFsaXplZENvbnRleHRGcmVlRGF0YSA9IF9hLnNlcmlhbGl6ZWRDb250ZXh0RnJlZURhdGE7XG4gICAgICAgIGlmIChyZWFkT25seVRyeCA9PT0gdm9pZCAwKSB7IHJlYWRPbmx5VHJ4ID0gZmFsc2U7IH1cbiAgICAgICAgaWYgKHJldHVybkZhaWx1cmVUcmFjZXMgPT09IHZvaWQgMCkgeyByZXR1cm5GYWlsdXJlVHJhY2VzID0gZmFsc2U7IH1cbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGNvbXByZXNzZWRTZXJpYWxpemVkVHJhbnNhY3Rpb24sIGNvbXByZXNzZWRTZXJpYWxpemVkQ29udGV4dEZyZWVEYXRhO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYikge1xuICAgICAgICAgICAgICAgIGNvbXByZXNzZWRTZXJpYWxpemVkVHJhbnNhY3Rpb24gPSB0aGlzLmRlZmxhdGVTZXJpYWxpemVkQXJyYXkoc2VyaWFsaXplZFRyYW5zYWN0aW9uKTtcbiAgICAgICAgICAgICAgICBjb21wcmVzc2VkU2VyaWFsaXplZENvbnRleHRGcmVlRGF0YSA9IHRoaXMuZGVmbGF0ZVNlcmlhbGl6ZWRBcnJheShzZXJpYWxpemVkQ29udGV4dEZyZWVEYXRhIHx8IG5ldyBVaW50OEFycmF5KDApKTtcbiAgICAgICAgICAgICAgICBpZiAocmVhZE9ubHlUcngpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHRoaXMucnBjLnB1c2hfcm9fdHJhbnNhY3Rpb24oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpZ25hdHVyZXM6IHNpZ25hdHVyZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcHJlc3Npb246IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VyaWFsaXplZFRyYW5zYWN0aW9uOiBjb21wcmVzc2VkU2VyaWFsaXplZFRyYW5zYWN0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcmlhbGl6ZWRDb250ZXh0RnJlZURhdGE6IGNvbXByZXNzZWRTZXJpYWxpemVkQ29udGV4dEZyZWVEYXRhXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCByZXR1cm5GYWlsdXJlVHJhY2VzKV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCB0aGlzLnJwYy5wdXNoX3RyYW5zYWN0aW9uKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpZ25hdHVyZXM6IHNpZ25hdHVyZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wcmVzc2lvbjogMSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcmlhbGl6ZWRUcmFuc2FjdGlvbjogY29tcHJlc3NlZFNlcmlhbGl6ZWRUcmFuc2FjdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcmlhbGl6ZWRDb250ZXh0RnJlZURhdGE6IGNvbXByZXNzZWRTZXJpYWxpemVkQ29udGV4dEZyZWVEYXRhXG4gICAgICAgICAgICAgICAgICAgIH0pXTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIEFwaS5wcm90b3R5cGUuZ2VuZXJhdGVUYXBvcyA9IGZ1bmN0aW9uIChpbmZvLCB0cmFuc2FjdGlvbiwgYmxvY2tzQmVoaW5kLCB1c2VMYXN0SXJyZXZlcnNpYmxlLCBleHBpcmVTZWNvbmRzKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBibG9jaywgdGFwb3NCbG9ja051bWJlciwgcmVmQmxvY2ssIF9hO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYikge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2IubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEhaW5mbykgcmV0dXJuIFszIC8qYnJlYWsqLywgMl07XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnJwYy5nZXRfaW5mbygpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgaW5mbyA9IF9iLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9iLmxhYmVsID0gMjtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF1c2VMYXN0SXJyZXZlcnNpYmxlKSByZXR1cm4gWzMgLypicmVhayovLCA0XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMudHJ5UmVmQmxvY2tGcm9tR2V0SW5mbyhpbmZvKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGJsb2NrID0gX2Iuc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIF9fYXNzaWduKF9fYXNzaWduKHt9LCBzZXIudHJhbnNhY3Rpb25IZWFkZXIoYmxvY2ssIGV4cGlyZVNlY29uZHMpKSwgdHJhbnNhY3Rpb24pXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgICAgICAgICAgdGFwb3NCbG9ja051bWJlciA9IGluZm8uaGVhZF9ibG9ja19udW0gLSBibG9ja3NCZWhpbmQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoISh0YXBvc0Jsb2NrTnVtYmVyIDw9IGluZm8ubGFzdF9pcnJldmVyc2libGVfYmxvY2tfbnVtKSkgcmV0dXJuIFszIC8qYnJlYWsqLywgNl07XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnRyeUdldEJsb2NrSW5mbyh0YXBvc0Jsb2NrTnVtYmVyKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hID0gX2Iuc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgOF07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNjogcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy50cnlHZXRCbG9ja0hlYWRlclN0YXRlKHRhcG9zQmxvY2tOdW1iZXIpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA3OlxuICAgICAgICAgICAgICAgICAgICAgICAgX2EgPSBfYi5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfYi5sYWJlbCA9IDg7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgODpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZkJsb2NrID0gX2E7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgX19hc3NpZ24oX19hc3NpZ24oe30sIHNlci50cmFuc2FjdGlvbkhlYWRlcihyZWZCbG9jaywgZXhwaXJlU2Vjb25kcykpLCB0cmFuc2FjdGlvbildO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIC8vIGV2ZW50dWFsbHkgYnJlYWsgb3V0IGludG8gVHJhbnNhY3Rpb25WYWxpZGF0b3IgY2xhc3NcbiAgICBBcGkucHJvdG90eXBlLmhhc1JlcXVpcmVkVGFwb3NGaWVsZHMgPSBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgdmFyIGV4cGlyYXRpb24gPSBfYS5leHBpcmF0aW9uLCByZWZfYmxvY2tfbnVtID0gX2EucmVmX2Jsb2NrX251bSwgcmVmX2Jsb2NrX3ByZWZpeCA9IF9hLnJlZl9ibG9ja19wcmVmaXg7XG4gICAgICAgIHJldHVybiAhIShleHBpcmF0aW9uICYmIHR5cGVvZiAocmVmX2Jsb2NrX251bSkgPT09ICdudW1iZXInICYmIHR5cGVvZiAocmVmX2Jsb2NrX3ByZWZpeCkgPT09ICdudW1iZXInKTtcbiAgICB9O1xuICAgIEFwaS5wcm90b3R5cGUudHJ5R2V0QmxvY2tIZWFkZXJTdGF0ZSA9IGZ1bmN0aW9uICh0YXBvc0Jsb2NrTnVtYmVyKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBlcnJvcl8xO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgX2EudHJ5cy5wdXNoKFswLCAyLCAsIDRdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMucnBjLmdldF9ibG9ja19oZWFkZXJfc3RhdGUodGFwb3NCbG9ja051bWJlcildO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6IHJldHVybiBbMiAvKnJldHVybiovLCBfYS5zZW50KCldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvcl8xID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy50cnlHZXRCbG9ja0luZm8odGFwb3NCbG9ja051bWJlcildO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6IHJldHVybiBbMiAvKnJldHVybiovLCBfYS5zZW50KCldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6IHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBBcGkucHJvdG90eXBlLnRyeUdldEJsb2NrSW5mbyA9IGZ1bmN0aW9uIChibG9ja051bWJlcikge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgZXJyb3JfMjtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnRyeXMucHVzaChbMCwgMiwgLCA0XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnJwYy5nZXRfYmxvY2tfaW5mbyhibG9ja051bWJlcildO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6IHJldHVybiBbMiAvKnJldHVybiovLCBfYS5zZW50KCldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvcl8yID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5ycGMuZ2V0X2Jsb2NrKGJsb2NrTnVtYmVyKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzogcmV0dXJuIFsyIC8qcmV0dXJuKi8sIF9hLnNlbnQoKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNDogcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIEFwaS5wcm90b3R5cGUudHJ5UmVmQmxvY2tGcm9tR2V0SW5mbyA9IGZ1bmN0aW9uIChpbmZvKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBibG9jaztcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKGluZm8uaGFzT3duUHJvcGVydHkoJ2xhc3RfaXJyZXZlcnNpYmxlX2Jsb2NrX2lkJykgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmZvLmhhc093blByb3BlcnR5KCdsYXN0X2lycmV2ZXJzaWJsZV9ibG9ja19udW0nKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZm8uaGFzT3duUHJvcGVydHkoJ2xhc3RfaXJyZXZlcnNpYmxlX2Jsb2NrX3RpbWUnKSkpIHJldHVybiBbMyAvKmJyZWFrKi8sIDFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmxvY2tfbnVtOiBpbmZvLmxhc3RfaXJyZXZlcnNpYmxlX2Jsb2NrX251bSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IGluZm8ubGFzdF9pcnJldmVyc2libGVfYmxvY2tfaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVzdGFtcDogaW5mby5sYXN0X2lycmV2ZXJzaWJsZV9ibG9ja190aW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1dO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6IHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMudHJ5R2V0QmxvY2tJbmZvKGluZm8ubGFzdF9pcnJldmVyc2libGVfYmxvY2tfbnVtKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGJsb2NrID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmxvY2tfbnVtOiBibG9jay5ibG9ja19udW0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBibG9jay5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGltZXN0YW1wOiBibG9jay50aW1lc3RhbXAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgQXBpLnByb3RvdHlwZS53aXRoID0gZnVuY3Rpb24gKGFjY291bnROYW1lKSB7XG4gICAgICAgIHJldHVybiBuZXcgQWN0aW9uQnVpbGRlcih0aGlzLCBhY2NvdW50TmFtZSk7XG4gICAgfTtcbiAgICBBcGkucHJvdG90eXBlLmJ1aWxkVHJhbnNhY3Rpb24gPSBmdW5jdGlvbiAoY2IpIHtcbiAgICAgICAgdmFyIHR4ID0gbmV3IFRyYW5zYWN0aW9uQnVpbGRlcih0aGlzKTtcbiAgICAgICAgaWYgKGNiKSB7XG4gICAgICAgICAgICByZXR1cm4gY2IodHgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0eDtcbiAgICB9O1xuICAgIHJldHVybiBBcGk7XG59KCkpOyAvLyBBcGlcbmV4cG9ydHMuQXBpID0gQXBpO1xudmFyIFRyYW5zYWN0aW9uQnVpbGRlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBUcmFuc2FjdGlvbkJ1aWxkZXIoYXBpKSB7XG4gICAgICAgIHRoaXMuYWN0aW9ucyA9IFtdO1xuICAgICAgICB0aGlzLmNvbnRleHRGcmVlR3JvdXBzID0gW107XG4gICAgICAgIHRoaXMuYXBpID0gYXBpO1xuICAgIH1cbiAgICBUcmFuc2FjdGlvbkJ1aWxkZXIucHJvdG90eXBlLndpdGggPSBmdW5jdGlvbiAoYWNjb3VudE5hbWUpIHtcbiAgICAgICAgdmFyIGFjdGlvbkJ1aWxkZXIgPSBuZXcgQWN0aW9uQnVpbGRlcih0aGlzLmFwaSwgYWNjb3VudE5hbWUpO1xuICAgICAgICB0aGlzLmFjdGlvbnMucHVzaChhY3Rpb25CdWlsZGVyKTtcbiAgICAgICAgcmV0dXJuIGFjdGlvbkJ1aWxkZXI7XG4gICAgfTtcbiAgICBUcmFuc2FjdGlvbkJ1aWxkZXIucHJvdG90eXBlLmFzc29jaWF0ZUNvbnRleHRGcmVlID0gZnVuY3Rpb24gKGNvbnRleHRGcmVlR3JvdXApIHtcbiAgICAgICAgdGhpcy5jb250ZXh0RnJlZUdyb3Vwcy5wdXNoKGNvbnRleHRGcmVlR3JvdXApO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIFRyYW5zYWN0aW9uQnVpbGRlci5wcm90b3R5cGUuc2VuZCA9IGZ1bmN0aW9uIChjb25maWcpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGNvbnRleHRGcmVlRGF0YVNldCwgY29udGV4dEZyZWVBY3Rpb25zLCBhY3Rpb25zO1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHRGcmVlRGF0YVNldCA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dEZyZWVBY3Rpb25zID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25zID0gdGhpcy5hY3Rpb25zLm1hcChmdW5jdGlvbiAoYWN0aW9uQnVpbGRlcikgeyByZXR1cm4gYWN0aW9uQnVpbGRlci5zZXJpYWxpemVkRGF0YTsgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBQcm9taXNlLmFsbCh0aGlzLmNvbnRleHRGcmVlR3JvdXBzLm1hcChmdW5jdGlvbiAoY29udGV4dEZyZWVDYWxsYmFjaykgeyByZXR1cm4gX19hd2FpdGVyKF90aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgX2EsIGFjdGlvbiwgY29udGV4dEZyZWVBY3Rpb24sIGNvbnRleHRGcmVlRGF0YTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2EgPSBjb250ZXh0RnJlZUNhbGxiYWNrKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjZmQ6IGNvbnRleHRGcmVlRGF0YVNldC5sZW5ndGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2ZhOiBjb250ZXh0RnJlZUFjdGlvbnMubGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSwgYWN0aW9uID0gX2EuYWN0aW9uLCBjb250ZXh0RnJlZUFjdGlvbiA9IF9hLmNvbnRleHRGcmVlQWN0aW9uLCBjb250ZXh0RnJlZURhdGEgPSBfYS5jb250ZXh0RnJlZURhdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9ucy5wdXNoKGFjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29udGV4dEZyZWVBY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0RnJlZUFjdGlvbnMucHVzaChjb250ZXh0RnJlZUFjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29udGV4dEZyZWVEYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dEZyZWVEYXRhU2V0LnB1c2goY29udGV4dEZyZWVEYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7IH0pKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dEZyZWVHcm91cHMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5hcGkudHJhbnNhY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0X2ZyZWVfZGF0YTogY29udGV4dEZyZWVEYXRhU2V0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0X2ZyZWVfYWN0aW9uczogY29udGV4dEZyZWVBY3Rpb25zLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25zOiBhY3Rpb25zXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgY29uZmlnKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjogcmV0dXJuIFsyIC8qcmV0dXJuKi8sIF9hLnNlbnQoKV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIFRyYW5zYWN0aW9uQnVpbGRlcjtcbn0oKSk7XG5leHBvcnRzLlRyYW5zYWN0aW9uQnVpbGRlciA9IFRyYW5zYWN0aW9uQnVpbGRlcjtcbnZhciBBY3Rpb25CdWlsZGVyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEFjdGlvbkJ1aWxkZXIoYXBpLCBhY2NvdW50TmFtZSkge1xuICAgICAgICB0aGlzLmFwaSA9IGFwaTtcbiAgICAgICAgdGhpcy5hY2NvdW50TmFtZSA9IGFjY291bnROYW1lO1xuICAgIH1cbiAgICBBY3Rpb25CdWlsZGVyLnByb3RvdHlwZS5hcyA9IGZ1bmN0aW9uIChhY3Rvck5hbWUpIHtcbiAgICAgICAgaWYgKGFjdG9yTmFtZSA9PT0gdm9pZCAwKSB7IGFjdG9yTmFtZSA9IFtdOyB9XG4gICAgICAgIHZhciBhdXRob3JpemF0aW9uID0gW107XG4gICAgICAgIGlmIChhY3Rvck5hbWUgJiYgdHlwZW9mIGFjdG9yTmFtZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGF1dGhvcml6YXRpb24gPSBbeyBhY3RvcjogYWN0b3JOYW1lLCBwZXJtaXNzaW9uOiAnYWN0aXZlJyB9XTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGF1dGhvcml6YXRpb24gPSBhY3Rvck5hbWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBBY3Rpb25TZXJpYWxpemVyKHRoaXMsIHRoaXMuYXBpLCB0aGlzLmFjY291bnROYW1lLCBhdXRob3JpemF0aW9uKTtcbiAgICB9O1xuICAgIHJldHVybiBBY3Rpb25CdWlsZGVyO1xufSgpKTtcbmV4cG9ydHMuQWN0aW9uQnVpbGRlciA9IEFjdGlvbkJ1aWxkZXI7XG52YXIgQWN0aW9uU2VyaWFsaXplciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBBY3Rpb25TZXJpYWxpemVyKHBhcmVudCwgYXBpLCBhY2NvdW50TmFtZSwgYXV0aG9yaXphdGlvbikge1xuICAgICAgICB2YXIgZV80LCBfYTtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIGpzb25BYmkgPSBhcGkuY2FjaGVkQWJpcy5nZXQoYWNjb3VudE5hbWUpO1xuICAgICAgICBpZiAoIWpzb25BYmkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQUJJIG11c3QgYmUgY2FjaGVkIGJlZm9yZSB1c2luZyBBY3Rpb25CdWlsZGVyLCBydW4gYXBpLmdldEFiaSgpJyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHR5cGVzID0gc2VyLmdldFR5cGVzRnJvbUFiaShzZXIuY3JlYXRlSW5pdGlhbFR5cGVzKCksIGpzb25BYmkuYWJpKTtcbiAgICAgICAgdmFyIGFjdGlvbnMgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmb3IgKHZhciBfYiA9IF9fdmFsdWVzKGpzb25BYmkuYWJpLmFjdGlvbnMpLCBfYyA9IF9iLm5leHQoKTsgIV9jLmRvbmU7IF9jID0gX2IubmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgdmFyIF9kID0gX2MudmFsdWUsIG5hbWVfMiA9IF9kLm5hbWUsIHR5cGUgPSBfZC50eXBlO1xuICAgICAgICAgICAgICAgIGFjdGlvbnMuc2V0KG5hbWVfMiwgc2VyLmdldFR5cGUodHlwZXMsIHR5cGUpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZV80XzEpIHsgZV80ID0geyBlcnJvcjogZV80XzEgfTsgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaWYgKF9jICYmICFfYy5kb25lICYmIChfYSA9IF9iLnJldHVybikpIF9hLmNhbGwoX2IpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzQpIHRocm93IGVfNC5lcnJvcjsgfVxuICAgICAgICB9XG4gICAgICAgIGFjdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAodHlwZSwgbmFtZSkge1xuICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihfdGhpcywgKF9hID0ge30sXG4gICAgICAgICAgICAgICAgX2FbbmFtZV0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBhcmdzID0gW107XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGEgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgYXJncy5mb3JFYWNoKGZ1bmN0aW9uIChhcmcsIGluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmllbGQgPSB0eXBlLmZpZWxkc1tpbmRleF07XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhW2ZpZWxkLm5hbWVdID0gYXJnO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlcmlhbGl6ZWREYXRhID0gc2VyLnNlcmlhbGl6ZUFjdGlvbih7IHR5cGVzOiB0eXBlcywgYWN0aW9uczogYWN0aW9ucyB9LCBhY2NvdW50TmFtZSwgbmFtZSwgYXV0aG9yaXphdGlvbiwgZGF0YSwgYXBpLnRleHRFbmNvZGVyLCBhcGkudGV4dERlY29kZXIpO1xuICAgICAgICAgICAgICAgICAgICBwYXJlbnQuc2VyaWFsaXplZERhdGEgPSBzZXJpYWxpemVkRGF0YTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlcmlhbGl6ZWREYXRhO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgX2EpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBBY3Rpb25TZXJpYWxpemVyO1xufSgpKTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fcmVhZCA9ICh0aGlzICYmIHRoaXMuX19yZWFkKSB8fCBmdW5jdGlvbiAobywgbikge1xuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcbiAgICBpZiAoIW0pIHJldHVybiBvO1xuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xuICAgIHRyeSB7XG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xuICAgIH1cbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cbiAgICBmaW5hbGx5IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxuICAgIH1cbiAgICByZXR1cm4gYXI7XG59O1xudmFyIF9fc3ByZWFkQXJyYXkgPSAodGhpcyAmJiB0aGlzLl9fc3ByZWFkQXJyYXkpIHx8IGZ1bmN0aW9uICh0bywgZnJvbSkge1xuICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IGZyb20ubGVuZ3RoLCBqID0gdG8ubGVuZ3RoOyBpIDwgaWw7IGkrKywgaisrKVxuICAgICAgICB0b1tqXSA9IGZyb21baV07XG4gICAgcmV0dXJuIHRvO1xufTtcbnZhciBfX3ZhbHVlcyA9ICh0aGlzICYmIHRoaXMuX192YWx1ZXMpIHx8IGZ1bmN0aW9uKG8pIHtcbiAgICB2YXIgcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IsIG0gPSBzICYmIG9bc10sIGkgPSAwO1xuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xuICAgIGlmIChvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHtcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihzID8gXCJPYmplY3QgaXMgbm90IGl0ZXJhYmxlLlwiIDogXCJTeW1ib2wuaXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuc2lnbmF0dXJlVG9TdHJpbmcgPSBleHBvcnRzLnN0cmluZ1RvU2lnbmF0dXJlID0gZXhwb3J0cy5wcml2YXRlS2V5VG9TdHJpbmcgPSBleHBvcnRzLnByaXZhdGVLZXlUb0xlZ2FjeVN0cmluZyA9IGV4cG9ydHMuc3RyaW5nVG9Qcml2YXRlS2V5ID0gZXhwb3J0cy5jb252ZXJ0TGVnYWN5UHVibGljS2V5cyA9IGV4cG9ydHMuY29udmVydExlZ2FjeVB1YmxpY0tleSA9IGV4cG9ydHMucHVibGljS2V5VG9TdHJpbmcgPSBleHBvcnRzLnB1YmxpY0tleVRvTGVnYWN5U3RyaW5nID0gZXhwb3J0cy5zdHJpbmdUb1B1YmxpY0tleSA9IGV4cG9ydHMuc2lnbmF0dXJlRGF0YVNpemUgPSBleHBvcnRzLnByaXZhdGVLZXlEYXRhU2l6ZSA9IGV4cG9ydHMucHVibGljS2V5RGF0YVNpemUgPSBleHBvcnRzLktleVR5cGUgPSBleHBvcnRzLmJhc2U2NFRvQmluYXJ5ID0gZXhwb3J0cy5iaW5hcnlUb0Jhc2U1OCA9IGV4cG9ydHMuYmFzZTU4VG9CaW5hcnkgPSBleHBvcnRzLnNpZ25lZEJpbmFyeVRvRGVjaW1hbCA9IGV4cG9ydHMuYmluYXJ5VG9EZWNpbWFsID0gZXhwb3J0cy5zaWduZWREZWNpbWFsVG9CaW5hcnkgPSBleHBvcnRzLmRlY2ltYWxUb0JpbmFyeSA9IGV4cG9ydHMubmVnYXRlID0gZXhwb3J0cy5pc05lZ2F0aXZlID0gdm9pZCAwO1xuLyoqXG4gKiBAbW9kdWxlIE51bWVyaWNcbiAqL1xudmFyIGhhc2hfanNfMSA9IHJlcXVpcmUoXCJoYXNoLmpzXCIpO1xuLy8gY29weXJpZ2h0IGRlZmluZWQgaW4gZW9zanMvTElDRU5TRS50eHRcbnZhciByaXBlbWQxNjAgPSByZXF1aXJlKCcuL3JpcGVtZCcpLlJJUEVNRDE2MC5oYXNoO1xudmFyIGJhc2U1OENoYXJzID0gJzEyMzQ1Njc4OUFCQ0RFRkdISktMTU5QUVJTVFVWV1hZWmFiY2RlZmdoaWprbW5vcHFyc3R1dnd4eXonO1xudmFyIGJhc2U2NENoYXJzID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky8nO1xudmFyIGNyZWF0ZV9iYXNlNThfbWFwID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBiYXNlNThNID0gQXJyYXkoMjU2KS5maWxsKC0xKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJhc2U1OENoYXJzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGJhc2U1OE1bYmFzZTU4Q2hhcnMuY2hhckNvZGVBdChpKV0gPSBpO1xuICAgIH1cbiAgICByZXR1cm4gYmFzZTU4TTtcbn07XG52YXIgYmFzZTU4TWFwID0gY3JlYXRlX2Jhc2U1OF9tYXAoKTtcbnZhciBjcmVhdGVfYmFzZTY0X21hcCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYmFzZTY0TSA9IEFycmF5KDI1NikuZmlsbCgtMSk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBiYXNlNjRDaGFycy5sZW5ndGg7ICsraSkge1xuICAgICAgICBiYXNlNjRNW2Jhc2U2NENoYXJzLmNoYXJDb2RlQXQoaSldID0gaTtcbiAgICB9XG4gICAgYmFzZTY0TVsnPScuY2hhckNvZGVBdCgwKV0gPSAwO1xuICAgIHJldHVybiBiYXNlNjRNO1xufTtcbnZhciBiYXNlNjRNYXAgPSBjcmVhdGVfYmFzZTY0X21hcCgpO1xuLyoqIElzIGBiaWdudW1gIGEgbmVnYXRpdmUgbnVtYmVyPyAqL1xudmFyIGlzTmVnYXRpdmUgPSBmdW5jdGlvbiAoYmlnbnVtKSB7XG4gICAgcmV0dXJuIChiaWdudW1bYmlnbnVtLmxlbmd0aCAtIDFdICYgMHg4MCkgIT09IDA7XG59O1xuZXhwb3J0cy5pc05lZ2F0aXZlID0gaXNOZWdhdGl2ZTtcbi8qKiBOZWdhdGUgYGJpZ251bWAgKi9cbnZhciBuZWdhdGUgPSBmdW5jdGlvbiAoYmlnbnVtKSB7XG4gICAgdmFyIGNhcnJ5ID0gMTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJpZ251bS5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIgeCA9ICh+YmlnbnVtW2ldICYgMHhmZikgKyBjYXJyeTtcbiAgICAgICAgYmlnbnVtW2ldID0geDtcbiAgICAgICAgY2FycnkgPSB4ID4+IDg7XG4gICAgfVxufTtcbmV4cG9ydHMubmVnYXRlID0gbmVnYXRlO1xuLyoqXG4gKiBDb252ZXJ0IGFuIHVuc2lnbmVkIGRlY2ltYWwgbnVtYmVyIGluIGBzYCB0byBhIGJpZ251bVxuICpcbiAqIEBwYXJhbSBzaXplIGJpZ251bSBzaXplIChieXRlcylcbiAqL1xudmFyIGRlY2ltYWxUb0JpbmFyeSA9IGZ1bmN0aW9uIChzaXplLCBzKSB7XG4gICAgdmFyIHJlc3VsdCA9IG5ldyBVaW50OEFycmF5KHNpemUpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcy5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIgc3JjRGlnaXQgPSBzLmNoYXJDb2RlQXQoaSk7XG4gICAgICAgIGlmIChzcmNEaWdpdCA8ICcwJy5jaGFyQ29kZUF0KDApIHx8IHNyY0RpZ2l0ID4gJzknLmNoYXJDb2RlQXQoMCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBudW1iZXInKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgY2FycnkgPSBzcmNEaWdpdCAtICcwJy5jaGFyQ29kZUF0KDApO1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHNpemU7ICsraikge1xuICAgICAgICAgICAgdmFyIHggPSByZXN1bHRbal0gKiAxMCArIGNhcnJ5O1xuICAgICAgICAgICAgcmVzdWx0W2pdID0geDtcbiAgICAgICAgICAgIGNhcnJ5ID0geCA+PiA4O1xuICAgICAgICB9XG4gICAgICAgIGlmIChjYXJyeSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdudW1iZXIgaXMgb3V0IG9mIHJhbmdlJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5leHBvcnRzLmRlY2ltYWxUb0JpbmFyeSA9IGRlY2ltYWxUb0JpbmFyeTtcbi8qKlxuICogQ29udmVydCBhIHNpZ25lZCBkZWNpbWFsIG51bWJlciBpbiBgc2AgdG8gYSBiaWdudW1cbiAqXG4gKiBAcGFyYW0gc2l6ZSBiaWdudW0gc2l6ZSAoYnl0ZXMpXG4gKi9cbnZhciBzaWduZWREZWNpbWFsVG9CaW5hcnkgPSBmdW5jdGlvbiAoc2l6ZSwgcykge1xuICAgIHZhciBuZWdhdGl2ZSA9IHNbMF0gPT09ICctJztcbiAgICBpZiAobmVnYXRpdmUpIHtcbiAgICAgICAgcyA9IHMuc3Vic3RyKDEpO1xuICAgIH1cbiAgICB2YXIgcmVzdWx0ID0gZXhwb3J0cy5kZWNpbWFsVG9CaW5hcnkoc2l6ZSwgcyk7XG4gICAgaWYgKG5lZ2F0aXZlKSB7XG4gICAgICAgIGV4cG9ydHMubmVnYXRlKHJlc3VsdCk7XG4gICAgICAgIGlmICghZXhwb3J0cy5pc05lZ2F0aXZlKHJlc3VsdCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbnVtYmVyIGlzIG91dCBvZiByYW5nZScpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKGV4cG9ydHMuaXNOZWdhdGl2ZShyZXN1bHQpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignbnVtYmVyIGlzIG91dCBvZiByYW5nZScpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbmV4cG9ydHMuc2lnbmVkRGVjaW1hbFRvQmluYXJ5ID0gc2lnbmVkRGVjaW1hbFRvQmluYXJ5O1xuLyoqXG4gKiBDb252ZXJ0IGBiaWdudW1gIHRvIGFuIHVuc2lnbmVkIGRlY2ltYWwgbnVtYmVyXG4gKlxuICogQHBhcmFtIG1pbkRpZ2l0cyAwLXBhZCByZXN1bHQgdG8gdGhpcyBtYW55IGRpZ2l0c1xuICovXG52YXIgYmluYXJ5VG9EZWNpbWFsID0gZnVuY3Rpb24gKGJpZ251bSwgbWluRGlnaXRzKSB7XG4gICAgaWYgKG1pbkRpZ2l0cyA9PT0gdm9pZCAwKSB7IG1pbkRpZ2l0cyA9IDE7IH1cbiAgICB2YXIgcmVzdWx0ID0gQXJyYXkobWluRGlnaXRzKS5maWxsKCcwJy5jaGFyQ29kZUF0KDApKTtcbiAgICBmb3IgKHZhciBpID0gYmlnbnVtLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBjYXJyeSA9IGJpZ251bVtpXTtcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCByZXN1bHQubGVuZ3RoOyArK2opIHtcbiAgICAgICAgICAgIHZhciB4ID0gKChyZXN1bHRbal0gLSAnMCcuY2hhckNvZGVBdCgwKSkgPDwgOCkgKyBjYXJyeTtcbiAgICAgICAgICAgIHJlc3VsdFtqXSA9ICcwJy5jaGFyQ29kZUF0KDApICsgeCAlIDEwO1xuICAgICAgICAgICAgY2FycnkgPSAoeCAvIDEwKSB8IDA7XG4gICAgICAgIH1cbiAgICAgICAgd2hpbGUgKGNhcnJ5KSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaCgnMCcuY2hhckNvZGVBdCgwKSArIGNhcnJ5ICUgMTApO1xuICAgICAgICAgICAgY2FycnkgPSAoY2FycnkgLyAxMCkgfCAwO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlc3VsdC5yZXZlcnNlKCk7XG4gICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkoU3RyaW5nLCBfX3NwcmVhZEFycmF5KFtdLCBfX3JlYWQocmVzdWx0KSkpO1xufTtcbmV4cG9ydHMuYmluYXJ5VG9EZWNpbWFsID0gYmluYXJ5VG9EZWNpbWFsO1xuLyoqXG4gKiBDb252ZXJ0IGBiaWdudW1gIHRvIGEgc2lnbmVkIGRlY2ltYWwgbnVtYmVyXG4gKlxuICogQHBhcmFtIG1pbkRpZ2l0cyAwLXBhZCByZXN1bHQgdG8gdGhpcyBtYW55IGRpZ2l0c1xuICovXG52YXIgc2lnbmVkQmluYXJ5VG9EZWNpbWFsID0gZnVuY3Rpb24gKGJpZ251bSwgbWluRGlnaXRzKSB7XG4gICAgaWYgKG1pbkRpZ2l0cyA9PT0gdm9pZCAwKSB7IG1pbkRpZ2l0cyA9IDE7IH1cbiAgICBpZiAoZXhwb3J0cy5pc05lZ2F0aXZlKGJpZ251bSkpIHtcbiAgICAgICAgdmFyIHggPSBiaWdudW0uc2xpY2UoKTtcbiAgICAgICAgZXhwb3J0cy5uZWdhdGUoeCk7XG4gICAgICAgIHJldHVybiAnLScgKyBleHBvcnRzLmJpbmFyeVRvRGVjaW1hbCh4LCBtaW5EaWdpdHMpO1xuICAgIH1cbiAgICByZXR1cm4gZXhwb3J0cy5iaW5hcnlUb0RlY2ltYWwoYmlnbnVtLCBtaW5EaWdpdHMpO1xufTtcbmV4cG9ydHMuc2lnbmVkQmluYXJ5VG9EZWNpbWFsID0gc2lnbmVkQmluYXJ5VG9EZWNpbWFsO1xudmFyIGJhc2U1OFRvQmluYXJ5VmFyU2l6ZSA9IGZ1bmN0aW9uIChzKSB7XG4gICAgdmFyIGVfMSwgX2E7XG4gICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcy5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIgY2FycnkgPSBiYXNlNThNYXBbcy5jaGFyQ29kZUF0KGkpXTtcbiAgICAgICAgaWYgKGNhcnJ5IDwgMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIGJhc2UtNTggdmFsdWUnKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHJlc3VsdC5sZW5ndGg7ICsraikge1xuICAgICAgICAgICAgdmFyIHggPSByZXN1bHRbal0gKiA1OCArIGNhcnJ5O1xuICAgICAgICAgICAgcmVzdWx0W2pdID0geCAmIDB4ZmY7XG4gICAgICAgICAgICBjYXJyeSA9IHggPj4gODtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2FycnkpIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKGNhcnJ5KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBmb3IgKHZhciBzXzEgPSBfX3ZhbHVlcyhzKSwgc18xXzEgPSBzXzEubmV4dCgpOyAhc18xXzEuZG9uZTsgc18xXzEgPSBzXzEubmV4dCgpKSB7XG4gICAgICAgICAgICB2YXIgY2ggPSBzXzFfMS52YWx1ZTtcbiAgICAgICAgICAgIGlmIChjaCA9PT0gJzEnKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBjYXRjaCAoZV8xXzEpIHsgZV8xID0geyBlcnJvcjogZV8xXzEgfTsgfVxuICAgIGZpbmFsbHkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKHNfMV8xICYmICFzXzFfMS5kb25lICYmIChfYSA9IHNfMS5yZXR1cm4pKSBfYS5jYWxsKHNfMSk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7IGlmIChlXzEpIHRocm93IGVfMS5lcnJvcjsgfVxuICAgIH1cbiAgICByZXN1bHQucmV2ZXJzZSgpO1xuICAgIHJldHVybiBuZXcgVWludDhBcnJheShyZXN1bHQpO1xufTtcbi8qKlxuICogQ29udmVydCBhbiB1bnNpZ25lZCBiYXNlLTU4IG51bWJlciBpbiBgc2AgdG8gYSBiaWdudW1cbiAqXG4gKiBAcGFyYW0gc2l6ZSBiaWdudW0gc2l6ZSAoYnl0ZXMpXG4gKi9cbnZhciBiYXNlNThUb0JpbmFyeSA9IGZ1bmN0aW9uIChzaXplLCBzKSB7XG4gICAgaWYgKCFzaXplKSB7XG4gICAgICAgIHJldHVybiBiYXNlNThUb0JpbmFyeVZhclNpemUocyk7XG4gICAgfVxuICAgIHZhciByZXN1bHQgPSBuZXcgVWludDhBcnJheShzaXplKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIGNhcnJ5ID0gYmFzZTU4TWFwW3MuY2hhckNvZGVBdChpKV07XG4gICAgICAgIGlmIChjYXJyeSA8IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBiYXNlLTU4IHZhbHVlJyk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBzaXplOyArK2opIHtcbiAgICAgICAgICAgIHZhciB4ID0gcmVzdWx0W2pdICogNTggKyBjYXJyeTtcbiAgICAgICAgICAgIHJlc3VsdFtqXSA9IHg7XG4gICAgICAgICAgICBjYXJyeSA9IHggPj4gODtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2FycnkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignYmFzZS01OCB2YWx1ZSBpcyBvdXQgb2YgcmFuZ2UnKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXN1bHQucmV2ZXJzZSgpO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xuZXhwb3J0cy5iYXNlNThUb0JpbmFyeSA9IGJhc2U1OFRvQmluYXJ5O1xuLyoqXG4gKiBDb252ZXJ0IGBiaWdudW1gIHRvIGEgYmFzZS01OCBudW1iZXJcbiAqXG4gKiBAcGFyYW0gbWluRGlnaXRzIDAtcGFkIHJlc3VsdCB0byB0aGlzIG1hbnkgZGlnaXRzXG4gKi9cbnZhciBiaW5hcnlUb0Jhc2U1OCA9IGZ1bmN0aW9uIChiaWdudW0sIG1pbkRpZ2l0cykge1xuICAgIHZhciBlXzIsIF9hLCBlXzMsIF9iO1xuICAgIGlmIChtaW5EaWdpdHMgPT09IHZvaWQgMCkgeyBtaW5EaWdpdHMgPSAxOyB9XG4gICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgIHRyeSB7XG4gICAgICAgIGZvciAodmFyIGJpZ251bV8xID0gX192YWx1ZXMoYmlnbnVtKSwgYmlnbnVtXzFfMSA9IGJpZ251bV8xLm5leHQoKTsgIWJpZ251bV8xXzEuZG9uZTsgYmlnbnVtXzFfMSA9IGJpZ251bV8xLm5leHQoKSkge1xuICAgICAgICAgICAgdmFyIGJ5dGUgPSBiaWdudW1fMV8xLnZhbHVlO1xuICAgICAgICAgICAgdmFyIGNhcnJ5ID0gYnl0ZTtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgcmVzdWx0Lmxlbmd0aDsgKytqKSB7XG4gICAgICAgICAgICAgICAgdmFyIHggPSAoYmFzZTU4TWFwW3Jlc3VsdFtqXV0gPDwgOCkgKyBjYXJyeTtcbiAgICAgICAgICAgICAgICByZXN1bHRbal0gPSBiYXNlNThDaGFycy5jaGFyQ29kZUF0KHggJSA1OCk7XG4gICAgICAgICAgICAgICAgY2FycnkgPSAoeCAvIDU4KSB8IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3aGlsZSAoY2FycnkpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChiYXNlNThDaGFycy5jaGFyQ29kZUF0KGNhcnJ5ICUgNTgpKTtcbiAgICAgICAgICAgICAgICBjYXJyeSA9IChjYXJyeSAvIDU4KSB8IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2F0Y2ggKGVfMl8xKSB7IGVfMiA9IHsgZXJyb3I6IGVfMl8xIH07IH1cbiAgICBmaW5hbGx5IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChiaWdudW1fMV8xICYmICFiaWdudW1fMV8xLmRvbmUgJiYgKF9hID0gYmlnbnVtXzEucmV0dXJuKSkgX2EuY2FsbChiaWdudW1fMSk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7IGlmIChlXzIpIHRocm93IGVfMi5lcnJvcjsgfVxuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBmb3IgKHZhciBiaWdudW1fMiA9IF9fdmFsdWVzKGJpZ251bSksIGJpZ251bV8yXzEgPSBiaWdudW1fMi5uZXh0KCk7ICFiaWdudW1fMl8xLmRvbmU7IGJpZ251bV8yXzEgPSBiaWdudW1fMi5uZXh0KCkpIHtcbiAgICAgICAgICAgIHZhciBieXRlID0gYmlnbnVtXzJfMS52YWx1ZTtcbiAgICAgICAgICAgIGlmIChieXRlKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaCgnMScuY2hhckNvZGVBdCgwKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2F0Y2ggKGVfM18xKSB7IGVfMyA9IHsgZXJyb3I6IGVfM18xIH07IH1cbiAgICBmaW5hbGx5IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChiaWdudW1fMl8xICYmICFiaWdudW1fMl8xLmRvbmUgJiYgKF9iID0gYmlnbnVtXzIucmV0dXJuKSkgX2IuY2FsbChiaWdudW1fMik7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7IGlmIChlXzMpIHRocm93IGVfMy5lcnJvcjsgfVxuICAgIH1cbiAgICByZXN1bHQucmV2ZXJzZSgpO1xuICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KFN0cmluZywgX19zcHJlYWRBcnJheShbXSwgX19yZWFkKHJlc3VsdCkpKTtcbn07XG5leHBvcnRzLmJpbmFyeVRvQmFzZTU4ID0gYmluYXJ5VG9CYXNlNTg7XG4vKiogQ29udmVydCBhbiB1bnNpZ25lZCBiYXNlLTY0IG51bWJlciBpbiBgc2AgdG8gYSBiaWdudW0gKi9cbnZhciBiYXNlNjRUb0JpbmFyeSA9IGZ1bmN0aW9uIChzKSB7XG4gICAgdmFyIGxlbiA9IHMubGVuZ3RoO1xuICAgIGlmICgobGVuICYgMykgPT09IDEgJiYgc1tsZW4gLSAxXSA9PT0gJz0nKSB7XG4gICAgICAgIGxlbiAtPSAxO1xuICAgIH0gLy8gZmMgYXBwZW5kcyBhbiBleHRyYSAnPSdcbiAgICBpZiAoKGxlbiAmIDMpICE9PSAwKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignYmFzZS02NCB2YWx1ZSBpcyBub3QgcGFkZGVkIGNvcnJlY3RseScpO1xuICAgIH1cbiAgICB2YXIgZ3JvdXBzID0gbGVuID4+IDI7XG4gICAgdmFyIGJ5dGVzID0gZ3JvdXBzICogMztcbiAgICBpZiAobGVuID4gMCAmJiBzW2xlbiAtIDFdID09PSAnPScpIHtcbiAgICAgICAgaWYgKHNbbGVuIC0gMl0gPT09ICc9Jykge1xuICAgICAgICAgICAgYnl0ZXMgLT0gMjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGJ5dGVzIC09IDE7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdmFyIHJlc3VsdCA9IG5ldyBVaW50OEFycmF5KGJ5dGVzKTtcbiAgICBmb3IgKHZhciBncm91cCA9IDA7IGdyb3VwIDwgZ3JvdXBzOyArK2dyb3VwKSB7XG4gICAgICAgIHZhciBkaWdpdDAgPSBiYXNlNjRNYXBbcy5jaGFyQ29kZUF0KGdyb3VwICogNCArIDApXTtcbiAgICAgICAgdmFyIGRpZ2l0MSA9IGJhc2U2NE1hcFtzLmNoYXJDb2RlQXQoZ3JvdXAgKiA0ICsgMSldO1xuICAgICAgICB2YXIgZGlnaXQyID0gYmFzZTY0TWFwW3MuY2hhckNvZGVBdChncm91cCAqIDQgKyAyKV07XG4gICAgICAgIHZhciBkaWdpdDMgPSBiYXNlNjRNYXBbcy5jaGFyQ29kZUF0KGdyb3VwICogNCArIDMpXTtcbiAgICAgICAgcmVzdWx0W2dyb3VwICogMyArIDBdID0gKGRpZ2l0MCA8PCAyKSB8IChkaWdpdDEgPj4gNCk7XG4gICAgICAgIGlmIChncm91cCAqIDMgKyAxIDwgYnl0ZXMpIHtcbiAgICAgICAgICAgIHJlc3VsdFtncm91cCAqIDMgKyAxXSA9ICgoZGlnaXQxICYgMTUpIDw8IDQpIHwgKGRpZ2l0MiA+PiAyKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZ3JvdXAgKiAzICsgMiA8IGJ5dGVzKSB7XG4gICAgICAgICAgICByZXN1bHRbZ3JvdXAgKiAzICsgMl0gPSAoKGRpZ2l0MiAmIDMpIDw8IDYpIHwgZGlnaXQzO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59O1xuZXhwb3J0cy5iYXNlNjRUb0JpbmFyeSA9IGJhc2U2NFRvQmluYXJ5O1xuLyoqIEtleSB0eXBlcyB0aGlzIGxpYnJhcnkgc3VwcG9ydHMgKi9cbnZhciBLZXlUeXBlO1xuKGZ1bmN0aW9uIChLZXlUeXBlKSB7XG4gICAgS2V5VHlwZVtLZXlUeXBlW1wiazFcIl0gPSAwXSA9IFwiazFcIjtcbiAgICBLZXlUeXBlW0tleVR5cGVbXCJyMVwiXSA9IDFdID0gXCJyMVwiO1xuICAgIEtleVR5cGVbS2V5VHlwZVtcIndhXCJdID0gMl0gPSBcIndhXCI7XG59KShLZXlUeXBlID0gZXhwb3J0cy5LZXlUeXBlIHx8IChleHBvcnRzLktleVR5cGUgPSB7fSkpO1xuLyoqIFB1YmxpYyBrZXkgZGF0YSBzaXplLCBleGNsdWRpbmcgdHlwZSBmaWVsZCAqL1xuZXhwb3J0cy5wdWJsaWNLZXlEYXRhU2l6ZSA9IDMzO1xuLyoqIFByaXZhdGUga2V5IGRhdGEgc2l6ZSwgZXhjbHVkaW5nIHR5cGUgZmllbGQgKi9cbmV4cG9ydHMucHJpdmF0ZUtleURhdGFTaXplID0gMzI7XG4vKiogU2lnbmF0dXJlIGRhdGEgc2l6ZSwgZXhjbHVkaW5nIHR5cGUgZmllbGQgKi9cbmV4cG9ydHMuc2lnbmF0dXJlRGF0YVNpemUgPSA2NTtcbnZhciBkaWdlc3RTdWZmaXhSaXBlbWQxNjAgPSBmdW5jdGlvbiAoZGF0YSwgc3VmZml4KSB7XG4gICAgdmFyIGQgPSBuZXcgVWludDhBcnJheShkYXRhLmxlbmd0aCArIHN1ZmZpeC5sZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7ICsraSkge1xuICAgICAgICBkW2ldID0gZGF0YVtpXTtcbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdWZmaXgubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgZFtkYXRhLmxlbmd0aCArIGldID0gc3VmZml4LmNoYXJDb2RlQXQoaSk7XG4gICAgfVxuICAgIHJldHVybiByaXBlbWQxNjAoZCk7XG59O1xudmFyIHN0cmluZ1RvS2V5ID0gZnVuY3Rpb24gKHMsIHR5cGUsIHNpemUsIHN1ZmZpeCkge1xuICAgIHZhciB3aG9sZSA9IGV4cG9ydHMuYmFzZTU4VG9CaW5hcnkoc2l6ZSA/IHNpemUgKyA0IDogMCwgcyk7XG4gICAgdmFyIHJlc3VsdCA9IHsgdHlwZTogdHlwZSwgZGF0YTogbmV3IFVpbnQ4QXJyYXkod2hvbGUuYnVmZmVyLCAwLCB3aG9sZS5sZW5ndGggLSA0KSB9O1xuICAgIHZhciBkaWdlc3QgPSBuZXcgVWludDhBcnJheShkaWdlc3RTdWZmaXhSaXBlbWQxNjAocmVzdWx0LmRhdGEsIHN1ZmZpeCkpO1xuICAgIGlmIChkaWdlc3RbMF0gIT09IHdob2xlW3dob2xlLmxlbmd0aCAtIDRdIHx8IGRpZ2VzdFsxXSAhPT0gd2hvbGVbd2hvbGUubGVuZ3RoIC0gM11cbiAgICAgICAgfHwgZGlnZXN0WzJdICE9PSB3aG9sZVt3aG9sZS5sZW5ndGggLSAyXSB8fCBkaWdlc3RbM10gIT09IHdob2xlW3dob2xlLmxlbmd0aCAtIDFdKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignY2hlY2tzdW0gZG9lc25cXCd0IG1hdGNoJyk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59O1xudmFyIGtleVRvU3RyaW5nID0gZnVuY3Rpb24gKGtleSwgc3VmZml4LCBwcmVmaXgpIHtcbiAgICB2YXIgZGlnZXN0ID0gbmV3IFVpbnQ4QXJyYXkoZGlnZXN0U3VmZml4UmlwZW1kMTYwKGtleS5kYXRhLCBzdWZmaXgpKTtcbiAgICB2YXIgd2hvbGUgPSBuZXcgVWludDhBcnJheShrZXkuZGF0YS5sZW5ndGggKyA0KTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleS5kYXRhLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHdob2xlW2ldID0ga2V5LmRhdGFbaV07XG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNDsgKytpKSB7XG4gICAgICAgIHdob2xlW2kgKyBrZXkuZGF0YS5sZW5ndGhdID0gZGlnZXN0W2ldO1xuICAgIH1cbiAgICByZXR1cm4gcHJlZml4ICsgZXhwb3J0cy5iaW5hcnlUb0Jhc2U1OCh3aG9sZSk7XG59O1xuLyoqIENvbnZlcnQga2V5IGluIGBzYCB0byBiaW5hcnkgZm9ybSAqL1xudmFyIHN0cmluZ1RvUHVibGljS2V5ID0gZnVuY3Rpb24gKHMpIHtcbiAgICBpZiAodHlwZW9mIHMgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignZXhwZWN0ZWQgc3RyaW5nIGNvbnRhaW5pbmcgcHVibGljIGtleScpO1xuICAgIH1cbiAgICBpZiAocy5zdWJzdHIoMCwgMykgPT09ICdFT1MnKSB7XG4gICAgICAgIHZhciB3aG9sZSA9IGV4cG9ydHMuYmFzZTU4VG9CaW5hcnkoZXhwb3J0cy5wdWJsaWNLZXlEYXRhU2l6ZSArIDQsIHMuc3Vic3RyKDMpKTtcbiAgICAgICAgdmFyIGtleSA9IHsgdHlwZTogS2V5VHlwZS5rMSwgZGF0YTogbmV3IFVpbnQ4QXJyYXkoZXhwb3J0cy5wdWJsaWNLZXlEYXRhU2l6ZSkgfTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBleHBvcnRzLnB1YmxpY0tleURhdGFTaXplOyArK2kpIHtcbiAgICAgICAgICAgIGtleS5kYXRhW2ldID0gd2hvbGVbaV07XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGRpZ2VzdCA9IG5ldyBVaW50OEFycmF5KHJpcGVtZDE2MChrZXkuZGF0YSkpO1xuICAgICAgICBpZiAoZGlnZXN0WzBdICE9PSB3aG9sZVtleHBvcnRzLnB1YmxpY0tleURhdGFTaXplXSB8fCBkaWdlc3RbMV0gIT09IHdob2xlWzM0XVxuICAgICAgICAgICAgfHwgZGlnZXN0WzJdICE9PSB3aG9sZVszNV0gfHwgZGlnZXN0WzNdICE9PSB3aG9sZVszNl0pIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignY2hlY2tzdW0gZG9lc25cXCd0IG1hdGNoJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGtleTtcbiAgICB9XG4gICAgZWxzZSBpZiAocy5zdWJzdHIoMCwgNykgPT09ICdQVUJfSzFfJykge1xuICAgICAgICByZXR1cm4gc3RyaW5nVG9LZXkocy5zdWJzdHIoNyksIEtleVR5cGUuazEsIGV4cG9ydHMucHVibGljS2V5RGF0YVNpemUsICdLMScpO1xuICAgIH1cbiAgICBlbHNlIGlmIChzLnN1YnN0cigwLCA3KSA9PT0gJ1BVQl9SMV8nKSB7XG4gICAgICAgIHJldHVybiBzdHJpbmdUb0tleShzLnN1YnN0cig3KSwgS2V5VHlwZS5yMSwgZXhwb3J0cy5wdWJsaWNLZXlEYXRhU2l6ZSwgJ1IxJyk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHMuc3Vic3RyKDAsIDcpID09PSAnUFVCX1dBXycpIHtcbiAgICAgICAgcmV0dXJuIHN0cmluZ1RvS2V5KHMuc3Vic3RyKDcpLCBLZXlUeXBlLndhLCAwLCAnV0EnKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndW5yZWNvZ25pemVkIHB1YmxpYyBrZXkgZm9ybWF0Jyk7XG4gICAgfVxufTtcbmV4cG9ydHMuc3RyaW5nVG9QdWJsaWNLZXkgPSBzdHJpbmdUb1B1YmxpY0tleTtcbi8qKiBDb252ZXJ0IHB1YmxpYyBga2V5YCB0byBsZWdhY3kgc3RyaW5nIChiYXNlLTU4KSBmb3JtICovXG52YXIgcHVibGljS2V5VG9MZWdhY3lTdHJpbmcgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgaWYgKGtleS50eXBlID09PSBLZXlUeXBlLmsxICYmIGtleS5kYXRhLmxlbmd0aCA9PT0gZXhwb3J0cy5wdWJsaWNLZXlEYXRhU2l6ZSkge1xuICAgICAgICByZXR1cm4ga2V5VG9TdHJpbmcoa2V5LCAnJywgJ0VPUycpO1xuICAgIH1cbiAgICBlbHNlIGlmIChrZXkudHlwZSA9PT0gS2V5VHlwZS5yMSB8fCBrZXkudHlwZSA9PT0gS2V5VHlwZS53YSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0tleSBmb3JtYXQgbm90IHN1cHBvcnRlZCBpbiBsZWdhY3kgY29udmVyc2lvbicpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd1bnJlY29nbml6ZWQgcHVibGljIGtleSBmb3JtYXQnKTtcbiAgICB9XG59O1xuZXhwb3J0cy5wdWJsaWNLZXlUb0xlZ2FjeVN0cmluZyA9IHB1YmxpY0tleVRvTGVnYWN5U3RyaW5nO1xuLyoqIENvbnZlcnQgYGtleWAgdG8gc3RyaW5nIChiYXNlLTU4KSBmb3JtICovXG52YXIgcHVibGljS2V5VG9TdHJpbmcgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgaWYgKGtleS50eXBlID09PSBLZXlUeXBlLmsxICYmIGtleS5kYXRhLmxlbmd0aCA9PT0gZXhwb3J0cy5wdWJsaWNLZXlEYXRhU2l6ZSkge1xuICAgICAgICByZXR1cm4ga2V5VG9TdHJpbmcoa2V5LCAnSzEnLCAnUFVCX0sxXycpO1xuICAgIH1cbiAgICBlbHNlIGlmIChrZXkudHlwZSA9PT0gS2V5VHlwZS5yMSAmJiBrZXkuZGF0YS5sZW5ndGggPT09IGV4cG9ydHMucHVibGljS2V5RGF0YVNpemUpIHtcbiAgICAgICAgcmV0dXJuIGtleVRvU3RyaW5nKGtleSwgJ1IxJywgJ1BVQl9SMV8nKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoa2V5LnR5cGUgPT09IEtleVR5cGUud2EpIHtcbiAgICAgICAgcmV0dXJuIGtleVRvU3RyaW5nKGtleSwgJ1dBJywgJ1BVQl9XQV8nKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndW5yZWNvZ25pemVkIHB1YmxpYyBrZXkgZm9ybWF0Jyk7XG4gICAgfVxufTtcbmV4cG9ydHMucHVibGljS2V5VG9TdHJpbmcgPSBwdWJsaWNLZXlUb1N0cmluZztcbi8qKiBJZiBhIGtleSBpcyBpbiB0aGUgbGVnYWN5IGZvcm1hdCAoYEVPU2AgcHJlZml4KSwgdGhlbiBjb252ZXJ0IGl0IHRvIHRoZSBuZXcgZm9ybWF0IChgUFVCX0sxX2ApLlxuICogTGVhdmVzIG90aGVyIGZvcm1hdHMgdW50b3VjaGVkXG4gKi9cbnZhciBjb252ZXJ0TGVnYWN5UHVibGljS2V5ID0gZnVuY3Rpb24gKHMpIHtcbiAgICBpZiAocy5zdWJzdHIoMCwgMykgPT09ICdFT1MnKSB7XG4gICAgICAgIHJldHVybiBleHBvcnRzLnB1YmxpY0tleVRvU3RyaW5nKGV4cG9ydHMuc3RyaW5nVG9QdWJsaWNLZXkocykpO1xuICAgIH1cbiAgICByZXR1cm4gcztcbn07XG5leHBvcnRzLmNvbnZlcnRMZWdhY3lQdWJsaWNLZXkgPSBjb252ZXJ0TGVnYWN5UHVibGljS2V5O1xuLyoqIElmIGEga2V5IGlzIGluIHRoZSBsZWdhY3kgZm9ybWF0IChgRU9TYCBwcmVmaXgpLCB0aGVuIGNvbnZlcnQgaXQgdG8gdGhlIG5ldyBmb3JtYXQgKGBQVUJfSzFfYCkuXG4gKiBMZWF2ZXMgb3RoZXIgZm9ybWF0cyB1bnRvdWNoZWRcbiAqL1xudmFyIGNvbnZlcnRMZWdhY3lQdWJsaWNLZXlzID0gZnVuY3Rpb24gKGtleXMpIHtcbiAgICByZXR1cm4ga2V5cy5tYXAoZXhwb3J0cy5jb252ZXJ0TGVnYWN5UHVibGljS2V5KTtcbn07XG5leHBvcnRzLmNvbnZlcnRMZWdhY3lQdWJsaWNLZXlzID0gY29udmVydExlZ2FjeVB1YmxpY0tleXM7XG4vKiogQ29udmVydCBrZXkgaW4gYHNgIHRvIGJpbmFyeSBmb3JtICovXG52YXIgc3RyaW5nVG9Qcml2YXRlS2V5ID0gZnVuY3Rpb24gKHMpIHtcbiAgICBpZiAodHlwZW9mIHMgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignZXhwZWN0ZWQgc3RyaW5nIGNvbnRhaW5pbmcgcHJpdmF0ZSBrZXknKTtcbiAgICB9XG4gICAgaWYgKHMuc3Vic3RyKDAsIDcpID09PSAnUFZUX1IxXycpIHtcbiAgICAgICAgcmV0dXJuIHN0cmluZ1RvS2V5KHMuc3Vic3RyKDcpLCBLZXlUeXBlLnIxLCBleHBvcnRzLnByaXZhdGVLZXlEYXRhU2l6ZSwgJ1IxJyk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHMuc3Vic3RyKDAsIDcpID09PSAnUFZUX0sxXycpIHtcbiAgICAgICAgcmV0dXJuIHN0cmluZ1RvS2V5KHMuc3Vic3RyKDcpLCBLZXlUeXBlLmsxLCBleHBvcnRzLnByaXZhdGVLZXlEYXRhU2l6ZSwgJ0sxJyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICAvLyB0b2RvOiBWZXJpZnkgY2hlY2tzdW06IHNoYTI1NihzaGEyNTYoa2V5LmRhdGEpKS5cbiAgICAgICAgLy8gICAgICAgTm90IGNyaXRpY2FsIHNpbmNlIGEgYmFkIGtleSB3aWxsIGZhaWwgdG8gcHJvZHVjZSBhXG4gICAgICAgIC8vICAgICAgIHZhbGlkIHNpZ25hdHVyZSBhbnl3YXkuXG4gICAgICAgIHZhciB3aG9sZSA9IGV4cG9ydHMuYmFzZTU4VG9CaW5hcnkoZXhwb3J0cy5wcml2YXRlS2V5RGF0YVNpemUgKyA1LCBzKTtcbiAgICAgICAgdmFyIGtleSA9IHsgdHlwZTogS2V5VHlwZS5rMSwgZGF0YTogbmV3IFVpbnQ4QXJyYXkoZXhwb3J0cy5wcml2YXRlS2V5RGF0YVNpemUpIH07XG4gICAgICAgIGlmICh3aG9sZVswXSAhPT0gMHg4MCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd1bnJlY29nbml6ZWQgcHJpdmF0ZSBrZXkgdHlwZScpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZXhwb3J0cy5wcml2YXRlS2V5RGF0YVNpemU7ICsraSkge1xuICAgICAgICAgICAga2V5LmRhdGFbaV0gPSB3aG9sZVtpICsgMV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGtleTtcbiAgICB9XG59O1xuZXhwb3J0cy5zdHJpbmdUb1ByaXZhdGVLZXkgPSBzdHJpbmdUb1ByaXZhdGVLZXk7XG4vKiogQ29udmVydCBwcml2YXRlIGBrZXlgIHRvIGxlZ2FjeSBzdHJpbmcgKGJhc2UtNTgpIGZvcm0gKi9cbnZhciBwcml2YXRlS2V5VG9MZWdhY3lTdHJpbmcgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgaWYgKGtleS50eXBlID09PSBLZXlUeXBlLmsxICYmIGtleS5kYXRhLmxlbmd0aCA9PT0gZXhwb3J0cy5wcml2YXRlS2V5RGF0YVNpemUpIHtcbiAgICAgICAgdmFyIHdob2xlXzEgPSBbXTtcbiAgICAgICAgd2hvbGVfMS5wdXNoKDEyOCk7XG4gICAgICAgIGtleS5kYXRhLmZvckVhY2goZnVuY3Rpb24gKGJ5dGUpIHsgcmV0dXJuIHdob2xlXzEucHVzaChieXRlKTsgfSk7XG4gICAgICAgIHZhciBkaWdlc3QgPSBuZXcgVWludDhBcnJheShoYXNoX2pzXzEuc2hhMjU2KCkudXBkYXRlKGhhc2hfanNfMS5zaGEyNTYoKS51cGRhdGUod2hvbGVfMSkuZGlnZXN0KCkpLmRpZ2VzdCgpKTtcbiAgICAgICAgdmFyIHJlc3VsdCA9IG5ldyBVaW50OEFycmF5KGV4cG9ydHMucHJpdmF0ZUtleURhdGFTaXplICsgNSk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgd2hvbGVfMS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcmVzdWx0W2ldID0gd2hvbGVfMVtpXTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgICAgICAgICAgcmVzdWx0W2kgKyB3aG9sZV8xLmxlbmd0aF0gPSBkaWdlc3RbaV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGV4cG9ydHMuYmluYXJ5VG9CYXNlNTgocmVzdWx0KTtcbiAgICB9XG4gICAgZWxzZSBpZiAoa2V5LnR5cGUgPT09IEtleVR5cGUucjEgfHwga2V5LnR5cGUgPT09IEtleVR5cGUud2EpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdLZXkgZm9ybWF0IG5vdCBzdXBwb3J0ZWQgaW4gbGVnYWN5IGNvbnZlcnNpb24nKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndW5yZWNvZ25pemVkIHB1YmxpYyBrZXkgZm9ybWF0Jyk7XG4gICAgfVxufTtcbmV4cG9ydHMucHJpdmF0ZUtleVRvTGVnYWN5U3RyaW5nID0gcHJpdmF0ZUtleVRvTGVnYWN5U3RyaW5nO1xuLyoqIENvbnZlcnQgYGtleWAgdG8gc3RyaW5nIChiYXNlLTU4KSBmb3JtICovXG52YXIgcHJpdmF0ZUtleVRvU3RyaW5nID0gZnVuY3Rpb24gKGtleSkge1xuICAgIGlmIChrZXkudHlwZSA9PT0gS2V5VHlwZS5yMSkge1xuICAgICAgICByZXR1cm4ga2V5VG9TdHJpbmcoa2V5LCAnUjEnLCAnUFZUX1IxXycpO1xuICAgIH1cbiAgICBlbHNlIGlmIChrZXkudHlwZSA9PT0gS2V5VHlwZS5rMSkge1xuICAgICAgICByZXR1cm4ga2V5VG9TdHJpbmcoa2V5LCAnSzEnLCAnUFZUX0sxXycpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd1bnJlY29nbml6ZWQgcHJpdmF0ZSBrZXkgZm9ybWF0Jyk7XG4gICAgfVxufTtcbmV4cG9ydHMucHJpdmF0ZUtleVRvU3RyaW5nID0gcHJpdmF0ZUtleVRvU3RyaW5nO1xuLyoqIENvbnZlcnQga2V5IGluIGBzYCB0byBiaW5hcnkgZm9ybSAqL1xudmFyIHN0cmluZ1RvU2lnbmF0dXJlID0gZnVuY3Rpb24gKHMpIHtcbiAgICBpZiAodHlwZW9mIHMgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignZXhwZWN0ZWQgc3RyaW5nIGNvbnRhaW5pbmcgc2lnbmF0dXJlJyk7XG4gICAgfVxuICAgIGlmIChzLnN1YnN0cigwLCA3KSA9PT0gJ1NJR19LMV8nKSB7XG4gICAgICAgIHJldHVybiBzdHJpbmdUb0tleShzLnN1YnN0cig3KSwgS2V5VHlwZS5rMSwgZXhwb3J0cy5zaWduYXR1cmVEYXRhU2l6ZSwgJ0sxJyk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHMuc3Vic3RyKDAsIDcpID09PSAnU0lHX1IxXycpIHtcbiAgICAgICAgcmV0dXJuIHN0cmluZ1RvS2V5KHMuc3Vic3RyKDcpLCBLZXlUeXBlLnIxLCBleHBvcnRzLnNpZ25hdHVyZURhdGFTaXplLCAnUjEnKTtcbiAgICB9XG4gICAgZWxzZSBpZiAocy5zdWJzdHIoMCwgNykgPT09ICdTSUdfV0FfJykge1xuICAgICAgICByZXR1cm4gc3RyaW5nVG9LZXkocy5zdWJzdHIoNyksIEtleVR5cGUud2EsIDAsICdXQScpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd1bnJlY29nbml6ZWQgc2lnbmF0dXJlIGZvcm1hdCcpO1xuICAgIH1cbn07XG5leHBvcnRzLnN0cmluZ1RvU2lnbmF0dXJlID0gc3RyaW5nVG9TaWduYXR1cmU7XG4vKiogQ29udmVydCBgc2lnbmF0dXJlYCB0byBzdHJpbmcgKGJhc2UtNTgpIGZvcm0gKi9cbnZhciBzaWduYXR1cmVUb1N0cmluZyA9IGZ1bmN0aW9uIChzaWduYXR1cmUpIHtcbiAgICBpZiAoc2lnbmF0dXJlLnR5cGUgPT09IEtleVR5cGUuazEpIHtcbiAgICAgICAgcmV0dXJuIGtleVRvU3RyaW5nKHNpZ25hdHVyZSwgJ0sxJywgJ1NJR19LMV8nKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoc2lnbmF0dXJlLnR5cGUgPT09IEtleVR5cGUucjEpIHtcbiAgICAgICAgcmV0dXJuIGtleVRvU3RyaW5nKHNpZ25hdHVyZSwgJ1IxJywgJ1NJR19SMV8nKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoc2lnbmF0dXJlLnR5cGUgPT09IEtleVR5cGUud2EpIHtcbiAgICAgICAgcmV0dXJuIGtleVRvU3RyaW5nKHNpZ25hdHVyZSwgJ1dBJywgJ1NJR19XQV8nKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndW5yZWNvZ25pemVkIHNpZ25hdHVyZSBmb3JtYXQnKTtcbiAgICB9XG59O1xuZXhwb3J0cy5zaWduYXR1cmVUb1N0cmluZyA9IHNpZ25hdHVyZVRvU3RyaW5nO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKipcbiAqIEBtb2R1bGUgU2VyaWFsaXplXG4gKi9cbi8vIGNvcHlyaWdodCBkZWZpbmVkIGluIGVvc2pzL0xJQ0VOU0UudHh0XG4vKiBlc2xpbnQtZGlzYWJsZSBtYXgtY2xhc3Nlcy1wZXItZmlsZSAqL1xuLyogZXNsaW50LWRpc2FibGUganNkb2MvY2hlY2staW5kZW50YXRpb24gKi9cbnZhciBfX2Fzc2lnbiA9ICh0aGlzICYmIHRoaXMuX19hc3NpZ24pIHx8IGZ1bmN0aW9uICgpIHtcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24odCkge1xuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpXG4gICAgICAgICAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHQ7XG4gICAgfTtcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG52YXIgX19yZWFkID0gKHRoaXMgJiYgdGhpcy5fX3JlYWQpIHx8IGZ1bmN0aW9uIChvLCBuKSB7XG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xuICAgIGlmICghbSkgcmV0dXJuIG87XG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XG4gICAgdHJ5IHtcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XG4gICAgfVxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxuICAgIGZpbmFsbHkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XG4gICAgfVxuICAgIHJldHVybiBhcjtcbn07XG52YXIgX19zcHJlYWRBcnJheSA9ICh0aGlzICYmIHRoaXMuX19zcHJlYWRBcnJheSkgfHwgZnVuY3Rpb24gKHRvLCBmcm9tKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGlsID0gZnJvbS5sZW5ndGgsIGogPSB0by5sZW5ndGg7IGkgPCBpbDsgaSsrLCBqKyspXG4gICAgICAgIHRvW2pdID0gZnJvbVtpXTtcbiAgICByZXR1cm4gdG87XG59O1xudmFyIF9fdmFsdWVzID0gKHRoaXMgJiYgdGhpcy5fX3ZhbHVlcykgfHwgZnVuY3Rpb24obykge1xuICAgIHZhciBzID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIFN5bWJvbC5pdGVyYXRvciwgbSA9IHMgJiYgb1tzXSwgaSA9IDA7XG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XG4gICAgaWYgKG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSByZXR1cm4ge1xuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xuICAgICAgICB9XG4gICAgfTtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHMgPyBcIk9iamVjdCBpcyBub3QgaXRlcmFibGUuXCIgOiBcIlN5bWJvbC5pdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5zZXJpYWxpemVRdWVyeSA9IGV4cG9ydHMuZGVzZXJpYWxpemVBbnlBcnJheSA9IGV4cG9ydHMuc2VyaWFsaXplQW55QXJyYXkgPSBleHBvcnRzLmRlc2VyaWFsaXplQW55T2JqZWN0ID0gZXhwb3J0cy5zZXJpYWxpemVBbnlPYmplY3QgPSBleHBvcnRzLmRlc2VyaWFsaXplQW55dmFyU2hvcnQgPSBleHBvcnRzLmRlc2VyaWFsaXplQW55dmFyID0gZXhwb3J0cy5zZXJpYWxpemVBbnl2YXIgPSBleHBvcnRzLmRlc2VyaWFsaXplQWN0aW9uID0gZXhwb3J0cy5kZXNlcmlhbGl6ZUFjdGlvbkRhdGEgPSBleHBvcnRzLnNlcmlhbGl6ZUFjdGlvbiA9IGV4cG9ydHMuc2VyaWFsaXplQWN0aW9uRGF0YSA9IGV4cG9ydHMudHJhbnNhY3Rpb25IZWFkZXIgPSBleHBvcnRzLmdldFR5cGVzRnJvbUFiaSA9IGV4cG9ydHMuZ2V0VHlwZSA9IGV4cG9ydHMuY3JlYXRlVHJhbnNhY3Rpb25UeXBlcyA9IGV4cG9ydHMuY3JlYXRlVHJhbnNhY3Rpb25FeHRlbnNpb25UeXBlcyA9IGV4cG9ydHMuY3JlYXRlQWJpVHlwZXMgPSBleHBvcnRzLmNyZWF0ZUluaXRpYWxUeXBlcyA9IGV4cG9ydHMuaGV4VG9VaW50OEFycmF5ID0gZXhwb3J0cy5hcnJheVRvSGV4ID0gZXhwb3J0cy5zeW1ib2xUb1N0cmluZyA9IGV4cG9ydHMuc3RyaW5nVG9TeW1ib2wgPSBleHBvcnRzLmJsb2NrVGltZXN0YW1wVG9EYXRlID0gZXhwb3J0cy5kYXRlVG9CbG9ja1RpbWVzdGFtcCA9IGV4cG9ydHMudGltZVBvaW50U2VjVG9EYXRlID0gZXhwb3J0cy5kYXRlVG9UaW1lUG9pbnRTZWMgPSBleHBvcnRzLnRpbWVQb2ludFRvRGF0ZSA9IGV4cG9ydHMuZGF0ZVRvVGltZVBvaW50ID0gZXhwb3J0cy5zdXBwb3J0ZWRBYmlWZXJzaW9uID0gZXhwb3J0cy5TZXJpYWxCdWZmZXIgPSBleHBvcnRzLlNlcmlhbGl6ZXJTdGF0ZSA9IHZvaWQgMDtcbnZhciBudW1lcmljID0gcmVxdWlyZShcIi4vZW9zanMtbnVtZXJpY1wiKTtcbi8qKiBTdGF0ZSBmb3Igc2VyaWFsaXplKCkgYW5kIGRlc2VyaWFsaXplKCkgKi9cbnZhciBTZXJpYWxpemVyU3RhdGUgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gU2VyaWFsaXplclN0YXRlKG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0ge307IH1cbiAgICAgICAgLyoqIEhhdmUgYW55IGJpbmFyeSBleHRlbnNpb25zIGJlZW4gc2tpcHBlZD8gKi9cbiAgICAgICAgdGhpcy5za2lwcGVkQmluYXJ5RXh0ZW5zaW9uID0gZmFsc2U7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgfVxuICAgIHJldHVybiBTZXJpYWxpemVyU3RhdGU7XG59KCkpO1xuZXhwb3J0cy5TZXJpYWxpemVyU3RhdGUgPSBTZXJpYWxpemVyU3RhdGU7XG4vKiogU2VyaWFsaXplIGFuZCBkZXNlcmlhbGl6ZSBkYXRhICovXG52YXIgU2VyaWFsQnVmZmVyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSBfX25hbWVkUGFyYW1ldGVyc1xuICAgICAqIGBhcnJheWA6IGBudWxsYCBpZiBzZXJpYWxpemluZywgb3IgYmluYXJ5IGRhdGEgdG8gZGVzZXJpYWxpemVcbiAgICAgKiBgdGV4dEVuY29kZXJgOiBgVGV4dEVuY29kZXJgIGluc3RhbmNlIHRvIHVzZS4gUGFzcyBpbiBgbnVsbGAgaWYgcnVubmluZyBpbiBhIGJyb3dzZXJcbiAgICAgKiBgdGV4dERlY29kZXJgOiBgVGV4dERlY2lkZXJgIGluc3RhbmNlIHRvIHVzZS4gUGFzcyBpbiBgbnVsbGAgaWYgcnVubmluZyBpbiBhIGJyb3dzZXJcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBTZXJpYWxCdWZmZXIoX2EpIHtcbiAgICAgICAgdmFyIF9iID0gX2EgPT09IHZvaWQgMCA/IHt9IDogX2EsIHRleHRFbmNvZGVyID0gX2IudGV4dEVuY29kZXIsIHRleHREZWNvZGVyID0gX2IudGV4dERlY29kZXIsIGFycmF5ID0gX2IuYXJyYXk7XG4gICAgICAgIC8qKiBDdXJyZW50IHBvc2l0aW9uIHdoaWxlIHJlYWRpbmcgKGRlc2VyaWFsaXppbmcpICovXG4gICAgICAgIHRoaXMucmVhZFBvcyA9IDA7XG4gICAgICAgIHRoaXMuYXJyYXkgPSBhcnJheSB8fCBuZXcgVWludDhBcnJheSgxMDI0KTtcbiAgICAgICAgdGhpcy5sZW5ndGggPSBhcnJheSA/IGFycmF5Lmxlbmd0aCA6IDA7XG4gICAgICAgIHRoaXMudGV4dEVuY29kZXIgPSB0ZXh0RW5jb2RlciB8fCBuZXcgVGV4dEVuY29kZXIoKTtcbiAgICAgICAgdGhpcy50ZXh0RGVjb2RlciA9IHRleHREZWNvZGVyIHx8IG5ldyBUZXh0RGVjb2RlcigndXRmLTgnLCB7IGZhdGFsOiB0cnVlIH0pO1xuICAgIH1cbiAgICAvKiogUmVzaXplIGBhcnJheWAgaWYgbmVlZGVkIHRvIGhhdmUgYXQgbGVhc3QgYHNpemVgIGJ5dGVzIGZyZWUgKi9cbiAgICBTZXJpYWxCdWZmZXIucHJvdG90eXBlLnJlc2VydmUgPSBmdW5jdGlvbiAoc2l6ZSkge1xuICAgICAgICBpZiAodGhpcy5sZW5ndGggKyBzaXplIDw9IHRoaXMuYXJyYXkubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGwgPSB0aGlzLmFycmF5Lmxlbmd0aDtcbiAgICAgICAgd2hpbGUgKHRoaXMubGVuZ3RoICsgc2l6ZSA+IGwpIHtcbiAgICAgICAgICAgIGwgPSBNYXRoLmNlaWwobCAqIDEuNSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG5ld0FycmF5ID0gbmV3IFVpbnQ4QXJyYXkobCk7XG4gICAgICAgIG5ld0FycmF5LnNldCh0aGlzLmFycmF5KTtcbiAgICAgICAgdGhpcy5hcnJheSA9IG5ld0FycmF5O1xuICAgIH07XG4gICAgLyoqIElzIHRoZXJlIGRhdGEgYXZhaWxhYmxlIHRvIHJlYWQ/ICovXG4gICAgU2VyaWFsQnVmZmVyLnByb3RvdHlwZS5oYXZlUmVhZERhdGEgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlYWRQb3MgPCB0aGlzLmxlbmd0aDtcbiAgICB9O1xuICAgIC8qKiBSZXN0YXJ0IHJlYWRpbmcgZnJvbSB0aGUgYmVnaW5uaW5nICovXG4gICAgU2VyaWFsQnVmZmVyLnByb3RvdHlwZS5yZXN0YXJ0UmVhZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5yZWFkUG9zID0gMDtcbiAgICB9O1xuICAgIC8qKiBSZXR1cm4gZGF0YSB3aXRoIGV4Y2VzcyBzdG9yYWdlIHRyaW1tZWQgYXdheSAqL1xuICAgIFNlcmlhbEJ1ZmZlci5wcm90b3R5cGUuYXNVaW50OEFycmF5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkodGhpcy5hcnJheS5idWZmZXIsIHRoaXMuYXJyYXkuYnl0ZU9mZnNldCwgdGhpcy5sZW5ndGgpO1xuICAgIH07XG4gICAgLyoqIEFwcGVuZCBieXRlcyAqL1xuICAgIFNlcmlhbEJ1ZmZlci5wcm90b3R5cGUucHVzaEFycmF5ID0gZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgdGhpcy5yZXNlcnZlKHYubGVuZ3RoKTtcbiAgICAgICAgdGhpcy5hcnJheS5zZXQodiwgdGhpcy5sZW5ndGgpO1xuICAgICAgICB0aGlzLmxlbmd0aCArPSB2Lmxlbmd0aDtcbiAgICB9O1xuICAgIC8qKiBBcHBlbmQgYnl0ZXMgKi9cbiAgICBTZXJpYWxCdWZmZXIucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB2ID0gW107XG4gICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICB2W19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wdXNoQXJyYXkodik7XG4gICAgfTtcbiAgICAvKiogR2V0IGEgc2luZ2xlIGJ5dGUgKi9cbiAgICBTZXJpYWxCdWZmZXIucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMucmVhZFBvcyA8IHRoaXMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hcnJheVt0aGlzLnJlYWRQb3MrK107XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZWFkIHBhc3QgZW5kIG9mIGJ1ZmZlcicpO1xuICAgIH07XG4gICAgLyoqIEFwcGVuZCBieXRlcyBpbiBgdmAuIFRocm93cyBpZiBgbGVuYCBkb2Vzbid0IG1hdGNoIGB2Lmxlbmd0aGAgKi9cbiAgICBTZXJpYWxCdWZmZXIucHJvdG90eXBlLnB1c2hVaW50OEFycmF5Q2hlY2tlZCA9IGZ1bmN0aW9uICh2LCBsZW4pIHtcbiAgICAgICAgaWYgKHYubGVuZ3RoICE9PSBsZW4pIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQmluYXJ5IGRhdGEgaGFzIGluY29ycmVjdCBzaXplJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wdXNoQXJyYXkodik7XG4gICAgfTtcbiAgICAvKiogR2V0IGBsZW5gIGJ5dGVzICovXG4gICAgU2VyaWFsQnVmZmVyLnByb3RvdHlwZS5nZXRVaW50OEFycmF5ID0gZnVuY3Rpb24gKGxlbikge1xuICAgICAgICBpZiAodGhpcy5yZWFkUG9zICsgbGVuID4gdGhpcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUmVhZCBwYXN0IGVuZCBvZiBidWZmZXInKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcmVzdWx0ID0gbmV3IFVpbnQ4QXJyYXkodGhpcy5hcnJheS5idWZmZXIsIHRoaXMuYXJyYXkuYnl0ZU9mZnNldCArIHRoaXMucmVhZFBvcywgbGVuKTtcbiAgICAgICAgdGhpcy5yZWFkUG9zICs9IGxlbjtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuICAgIC8qKiBTa2lwIGBsZW5gIGJ5dGVzICovXG4gICAgU2VyaWFsQnVmZmVyLnByb3RvdHlwZS5za2lwID0gZnVuY3Rpb24gKGxlbikge1xuICAgICAgICBpZiAodGhpcy5yZWFkUG9zICsgbGVuID4gdGhpcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUmVhZCBwYXN0IGVuZCBvZiBidWZmZXInKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlYWRQb3MgKz0gbGVuO1xuICAgIH07XG4gICAgLyoqIEFwcGVuZCBhIGB1aW50MTZgICovXG4gICAgU2VyaWFsQnVmZmVyLnByb3RvdHlwZS5wdXNoVWludDE2ID0gZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgdGhpcy5wdXNoKCh2ID4+IDApICYgMHhmZiwgKHYgPj4gOCkgJiAweGZmKTtcbiAgICB9O1xuICAgIC8qKiBHZXQgYSBgdWludDE2YCAqL1xuICAgIFNlcmlhbEJ1ZmZlci5wcm90b3R5cGUuZ2V0VWludDE2ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdiA9IDA7XG4gICAgICAgIHYgfD0gdGhpcy5nZXQoKSA8PCAwO1xuICAgICAgICB2IHw9IHRoaXMuZ2V0KCkgPDwgODtcbiAgICAgICAgcmV0dXJuIHY7XG4gICAgfTtcbiAgICAvKiogQXBwZW5kIGEgYHVpbnQzMmAgKi9cbiAgICBTZXJpYWxCdWZmZXIucHJvdG90eXBlLnB1c2hVaW50MzIgPSBmdW5jdGlvbiAodikge1xuICAgICAgICB0aGlzLnB1c2goKHYgPj4gMCkgJiAweGZmLCAodiA+PiA4KSAmIDB4ZmYsICh2ID4+IDE2KSAmIDB4ZmYsICh2ID4+IDI0KSAmIDB4ZmYpO1xuICAgIH07XG4gICAgLyoqIEdldCBhIGB1aW50MzJgICovXG4gICAgU2VyaWFsQnVmZmVyLnByb3RvdHlwZS5nZXRVaW50MzIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB2ID0gMDtcbiAgICAgICAgdiB8PSB0aGlzLmdldCgpIDw8IDA7XG4gICAgICAgIHYgfD0gdGhpcy5nZXQoKSA8PCA4O1xuICAgICAgICB2IHw9IHRoaXMuZ2V0KCkgPDwgMTY7XG4gICAgICAgIHYgfD0gdGhpcy5nZXQoKSA8PCAyNDtcbiAgICAgICAgcmV0dXJuIHYgPj4+IDA7XG4gICAgfTtcbiAgICAvKiogQXBwZW5kIGEgYHVpbnQ2NGAuICpDYXV0aW9uKjogYG51bWJlcmAgb25seSBoYXMgNTMgYml0cyBvZiBwcmVjaXNpb24gKi9cbiAgICBTZXJpYWxCdWZmZXIucHJvdG90eXBlLnB1c2hOdW1iZXJBc1VpbnQ2NCA9IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgIHRoaXMucHVzaFVpbnQzMih2ID4+PiAwKTtcbiAgICAgICAgdGhpcy5wdXNoVWludDMyKE1hdGguZmxvb3IodiAvIDQyOTQ5NjcyOTYpID4+PiAwKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEdldCBhIGB1aW50NjRgIGFzIGEgYG51bWJlcmAuICpDYXV0aW9uKjogYG51bWJlcmAgb25seSBoYXMgNTMgYml0cyBvZiBwcmVjaXNpb247IHNvbWUgdmFsdWVzIHdpbGwgY2hhbmdlLlxuICAgICAqIGBudW1lcmljLmJpbmFyeVRvRGVjaW1hbChzZXJpYWxCdWZmZXIuZ2V0VWludDhBcnJheSg4KSlgIHJlY29tbWVuZGVkIGluc3RlYWRcbiAgICAgKi9cbiAgICBTZXJpYWxCdWZmZXIucHJvdG90eXBlLmdldFVpbnQ2NEFzTnVtYmVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgbG93ID0gdGhpcy5nZXRVaW50MzIoKTtcbiAgICAgICAgdmFyIGhpZ2ggPSB0aGlzLmdldFVpbnQzMigpO1xuICAgICAgICByZXR1cm4gKGhpZ2ggPj4+IDApICogNDI5NDk2NzI5NiArIChsb3cgPj4+IDApO1xuICAgIH07XG4gICAgLyoqIEFwcGVuZCBhIGB2YXJ1aW50MzJgICovXG4gICAgU2VyaWFsQnVmZmVyLnByb3RvdHlwZS5wdXNoVmFydWludDMyID0gZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgIGlmICh2ID4+PiA3KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wdXNoKDB4ODAgfCAodiAmIDB4N2YpKTtcbiAgICAgICAgICAgICAgICB2ID0gdiA+Pj4gNztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMucHVzaCh2KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqIEdldCBhIGB2YXJ1aW50MzJgICovXG4gICAgU2VyaWFsQnVmZmVyLnByb3RvdHlwZS5nZXRWYXJ1aW50MzIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB2ID0gMDtcbiAgICAgICAgdmFyIGJpdCA9IDA7XG4gICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICB2YXIgYiA9IHRoaXMuZ2V0KCk7XG4gICAgICAgICAgICB2IHw9IChiICYgMHg3ZikgPDwgYml0O1xuICAgICAgICAgICAgYml0ICs9IDc7XG4gICAgICAgICAgICBpZiAoIShiICYgMHg4MCkpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdiA+Pj4gMDtcbiAgICB9O1xuICAgIC8qKiBBcHBlbmQgYSBgdmFyaW50MzJgICovXG4gICAgU2VyaWFsQnVmZmVyLnByb3RvdHlwZS5wdXNoVmFyaW50MzIgPSBmdW5jdGlvbiAodikge1xuICAgICAgICB0aGlzLnB1c2hWYXJ1aW50MzIoKHYgPDwgMSkgXiAodiA+PiAzMSkpO1xuICAgIH07XG4gICAgLyoqIEdldCBhIGB2YXJpbnQzMmAgKi9cbiAgICBTZXJpYWxCdWZmZXIucHJvdG90eXBlLmdldFZhcmludDMyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdiA9IHRoaXMuZ2V0VmFydWludDMyKCk7XG4gICAgICAgIGlmICh2ICYgMSkge1xuICAgICAgICAgICAgcmV0dXJuICgofnYpID4+IDEpIHwgMjE0NzQ4MzY0ODtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB2ID4+PiAxO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKiogQXBwZW5kIGEgYGZsb2F0MzJgICovXG4gICAgU2VyaWFsQnVmZmVyLnByb3RvdHlwZS5wdXNoRmxvYXQzMiA9IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgIHRoaXMucHVzaEFycmF5KG5ldyBVaW50OEFycmF5KChuZXcgRmxvYXQzMkFycmF5KFt2XSkpLmJ1ZmZlcikpO1xuICAgIH07XG4gICAgLyoqIEdldCBhIGBmbG9hdDMyYCAqL1xuICAgIFNlcmlhbEJ1ZmZlci5wcm90b3R5cGUuZ2V0RmxvYXQzMiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBGbG9hdDMyQXJyYXkodGhpcy5nZXRVaW50OEFycmF5KDQpLnNsaWNlKCkuYnVmZmVyKVswXTtcbiAgICB9O1xuICAgIC8qKiBBcHBlbmQgYSBgZmxvYXQ2NGAgKi9cbiAgICBTZXJpYWxCdWZmZXIucHJvdG90eXBlLnB1c2hGbG9hdDY0ID0gZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgdGhpcy5wdXNoQXJyYXkobmV3IFVpbnQ4QXJyYXkoKG5ldyBGbG9hdDY0QXJyYXkoW3ZdKSkuYnVmZmVyKSk7XG4gICAgfTtcbiAgICAvKiogR2V0IGEgYGZsb2F0NjRgICovXG4gICAgU2VyaWFsQnVmZmVyLnByb3RvdHlwZS5nZXRGbG9hdDY0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbmV3IEZsb2F0NjRBcnJheSh0aGlzLmdldFVpbnQ4QXJyYXkoOCkuc2xpY2UoKS5idWZmZXIpWzBdO1xuICAgIH07XG4gICAgLyoqIEFwcGVuZCBhIGBuYW1lYCAqL1xuICAgIFNlcmlhbEJ1ZmZlci5wcm90b3R5cGUucHVzaE5hbWUgPSBmdW5jdGlvbiAocykge1xuICAgICAgICBpZiAodHlwZW9mIHMgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIHN0cmluZyBjb250YWluaW5nIG5hbWUnKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcmVnZXggPSBuZXcgUmVnRXhwKC9eWy4xLTVhLXpdezAsMTJ9Wy4xLTVhLWpdPyQvKTtcbiAgICAgICAgaWYgKCFyZWdleC50ZXN0KHMpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05hbWUgc2hvdWxkIGJlIGxlc3MgdGhhbiAxMyBjaGFyYWN0ZXJzLCBvciBsZXNzIHRoYW4gMTQgaWYgbGFzdCBjaGFyYWN0ZXIgaXMgYmV0d2VlbiAxLTUgb3IgYS1qLCBhbmQgb25seSBjb250YWluIHRoZSBmb2xsb3dpbmcgc3ltYm9scyAuMTIzNDVhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5eicpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICAgIH1cbiAgICAgICAgdmFyIGNoYXJUb1N5bWJvbCA9IGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgICBpZiAoYyA+PSAnYScuY2hhckNvZGVBdCgwKSAmJiBjIDw9ICd6Jy5jaGFyQ29kZUF0KDApKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChjIC0gJ2EnLmNoYXJDb2RlQXQoMCkpICsgNjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjID49ICcxJy5jaGFyQ29kZUF0KDApICYmIGMgPD0gJzUnLmNoYXJDb2RlQXQoMCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKGMgLSAnMScuY2hhckNvZGVBdCgwKSkgKyAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH07XG4gICAgICAgIHZhciBhID0gbmV3IFVpbnQ4QXJyYXkoOCk7XG4gICAgICAgIHZhciBiaXQgPSA2MztcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICB2YXIgYyA9IGNoYXJUb1N5bWJvbChzLmNoYXJDb2RlQXQoaSkpO1xuICAgICAgICAgICAgaWYgKGJpdCA8IDUpIHtcbiAgICAgICAgICAgICAgICBjID0gYyA8PCAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDQ7IGogPj0gMDsgLS1qKSB7XG4gICAgICAgICAgICAgICAgaWYgKGJpdCA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGFbTWF0aC5mbG9vcihiaXQgLyA4KV0gfD0gKChjID4+IGopICYgMSkgPDwgKGJpdCAlIDgpO1xuICAgICAgICAgICAgICAgICAgICAtLWJpdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wdXNoQXJyYXkoYSk7XG4gICAgfTtcbiAgICAvKiogR2V0IGEgYG5hbWVgICovXG4gICAgU2VyaWFsQnVmZmVyLnByb3RvdHlwZS5nZXROYW1lID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYSA9IHRoaXMuZ2V0VWludDhBcnJheSg4KTtcbiAgICAgICAgdmFyIHJlc3VsdCA9ICcnO1xuICAgICAgICBmb3IgKHZhciBiaXQgPSA2MzsgYml0ID49IDA7KSB7XG4gICAgICAgICAgICB2YXIgYyA9IDA7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDU7ICsraSkge1xuICAgICAgICAgICAgICAgIGlmIChiaXQgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICBjID0gKGMgPDwgMSkgfCAoKGFbTWF0aC5mbG9vcihiaXQgLyA4KV0gPj4gKGJpdCAlIDgpKSAmIDEpO1xuICAgICAgICAgICAgICAgICAgICAtLWJpdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYyA+PSA2KSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYyArICdhJy5jaGFyQ29kZUF0KDApIC0gNik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjID49IDEpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShjICsgJzEnLmNoYXJDb2RlQXQoMCkgLSAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlc3VsdCArPSAnLic7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgd2hpbGUgKHJlc3VsdC5lbmRzV2l0aCgnLicpKSB7XG4gICAgICAgICAgICByZXN1bHQgPSByZXN1bHQuc3Vic3RyKDAsIHJlc3VsdC5sZW5ndGggLSAxKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gICAgLyoqIEFwcGVuZCBsZW5ndGgtcHJlZml4ZWQgYmluYXJ5IGRhdGEgKi9cbiAgICBTZXJpYWxCdWZmZXIucHJvdG90eXBlLnB1c2hCeXRlcyA9IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgIHRoaXMucHVzaFZhcnVpbnQzMih2Lmxlbmd0aCk7XG4gICAgICAgIHRoaXMucHVzaEFycmF5KHYpO1xuICAgIH07XG4gICAgLyoqIEdldCBsZW5ndGgtcHJlZml4ZWQgYmluYXJ5IGRhdGEgKi9cbiAgICBTZXJpYWxCdWZmZXIucHJvdG90eXBlLmdldEJ5dGVzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRVaW50OEFycmF5KHRoaXMuZ2V0VmFydWludDMyKCkpO1xuICAgIH07XG4gICAgLyoqIEFwcGVuZCBhIHN0cmluZyAqL1xuICAgIFNlcmlhbEJ1ZmZlci5wcm90b3R5cGUucHVzaFN0cmluZyA9IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgIHRoaXMucHVzaEJ5dGVzKHRoaXMudGV4dEVuY29kZXIuZW5jb2RlKHYpKTtcbiAgICB9O1xuICAgIC8qKiBHZXQgYSBzdHJpbmcgKi9cbiAgICBTZXJpYWxCdWZmZXIucHJvdG90eXBlLmdldFN0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGV4dERlY29kZXIuZGVjb2RlKHRoaXMuZ2V0Qnl0ZXMoKSk7XG4gICAgfTtcbiAgICAvKiogQXBwZW5kIGEgYHN5bWJvbF9jb2RlYC4gVW5saWtlIGBzeW1ib2xgLCBgc3ltYm9sX2NvZGVgIGRvZXNuJ3QgaW5jbHVkZSBhIHByZWNpc2lvbi4gKi9cbiAgICBTZXJpYWxCdWZmZXIucHJvdG90eXBlLnB1c2hTeW1ib2xDb2RlID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBuYW1lICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCBzdHJpbmcgY29udGFpbmluZyBzeW1ib2xfY29kZScpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBhID0gW107XG4gICAgICAgIGEucHVzaC5hcHBseShhLCBfX3NwcmVhZEFycmF5KFtdLCBfX3JlYWQodGhpcy50ZXh0RW5jb2Rlci5lbmNvZGUobmFtZSkpKSk7XG4gICAgICAgIHdoaWxlIChhLmxlbmd0aCA8IDgpIHtcbiAgICAgICAgICAgIGEucHVzaCgwKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnB1c2hBcnJheShhLnNsaWNlKDAsIDgpKTtcbiAgICB9O1xuICAgIC8qKiBHZXQgYSBgc3ltYm9sX2NvZGVgLiBVbmxpa2UgYHN5bWJvbGAsIGBzeW1ib2xfY29kZWAgZG9lc24ndCBpbmNsdWRlIGEgcHJlY2lzaW9uLiAqL1xuICAgIFNlcmlhbEJ1ZmZlci5wcm90b3R5cGUuZ2V0U3ltYm9sQ29kZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGEgPSB0aGlzLmdldFVpbnQ4QXJyYXkoOCk7XG4gICAgICAgIHZhciBsZW47XG4gICAgICAgIGZvciAobGVuID0gMDsgbGVuIDwgYS5sZW5ndGg7ICsrbGVuKSB7XG4gICAgICAgICAgICBpZiAoIWFbbGVuXSkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhciBuYW1lID0gdGhpcy50ZXh0RGVjb2Rlci5kZWNvZGUobmV3IFVpbnQ4QXJyYXkoYS5idWZmZXIsIGEuYnl0ZU9mZnNldCwgbGVuKSk7XG4gICAgICAgIHJldHVybiBuYW1lO1xuICAgIH07XG4gICAgLyoqIEFwcGVuZCBhIGBzeW1ib2xgICovXG4gICAgU2VyaWFsQnVmZmVyLnByb3RvdHlwZS5wdXNoU3ltYm9sID0gZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgIHZhciBuYW1lID0gX2EubmFtZSwgcHJlY2lzaW9uID0gX2EucHJlY2lzaW9uO1xuICAgICAgICBpZiAoIS9eW0EtWl17MSw3fSQvLnRlc3QobmFtZSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgc3ltYm9sIHRvIGJlIEEtWiBhbmQgYmV0d2VlbiBvbmUgYW5kIHNldmVuIGNoYXJhY3RlcnMnKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgYSA9IFtwcmVjaXNpb24gJiAweGZmXTtcbiAgICAgICAgYS5wdXNoLmFwcGx5KGEsIF9fc3ByZWFkQXJyYXkoW10sIF9fcmVhZCh0aGlzLnRleHRFbmNvZGVyLmVuY29kZShuYW1lKSkpKTtcbiAgICAgICAgd2hpbGUgKGEubGVuZ3RoIDwgOCkge1xuICAgICAgICAgICAgYS5wdXNoKDApO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucHVzaEFycmF5KGEuc2xpY2UoMCwgOCkpO1xuICAgIH07XG4gICAgLyoqIEdldCBhIGBzeW1ib2xgICovXG4gICAgU2VyaWFsQnVmZmVyLnByb3RvdHlwZS5nZXRTeW1ib2wgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBwcmVjaXNpb24gPSB0aGlzLmdldCgpO1xuICAgICAgICB2YXIgYSA9IHRoaXMuZ2V0VWludDhBcnJheSg3KTtcbiAgICAgICAgdmFyIGxlbjtcbiAgICAgICAgZm9yIChsZW4gPSAwOyBsZW4gPCBhLmxlbmd0aDsgKytsZW4pIHtcbiAgICAgICAgICAgIGlmICghYVtsZW5dKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG5hbWUgPSB0aGlzLnRleHREZWNvZGVyLmRlY29kZShuZXcgVWludDhBcnJheShhLmJ1ZmZlciwgYS5ieXRlT2Zmc2V0LCBsZW4pKTtcbiAgICAgICAgcmV0dXJuIHsgbmFtZTogbmFtZSwgcHJlY2lzaW9uOiBwcmVjaXNpb24gfTtcbiAgICB9O1xuICAgIC8qKiBBcHBlbmQgYW4gYXNzZXQgKi9cbiAgICBTZXJpYWxCdWZmZXIucHJvdG90eXBlLnB1c2hBc3NldCA9IGZ1bmN0aW9uIChzKSB7XG4gICAgICAgIGlmICh0eXBlb2YgcyAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgc3RyaW5nIGNvbnRhaW5pbmcgYXNzZXQnKTtcbiAgICAgICAgfVxuICAgICAgICBzID0gcy50cmltKCk7XG4gICAgICAgIHZhciBwb3MgPSAwO1xuICAgICAgICB2YXIgYW1vdW50ID0gJyc7XG4gICAgICAgIHZhciBwcmVjaXNpb24gPSAwO1xuICAgICAgICBpZiAoc1twb3NdID09PSAnLScpIHtcbiAgICAgICAgICAgIGFtb3VudCArPSAnLSc7XG4gICAgICAgICAgICArK3BvcztcbiAgICAgICAgfVxuICAgICAgICB2YXIgZm91bmREaWdpdCA9IGZhbHNlO1xuICAgICAgICB3aGlsZSAocG9zIDwgcy5sZW5ndGggJiYgcy5jaGFyQ29kZUF0KHBvcykgPj0gJzAnLmNoYXJDb2RlQXQoMCkgJiYgcy5jaGFyQ29kZUF0KHBvcykgPD0gJzknLmNoYXJDb2RlQXQoMCkpIHtcbiAgICAgICAgICAgIGZvdW5kRGlnaXQgPSB0cnVlO1xuICAgICAgICAgICAgYW1vdW50ICs9IHNbcG9zXTtcbiAgICAgICAgICAgICsrcG9zO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZm91bmREaWdpdCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBc3NldCBtdXN0IGJlZ2luIHdpdGggYSBudW1iZXInKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc1twb3NdID09PSAnLicpIHtcbiAgICAgICAgICAgICsrcG9zO1xuICAgICAgICAgICAgd2hpbGUgKHBvcyA8IHMubGVuZ3RoICYmIHMuY2hhckNvZGVBdChwb3MpID49ICcwJy5jaGFyQ29kZUF0KDApICYmIHMuY2hhckNvZGVBdChwb3MpIDw9ICc5Jy5jaGFyQ29kZUF0KDApKSB7XG4gICAgICAgICAgICAgICAgYW1vdW50ICs9IHNbcG9zXTtcbiAgICAgICAgICAgICAgICArK3ByZWNpc2lvbjtcbiAgICAgICAgICAgICAgICArK3BvcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgbmFtZSA9IHMuc3Vic3RyKHBvcykudHJpbSgpO1xuICAgICAgICB0aGlzLnB1c2hBcnJheShudW1lcmljLnNpZ25lZERlY2ltYWxUb0JpbmFyeSg4LCBhbW91bnQpKTtcbiAgICAgICAgdGhpcy5wdXNoU3ltYm9sKHsgbmFtZTogbmFtZSwgcHJlY2lzaW9uOiBwcmVjaXNpb24gfSk7XG4gICAgfTtcbiAgICAvKiogR2V0IGFuIGFzc2V0ICovXG4gICAgU2VyaWFsQnVmZmVyLnByb3RvdHlwZS5nZXRBc3NldCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGFtb3VudCA9IHRoaXMuZ2V0VWludDhBcnJheSg4KTtcbiAgICAgICAgdmFyIF9hID0gdGhpcy5nZXRTeW1ib2woKSwgbmFtZSA9IF9hLm5hbWUsIHByZWNpc2lvbiA9IF9hLnByZWNpc2lvbjtcbiAgICAgICAgdmFyIHMgPSBudW1lcmljLnNpZ25lZEJpbmFyeVRvRGVjaW1hbChhbW91bnQsIHByZWNpc2lvbiArIDEpO1xuICAgICAgICBpZiAocHJlY2lzaW9uKSB7XG4gICAgICAgICAgICBzID0gcy5zdWJzdHIoMCwgcy5sZW5ndGggLSBwcmVjaXNpb24pICsgJy4nICsgcy5zdWJzdHIocy5sZW5ndGggLSBwcmVjaXNpb24pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzICsgJyAnICsgbmFtZTtcbiAgICB9O1xuICAgIC8qKiBBcHBlbmQgYSBwdWJsaWMga2V5ICovXG4gICAgU2VyaWFsQnVmZmVyLnByb3RvdHlwZS5wdXNoUHVibGljS2V5ID0gZnVuY3Rpb24gKHMpIHtcbiAgICAgICAgdmFyIGtleSA9IG51bWVyaWMuc3RyaW5nVG9QdWJsaWNLZXkocyk7XG4gICAgICAgIHRoaXMucHVzaChrZXkudHlwZSk7XG4gICAgICAgIHRoaXMucHVzaEFycmF5KGtleS5kYXRhKTtcbiAgICB9O1xuICAgIC8qKiBHZXQgYSBwdWJsaWMga2V5ICovXG4gICAgU2VyaWFsQnVmZmVyLnByb3RvdHlwZS5nZXRQdWJsaWNLZXkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB0eXBlID0gdGhpcy5nZXQoKTtcbiAgICAgICAgdmFyIGRhdGE7XG4gICAgICAgIGlmICh0eXBlID09PSBudW1lcmljLktleVR5cGUud2EpIHtcbiAgICAgICAgICAgIHZhciBiZWdpbiA9IHRoaXMucmVhZFBvcztcbiAgICAgICAgICAgIHRoaXMuc2tpcCgzNCk7XG4gICAgICAgICAgICB0aGlzLnNraXAodGhpcy5nZXRWYXJ1aW50MzIoKSk7XG4gICAgICAgICAgICBkYXRhID0gbmV3IFVpbnQ4QXJyYXkodGhpcy5hcnJheS5idWZmZXIsIHRoaXMuYXJyYXkuYnl0ZU9mZnNldCArIGJlZ2luLCB0aGlzLnJlYWRQb3MgLSBiZWdpbik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBkYXRhID0gdGhpcy5nZXRVaW50OEFycmF5KG51bWVyaWMucHVibGljS2V5RGF0YVNpemUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudW1lcmljLnB1YmxpY0tleVRvU3RyaW5nKHsgdHlwZTogdHlwZSwgZGF0YTogZGF0YSB9KTtcbiAgICB9O1xuICAgIC8qKiBBcHBlbmQgYSBwcml2YXRlIGtleSAqL1xuICAgIFNlcmlhbEJ1ZmZlci5wcm90b3R5cGUucHVzaFByaXZhdGVLZXkgPSBmdW5jdGlvbiAocykge1xuICAgICAgICB2YXIga2V5ID0gbnVtZXJpYy5zdHJpbmdUb1ByaXZhdGVLZXkocyk7XG4gICAgICAgIHRoaXMucHVzaChrZXkudHlwZSk7XG4gICAgICAgIHRoaXMucHVzaEFycmF5KGtleS5kYXRhKTtcbiAgICB9O1xuICAgIC8qKiBHZXQgYSBwcml2YXRlIGtleSAqL1xuICAgIFNlcmlhbEJ1ZmZlci5wcm90b3R5cGUuZ2V0UHJpdmF0ZUtleSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHR5cGUgPSB0aGlzLmdldCgpO1xuICAgICAgICB2YXIgZGF0YSA9IHRoaXMuZ2V0VWludDhBcnJheShudW1lcmljLnByaXZhdGVLZXlEYXRhU2l6ZSk7XG4gICAgICAgIHJldHVybiBudW1lcmljLnByaXZhdGVLZXlUb1N0cmluZyh7IHR5cGU6IHR5cGUsIGRhdGE6IGRhdGEgfSk7XG4gICAgfTtcbiAgICAvKiogQXBwZW5kIGEgc2lnbmF0dXJlICovXG4gICAgU2VyaWFsQnVmZmVyLnByb3RvdHlwZS5wdXNoU2lnbmF0dXJlID0gZnVuY3Rpb24gKHMpIHtcbiAgICAgICAgdmFyIGtleSA9IG51bWVyaWMuc3RyaW5nVG9TaWduYXR1cmUocyk7XG4gICAgICAgIHRoaXMucHVzaChrZXkudHlwZSk7XG4gICAgICAgIHRoaXMucHVzaEFycmF5KGtleS5kYXRhKTtcbiAgICB9O1xuICAgIC8qKiBHZXQgYSBzaWduYXR1cmUgKi9cbiAgICBTZXJpYWxCdWZmZXIucHJvdG90eXBlLmdldFNpZ25hdHVyZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHR5cGUgPSB0aGlzLmdldCgpO1xuICAgICAgICB2YXIgZGF0YTtcbiAgICAgICAgaWYgKHR5cGUgPT09IG51bWVyaWMuS2V5VHlwZS53YSkge1xuICAgICAgICAgICAgdmFyIGJlZ2luID0gdGhpcy5yZWFkUG9zO1xuICAgICAgICAgICAgdGhpcy5za2lwKDY1KTtcbiAgICAgICAgICAgIHRoaXMuc2tpcCh0aGlzLmdldFZhcnVpbnQzMigpKTtcbiAgICAgICAgICAgIHRoaXMuc2tpcCh0aGlzLmdldFZhcnVpbnQzMigpKTtcbiAgICAgICAgICAgIGRhdGEgPSBuZXcgVWludDhBcnJheSh0aGlzLmFycmF5LmJ1ZmZlciwgdGhpcy5hcnJheS5ieXRlT2Zmc2V0ICsgYmVnaW4sIHRoaXMucmVhZFBvcyAtIGJlZ2luKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRhdGEgPSB0aGlzLmdldFVpbnQ4QXJyYXkobnVtZXJpYy5zaWduYXR1cmVEYXRhU2l6ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bWVyaWMuc2lnbmF0dXJlVG9TdHJpbmcoeyB0eXBlOiB0eXBlLCBkYXRhOiBkYXRhIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIFNlcmlhbEJ1ZmZlcjtcbn0oKSk7IC8vIFNlcmlhbEJ1ZmZlclxuZXhwb3J0cy5TZXJpYWxCdWZmZXIgPSBTZXJpYWxCdWZmZXI7XG4vKiogSXMgdGhpcyBhIHN1cHBvcnRlZCBBQkkgdmVyc2lvbj8gKi9cbnZhciBzdXBwb3J0ZWRBYmlWZXJzaW9uID0gZnVuY3Rpb24gKHZlcnNpb24pIHtcbiAgICByZXR1cm4gdmVyc2lvbi5zdGFydHNXaXRoKCdlb3Npbzo6YWJpLzEuJyk7XG59O1xuZXhwb3J0cy5zdXBwb3J0ZWRBYmlWZXJzaW9uID0gc3VwcG9ydGVkQWJpVmVyc2lvbjtcbnZhciBjaGVja0RhdGVQYXJzZSA9IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgdmFyIHJlc3VsdCA9IERhdGUucGFyc2UoZGF0ZSk7XG4gICAgaWYgKE51bWJlci5pc05hTihyZXN1bHQpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCB0aW1lIGZvcm1hdCcpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbi8qKiBDb252ZXJ0IGRhdGUgaW4gSVNPIGZvcm1hdCB0byBgdGltZV9wb2ludGAgKG1pbGlzZWNvbmRzIHNpbmNlIGVwb2NoKSAqL1xudmFyIGRhdGVUb1RpbWVQb2ludCA9IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQoY2hlY2tEYXRlUGFyc2UoZGF0ZSArICdaJykgKiAxMDAwKTtcbn07XG5leHBvcnRzLmRhdGVUb1RpbWVQb2ludCA9IGRhdGVUb1RpbWVQb2ludDtcbi8qKiBDb252ZXJ0IGB0aW1lX3BvaW50YCAobWlsaXNlY29uZHMgc2luY2UgZXBvY2gpIHRvIGRhdGUgaW4gSVNPIGZvcm1hdCAqL1xudmFyIHRpbWVQb2ludFRvRGF0ZSA9IGZ1bmN0aW9uICh1cykge1xuICAgIHZhciBzID0gKG5ldyBEYXRlKHVzIC8gMTAwMCkpLnRvSVNPU3RyaW5nKCk7XG4gICAgcmV0dXJuIHMuc3Vic3RyKDAsIHMubGVuZ3RoIC0gMSk7XG59O1xuZXhwb3J0cy50aW1lUG9pbnRUb0RhdGUgPSB0aW1lUG9pbnRUb0RhdGU7XG4vKiogQ29udmVydCBkYXRlIGluIElTTyBmb3JtYXQgdG8gYHRpbWVfcG9pbnRfc2VjYCAoc2Vjb25kcyBzaW5jZSBlcG9jaCkgKi9cbnZhciBkYXRlVG9UaW1lUG9pbnRTZWMgPSBmdW5jdGlvbiAoZGF0ZSkge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKGNoZWNrRGF0ZVBhcnNlKGRhdGUgKyAnWicpIC8gMTAwMCk7XG59O1xuZXhwb3J0cy5kYXRlVG9UaW1lUG9pbnRTZWMgPSBkYXRlVG9UaW1lUG9pbnRTZWM7XG4vKiogQ29udmVydCBgdGltZV9wb2ludF9zZWNgIChzZWNvbmRzIHNpbmNlIGVwb2NoKSB0byB0byBkYXRlIGluIElTTyBmb3JtYXQgKi9cbnZhciB0aW1lUG9pbnRTZWNUb0RhdGUgPSBmdW5jdGlvbiAoc2VjKSB7XG4gICAgdmFyIHMgPSAobmV3IERhdGUoc2VjICogMTAwMCkpLnRvSVNPU3RyaW5nKCk7XG4gICAgcmV0dXJuIHMuc3Vic3RyKDAsIHMubGVuZ3RoIC0gMSk7XG59O1xuZXhwb3J0cy50aW1lUG9pbnRTZWNUb0RhdGUgPSB0aW1lUG9pbnRTZWNUb0RhdGU7XG4vKiogQ29udmVydCBkYXRlIGluIElTTyBmb3JtYXQgdG8gYGJsb2NrX3RpbWVzdGFtcF90eXBlYCAoaGFsZi1zZWNvbmRzIHNpbmNlIGEgZGlmZmVyZW50IGVwb2NoKSAqL1xudmFyIGRhdGVUb0Jsb2NrVGltZXN0YW1wID0gZnVuY3Rpb24gKGRhdGUpIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZCgoY2hlY2tEYXRlUGFyc2UoZGF0ZSArICdaJykgLSA5NDY2ODQ4MDAwMDApIC8gNTAwKTtcbn07XG5leHBvcnRzLmRhdGVUb0Jsb2NrVGltZXN0YW1wID0gZGF0ZVRvQmxvY2tUaW1lc3RhbXA7XG4vKiogQ29udmVydCBgYmxvY2tfdGltZXN0YW1wX3R5cGVgIChoYWxmLXNlY29uZHMgc2luY2UgYSBkaWZmZXJlbnQgZXBvY2gpIHRvIHRvIGRhdGUgaW4gSVNPIGZvcm1hdCAqL1xudmFyIGJsb2NrVGltZXN0YW1wVG9EYXRlID0gZnVuY3Rpb24gKHNsb3QpIHtcbiAgICB2YXIgcyA9IChuZXcgRGF0ZShzbG90ICogNTAwICsgOTQ2Njg0ODAwMDAwKSkudG9JU09TdHJpbmcoKTtcbiAgICByZXR1cm4gcy5zdWJzdHIoMCwgcy5sZW5ndGggLSAxKTtcbn07XG5leHBvcnRzLmJsb2NrVGltZXN0YW1wVG9EYXRlID0gYmxvY2tUaW1lc3RhbXBUb0RhdGU7XG4vKiogQ29udmVydCBgc3RyaW5nYCB0byBgU3ltYm9sYC4gZm9ybWF0OiBgcHJlY2lzaW9uLE5BTUVgLiAqL1xudmFyIHN0cmluZ1RvU3ltYm9sID0gZnVuY3Rpb24gKHMpIHtcbiAgICBpZiAodHlwZW9mIHMgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgc3RyaW5nIGNvbnRhaW5pbmcgc3ltYm9sJyk7XG4gICAgfVxuICAgIHZhciBtID0gcy5tYXRjaCgvXihbMC05XSspLChbQS1aXSspJC8pO1xuICAgIGlmICghbSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgc3ltYm9sJyk7XG4gICAgfVxuICAgIHJldHVybiB7IG5hbWU6IG1bMl0sIHByZWNpc2lvbjogK21bMV0gfTtcbn07XG5leHBvcnRzLnN0cmluZ1RvU3ltYm9sID0gc3RyaW5nVG9TeW1ib2w7XG4vKiogQ29udmVydCBgU3ltYm9sYCB0byBgc3RyaW5nYC4gZm9ybWF0OiBgcHJlY2lzaW9uLE5BTUVgLiAqL1xudmFyIHN5bWJvbFRvU3RyaW5nID0gZnVuY3Rpb24gKF9hKSB7XG4gICAgdmFyIG5hbWUgPSBfYS5uYW1lLCBwcmVjaXNpb24gPSBfYS5wcmVjaXNpb247XG4gICAgcmV0dXJuIHByZWNpc2lvbiArICcsJyArIG5hbWU7XG59O1xuZXhwb3J0cy5zeW1ib2xUb1N0cmluZyA9IHN5bWJvbFRvU3RyaW5nO1xuLyoqIENvbnZlcnQgYmluYXJ5IGRhdGEgdG8gaGV4ICovXG52YXIgYXJyYXlUb0hleCA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgdmFyIGVfMSwgX2E7XG4gICAgdmFyIHJlc3VsdCA9ICcnO1xuICAgIHRyeSB7XG4gICAgICAgIGZvciAodmFyIGRhdGFfMSA9IF9fdmFsdWVzKGRhdGEpLCBkYXRhXzFfMSA9IGRhdGFfMS5uZXh0KCk7ICFkYXRhXzFfMS5kb25lOyBkYXRhXzFfMSA9IGRhdGFfMS5uZXh0KCkpIHtcbiAgICAgICAgICAgIHZhciB4ID0gZGF0YV8xXzEudmFsdWU7XG4gICAgICAgICAgICByZXN1bHQgKz0gKCcwMCcgKyB4LnRvU3RyaW5nKDE2KSkuc2xpY2UoLTIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNhdGNoIChlXzFfMSkgeyBlXzEgPSB7IGVycm9yOiBlXzFfMSB9OyB9XG4gICAgZmluYWxseSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoZGF0YV8xXzEgJiYgIWRhdGFfMV8xLmRvbmUgJiYgKF9hID0gZGF0YV8xLnJldHVybikpIF9hLmNhbGwoZGF0YV8xKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMSkgdGhyb3cgZV8xLmVycm9yOyB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQudG9VcHBlckNhc2UoKTtcbn07XG5leHBvcnRzLmFycmF5VG9IZXggPSBhcnJheVRvSGV4O1xuLyoqIENvbnZlcnQgaGV4IHRvIGJpbmFyeSBkYXRhICovXG52YXIgaGV4VG9VaW50OEFycmF5ID0gZnVuY3Rpb24gKGhleCkge1xuICAgIGlmICh0eXBlb2YgaGV4ICE9PSAnc3RyaW5nJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIHN0cmluZyBjb250YWluaW5nIGhleCBkaWdpdHMnKTtcbiAgICB9XG4gICAgaWYgKGhleC5sZW5ndGggJSAyKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignT2RkIG51bWJlciBvZiBoZXggZGlnaXRzJyk7XG4gICAgfVxuICAgIHZhciBsID0gaGV4Lmxlbmd0aCAvIDI7XG4gICAgdmFyIHJlc3VsdCA9IG5ldyBVaW50OEFycmF5KGwpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbDsgKytpKSB7XG4gICAgICAgIHZhciB4ID0gcGFyc2VJbnQoaGV4LnN1YnN0cihpICogMiwgMiksIDE2KTtcbiAgICAgICAgaWYgKE51bWJlci5pc05hTih4KSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCBoZXggc3RyaW5nJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmVzdWx0W2ldID0geDtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5leHBvcnRzLmhleFRvVWludDhBcnJheSA9IGhleFRvVWludDhBcnJheTtcbmZ1bmN0aW9uIHNlcmlhbGl6ZVVua25vd24oYnVmZmVyLCBkYXRhKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdEb25cXCd0IGtub3cgaG93IHRvIHNlcmlhbGl6ZSAnICsgdGhpcy5uYW1lKTtcbn1cbmZ1bmN0aW9uIGRlc2VyaWFsaXplVW5rbm93bihidWZmZXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0RvblxcJ3Qga25vdyBob3cgdG8gZGVzZXJpYWxpemUgJyArIHRoaXMubmFtZSk7XG59XG5mdW5jdGlvbiBzZXJpYWxpemVTdHJ1Y3QoYnVmZmVyLCBkYXRhLCBzdGF0ZSwgYWxsb3dFeHRlbnNpb25zKSB7XG4gICAgdmFyIGVfMiwgX2E7XG4gICAgaWYgKHN0YXRlID09PSB2b2lkIDApIHsgc3RhdGUgPSBuZXcgU2VyaWFsaXplclN0YXRlKCk7IH1cbiAgICBpZiAoYWxsb3dFeHRlbnNpb25zID09PSB2b2lkIDApIHsgYWxsb3dFeHRlbnNpb25zID0gdHJ1ZTsgfVxuICAgIGlmICh0eXBlb2YgZGF0YSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdleHBlY3RlZCBvYmplY3QgY29udGFpbmluZyBkYXRhOiAnICsgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuICAgIH1cbiAgICBpZiAodGhpcy5iYXNlKSB7XG4gICAgICAgIHRoaXMuYmFzZS5zZXJpYWxpemUoYnVmZmVyLCBkYXRhLCBzdGF0ZSwgYWxsb3dFeHRlbnNpb25zKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgZm9yICh2YXIgX2IgPSBfX3ZhbHVlcyh0aGlzLmZpZWxkcyksIF9jID0gX2IubmV4dCgpOyAhX2MuZG9uZTsgX2MgPSBfYi5uZXh0KCkpIHtcbiAgICAgICAgICAgIHZhciBmaWVsZCA9IF9jLnZhbHVlO1xuICAgICAgICAgICAgaWYgKGZpZWxkLm5hbWUgaW4gZGF0YSkge1xuICAgICAgICAgICAgICAgIGlmIChzdGF0ZS5za2lwcGVkQmluYXJ5RXh0ZW5zaW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigndW5leHBlY3RlZCAnICsgdGhpcy5uYW1lICsgJy4nICsgZmllbGQubmFtZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZpZWxkLnR5cGUuc2VyaWFsaXplKGJ1ZmZlciwgZGF0YVtmaWVsZC5uYW1lXSwgc3RhdGUsIGFsbG93RXh0ZW5zaW9ucyAmJiBmaWVsZCA9PT0gdGhpcy5maWVsZHNbdGhpcy5maWVsZHMubGVuZ3RoIC0gMV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKGFsbG93RXh0ZW5zaW9ucyAmJiBmaWVsZC50eXBlLmV4dGVuc2lvbk9mKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLnNraXBwZWRCaW5hcnlFeHRlbnNpb24gPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdtaXNzaW5nICcgKyB0aGlzLm5hbWUgKyAnLicgKyBmaWVsZC5uYW1lICsgJyAodHlwZT0nICsgZmllbGQudHlwZS5uYW1lICsgJyknKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2F0Y2ggKGVfMl8xKSB7IGVfMiA9IHsgZXJyb3I6IGVfMl8xIH07IH1cbiAgICBmaW5hbGx5IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChfYyAmJiAhX2MuZG9uZSAmJiAoX2EgPSBfYi5yZXR1cm4pKSBfYS5jYWxsKF9iKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMikgdGhyb3cgZV8yLmVycm9yOyB9XG4gICAgfVxufVxuZnVuY3Rpb24gZGVzZXJpYWxpemVTdHJ1Y3QoYnVmZmVyLCBzdGF0ZSwgYWxsb3dFeHRlbnNpb25zKSB7XG4gICAgdmFyIGVfMywgX2E7XG4gICAgaWYgKHN0YXRlID09PSB2b2lkIDApIHsgc3RhdGUgPSBuZXcgU2VyaWFsaXplclN0YXRlKCk7IH1cbiAgICBpZiAoYWxsb3dFeHRlbnNpb25zID09PSB2b2lkIDApIHsgYWxsb3dFeHRlbnNpb25zID0gdHJ1ZTsgfVxuICAgIHZhciByZXN1bHQ7XG4gICAgaWYgKHRoaXMuYmFzZSkge1xuICAgICAgICByZXN1bHQgPSB0aGlzLmJhc2UuZGVzZXJpYWxpemUoYnVmZmVyLCBzdGF0ZSwgYWxsb3dFeHRlbnNpb25zKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJlc3VsdCA9IHt9O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBmb3IgKHZhciBfYiA9IF9fdmFsdWVzKHRoaXMuZmllbGRzKSwgX2MgPSBfYi5uZXh0KCk7ICFfYy5kb25lOyBfYyA9IF9iLm5leHQoKSkge1xuICAgICAgICAgICAgdmFyIGZpZWxkID0gX2MudmFsdWU7XG4gICAgICAgICAgICBpZiAoYWxsb3dFeHRlbnNpb25zICYmIGZpZWxkLnR5cGUuZXh0ZW5zaW9uT2YgJiYgIWJ1ZmZlci5oYXZlUmVhZERhdGEoKSkge1xuICAgICAgICAgICAgICAgIHN0YXRlLnNraXBwZWRCaW5hcnlFeHRlbnNpb24gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0W2ZpZWxkLm5hbWVdID0gZmllbGQudHlwZS5kZXNlcmlhbGl6ZShidWZmZXIsIHN0YXRlLCBhbGxvd0V4dGVuc2lvbnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGNhdGNoIChlXzNfMSkgeyBlXzMgPSB7IGVycm9yOiBlXzNfMSB9OyB9XG4gICAgZmluYWxseSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoX2MgJiYgIV9jLmRvbmUgJiYgKF9hID0gX2IucmV0dXJuKSkgX2EuY2FsbChfYik7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7IGlmIChlXzMpIHRocm93IGVfMy5lcnJvcjsgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gc2VyaWFsaXplVmFyaWFudChidWZmZXIsIGRhdGEsIHN0YXRlLCBhbGxvd0V4dGVuc2lvbnMpIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoZGF0YSkgfHwgZGF0YS5sZW5ndGggIT09IDIgfHwgdHlwZW9mIGRhdGFbMF0gIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignZXhwZWN0ZWQgdmFyaWFudDogW1widHlwZVwiLCB2YWx1ZV0nKTtcbiAgICB9XG4gICAgdmFyIGkgPSB0aGlzLmZpZWxkcy5maW5kSW5kZXgoZnVuY3Rpb24gKGZpZWxkKSB7IHJldHVybiBmaWVsZC5uYW1lID09PSBkYXRhWzBdOyB9KTtcbiAgICBpZiAoaSA8IDApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidHlwZSBcXFwiXCIgKyBkYXRhWzBdICsgXCJcXFwiIGlzIG5vdCB2YWxpZCBmb3IgdmFyaWFudFwiKTtcbiAgICB9XG4gICAgYnVmZmVyLnB1c2hWYXJ1aW50MzIoaSk7XG4gICAgdGhpcy5maWVsZHNbaV0udHlwZS5zZXJpYWxpemUoYnVmZmVyLCBkYXRhWzFdLCBzdGF0ZSwgYWxsb3dFeHRlbnNpb25zKTtcbn1cbmZ1bmN0aW9uIGRlc2VyaWFsaXplVmFyaWFudChidWZmZXIsIHN0YXRlLCBhbGxvd0V4dGVuc2lvbnMpIHtcbiAgICB2YXIgaSA9IGJ1ZmZlci5nZXRWYXJ1aW50MzIoKTtcbiAgICBpZiAoaSA+PSB0aGlzLmZpZWxkcy5sZW5ndGgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidHlwZSBpbmRleCBcIiArIGkgKyBcIiBpcyBub3QgdmFsaWQgZm9yIHZhcmlhbnRcIik7XG4gICAgfVxuICAgIHZhciBmaWVsZCA9IHRoaXMuZmllbGRzW2ldO1xuICAgIHJldHVybiBbZmllbGQubmFtZSwgZmllbGQudHlwZS5kZXNlcmlhbGl6ZShidWZmZXIsIHN0YXRlLCBhbGxvd0V4dGVuc2lvbnMpXTtcbn1cbmZ1bmN0aW9uIHNlcmlhbGl6ZUFycmF5KGJ1ZmZlciwgZGF0YSwgc3RhdGUsIGFsbG93RXh0ZW5zaW9ucykge1xuICAgIHZhciBlXzQsIF9hO1xuICAgIGJ1ZmZlci5wdXNoVmFydWludDMyKGRhdGEubGVuZ3RoKTtcbiAgICB0cnkge1xuICAgICAgICBmb3IgKHZhciBkYXRhXzIgPSBfX3ZhbHVlcyhkYXRhKSwgZGF0YV8yXzEgPSBkYXRhXzIubmV4dCgpOyAhZGF0YV8yXzEuZG9uZTsgZGF0YV8yXzEgPSBkYXRhXzIubmV4dCgpKSB7XG4gICAgICAgICAgICB2YXIgaXRlbSA9IGRhdGFfMl8xLnZhbHVlO1xuICAgICAgICAgICAgdGhpcy5hcnJheU9mLnNlcmlhbGl6ZShidWZmZXIsIGl0ZW0sIHN0YXRlLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2F0Y2ggKGVfNF8xKSB7IGVfNCA9IHsgZXJyb3I6IGVfNF8xIH07IH1cbiAgICBmaW5hbGx5IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChkYXRhXzJfMSAmJiAhZGF0YV8yXzEuZG9uZSAmJiAoX2EgPSBkYXRhXzIucmV0dXJuKSkgX2EuY2FsbChkYXRhXzIpO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZV80KSB0aHJvdyBlXzQuZXJyb3I7IH1cbiAgICB9XG59XG5mdW5jdGlvbiBkZXNlcmlhbGl6ZUFycmF5KGJ1ZmZlciwgc3RhdGUsIGFsbG93RXh0ZW5zaW9ucykge1xuICAgIHZhciBsZW4gPSBidWZmZXIuZ2V0VmFydWludDMyKCk7XG4gICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgICAgcmVzdWx0LnB1c2godGhpcy5hcnJheU9mLmRlc2VyaWFsaXplKGJ1ZmZlciwgc3RhdGUsIGZhbHNlKSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBzZXJpYWxpemVPcHRpb25hbChidWZmZXIsIGRhdGEsIHN0YXRlLCBhbGxvd0V4dGVuc2lvbnMpIHtcbiAgICBpZiAoZGF0YSA9PT0gbnVsbCB8fCBkYXRhID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgYnVmZmVyLnB1c2goMCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBidWZmZXIucHVzaCgxKTtcbiAgICAgICAgdGhpcy5vcHRpb25hbE9mLnNlcmlhbGl6ZShidWZmZXIsIGRhdGEsIHN0YXRlLCBhbGxvd0V4dGVuc2lvbnMpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGRlc2VyaWFsaXplT3B0aW9uYWwoYnVmZmVyLCBzdGF0ZSwgYWxsb3dFeHRlbnNpb25zKSB7XG4gICAgaWYgKGJ1ZmZlci5nZXQoKSkge1xuICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25hbE9mLmRlc2VyaWFsaXplKGJ1ZmZlciwgc3RhdGUsIGFsbG93RXh0ZW5zaW9ucyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG59XG5mdW5jdGlvbiBzZXJpYWxpemVFeHRlbnNpb24oYnVmZmVyLCBkYXRhLCBzdGF0ZSwgYWxsb3dFeHRlbnNpb25zKSB7XG4gICAgdGhpcy5leHRlbnNpb25PZi5zZXJpYWxpemUoYnVmZmVyLCBkYXRhLCBzdGF0ZSwgYWxsb3dFeHRlbnNpb25zKTtcbn1cbmZ1bmN0aW9uIGRlc2VyaWFsaXplRXh0ZW5zaW9uKGJ1ZmZlciwgc3RhdGUsIGFsbG93RXh0ZW5zaW9ucykge1xuICAgIHJldHVybiB0aGlzLmV4dGVuc2lvbk9mLmRlc2VyaWFsaXplKGJ1ZmZlciwgc3RhdGUsIGFsbG93RXh0ZW5zaW9ucyk7XG59XG5mdW5jdGlvbiBzZXJpYWxpemVPYmplY3QoYnVmZmVyLCBkYXRhLCBzdGF0ZSwgYWxsb3dFeHRlbnNpb25zKSB7XG4gICAgdmFyIGVfNSwgX2E7XG4gICAgdmFyIGVudHJpZXMgPSBPYmplY3QuZW50cmllcyhkYXRhKTtcbiAgICBidWZmZXIucHVzaFZhcnVpbnQzMihlbnRyaWVzLmxlbmd0aCk7XG4gICAgdHJ5IHtcbiAgICAgICAgZm9yICh2YXIgZW50cmllc18xID0gX192YWx1ZXMoZW50cmllcyksIGVudHJpZXNfMV8xID0gZW50cmllc18xLm5leHQoKTsgIWVudHJpZXNfMV8xLmRvbmU7IGVudHJpZXNfMV8xID0gZW50cmllc18xLm5leHQoKSkge1xuICAgICAgICAgICAgdmFyIF9iID0gX19yZWFkKGVudHJpZXNfMV8xLnZhbHVlLCAyKSwga2V5ID0gX2JbMF0sIHZhbHVlID0gX2JbMV07XG4gICAgICAgICAgICB2YXIga2V5VHlwZSA9IHRoaXMuZmllbGRzWzBdLnR5cGU7XG4gICAgICAgICAgICB2YXIgZGF0YVR5cGUgPSB0aGlzLmZpZWxkc1sxXS50eXBlO1xuICAgICAgICAgICAga2V5VHlwZS5zZXJpYWxpemUoYnVmZmVyLCBrZXksIHN0YXRlLCBhbGxvd0V4dGVuc2lvbnMpO1xuICAgICAgICAgICAgZGF0YVR5cGUuc2VyaWFsaXplKGJ1ZmZlciwgdmFsdWUsIHN0YXRlLCBhbGxvd0V4dGVuc2lvbnMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNhdGNoIChlXzVfMSkgeyBlXzUgPSB7IGVycm9yOiBlXzVfMSB9OyB9XG4gICAgZmluYWxseSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoZW50cmllc18xXzEgJiYgIWVudHJpZXNfMV8xLmRvbmUgJiYgKF9hID0gZW50cmllc18xLnJldHVybikpIF9hLmNhbGwoZW50cmllc18xKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHsgaWYgKGVfNSkgdGhyb3cgZV81LmVycm9yOyB9XG4gICAgfVxufVxuZnVuY3Rpb24gZGVzZXJpYWxpemVPYmplY3QoYnVmZmVyLCBzdGF0ZSwgYWxsb3dFeHRlbnNpb25zKSB7XG4gICAgdmFyIGxlbiA9IGJ1ZmZlci5nZXRWYXJ1aW50MzIoKTtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSkge1xuICAgICAgICB2YXIga2V5VHlwZSA9IHRoaXMuZmllbGRzWzBdLnR5cGU7XG4gICAgICAgIHZhciBkYXRhVHlwZSA9IHRoaXMuZmllbGRzWzFdLnR5cGU7XG4gICAgICAgIHZhciBrZXkgPSBrZXlUeXBlLmRlc2VyaWFsaXplKGJ1ZmZlciwgc3RhdGUsIGFsbG93RXh0ZW5zaW9ucyk7XG4gICAgICAgIHJlc3VsdFtrZXldID0gZGF0YVR5cGUuZGVzZXJpYWxpemUoYnVmZmVyLCBzdGF0ZSwgYWxsb3dFeHRlbnNpb25zKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIHNlcmlhbGl6ZVBhaXIoYnVmZmVyLCBkYXRhLCBzdGF0ZSwgYWxsb3dFeHRlbnNpb25zKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICBidWZmZXIucHVzaFZhcnVpbnQzMihkYXRhLmxlbmd0aCk7XG4gICAgZGF0YS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIF90aGlzLmZpZWxkc1swXS50eXBlLnNlcmlhbGl6ZShidWZmZXIsIGl0ZW1bMF0sIHN0YXRlLCBhbGxvd0V4dGVuc2lvbnMpO1xuICAgICAgICBfdGhpcy5maWVsZHNbMV0udHlwZS5zZXJpYWxpemUoYnVmZmVyLCBpdGVtWzFdLCBzdGF0ZSwgYWxsb3dFeHRlbnNpb25zKTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGRlc2VyaWFsaXplUGFpcihidWZmZXIsIHN0YXRlLCBhbGxvd0V4dGVuc2lvbnMpIHtcbiAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgdmFyIGxlbiA9IGJ1ZmZlci5nZXRWYXJ1aW50MzIoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKHRoaXMuZmllbGRzWzBdLnR5cGUuZGVzZXJpYWxpemUoYnVmZmVyLCBzdGF0ZSwgYWxsb3dFeHRlbnNpb25zKSk7XG4gICAgICAgIHJlc3VsdC5wdXNoKHRoaXMuZmllbGRzWzFdLnR5cGUuZGVzZXJpYWxpemUoYnVmZmVyLCBzdGF0ZSwgYWxsb3dFeHRlbnNpb25zKSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG52YXIgY3JlYXRlVHlwZSA9IGZ1bmN0aW9uIChhdHRycykge1xuICAgIHJldHVybiBfX2Fzc2lnbih7IG5hbWU6ICc8bWlzc2luZyBuYW1lPicsIGFsaWFzT2ZOYW1lOiAnJywgYXJyYXlPZjogbnVsbCwgb3B0aW9uYWxPZjogbnVsbCwgZXh0ZW5zaW9uT2Y6IG51bGwsIGJhc2VOYW1lOiAnJywgYmFzZTogbnVsbCwgZmllbGRzOiBbXSwgc2VyaWFsaXplOiBzZXJpYWxpemVVbmtub3duLCBkZXNlcmlhbGl6ZTogZGVzZXJpYWxpemVVbmtub3duIH0sIGF0dHJzKTtcbn07XG52YXIgY2hlY2tSYW5nZSA9IGZ1bmN0aW9uIChvcmlnLCBjb252ZXJ0ZWQpIHtcbiAgICBpZiAoTnVtYmVyLmlzTmFOKCtvcmlnKSB8fCBOdW1iZXIuaXNOYU4oK2NvbnZlcnRlZCkgfHwgKHR5cGVvZiBvcmlnICE9PSAnbnVtYmVyJyAmJiB0eXBlb2Ygb3JpZyAhPT0gJ3N0cmluZycpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgbnVtYmVyJyk7XG4gICAgfVxuICAgIGlmICgrb3JpZyAhPT0gK2NvbnZlcnRlZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ051bWJlciBpcyBvdXQgb2YgcmFuZ2UnKTtcbiAgICB9XG4gICAgcmV0dXJuICtvcmlnO1xufTtcbi8qKiBDcmVhdGUgdGhlIHNldCBvZiB0eXBlcyBidWlsdC1pbiB0byB0aGUgYWJpIGZvcm1hdCAqL1xudmFyIGNyZWF0ZUluaXRpYWxUeXBlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcmVzdWx0ID0gbmV3IE1hcChPYmplY3QuZW50cmllcyh7XG4gICAgICAgIGJvb2w6IGNyZWF0ZVR5cGUoe1xuICAgICAgICAgICAgbmFtZTogJ2Jvb2wnLFxuICAgICAgICAgICAgc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyLCBkYXRhKSB7XG4gICAgICAgICAgICAgICAgaWYgKCEodHlwZW9mIGRhdGEgPT09ICdib29sZWFuJyB8fCB0eXBlb2YgZGF0YSA9PT0gJ251bWJlcicgJiYgKGRhdGEgPT09IDEgfHwgZGF0YSA9PT0gMCkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgYm9vbGVhbiBvciBudW1iZXIgZXF1YWwgdG8gMSBvciAwJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJ1ZmZlci5wdXNoKGRhdGEgPyAxIDogMCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVzZXJpYWxpemU6IGZ1bmN0aW9uIChidWZmZXIpIHsgcmV0dXJuICEhYnVmZmVyLmdldCgpOyB9LFxuICAgICAgICB9KSxcbiAgICAgICAgdWludDg6IGNyZWF0ZVR5cGUoe1xuICAgICAgICAgICAgbmFtZTogJ3VpbnQ4JyxcbiAgICAgICAgICAgIHNlcmlhbGl6ZTogZnVuY3Rpb24gKGJ1ZmZlciwgZGF0YSkgeyBidWZmZXIucHVzaChjaGVja1JhbmdlKGRhdGEsIGRhdGEgJiAweGZmKSk7IH0sXG4gICAgICAgICAgICBkZXNlcmlhbGl6ZTogZnVuY3Rpb24gKGJ1ZmZlcikgeyByZXR1cm4gYnVmZmVyLmdldCgpOyB9LFxuICAgICAgICB9KSxcbiAgICAgICAgaW50ODogY3JlYXRlVHlwZSh7XG4gICAgICAgICAgICBuYW1lOiAnaW50OCcsXG4gICAgICAgICAgICBzZXJpYWxpemU6IGZ1bmN0aW9uIChidWZmZXIsIGRhdGEpIHsgYnVmZmVyLnB1c2goY2hlY2tSYW5nZShkYXRhLCBkYXRhIDw8IDI0ID4+IDI0KSk7IH0sXG4gICAgICAgICAgICBkZXNlcmlhbGl6ZTogZnVuY3Rpb24gKGJ1ZmZlcikgeyByZXR1cm4gYnVmZmVyLmdldCgpIDw8IDI0ID4+IDI0OyB9LFxuICAgICAgICB9KSxcbiAgICAgICAgdWludDE2OiBjcmVhdGVUeXBlKHtcbiAgICAgICAgICAgIG5hbWU6ICd1aW50MTYnLFxuICAgICAgICAgICAgc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyLCBkYXRhKSB7IGJ1ZmZlci5wdXNoVWludDE2KGNoZWNrUmFuZ2UoZGF0YSwgZGF0YSAmIDB4ZmZmZikpOyB9LFxuICAgICAgICAgICAgZGVzZXJpYWxpemU6IGZ1bmN0aW9uIChidWZmZXIpIHsgcmV0dXJuIGJ1ZmZlci5nZXRVaW50MTYoKTsgfSxcbiAgICAgICAgfSksXG4gICAgICAgIGludDE2OiBjcmVhdGVUeXBlKHtcbiAgICAgICAgICAgIG5hbWU6ICdpbnQxNicsXG4gICAgICAgICAgICBzZXJpYWxpemU6IGZ1bmN0aW9uIChidWZmZXIsIGRhdGEpIHsgYnVmZmVyLnB1c2hVaW50MTYoY2hlY2tSYW5nZShkYXRhLCBkYXRhIDw8IDE2ID4+IDE2KSk7IH0sXG4gICAgICAgICAgICBkZXNlcmlhbGl6ZTogZnVuY3Rpb24gKGJ1ZmZlcikgeyByZXR1cm4gYnVmZmVyLmdldFVpbnQxNigpIDw8IDE2ID4+IDE2OyB9LFxuICAgICAgICB9KSxcbiAgICAgICAgdWludDMyOiBjcmVhdGVUeXBlKHtcbiAgICAgICAgICAgIG5hbWU6ICd1aW50MzInLFxuICAgICAgICAgICAgc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyLCBkYXRhKSB7IGJ1ZmZlci5wdXNoVWludDMyKGNoZWNrUmFuZ2UoZGF0YSwgZGF0YSA+Pj4gMCkpOyB9LFxuICAgICAgICAgICAgZGVzZXJpYWxpemU6IGZ1bmN0aW9uIChidWZmZXIpIHsgcmV0dXJuIGJ1ZmZlci5nZXRVaW50MzIoKTsgfSxcbiAgICAgICAgfSksXG4gICAgICAgIHVpbnQ2NDogY3JlYXRlVHlwZSh7XG4gICAgICAgICAgICBuYW1lOiAndWludDY0JyxcbiAgICAgICAgICAgIHNlcmlhbGl6ZTogZnVuY3Rpb24gKGJ1ZmZlciwgZGF0YSkge1xuICAgICAgICAgICAgICAgIGJ1ZmZlci5wdXNoQXJyYXkobnVtZXJpYy5kZWNpbWFsVG9CaW5hcnkoOCwgJycgKyBkYXRhKSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVzZXJpYWxpemU6IGZ1bmN0aW9uIChidWZmZXIpIHsgcmV0dXJuIG51bWVyaWMuYmluYXJ5VG9EZWNpbWFsKGJ1ZmZlci5nZXRVaW50OEFycmF5KDgpKTsgfSxcbiAgICAgICAgfSksXG4gICAgICAgIGludDY0OiBjcmVhdGVUeXBlKHtcbiAgICAgICAgICAgIG5hbWU6ICdpbnQ2NCcsXG4gICAgICAgICAgICBzZXJpYWxpemU6IGZ1bmN0aW9uIChidWZmZXIsIGRhdGEpIHtcbiAgICAgICAgICAgICAgICBidWZmZXIucHVzaEFycmF5KG51bWVyaWMuc2lnbmVkRGVjaW1hbFRvQmluYXJ5KDgsICcnICsgZGF0YSkpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyKSB7IHJldHVybiBudW1lcmljLnNpZ25lZEJpbmFyeVRvRGVjaW1hbChidWZmZXIuZ2V0VWludDhBcnJheSg4KSk7IH0sXG4gICAgICAgIH0pLFxuICAgICAgICBpbnQzMjogY3JlYXRlVHlwZSh7XG4gICAgICAgICAgICBuYW1lOiAnaW50MzInLFxuICAgICAgICAgICAgc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyLCBkYXRhKSB7IGJ1ZmZlci5wdXNoVWludDMyKGNoZWNrUmFuZ2UoZGF0YSwgZGF0YSB8IDApKTsgfSxcbiAgICAgICAgICAgIGRlc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyKSB7IHJldHVybiBidWZmZXIuZ2V0VWludDMyKCkgfCAwOyB9LFxuICAgICAgICB9KSxcbiAgICAgICAgdmFydWludDMyOiBjcmVhdGVUeXBlKHtcbiAgICAgICAgICAgIG5hbWU6ICd2YXJ1aW50MzInLFxuICAgICAgICAgICAgc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyLCBkYXRhKSB7IGJ1ZmZlci5wdXNoVmFydWludDMyKGNoZWNrUmFuZ2UoZGF0YSwgZGF0YSA+Pj4gMCkpOyB9LFxuICAgICAgICAgICAgZGVzZXJpYWxpemU6IGZ1bmN0aW9uIChidWZmZXIpIHsgcmV0dXJuIGJ1ZmZlci5nZXRWYXJ1aW50MzIoKTsgfSxcbiAgICAgICAgfSksXG4gICAgICAgIHZhcmludDMyOiBjcmVhdGVUeXBlKHtcbiAgICAgICAgICAgIG5hbWU6ICd2YXJpbnQzMicsXG4gICAgICAgICAgICBzZXJpYWxpemU6IGZ1bmN0aW9uIChidWZmZXIsIGRhdGEpIHsgYnVmZmVyLnB1c2hWYXJpbnQzMihjaGVja1JhbmdlKGRhdGEsIGRhdGEgfCAwKSk7IH0sXG4gICAgICAgICAgICBkZXNlcmlhbGl6ZTogZnVuY3Rpb24gKGJ1ZmZlcikgeyByZXR1cm4gYnVmZmVyLmdldFZhcmludDMyKCk7IH0sXG4gICAgICAgIH0pLFxuICAgICAgICB1aW50MTI4OiBjcmVhdGVUeXBlKHtcbiAgICAgICAgICAgIG5hbWU6ICd1aW50MTI4JyxcbiAgICAgICAgICAgIHNlcmlhbGl6ZTogZnVuY3Rpb24gKGJ1ZmZlciwgZGF0YSkgeyBidWZmZXIucHVzaEFycmF5KG51bWVyaWMuZGVjaW1hbFRvQmluYXJ5KDE2LCAnJyArIGRhdGEpKTsgfSxcbiAgICAgICAgICAgIGRlc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyKSB7IHJldHVybiBudW1lcmljLmJpbmFyeVRvRGVjaW1hbChidWZmZXIuZ2V0VWludDhBcnJheSgxNikpOyB9LFxuICAgICAgICB9KSxcbiAgICAgICAgaW50MTI4OiBjcmVhdGVUeXBlKHtcbiAgICAgICAgICAgIG5hbWU6ICdpbnQxMjgnLFxuICAgICAgICAgICAgc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyLCBkYXRhKSB7XG4gICAgICAgICAgICAgICAgYnVmZmVyLnB1c2hBcnJheShudW1lcmljLnNpZ25lZERlY2ltYWxUb0JpbmFyeSgxNiwgJycgKyBkYXRhKSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVzZXJpYWxpemU6IGZ1bmN0aW9uIChidWZmZXIpIHsgcmV0dXJuIG51bWVyaWMuc2lnbmVkQmluYXJ5VG9EZWNpbWFsKGJ1ZmZlci5nZXRVaW50OEFycmF5KDE2KSk7IH0sXG4gICAgICAgIH0pLFxuICAgICAgICBmbG9hdDMyOiBjcmVhdGVUeXBlKHtcbiAgICAgICAgICAgIG5hbWU6ICdmbG9hdDMyJyxcbiAgICAgICAgICAgIHNlcmlhbGl6ZTogZnVuY3Rpb24gKGJ1ZmZlciwgZGF0YSkgeyBidWZmZXIucHVzaEZsb2F0MzIoZGF0YSk7IH0sXG4gICAgICAgICAgICBkZXNlcmlhbGl6ZTogZnVuY3Rpb24gKGJ1ZmZlcikgeyByZXR1cm4gYnVmZmVyLmdldEZsb2F0MzIoKTsgfSxcbiAgICAgICAgfSksXG4gICAgICAgIGZsb2F0NjQ6IGNyZWF0ZVR5cGUoe1xuICAgICAgICAgICAgbmFtZTogJ2Zsb2F0NjQnLFxuICAgICAgICAgICAgc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyLCBkYXRhKSB7IGJ1ZmZlci5wdXNoRmxvYXQ2NChkYXRhKTsgfSxcbiAgICAgICAgICAgIGRlc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyKSB7IHJldHVybiBidWZmZXIuZ2V0RmxvYXQ2NCgpOyB9LFxuICAgICAgICB9KSxcbiAgICAgICAgZmxvYXQxMjg6IGNyZWF0ZVR5cGUoe1xuICAgICAgICAgICAgbmFtZTogJ2Zsb2F0MTI4JyxcbiAgICAgICAgICAgIHNlcmlhbGl6ZTogZnVuY3Rpb24gKGJ1ZmZlciwgZGF0YSkgeyBidWZmZXIucHVzaFVpbnQ4QXJyYXlDaGVja2VkKGV4cG9ydHMuaGV4VG9VaW50OEFycmF5KGRhdGEpLCAxNik7IH0sXG4gICAgICAgICAgICBkZXNlcmlhbGl6ZTogZnVuY3Rpb24gKGJ1ZmZlcikgeyByZXR1cm4gZXhwb3J0cy5hcnJheVRvSGV4KGJ1ZmZlci5nZXRVaW50OEFycmF5KDE2KSk7IH0sXG4gICAgICAgIH0pLFxuICAgICAgICBieXRlczogY3JlYXRlVHlwZSh7XG4gICAgICAgICAgICBuYW1lOiAnYnl0ZXMnLFxuICAgICAgICAgICAgc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyLCBkYXRhKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEgaW5zdGFuY2VvZiBVaW50OEFycmF5IHx8IEFycmF5LmlzQXJyYXkoZGF0YSkpIHtcbiAgICAgICAgICAgICAgICAgICAgYnVmZmVyLnB1c2hCeXRlcyhkYXRhKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZlci5wdXNoQnl0ZXMoZXhwb3J0cy5oZXhUb1VpbnQ4QXJyYXkoZGF0YSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZXNlcmlhbGl6ZTogZnVuY3Rpb24gKGJ1ZmZlciwgc3RhdGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoc3RhdGUgJiYgc3RhdGUub3B0aW9ucy5ieXRlc0FzVWludDhBcnJheSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYnVmZmVyLmdldEJ5dGVzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXhwb3J0cy5hcnJheVRvSGV4KGJ1ZmZlci5nZXRCeXRlcygpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICB9KSxcbiAgICAgICAgc3RyaW5nOiBjcmVhdGVUeXBlKHtcbiAgICAgICAgICAgIG5hbWU6ICdzdHJpbmcnLFxuICAgICAgICAgICAgc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyLCBkYXRhKSB7IGJ1ZmZlci5wdXNoU3RyaW5nKGRhdGEpOyB9LFxuICAgICAgICAgICAgZGVzZXJpYWxpemU6IGZ1bmN0aW9uIChidWZmZXIpIHsgcmV0dXJuIGJ1ZmZlci5nZXRTdHJpbmcoKTsgfSxcbiAgICAgICAgfSksXG4gICAgICAgIG5hbWU6IGNyZWF0ZVR5cGUoe1xuICAgICAgICAgICAgbmFtZTogJ25hbWUnLFxuICAgICAgICAgICAgc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyLCBkYXRhKSB7IGJ1ZmZlci5wdXNoTmFtZShkYXRhKTsgfSxcbiAgICAgICAgICAgIGRlc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyKSB7IHJldHVybiBidWZmZXIuZ2V0TmFtZSgpOyB9LFxuICAgICAgICB9KSxcbiAgICAgICAgdGltZV9wb2ludDogY3JlYXRlVHlwZSh7XG4gICAgICAgICAgICBuYW1lOiAndGltZV9wb2ludCcsXG4gICAgICAgICAgICBzZXJpYWxpemU6IGZ1bmN0aW9uIChidWZmZXIsIGRhdGEpIHsgYnVmZmVyLnB1c2hOdW1iZXJBc1VpbnQ2NChleHBvcnRzLmRhdGVUb1RpbWVQb2ludChkYXRhKSk7IH0sXG4gICAgICAgICAgICBkZXNlcmlhbGl6ZTogZnVuY3Rpb24gKGJ1ZmZlcikgeyByZXR1cm4gZXhwb3J0cy50aW1lUG9pbnRUb0RhdGUoYnVmZmVyLmdldFVpbnQ2NEFzTnVtYmVyKCkpOyB9LFxuICAgICAgICB9KSxcbiAgICAgICAgdGltZV9wb2ludF9zZWM6IGNyZWF0ZVR5cGUoe1xuICAgICAgICAgICAgbmFtZTogJ3RpbWVfcG9pbnRfc2VjJyxcbiAgICAgICAgICAgIHNlcmlhbGl6ZTogZnVuY3Rpb24gKGJ1ZmZlciwgZGF0YSkgeyBidWZmZXIucHVzaFVpbnQzMihleHBvcnRzLmRhdGVUb1RpbWVQb2ludFNlYyhkYXRhKSk7IH0sXG4gICAgICAgICAgICBkZXNlcmlhbGl6ZTogZnVuY3Rpb24gKGJ1ZmZlcikgeyByZXR1cm4gZXhwb3J0cy50aW1lUG9pbnRTZWNUb0RhdGUoYnVmZmVyLmdldFVpbnQzMigpKTsgfSxcbiAgICAgICAgfSksXG4gICAgICAgIGJsb2NrX3RpbWVzdGFtcF90eXBlOiBjcmVhdGVUeXBlKHtcbiAgICAgICAgICAgIG5hbWU6ICdibG9ja190aW1lc3RhbXBfdHlwZScsXG4gICAgICAgICAgICBzZXJpYWxpemU6IGZ1bmN0aW9uIChidWZmZXIsIGRhdGEpIHsgYnVmZmVyLnB1c2hVaW50MzIoZXhwb3J0cy5kYXRlVG9CbG9ja1RpbWVzdGFtcChkYXRhKSk7IH0sXG4gICAgICAgICAgICBkZXNlcmlhbGl6ZTogZnVuY3Rpb24gKGJ1ZmZlcikgeyByZXR1cm4gZXhwb3J0cy5ibG9ja1RpbWVzdGFtcFRvRGF0ZShidWZmZXIuZ2V0VWludDMyKCkpOyB9LFxuICAgICAgICB9KSxcbiAgICAgICAgc3ltYm9sX2NvZGU6IGNyZWF0ZVR5cGUoe1xuICAgICAgICAgICAgbmFtZTogJ3N5bWJvbF9jb2RlJyxcbiAgICAgICAgICAgIHNlcmlhbGl6ZTogZnVuY3Rpb24gKGJ1ZmZlciwgZGF0YSkgeyBidWZmZXIucHVzaFN5bWJvbENvZGUoZGF0YSk7IH0sXG4gICAgICAgICAgICBkZXNlcmlhbGl6ZTogZnVuY3Rpb24gKGJ1ZmZlcikgeyByZXR1cm4gYnVmZmVyLmdldFN5bWJvbENvZGUoKTsgfSxcbiAgICAgICAgfSksXG4gICAgICAgIHN5bWJvbDogY3JlYXRlVHlwZSh7XG4gICAgICAgICAgICBuYW1lOiAnc3ltYm9sJyxcbiAgICAgICAgICAgIHNlcmlhbGl6ZTogZnVuY3Rpb24gKGJ1ZmZlciwgZGF0YSkgeyBidWZmZXIucHVzaFN5bWJvbChleHBvcnRzLnN0cmluZ1RvU3ltYm9sKGRhdGEpKTsgfSxcbiAgICAgICAgICAgIGRlc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyKSB7IHJldHVybiBleHBvcnRzLnN5bWJvbFRvU3RyaW5nKGJ1ZmZlci5nZXRTeW1ib2woKSk7IH0sXG4gICAgICAgIH0pLFxuICAgICAgICBhc3NldDogY3JlYXRlVHlwZSh7XG4gICAgICAgICAgICBuYW1lOiAnYXNzZXQnLFxuICAgICAgICAgICAgc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyLCBkYXRhKSB7IGJ1ZmZlci5wdXNoQXNzZXQoZGF0YSk7IH0sXG4gICAgICAgICAgICBkZXNlcmlhbGl6ZTogZnVuY3Rpb24gKGJ1ZmZlcikgeyByZXR1cm4gYnVmZmVyLmdldEFzc2V0KCk7IH0sXG4gICAgICAgIH0pLFxuICAgICAgICBjaGVja3N1bTE2MDogY3JlYXRlVHlwZSh7XG4gICAgICAgICAgICBuYW1lOiAnY2hlY2tzdW0xNjAnLFxuICAgICAgICAgICAgc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyLCBkYXRhKSB7IGJ1ZmZlci5wdXNoVWludDhBcnJheUNoZWNrZWQoZXhwb3J0cy5oZXhUb1VpbnQ4QXJyYXkoZGF0YSksIDIwKTsgfSxcbiAgICAgICAgICAgIGRlc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyKSB7IHJldHVybiBleHBvcnRzLmFycmF5VG9IZXgoYnVmZmVyLmdldFVpbnQ4QXJyYXkoMjApKTsgfSxcbiAgICAgICAgfSksXG4gICAgICAgIGNoZWNrc3VtMjU2OiBjcmVhdGVUeXBlKHtcbiAgICAgICAgICAgIG5hbWU6ICdjaGVja3N1bTI1NicsXG4gICAgICAgICAgICBzZXJpYWxpemU6IGZ1bmN0aW9uIChidWZmZXIsIGRhdGEpIHsgYnVmZmVyLnB1c2hVaW50OEFycmF5Q2hlY2tlZChleHBvcnRzLmhleFRvVWludDhBcnJheShkYXRhKSwgMzIpOyB9LFxuICAgICAgICAgICAgZGVzZXJpYWxpemU6IGZ1bmN0aW9uIChidWZmZXIpIHsgcmV0dXJuIGV4cG9ydHMuYXJyYXlUb0hleChidWZmZXIuZ2V0VWludDhBcnJheSgzMikpOyB9LFxuICAgICAgICB9KSxcbiAgICAgICAgY2hlY2tzdW01MTI6IGNyZWF0ZVR5cGUoe1xuICAgICAgICAgICAgbmFtZTogJ2NoZWNrc3VtNTEyJyxcbiAgICAgICAgICAgIHNlcmlhbGl6ZTogZnVuY3Rpb24gKGJ1ZmZlciwgZGF0YSkgeyBidWZmZXIucHVzaFVpbnQ4QXJyYXlDaGVja2VkKGV4cG9ydHMuaGV4VG9VaW50OEFycmF5KGRhdGEpLCA2NCk7IH0sXG4gICAgICAgICAgICBkZXNlcmlhbGl6ZTogZnVuY3Rpb24gKGJ1ZmZlcikgeyByZXR1cm4gZXhwb3J0cy5hcnJheVRvSGV4KGJ1ZmZlci5nZXRVaW50OEFycmF5KDY0KSk7IH0sXG4gICAgICAgIH0pLFxuICAgICAgICBwdWJsaWNfa2V5OiBjcmVhdGVUeXBlKHtcbiAgICAgICAgICAgIG5hbWU6ICdwdWJsaWNfa2V5JyxcbiAgICAgICAgICAgIHNlcmlhbGl6ZTogZnVuY3Rpb24gKGJ1ZmZlciwgZGF0YSkgeyBidWZmZXIucHVzaFB1YmxpY0tleShkYXRhKTsgfSxcbiAgICAgICAgICAgIGRlc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyKSB7IHJldHVybiBidWZmZXIuZ2V0UHVibGljS2V5KCk7IH0sXG4gICAgICAgIH0pLFxuICAgICAgICBwcml2YXRlX2tleTogY3JlYXRlVHlwZSh7XG4gICAgICAgICAgICBuYW1lOiAncHJpdmF0ZV9rZXknLFxuICAgICAgICAgICAgc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyLCBkYXRhKSB7IGJ1ZmZlci5wdXNoUHJpdmF0ZUtleShkYXRhKTsgfSxcbiAgICAgICAgICAgIGRlc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyKSB7IHJldHVybiBidWZmZXIuZ2V0UHJpdmF0ZUtleSgpOyB9LFxuICAgICAgICB9KSxcbiAgICAgICAgc2lnbmF0dXJlOiBjcmVhdGVUeXBlKHtcbiAgICAgICAgICAgIG5hbWU6ICdzaWduYXR1cmUnLFxuICAgICAgICAgICAgc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyLCBkYXRhKSB7IGJ1ZmZlci5wdXNoU2lnbmF0dXJlKGRhdGEpOyB9LFxuICAgICAgICAgICAgZGVzZXJpYWxpemU6IGZ1bmN0aW9uIChidWZmZXIpIHsgcmV0dXJuIGJ1ZmZlci5nZXRTaWduYXR1cmUoKTsgfSxcbiAgICAgICAgfSksXG4gICAgfSkpO1xuICAgIHJlc3VsdC5zZXQoJ2V4dGVuZGVkX2Fzc2V0JywgY3JlYXRlVHlwZSh7XG4gICAgICAgIG5hbWU6ICdleHRlbmRlZF9hc3NldCcsXG4gICAgICAgIGJhc2VOYW1lOiAnJyxcbiAgICAgICAgZmllbGRzOiBbXG4gICAgICAgICAgICB7IG5hbWU6ICdxdWFudGl0eScsIHR5cGVOYW1lOiAnYXNzZXQnLCB0eXBlOiByZXN1bHQuZ2V0KCdhc3NldCcpIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdjb250cmFjdCcsIHR5cGVOYW1lOiAnbmFtZScsIHR5cGU6IHJlc3VsdC5nZXQoJ25hbWUnKSB9LFxuICAgICAgICBdLFxuICAgICAgICBzZXJpYWxpemU6IHNlcmlhbGl6ZVN0cnVjdCxcbiAgICAgICAgZGVzZXJpYWxpemU6IGRlc2VyaWFsaXplU3RydWN0LFxuICAgIH0pKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTsgLy8gY3JlYXRlSW5pdGlhbFR5cGVzKClcbmV4cG9ydHMuY3JlYXRlSW5pdGlhbFR5cGVzID0gY3JlYXRlSW5pdGlhbFR5cGVzO1xudmFyIGNyZWF0ZUFiaVR5cGVzID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBpbml0aWFsVHlwZXMgPSBleHBvcnRzLmNyZWF0ZUluaXRpYWxUeXBlcygpO1xuICAgIGluaXRpYWxUeXBlcy5zZXQoJ2V4dGVuc2lvbnNfZW50cnknLCBjcmVhdGVUeXBlKHtcbiAgICAgICAgbmFtZTogJ2V4dGVuc2lvbnNfZW50cnknLFxuICAgICAgICBiYXNlTmFtZTogJycsXG4gICAgICAgIGZpZWxkczogW1xuICAgICAgICAgICAgeyBuYW1lOiAndGFnJywgdHlwZU5hbWU6ICd1aW50MTYnLCB0eXBlOiBudWxsIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICd2YWx1ZScsIHR5cGVOYW1lOiAnYnl0ZXMnLCB0eXBlOiBudWxsIH1cbiAgICAgICAgXSxcbiAgICAgICAgc2VyaWFsaXplOiBzZXJpYWxpemVTdHJ1Y3QsXG4gICAgICAgIGRlc2VyaWFsaXplOiBkZXNlcmlhbGl6ZVN0cnVjdCxcbiAgICB9KSk7XG4gICAgaW5pdGlhbFR5cGVzLnNldCgndHlwZV9kZWYnLCBjcmVhdGVUeXBlKHtcbiAgICAgICAgbmFtZTogJ3R5cGVfZGVmJyxcbiAgICAgICAgYmFzZU5hbWU6ICcnLFxuICAgICAgICBmaWVsZHM6IFtcbiAgICAgICAgICAgIHsgbmFtZTogJ25ld190eXBlX25hbWUnLCB0eXBlTmFtZTogJ3N0cmluZycsIHR5cGU6IG51bGwgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ3R5cGUnLCB0eXBlTmFtZTogJ3N0cmluZycsIHR5cGU6IG51bGwgfVxuICAgICAgICBdLFxuICAgICAgICBzZXJpYWxpemU6IHNlcmlhbGl6ZVN0cnVjdCxcbiAgICAgICAgZGVzZXJpYWxpemU6IGRlc2VyaWFsaXplU3RydWN0LFxuICAgIH0pKTtcbiAgICBpbml0aWFsVHlwZXMuc2V0KCdmaWVsZF9kZWYnLCBjcmVhdGVUeXBlKHtcbiAgICAgICAgbmFtZTogJ2ZpZWxkX2RlZicsXG4gICAgICAgIGJhc2VOYW1lOiAnJyxcbiAgICAgICAgZmllbGRzOiBbXG4gICAgICAgICAgICB7IG5hbWU6ICduYW1lJywgdHlwZU5hbWU6ICdzdHJpbmcnLCB0eXBlOiBudWxsIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICd0eXBlJywgdHlwZU5hbWU6ICdzdHJpbmcnLCB0eXBlOiBudWxsIH1cbiAgICAgICAgXSxcbiAgICAgICAgc2VyaWFsaXplOiBzZXJpYWxpemVTdHJ1Y3QsXG4gICAgICAgIGRlc2VyaWFsaXplOiBkZXNlcmlhbGl6ZVN0cnVjdCxcbiAgICB9KSk7XG4gICAgaW5pdGlhbFR5cGVzLnNldCgnc3RydWN0X2RlZicsIGNyZWF0ZVR5cGUoe1xuICAgICAgICBuYW1lOiAnc3RydWN0X2RlZicsXG4gICAgICAgIGJhc2VOYW1lOiAnJyxcbiAgICAgICAgZmllbGRzOiBbXG4gICAgICAgICAgICB7IG5hbWU6ICduYW1lJywgdHlwZU5hbWU6ICdzdHJpbmcnLCB0eXBlOiBudWxsIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdiYXNlJywgdHlwZU5hbWU6ICdzdHJpbmcnLCB0eXBlOiBudWxsIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdmaWVsZHMnLCB0eXBlTmFtZTogJ2ZpZWxkX2RlZltdJywgdHlwZTogbnVsbCB9XG4gICAgICAgIF0sXG4gICAgICAgIHNlcmlhbGl6ZTogc2VyaWFsaXplU3RydWN0LFxuICAgICAgICBkZXNlcmlhbGl6ZTogZGVzZXJpYWxpemVTdHJ1Y3QsXG4gICAgfSkpO1xuICAgIGluaXRpYWxUeXBlcy5zZXQoJ2FjdGlvbl9kZWYnLCBjcmVhdGVUeXBlKHtcbiAgICAgICAgbmFtZTogJ2FjdGlvbl9kZWYnLFxuICAgICAgICBiYXNlTmFtZTogJycsXG4gICAgICAgIGZpZWxkczogW1xuICAgICAgICAgICAgeyBuYW1lOiAnbmFtZScsIHR5cGVOYW1lOiAnbmFtZScsIHR5cGU6IG51bGwgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ3R5cGUnLCB0eXBlTmFtZTogJ3N0cmluZycsIHR5cGU6IG51bGwgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ3JpY2FyZGlhbl9jb250cmFjdCcsIHR5cGVOYW1lOiAnc3RyaW5nJywgdHlwZTogbnVsbCB9XG4gICAgICAgIF0sXG4gICAgICAgIHNlcmlhbGl6ZTogc2VyaWFsaXplU3RydWN0LFxuICAgICAgICBkZXNlcmlhbGl6ZTogZGVzZXJpYWxpemVTdHJ1Y3QsXG4gICAgfSkpO1xuICAgIGluaXRpYWxUeXBlcy5zZXQoJ3RhYmxlX2RlZicsIGNyZWF0ZVR5cGUoe1xuICAgICAgICBuYW1lOiAndGFibGVfZGVmJyxcbiAgICAgICAgYmFzZU5hbWU6ICcnLFxuICAgICAgICBmaWVsZHM6IFtcbiAgICAgICAgICAgIHsgbmFtZTogJ25hbWUnLCB0eXBlTmFtZTogJ25hbWUnLCB0eXBlOiBudWxsIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdpbmRleF90eXBlJywgdHlwZU5hbWU6ICdzdHJpbmcnLCB0eXBlOiBudWxsIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdrZXlfbmFtZXMnLCB0eXBlTmFtZTogJ3N0cmluZ1tdJywgdHlwZTogbnVsbCB9LFxuICAgICAgICAgICAgeyBuYW1lOiAna2V5X3R5cGVzJywgdHlwZU5hbWU6ICdzdHJpbmdbXScsIHR5cGU6IG51bGwgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ3R5cGUnLCB0eXBlTmFtZTogJ3N0cmluZycsIHR5cGU6IG51bGwgfVxuICAgICAgICBdLFxuICAgICAgICBzZXJpYWxpemU6IHNlcmlhbGl6ZVN0cnVjdCxcbiAgICAgICAgZGVzZXJpYWxpemU6IGRlc2VyaWFsaXplU3RydWN0LFxuICAgIH0pKTtcbiAgICBpbml0aWFsVHlwZXMuc2V0KCdjbGF1c2VfcGFpcicsIGNyZWF0ZVR5cGUoe1xuICAgICAgICBuYW1lOiAnY2xhdXNlX3BhaXInLFxuICAgICAgICBiYXNlTmFtZTogJycsXG4gICAgICAgIGZpZWxkczogW1xuICAgICAgICAgICAgeyBuYW1lOiAnaWQnLCB0eXBlTmFtZTogJ3N0cmluZycsIHR5cGU6IG51bGwgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ2JvZHknLCB0eXBlTmFtZTogJ3N0cmluZycsIHR5cGU6IG51bGwgfVxuICAgICAgICBdLFxuICAgICAgICBzZXJpYWxpemU6IHNlcmlhbGl6ZVN0cnVjdCxcbiAgICAgICAgZGVzZXJpYWxpemU6IGRlc2VyaWFsaXplU3RydWN0LFxuICAgIH0pKTtcbiAgICBpbml0aWFsVHlwZXMuc2V0KCdlcnJvcl9tZXNzYWdlJywgY3JlYXRlVHlwZSh7XG4gICAgICAgIG5hbWU6ICdlcnJvcl9tZXNzYWdlJyxcbiAgICAgICAgYmFzZU5hbWU6ICcnLFxuICAgICAgICBmaWVsZHM6IFtcbiAgICAgICAgICAgIHsgbmFtZTogJ2Vycm9yX2NvZGUnLCB0eXBlTmFtZTogJ3VpbnQ2NCcsIHR5cGU6IG51bGwgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ2Vycm9yX21zZycsIHR5cGVOYW1lOiAnc3RyaW5nJywgdHlwZTogbnVsbCB9XG4gICAgICAgIF0sXG4gICAgICAgIHNlcmlhbGl6ZTogc2VyaWFsaXplU3RydWN0LFxuICAgICAgICBkZXNlcmlhbGl6ZTogZGVzZXJpYWxpemVTdHJ1Y3QsXG4gICAgfSkpO1xuICAgIGluaXRpYWxUeXBlcy5zZXQoJ3ZhcmlhbnRfZGVmJywgY3JlYXRlVHlwZSh7XG4gICAgICAgIG5hbWU6ICd2YXJpYW50X2RlZicsXG4gICAgICAgIGJhc2VOYW1lOiAnJyxcbiAgICAgICAgZmllbGRzOiBbXG4gICAgICAgICAgICB7IG5hbWU6ICduYW1lJywgdHlwZU5hbWU6ICdzdHJpbmcnLCB0eXBlOiBudWxsIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICd0eXBlcycsIHR5cGVOYW1lOiAnc3RyaW5nW10nLCB0eXBlOiBudWxsIH1cbiAgICAgICAgXSxcbiAgICAgICAgc2VyaWFsaXplOiBzZXJpYWxpemVTdHJ1Y3QsXG4gICAgICAgIGRlc2VyaWFsaXplOiBkZXNlcmlhbGl6ZVN0cnVjdCxcbiAgICB9KSk7XG4gICAgaW5pdGlhbFR5cGVzLnNldCgnYWN0aW9uX3Jlc3VsdCcsIGNyZWF0ZVR5cGUoe1xuICAgICAgICBuYW1lOiAnYWN0aW9uX3Jlc3VsdCcsXG4gICAgICAgIGJhc2VOYW1lOiAnJyxcbiAgICAgICAgZmllbGRzOiBbXG4gICAgICAgICAgICB7IG5hbWU6ICduYW1lJywgdHlwZU5hbWU6ICduYW1lJywgdHlwZTogbnVsbCB9LFxuICAgICAgICAgICAgeyBuYW1lOiAncmVzdWx0X3R5cGUnLCB0eXBlTmFtZTogJ3N0cmluZycsIHR5cGU6IG51bGwgfVxuICAgICAgICBdLFxuICAgICAgICBzZXJpYWxpemU6IHNlcmlhbGl6ZVN0cnVjdCxcbiAgICAgICAgZGVzZXJpYWxpemU6IGRlc2VyaWFsaXplU3RydWN0LFxuICAgIH0pKTtcbiAgICBpbml0aWFsVHlwZXMuc2V0KCdwcmltYXJ5X2tleV9pbmRleF9kZWYnLCBjcmVhdGVUeXBlKHtcbiAgICAgICAgbmFtZTogJ3ByaW1hcnlfa2V5X2luZGV4X2RlZicsXG4gICAgICAgIGJhc2VOYW1lOiAnJyxcbiAgICAgICAgZmllbGRzOiBbXG4gICAgICAgICAgICB7IG5hbWU6ICduYW1lJywgdHlwZU5hbWU6ICduYW1lJywgdHlwZTogbnVsbCB9LFxuICAgICAgICAgICAgeyBuYW1lOiAndHlwZScsIHR5cGVOYW1lOiAnc3RyaW5nJywgdHlwZTogbnVsbCB9XG4gICAgICAgIF0sXG4gICAgICAgIHNlcmlhbGl6ZTogc2VyaWFsaXplU3RydWN0LFxuICAgICAgICBkZXNlcmlhbGl6ZTogZGVzZXJpYWxpemVTdHJ1Y3QsXG4gICAgfSkpO1xuICAgIGluaXRpYWxUeXBlcy5zZXQoJ3NlY29uZGFyeV9pbmRleF9kZWYnLCBjcmVhdGVUeXBlKHtcbiAgICAgICAgbmFtZTogJ3NlY29uZGFyeV9pbmRleF9kZWYnLFxuICAgICAgICBiYXNlTmFtZTogJycsXG4gICAgICAgIGZpZWxkczogW1xuICAgICAgICAgICAgeyBuYW1lOiAndHlwZScsIHR5cGVOYW1lOiAnc3RyaW5nJywgdHlwZTogbnVsbCB9LFxuICAgICAgICBdLFxuICAgICAgICBzZXJpYWxpemU6IHNlcmlhbGl6ZVN0cnVjdCxcbiAgICAgICAgZGVzZXJpYWxpemU6IGRlc2VyaWFsaXplU3RydWN0LFxuICAgIH0pKTtcbiAgICBpbml0aWFsVHlwZXMuc2V0KCdzZWNvbmRhcnlfaW5kaWNlcycsIGNyZWF0ZVR5cGUoe1xuICAgICAgICBuYW1lOiAnc2Vjb25kYXJ5X2luZGljZXMnLFxuICAgICAgICBiYXNlTmFtZTogJycsXG4gICAgICAgIGZpZWxkczogW1xuICAgICAgICAgICAgeyBuYW1lOiAnbmFtZScsIHR5cGVOYW1lOiAnbmFtZScsIHR5cGU6IG51bGwgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ3NlY29uZGFyeV9pbmRleF9kZWYnLCB0eXBlTmFtZTogJ3NlY29uZGFyeV9pbmRleF9kZWYnLCB0eXBlOiBudWxsIH1cbiAgICAgICAgXSxcbiAgICAgICAgc2VyaWFsaXplOiBzZXJpYWxpemVPYmplY3QsXG4gICAgICAgIGRlc2VyaWFsaXplOiBkZXNlcmlhbGl6ZU9iamVjdCxcbiAgICB9KSk7XG4gICAgaW5pdGlhbFR5cGVzLnNldCgna3ZfdGFibGVfZW50cnlfZGVmJywgY3JlYXRlVHlwZSh7XG4gICAgICAgIG5hbWU6ICdrdl90YWJsZV9lbnRyeV9kZWYnLFxuICAgICAgICBiYXNlTmFtZTogJycsXG4gICAgICAgIGZpZWxkczogW1xuICAgICAgICAgICAgeyBuYW1lOiAndHlwZScsIHR5cGVOYW1lOiAnc3RyaW5nJywgdHlwZTogbnVsbCB9LFxuICAgICAgICAgICAgeyBuYW1lOiAncHJpbWFyeV9pbmRleCcsIHR5cGVOYW1lOiAncHJpbWFyeV9rZXlfaW5kZXhfZGVmJywgdHlwZTogbnVsbCB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnc2Vjb25kYXJ5X2luZGljZXMnLCB0eXBlTmFtZTogJ3NlY29uZGFyeV9pbmRpY2VzJywgdHlwZTogbnVsbCB9XG4gICAgICAgIF0sXG4gICAgICAgIHNlcmlhbGl6ZTogc2VyaWFsaXplU3RydWN0LFxuICAgICAgICBkZXNlcmlhbGl6ZTogZGVzZXJpYWxpemVTdHJ1Y3QsXG4gICAgfSkpO1xuICAgIGluaXRpYWxUeXBlcy5zZXQoJ2t2X3RhYmxlJywgY3JlYXRlVHlwZSh7XG4gICAgICAgIG5hbWU6ICdrdl90YWJsZScsXG4gICAgICAgIGJhc2VOYW1lOiAnJyxcbiAgICAgICAgZmllbGRzOiBbXG4gICAgICAgICAgICB7IG5hbWU6ICduYW1lJywgdHlwZU5hbWU6ICduYW1lJywgdHlwZTogbnVsbCB9LFxuICAgICAgICAgICAgeyBuYW1lOiAna3ZfdGFibGVfZW50cnlfZGVmJywgdHlwZU5hbWU6ICdrdl90YWJsZV9lbnRyeV9kZWYnLCB0eXBlOiBudWxsIH1cbiAgICAgICAgXSxcbiAgICAgICAgc2VyaWFsaXplOiBzZXJpYWxpemVPYmplY3QsXG4gICAgICAgIGRlc2VyaWFsaXplOiBkZXNlcmlhbGl6ZU9iamVjdFxuICAgIH0pKTtcbiAgICBpbml0aWFsVHlwZXMuc2V0KCdhYmlfZGVmJywgY3JlYXRlVHlwZSh7XG4gICAgICAgIG5hbWU6ICdhYmlfZGVmJyxcbiAgICAgICAgYmFzZU5hbWU6ICcnLFxuICAgICAgICBmaWVsZHM6IFtcbiAgICAgICAgICAgIHsgbmFtZTogJ3ZlcnNpb24nLCB0eXBlTmFtZTogJ3N0cmluZycsIHR5cGU6IG51bGwgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ3R5cGVzJywgdHlwZU5hbWU6ICd0eXBlX2RlZltdJywgdHlwZTogbnVsbCB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnc3RydWN0cycsIHR5cGVOYW1lOiAnc3RydWN0X2RlZltdJywgdHlwZTogbnVsbCB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnYWN0aW9ucycsIHR5cGVOYW1lOiAnYWN0aW9uX2RlZltdJywgdHlwZTogbnVsbCB9LFxuICAgICAgICAgICAgeyBuYW1lOiAndGFibGVzJywgdHlwZU5hbWU6ICd0YWJsZV9kZWZbXScsIHR5cGU6IG51bGwgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ3JpY2FyZGlhbl9jbGF1c2VzJywgdHlwZU5hbWU6ICdjbGF1c2VfcGFpcltdJywgdHlwZTogbnVsbCB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnZXJyb3JfbWVzc2FnZXMnLCB0eXBlTmFtZTogJ2Vycm9yX21lc3NhZ2VbXScsIHR5cGU6IG51bGwgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ2FiaV9leHRlbnNpb25zJywgdHlwZU5hbWU6ICdleHRlbnNpb25zX2VudHJ5W10nLCB0eXBlOiBudWxsIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICd2YXJpYW50cycsIHR5cGVOYW1lOiAndmFyaWFudF9kZWZbXSQnLCB0eXBlOiBudWxsIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdhY3Rpb25fcmVzdWx0cycsIHR5cGVOYW1lOiAnYWN0aW9uX3Jlc3VsdFtdJCcsIHR5cGU6IG51bGwgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ2t2X3RhYmxlcycsIHR5cGVOYW1lOiAna3ZfdGFibGUkJywgdHlwZTogbnVsbCB9LFxuICAgICAgICBdLFxuICAgICAgICBzZXJpYWxpemU6IHNlcmlhbGl6ZVN0cnVjdCxcbiAgICAgICAgZGVzZXJpYWxpemU6IGRlc2VyaWFsaXplU3RydWN0LFxuICAgIH0pKTtcbiAgICByZXR1cm4gaW5pdGlhbFR5cGVzO1xufTtcbmV4cG9ydHMuY3JlYXRlQWJpVHlwZXMgPSBjcmVhdGVBYmlUeXBlcztcbnZhciBjcmVhdGVUcmFuc2FjdGlvbkV4dGVuc2lvblR5cGVzID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBpbml0aWFsVHlwZXMgPSBleHBvcnRzLmNyZWF0ZUluaXRpYWxUeXBlcygpO1xuICAgIGluaXRpYWxUeXBlcy5zZXQoJ3Jlc291cmNlX3BheWVyJywgY3JlYXRlVHlwZSh7XG4gICAgICAgIG5hbWU6ICdyZXNvdXJjZV9wYXllcicsXG4gICAgICAgIGJhc2VOYW1lOiAnJyxcbiAgICAgICAgZmllbGRzOiBbXG4gICAgICAgICAgICB7IG5hbWU6ICdwYXllcicsIHR5cGVOYW1lOiAnbmFtZScsIHR5cGU6IG51bGwgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ21heF9uZXRfYnl0ZXMnLCB0eXBlTmFtZTogJ3VpbnQ2NCcsIHR5cGU6IG51bGwgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ21heF9jcHVfdXMnLCB0eXBlTmFtZTogJ3VpbnQ2NCcsIHR5cGU6IG51bGwgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ21heF9tZW1vcnlfYnl0ZXMnLCB0eXBlTmFtZTogJ3VpbnQ2NCcsIHR5cGU6IG51bGwgfSxcbiAgICAgICAgXSxcbiAgICAgICAgc2VyaWFsaXplOiBzZXJpYWxpemVTdHJ1Y3QsXG4gICAgICAgIGRlc2VyaWFsaXplOiBkZXNlcmlhbGl6ZVN0cnVjdCxcbiAgICB9KSk7XG4gICAgcmV0dXJuIGluaXRpYWxUeXBlcztcbn07XG5leHBvcnRzLmNyZWF0ZVRyYW5zYWN0aW9uRXh0ZW5zaW9uVHlwZXMgPSBjcmVhdGVUcmFuc2FjdGlvbkV4dGVuc2lvblR5cGVzO1xudmFyIGNyZWF0ZVRyYW5zYWN0aW9uVHlwZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGluaXRpYWxUeXBlcyA9IGV4cG9ydHMuY3JlYXRlSW5pdGlhbFR5cGVzKCk7XG4gICAgaW5pdGlhbFR5cGVzLnNldCgncGVybWlzc2lvbl9sZXZlbCcsIGNyZWF0ZVR5cGUoe1xuICAgICAgICBuYW1lOiAncGVybWlzc2lvbl9sZXZlbCcsXG4gICAgICAgIGJhc2VOYW1lOiAnJyxcbiAgICAgICAgZmllbGRzOiBbXG4gICAgICAgICAgICB7IG5hbWU6ICdhY3RvcicsIHR5cGVOYW1lOiAnbmFtZScsIHR5cGU6IG51bGwgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ3Blcm1pc3Npb24nLCB0eXBlTmFtZTogJ25hbWUnLCB0eXBlOiBudWxsIH0sXG4gICAgICAgIF0sXG4gICAgICAgIHNlcmlhbGl6ZTogc2VyaWFsaXplU3RydWN0LFxuICAgICAgICBkZXNlcmlhbGl6ZTogZGVzZXJpYWxpemVTdHJ1Y3QsXG4gICAgfSkpO1xuICAgIGluaXRpYWxUeXBlcy5zZXQoJ2FjdGlvbicsIGNyZWF0ZVR5cGUoe1xuICAgICAgICBuYW1lOiAnYWN0aW9uJyxcbiAgICAgICAgYmFzZU5hbWU6ICcnLFxuICAgICAgICBmaWVsZHM6IFtcbiAgICAgICAgICAgIHsgbmFtZTogJ2FjY291bnQnLCB0eXBlTmFtZTogJ25hbWUnLCB0eXBlOiBudWxsIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICduYW1lJywgdHlwZU5hbWU6ICduYW1lJywgdHlwZTogbnVsbCB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnYXV0aG9yaXphdGlvbicsIHR5cGVOYW1lOiAncGVybWlzc2lvbl9sZXZlbFtdJywgdHlwZTogbnVsbCB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnZGF0YScsIHR5cGVOYW1lOiAnYnl0ZXMnLCB0eXBlOiBudWxsIH0sXG4gICAgICAgIF0sXG4gICAgICAgIHNlcmlhbGl6ZTogc2VyaWFsaXplU3RydWN0LFxuICAgICAgICBkZXNlcmlhbGl6ZTogZGVzZXJpYWxpemVTdHJ1Y3QsXG4gICAgfSkpO1xuICAgIGluaXRpYWxUeXBlcy5zZXQoJ2V4dGVuc2lvbicsIGNyZWF0ZVR5cGUoe1xuICAgICAgICBuYW1lOiAnZXh0ZW5zaW9uJyxcbiAgICAgICAgYmFzZU5hbWU6ICcnLFxuICAgICAgICBmaWVsZHM6IFtcbiAgICAgICAgICAgIHsgbmFtZTogJ3R5cGUnLCB0eXBlTmFtZTogJ3VpbnQxNicsIHR5cGU6IG51bGwgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ2RhdGEnLCB0eXBlTmFtZTogJ2J5dGVzJywgdHlwZTogbnVsbCB9LFxuICAgICAgICBdLFxuICAgICAgICBzZXJpYWxpemU6IHNlcmlhbGl6ZVBhaXIsXG4gICAgICAgIGRlc2VyaWFsaXplOiBkZXNlcmlhbGl6ZVBhaXIsXG4gICAgfSkpO1xuICAgIGluaXRpYWxUeXBlcy5zZXQoJ3RyYW5zYWN0aW9uX2hlYWRlcicsIGNyZWF0ZVR5cGUoe1xuICAgICAgICBuYW1lOiAndHJhbnNhY3Rpb25faGVhZGVyJyxcbiAgICAgICAgYmFzZU5hbWU6ICcnLFxuICAgICAgICBmaWVsZHM6IFtcbiAgICAgICAgICAgIHsgbmFtZTogJ2V4cGlyYXRpb24nLCB0eXBlTmFtZTogJ3RpbWVfcG9pbnRfc2VjJywgdHlwZTogbnVsbCB9LFxuICAgICAgICAgICAgeyBuYW1lOiAncmVmX2Jsb2NrX251bScsIHR5cGVOYW1lOiAndWludDE2JywgdHlwZTogbnVsbCB9LFxuICAgICAgICAgICAgeyBuYW1lOiAncmVmX2Jsb2NrX3ByZWZpeCcsIHR5cGVOYW1lOiAndWludDMyJywgdHlwZTogbnVsbCB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnbWF4X25ldF91c2FnZV93b3JkcycsIHR5cGVOYW1lOiAndmFydWludDMyJywgdHlwZTogbnVsbCB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnbWF4X2NwdV91c2FnZV9tcycsIHR5cGVOYW1lOiAndWludDgnLCB0eXBlOiBudWxsIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdkZWxheV9zZWMnLCB0eXBlTmFtZTogJ3ZhcnVpbnQzMicsIHR5cGU6IG51bGwgfSxcbiAgICAgICAgXSxcbiAgICAgICAgc2VyaWFsaXplOiBzZXJpYWxpemVTdHJ1Y3QsXG4gICAgICAgIGRlc2VyaWFsaXplOiBkZXNlcmlhbGl6ZVN0cnVjdCxcbiAgICB9KSk7XG4gICAgaW5pdGlhbFR5cGVzLnNldCgndHJhbnNhY3Rpb24nLCBjcmVhdGVUeXBlKHtcbiAgICAgICAgbmFtZTogJ3RyYW5zYWN0aW9uJyxcbiAgICAgICAgYmFzZU5hbWU6ICd0cmFuc2FjdGlvbl9oZWFkZXInLFxuICAgICAgICBmaWVsZHM6IFtcbiAgICAgICAgICAgIHsgbmFtZTogJ2NvbnRleHRfZnJlZV9hY3Rpb25zJywgdHlwZU5hbWU6ICdhY3Rpb25bXScsIHR5cGU6IG51bGwgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ2FjdGlvbnMnLCB0eXBlTmFtZTogJ2FjdGlvbltdJywgdHlwZTogbnVsbCB9LFxuICAgICAgICAgICAgeyBuYW1lOiAndHJhbnNhY3Rpb25fZXh0ZW5zaW9ucycsIHR5cGVOYW1lOiAnZXh0ZW5zaW9uJywgdHlwZTogbnVsbCB9XG4gICAgICAgIF0sXG4gICAgICAgIHNlcmlhbGl6ZTogc2VyaWFsaXplU3RydWN0LFxuICAgICAgICBkZXNlcmlhbGl6ZTogZGVzZXJpYWxpemVTdHJ1Y3QsXG4gICAgfSkpO1xuICAgIHJldHVybiBpbml0aWFsVHlwZXM7XG59O1xuZXhwb3J0cy5jcmVhdGVUcmFuc2FjdGlvblR5cGVzID0gY3JlYXRlVHJhbnNhY3Rpb25UeXBlcztcbi8qKiBHZXQgdHlwZSBmcm9tIGB0eXBlc2AgKi9cbnZhciBnZXRUeXBlID0gZnVuY3Rpb24gKHR5cGVzLCBuYW1lKSB7XG4gICAgdmFyIHR5cGUgPSB0eXBlcy5nZXQobmFtZSk7XG4gICAgaWYgKHR5cGUgJiYgdHlwZS5hbGlhc09mTmFtZSkge1xuICAgICAgICByZXR1cm4gZXhwb3J0cy5nZXRUeXBlKHR5cGVzLCB0eXBlLmFsaWFzT2ZOYW1lKTtcbiAgICB9XG4gICAgaWYgKHR5cGUpIHtcbiAgICAgICAgcmV0dXJuIHR5cGU7XG4gICAgfVxuICAgIGlmIChuYW1lLmVuZHNXaXRoKCdbXScpKSB7XG4gICAgICAgIHJldHVybiBjcmVhdGVUeXBlKHtcbiAgICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgICBhcnJheU9mOiBleHBvcnRzLmdldFR5cGUodHlwZXMsIG5hbWUuc3Vic3RyKDAsIG5hbWUubGVuZ3RoIC0gMikpLFxuICAgICAgICAgICAgc2VyaWFsaXplOiBzZXJpYWxpemVBcnJheSxcbiAgICAgICAgICAgIGRlc2VyaWFsaXplOiBkZXNlcmlhbGl6ZUFycmF5LFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgaWYgKG5hbWUuZW5kc1dpdGgoJz8nKSkge1xuICAgICAgICByZXR1cm4gY3JlYXRlVHlwZSh7XG4gICAgICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICAgICAgb3B0aW9uYWxPZjogZXhwb3J0cy5nZXRUeXBlKHR5cGVzLCBuYW1lLnN1YnN0cigwLCBuYW1lLmxlbmd0aCAtIDEpKSxcbiAgICAgICAgICAgIHNlcmlhbGl6ZTogc2VyaWFsaXplT3B0aW9uYWwsXG4gICAgICAgICAgICBkZXNlcmlhbGl6ZTogZGVzZXJpYWxpemVPcHRpb25hbCxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChuYW1lLmVuZHNXaXRoKCckJykpIHtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZVR5cGUoe1xuICAgICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICAgIGV4dGVuc2lvbk9mOiBleHBvcnRzLmdldFR5cGUodHlwZXMsIG5hbWUuc3Vic3RyKDAsIG5hbWUubGVuZ3RoIC0gMSkpLFxuICAgICAgICAgICAgc2VyaWFsaXplOiBzZXJpYWxpemVFeHRlbnNpb24sXG4gICAgICAgICAgICBkZXNlcmlhbGl6ZTogZGVzZXJpYWxpemVFeHRlbnNpb24sXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gdHlwZTogJyArIG5hbWUpO1xufTtcbmV4cG9ydHMuZ2V0VHlwZSA9IGdldFR5cGU7XG4vKipcbiAqIEdldCB0eXBlcyBmcm9tIGFiaVxuICpcbiAqIEBwYXJhbSBpbml0aWFsVHlwZXMgU2V0IG9mIHR5cGVzIHRvIGJ1aWxkIG9uLlxuICogSW4gbW9zdCBjYXNlcywgaXQncyBiZXN0IHRvIGZpbGwgdGhpcyBmcm9tIGEgZnJlc2ggY2FsbCB0byBgZ2V0VHlwZXNGcm9tQWJpKClgLlxuICovXG52YXIgZ2V0VHlwZXNGcm9tQWJpID0gZnVuY3Rpb24gKGluaXRpYWxUeXBlcywgYWJpKSB7XG4gICAgdmFyIGVfNiwgX2EsIGVfNywgX2IsIGVfOCwgX2MsIGVfOSwgX2QsIGVfMTAsIF9lO1xuICAgIHZhciB0eXBlcyA9IG5ldyBNYXAoaW5pdGlhbFR5cGVzKTtcbiAgICBpZiAoYWJpICYmIGFiaS50eXBlcykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZm9yICh2YXIgX2YgPSBfX3ZhbHVlcyhhYmkudHlwZXMpLCBfZyA9IF9mLm5leHQoKTsgIV9nLmRvbmU7IF9nID0gX2YubmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgdmFyIF9oID0gX2cudmFsdWUsIG5ld190eXBlX25hbWUgPSBfaC5uZXdfdHlwZV9uYW1lLCB0eXBlID0gX2gudHlwZTtcbiAgICAgICAgICAgICAgICB0eXBlcy5zZXQobmV3X3R5cGVfbmFtZSwgY3JlYXRlVHlwZSh7IG5hbWU6IG5ld190eXBlX25hbWUsIGFsaWFzT2ZOYW1lOiB0eXBlIH0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZV82XzEpIHsgZV82ID0geyBlcnJvcjogZV82XzEgfTsgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaWYgKF9nICYmICFfZy5kb25lICYmIChfYSA9IF9mLnJldHVybikpIF9hLmNhbGwoX2YpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzYpIHRocm93IGVfNi5lcnJvcjsgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChhYmkgJiYgYWJpLnN0cnVjdHMpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZvciAodmFyIF9qID0gX192YWx1ZXMoYWJpLnN0cnVjdHMpLCBfayA9IF9qLm5leHQoKTsgIV9rLmRvbmU7IF9rID0gX2oubmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgdmFyIF9sID0gX2sudmFsdWUsIG5hbWVfMSA9IF9sLm5hbWUsIGJhc2UgPSBfbC5iYXNlLCBmaWVsZHMgPSBfbC5maWVsZHM7XG4gICAgICAgICAgICAgICAgdHlwZXMuc2V0KG5hbWVfMSwgY3JlYXRlVHlwZSh7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IG5hbWVfMSxcbiAgICAgICAgICAgICAgICAgICAgYmFzZU5hbWU6IGJhc2UsXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkczogZmllbGRzLm1hcChmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuID0gX2EubmFtZSwgdHlwZSA9IF9hLnR5cGU7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHsgbmFtZTogbiwgdHlwZU5hbWU6IHR5cGUsIHR5cGU6IG51bGwgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICBzZXJpYWxpemU6IHNlcmlhbGl6ZVN0cnVjdCxcbiAgICAgICAgICAgICAgICAgICAgZGVzZXJpYWxpemU6IGRlc2VyaWFsaXplU3RydWN0LFxuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZV83XzEpIHsgZV83ID0geyBlcnJvcjogZV83XzEgfTsgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaWYgKF9rICYmICFfay5kb25lICYmIChfYiA9IF9qLnJldHVybikpIF9iLmNhbGwoX2opO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzcpIHRocm93IGVfNy5lcnJvcjsgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChhYmkgJiYgYWJpLnZhcmlhbnRzKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmb3IgKHZhciBfbSA9IF9fdmFsdWVzKGFiaS52YXJpYW50cyksIF9vID0gX20ubmV4dCgpOyAhX28uZG9uZTsgX28gPSBfbS5uZXh0KCkpIHtcbiAgICAgICAgICAgICAgICB2YXIgX3AgPSBfby52YWx1ZSwgbmFtZV8yID0gX3AubmFtZSwgdCA9IF9wLnR5cGVzO1xuICAgICAgICAgICAgICAgIHR5cGVzLnNldChuYW1lXzIsIGNyZWF0ZVR5cGUoe1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBuYW1lXzIsXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkczogdC5tYXAoZnVuY3Rpb24gKHMpIHsgcmV0dXJuICh7IG5hbWU6IHMsIHR5cGVOYW1lOiBzLCB0eXBlOiBudWxsIH0pOyB9KSxcbiAgICAgICAgICAgICAgICAgICAgc2VyaWFsaXplOiBzZXJpYWxpemVWYXJpYW50LFxuICAgICAgICAgICAgICAgICAgICBkZXNlcmlhbGl6ZTogZGVzZXJpYWxpemVWYXJpYW50LFxuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZV84XzEpIHsgZV84ID0geyBlcnJvcjogZV84XzEgfTsgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaWYgKF9vICYmICFfby5kb25lICYmIChfYyA9IF9tLnJldHVybikpIF9jLmNhbGwoX20pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzgpIHRocm93IGVfOC5lcnJvcjsgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGZvciAodmFyIHR5cGVzXzEgPSBfX3ZhbHVlcyh0eXBlcyksIHR5cGVzXzFfMSA9IHR5cGVzXzEubmV4dCgpOyAhdHlwZXNfMV8xLmRvbmU7IHR5cGVzXzFfMSA9IHR5cGVzXzEubmV4dCgpKSB7XG4gICAgICAgICAgICB2YXIgX3EgPSBfX3JlYWQodHlwZXNfMV8xLnZhbHVlLCAyKSwgbmFtZV8zID0gX3FbMF0sIHR5cGUgPSBfcVsxXTtcbiAgICAgICAgICAgIGlmICh0eXBlLmJhc2VOYW1lKSB7XG4gICAgICAgICAgICAgICAgdHlwZS5iYXNlID0gZXhwb3J0cy5nZXRUeXBlKHR5cGVzLCB0eXBlLmJhc2VOYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgX3IgPSAoZV8xMCA9IHZvaWQgMCwgX192YWx1ZXModHlwZS5maWVsZHMpKSwgX3MgPSBfci5uZXh0KCk7ICFfcy5kb25lOyBfcyA9IF9yLm5leHQoKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZmllbGQgPSBfcy52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgZmllbGQudHlwZSA9IGV4cG9ydHMuZ2V0VHlwZSh0eXBlcywgZmllbGQudHlwZU5hbWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlXzEwXzEpIHsgZV8xMCA9IHsgZXJyb3I6IGVfMTBfMSB9OyB9XG4gICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoX3MgJiYgIV9zLmRvbmUgJiYgKF9lID0gX3IucmV0dXJuKSkgX2UuY2FsbChfcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV8xMCkgdGhyb3cgZV8xMC5lcnJvcjsgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGNhdGNoIChlXzlfMSkgeyBlXzkgPSB7IGVycm9yOiBlXzlfMSB9OyB9XG4gICAgZmluYWxseSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAodHlwZXNfMV8xICYmICF0eXBlc18xXzEuZG9uZSAmJiAoX2QgPSB0eXBlc18xLnJldHVybikpIF9kLmNhbGwodHlwZXNfMSk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7IGlmIChlXzkpIHRocm93IGVfOS5lcnJvcjsgfVxuICAgIH1cbiAgICByZXR1cm4gdHlwZXM7XG59OyAvLyBnZXRUeXBlc0Zyb21BYmlcbmV4cG9ydHMuZ2V0VHlwZXNGcm9tQWJpID0gZ2V0VHlwZXNGcm9tQWJpO1xudmFyIHJldmVyc2VIZXggPSBmdW5jdGlvbiAoaCkge1xuICAgIHJldHVybiBoLnN1YnN0cig2LCAyKSArIGguc3Vic3RyKDQsIDIpICsgaC5zdWJzdHIoMiwgMikgKyBoLnN1YnN0cigwLCAyKTtcbn07XG4vKiogVEFQb1M6IFJldHVybiB0cmFuc2FjdGlvbiBmaWVsZHMgd2hpY2ggcmVmZXJlbmNlIGByZWZCbG9ja2AgYW5kIGV4cGlyZSBgZXhwaXJlU2Vjb25kc2AgYWZ0ZXIgYHRpbWVzdGFtcGAgKi9cbnZhciB0cmFuc2FjdGlvbkhlYWRlciA9IGZ1bmN0aW9uIChyZWZCbG9jaywgZXhwaXJlU2Vjb25kcykge1xuICAgIHZhciB0aW1lc3RhbXAgPSByZWZCbG9jay5oZWFkZXIgPyByZWZCbG9jay5oZWFkZXIudGltZXN0YW1wIDogcmVmQmxvY2sudGltZXN0YW1wO1xuICAgIHZhciBwcmVmaXggPSBwYXJzZUludChyZXZlcnNlSGV4KHJlZkJsb2NrLmlkLnN1YnN0cigxNiwgOCkpLCAxNik7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZXhwaXJhdGlvbjogZXhwb3J0cy50aW1lUG9pbnRTZWNUb0RhdGUoZXhwb3J0cy5kYXRlVG9UaW1lUG9pbnRTZWModGltZXN0YW1wKSArIGV4cGlyZVNlY29uZHMpLFxuICAgICAgICByZWZfYmxvY2tfbnVtOiByZWZCbG9jay5ibG9ja19udW0gJiAweGZmZmYsXG4gICAgICAgIHJlZl9ibG9ja19wcmVmaXg6IHByZWZpeCxcbiAgICB9O1xufTtcbmV4cG9ydHMudHJhbnNhY3Rpb25IZWFkZXIgPSB0cmFuc2FjdGlvbkhlYWRlcjtcbi8qKiBDb252ZXJ0IGFjdGlvbiBkYXRhIHRvIHNlcmlhbGl6ZWQgZm9ybSAoaGV4KSAqL1xudmFyIHNlcmlhbGl6ZUFjdGlvbkRhdGEgPSBmdW5jdGlvbiAoY29udHJhY3QsIGFjY291bnQsIG5hbWUsIGRhdGEsIHRleHRFbmNvZGVyLCB0ZXh0RGVjb2Rlcikge1xuICAgIHZhciBhY3Rpb24gPSBjb250cmFjdC5hY3Rpb25zLmdldChuYW1lKTtcbiAgICBpZiAoIWFjdGlvbikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmtub3duIGFjdGlvbiBcIiArIG5hbWUgKyBcIiBpbiBjb250cmFjdCBcIiArIGFjY291bnQpO1xuICAgIH1cbiAgICB2YXIgYnVmZmVyID0gbmV3IFNlcmlhbEJ1ZmZlcih7IHRleHRFbmNvZGVyOiB0ZXh0RW5jb2RlciwgdGV4dERlY29kZXI6IHRleHREZWNvZGVyIH0pO1xuICAgIGFjdGlvbi5zZXJpYWxpemUoYnVmZmVyLCBkYXRhKTtcbiAgICByZXR1cm4gZXhwb3J0cy5hcnJheVRvSGV4KGJ1ZmZlci5hc1VpbnQ4QXJyYXkoKSk7XG59O1xuZXhwb3J0cy5zZXJpYWxpemVBY3Rpb25EYXRhID0gc2VyaWFsaXplQWN0aW9uRGF0YTtcbi8qKiBSZXR1cm4gYWN0aW9uIGluIHNlcmlhbGl6ZWQgZm9ybSAqL1xudmFyIHNlcmlhbGl6ZUFjdGlvbiA9IGZ1bmN0aW9uIChjb250cmFjdCwgYWNjb3VudCwgbmFtZSwgYXV0aG9yaXphdGlvbiwgZGF0YSwgdGV4dEVuY29kZXIsIHRleHREZWNvZGVyKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgYWNjb3VudDogYWNjb3VudCxcbiAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgYXV0aG9yaXphdGlvbjogYXV0aG9yaXphdGlvbixcbiAgICAgICAgZGF0YTogZXhwb3J0cy5zZXJpYWxpemVBY3Rpb25EYXRhKGNvbnRyYWN0LCBhY2NvdW50LCBuYW1lLCBkYXRhLCB0ZXh0RW5jb2RlciwgdGV4dERlY29kZXIpLFxuICAgIH07XG59O1xuZXhwb3J0cy5zZXJpYWxpemVBY3Rpb24gPSBzZXJpYWxpemVBY3Rpb247XG4vKiogRGVzZXJpYWxpemUgYWN0aW9uIGRhdGEuIElmIGBkYXRhYCBpcyBhIGBzdHJpbmdgLCB0aGVuIGl0J3MgYXNzdW1lZCB0byBiZSBpbiBoZXguICovXG52YXIgZGVzZXJpYWxpemVBY3Rpb25EYXRhID0gZnVuY3Rpb24gKGNvbnRyYWN0LCBhY2NvdW50LCBuYW1lLCBkYXRhLCB0ZXh0RW5jb2RlciwgdGV4dERlY29kZXIpIHtcbiAgICB2YXIgYWN0aW9uID0gY29udHJhY3QuYWN0aW9ucy5nZXQobmFtZSk7XG4gICAgaWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykge1xuICAgICAgICBkYXRhID0gZXhwb3J0cy5oZXhUb1VpbnQ4QXJyYXkoZGF0YSk7XG4gICAgfVxuICAgIGlmICghYWN0aW9uKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVua25vd24gYWN0aW9uIFwiICsgbmFtZSArIFwiIGluIGNvbnRyYWN0IFwiICsgYWNjb3VudCk7XG4gICAgfVxuICAgIHZhciBidWZmZXIgPSBuZXcgU2VyaWFsQnVmZmVyKHsgdGV4dERlY29kZXI6IHRleHREZWNvZGVyLCB0ZXh0RW5jb2RlcjogdGV4dEVuY29kZXIgfSk7XG4gICAgYnVmZmVyLnB1c2hBcnJheShkYXRhKTtcbiAgICByZXR1cm4gYWN0aW9uLmRlc2VyaWFsaXplKGJ1ZmZlcik7XG59O1xuZXhwb3J0cy5kZXNlcmlhbGl6ZUFjdGlvbkRhdGEgPSBkZXNlcmlhbGl6ZUFjdGlvbkRhdGE7XG4vKiogRGVzZXJpYWxpemUgYWN0aW9uLiBJZiBgZGF0YWAgaXMgYSBgc3RyaW5nYCwgdGhlbiBpdCdzIGFzc3VtZWQgdG8gYmUgaW4gaGV4LiAqL1xudmFyIGRlc2VyaWFsaXplQWN0aW9uID0gZnVuY3Rpb24gKGNvbnRyYWN0LCBhY2NvdW50LCBuYW1lLCBhdXRob3JpemF0aW9uLCBkYXRhLCB0ZXh0RW5jb2RlciwgdGV4dERlY29kZXIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBhY2NvdW50OiBhY2NvdW50LFxuICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICBhdXRob3JpemF0aW9uOiBhdXRob3JpemF0aW9uLFxuICAgICAgICBkYXRhOiBleHBvcnRzLmRlc2VyaWFsaXplQWN0aW9uRGF0YShjb250cmFjdCwgYWNjb3VudCwgbmFtZSwgZGF0YSwgdGV4dEVuY29kZXIsIHRleHREZWNvZGVyKSxcbiAgICB9O1xufTtcbmV4cG9ydHMuZGVzZXJpYWxpemVBY3Rpb24gPSBkZXNlcmlhbGl6ZUFjdGlvbjtcbnZhciBzZXJpYWxpemVBbnl2YXIgPSBmdW5jdGlvbiAoYnVmZmVyLCBhbnl2YXIpIHtcbiAgICB2YXIgX2EsIF9iLCBfYywgX2QsIF9lLCBfZiwgX2c7XG4gICAgdmFyIGRlZjtcbiAgICB2YXIgdmFsdWU7XG4gICAgaWYgKGFueXZhciA9PT0gbnVsbCkge1xuICAgICAgICBfYSA9IF9fcmVhZChbYW55dmFyRGVmcy5udWxsX3QsIGFueXZhcl0sIDIpLCBkZWYgPSBfYVswXSwgdmFsdWUgPSBfYVsxXTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGFueXZhciA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgX2IgPSBfX3JlYWQoW2FueXZhckRlZnMuc3RyaW5nLCBhbnl2YXJdLCAyKSwgZGVmID0gX2JbMF0sIHZhbHVlID0gX2JbMV07XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBhbnl2YXIgPT09ICdudW1iZXInKSB7XG4gICAgICAgIF9jID0gX19yZWFkKFthbnl2YXJEZWZzLmludDMyLCBhbnl2YXJdLCAyKSwgZGVmID0gX2NbMF0sIHZhbHVlID0gX2NbMV07XG4gICAgfVxuICAgIGVsc2UgaWYgKGFueXZhciBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkpIHtcbiAgICAgICAgX2QgPSBfX3JlYWQoW2FueXZhckRlZnMuYnl0ZXMsIGFueXZhcl0sIDIpLCBkZWYgPSBfZFswXSwgdmFsdWUgPSBfZFsxXTtcbiAgICB9XG4gICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheShhbnl2YXIpKSB7XG4gICAgICAgIF9lID0gX19yZWFkKFthbnl2YXJEZWZzLmFueV9hcnJheSwgYW55dmFyXSwgMiksIGRlZiA9IF9lWzBdLCB2YWx1ZSA9IF9lWzFdO1xuICAgIH1cbiAgICBlbHNlIGlmIChPYmplY3Qua2V5cyhhbnl2YXIpLmxlbmd0aCA9PT0gMiAmJiBhbnl2YXIuaGFzT3duUHJvcGVydHkoJ3R5cGUnKSAmJiBhbnl2YXIuaGFzT3duUHJvcGVydHkoJ3ZhbHVlJykpIHtcbiAgICAgICAgX2YgPSBfX3JlYWQoW2FueXZhckRlZnNbYW55dmFyLnR5cGVdLCBhbnl2YXIudmFsdWVdLCAyKSwgZGVmID0gX2ZbMF0sIHZhbHVlID0gX2ZbMV07XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBfZyA9IF9fcmVhZChbYW55dmFyRGVmcy5hbnlfb2JqZWN0LCBhbnl2YXJdLCAyKSwgZGVmID0gX2dbMF0sIHZhbHVlID0gX2dbMV07XG4gICAgfVxuICAgIGJ1ZmZlci5wdXNoVmFydWludDMyKGRlZi5pbmRleCk7XG4gICAgZGVmLnR5cGUuc2VyaWFsaXplKGJ1ZmZlciwgdmFsdWUpO1xufTtcbmV4cG9ydHMuc2VyaWFsaXplQW55dmFyID0gc2VyaWFsaXplQW55dmFyO1xudmFyIGRlc2VyaWFsaXplQW55dmFyID0gZnVuY3Rpb24gKGJ1ZmZlciwgc3RhdGUpIHtcbiAgICB2YXIgZGVmSW5kZXggPSBidWZmZXIuZ2V0VmFydWludDMyKCk7XG4gICAgaWYgKGRlZkluZGV4ID49IGFueXZhckRlZnNCeUluZGV4Lmxlbmd0aCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RyaWVkIHRvIGRlc2VyaWFsaXplIHVua25vd24gYW55dmFyIHR5cGUnKTtcbiAgICB9XG4gICAgdmFyIGRlZiA9IGFueXZhckRlZnNCeUluZGV4W2RlZkluZGV4XTtcbiAgICB2YXIgdmFsdWUgPSBkZWYudHlwZS5kZXNlcmlhbGl6ZShidWZmZXIsIHN0YXRlKTtcbiAgICBpZiAoc3RhdGUgJiYgc3RhdGUub3B0aW9ucy51c2VTaG9ydEZvcm0gfHwgZGVmLnVzZVNob3J0Rm9ybSkge1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4geyB0eXBlOiBkZWYudHlwZS5uYW1lLCB2YWx1ZTogdmFsdWUgfTtcbiAgICB9XG59O1xuZXhwb3J0cy5kZXNlcmlhbGl6ZUFueXZhciA9IGRlc2VyaWFsaXplQW55dmFyO1xudmFyIGRlc2VyaWFsaXplQW55dmFyU2hvcnQgPSBmdW5jdGlvbiAoYnVmZmVyKSB7XG4gICAgcmV0dXJuIGV4cG9ydHMuZGVzZXJpYWxpemVBbnl2YXIoYnVmZmVyLCBuZXcgU2VyaWFsaXplclN0YXRlKHsgdXNlU2hvcnRGb3JtOiB0cnVlIH0pKTtcbn07XG5leHBvcnRzLmRlc2VyaWFsaXplQW55dmFyU2hvcnQgPSBkZXNlcmlhbGl6ZUFueXZhclNob3J0O1xudmFyIHNlcmlhbGl6ZUFueU9iamVjdCA9IGZ1bmN0aW9uIChidWZmZXIsIG9iaikge1xuICAgIHZhciBlXzExLCBfYTtcbiAgICB2YXIgZW50cmllcyA9IE9iamVjdC5lbnRyaWVzKG9iaik7XG4gICAgYnVmZmVyLnB1c2hWYXJ1aW50MzIoZW50cmllcy5sZW5ndGgpO1xuICAgIHRyeSB7XG4gICAgICAgIGZvciAodmFyIGVudHJpZXNfMiA9IF9fdmFsdWVzKGVudHJpZXMpLCBlbnRyaWVzXzJfMSA9IGVudHJpZXNfMi5uZXh0KCk7ICFlbnRyaWVzXzJfMS5kb25lOyBlbnRyaWVzXzJfMSA9IGVudHJpZXNfMi5uZXh0KCkpIHtcbiAgICAgICAgICAgIHZhciBfYiA9IF9fcmVhZChlbnRyaWVzXzJfMS52YWx1ZSwgMiksIGtleSA9IF9iWzBdLCB2YWx1ZSA9IF9iWzFdO1xuICAgICAgICAgICAgYnVmZmVyLnB1c2hTdHJpbmcoa2V5KTtcbiAgICAgICAgICAgIGV4cG9ydHMuc2VyaWFsaXplQW55dmFyKGJ1ZmZlciwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNhdGNoIChlXzExXzEpIHsgZV8xMSA9IHsgZXJyb3I6IGVfMTFfMSB9OyB9XG4gICAgZmluYWxseSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoZW50cmllc18yXzEgJiYgIWVudHJpZXNfMl8xLmRvbmUgJiYgKF9hID0gZW50cmllc18yLnJldHVybikpIF9hLmNhbGwoZW50cmllc18yKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMTEpIHRocm93IGVfMTEuZXJyb3I7IH1cbiAgICB9XG59O1xuZXhwb3J0cy5zZXJpYWxpemVBbnlPYmplY3QgPSBzZXJpYWxpemVBbnlPYmplY3Q7XG52YXIgZGVzZXJpYWxpemVBbnlPYmplY3QgPSBmdW5jdGlvbiAoYnVmZmVyLCBzdGF0ZSkge1xuICAgIHZhciBsZW4gPSBidWZmZXIuZ2V0VmFydWludDMyKCk7XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgICAgdmFyIGtleSA9IGJ1ZmZlci5nZXRTdHJpbmcoKTtcbiAgICAgICAgaWYgKGtleSBpbiByZXN1bHQpIHtcbiAgICAgICAgICAgIHZhciBqID0gMTtcbiAgICAgICAgICAgIHdoaWxlIChrZXkgKyAnXycgKyBqIGluIHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICsrajtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGtleSA9IGtleSArICdfJyArIGo7XG4gICAgICAgIH1cbiAgICAgICAgcmVzdWx0W2tleV0gPSBleHBvcnRzLmRlc2VyaWFsaXplQW55dmFyKGJ1ZmZlciwgc3RhdGUpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbmV4cG9ydHMuZGVzZXJpYWxpemVBbnlPYmplY3QgPSBkZXNlcmlhbGl6ZUFueU9iamVjdDtcbnZhciBzZXJpYWxpemVBbnlBcnJheSA9IGZ1bmN0aW9uIChidWZmZXIsIGFycikge1xuICAgIHZhciBlXzEyLCBfYTtcbiAgICBidWZmZXIucHVzaFZhcnVpbnQzMihhcnIubGVuZ3RoKTtcbiAgICB0cnkge1xuICAgICAgICBmb3IgKHZhciBhcnJfMSA9IF9fdmFsdWVzKGFyciksIGFycl8xXzEgPSBhcnJfMS5uZXh0KCk7ICFhcnJfMV8xLmRvbmU7IGFycl8xXzEgPSBhcnJfMS5uZXh0KCkpIHtcbiAgICAgICAgICAgIHZhciB4ID0gYXJyXzFfMS52YWx1ZTtcbiAgICAgICAgICAgIGV4cG9ydHMuc2VyaWFsaXplQW55dmFyKGJ1ZmZlciwgeCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2F0Y2ggKGVfMTJfMSkgeyBlXzEyID0geyBlcnJvcjogZV8xMl8xIH07IH1cbiAgICBmaW5hbGx5IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChhcnJfMV8xICYmICFhcnJfMV8xLmRvbmUgJiYgKF9hID0gYXJyXzEucmV0dXJuKSkgX2EuY2FsbChhcnJfMSk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7IGlmIChlXzEyKSB0aHJvdyBlXzEyLmVycm9yOyB9XG4gICAgfVxufTtcbmV4cG9ydHMuc2VyaWFsaXplQW55QXJyYXkgPSBzZXJpYWxpemVBbnlBcnJheTtcbnZhciBkZXNlcmlhbGl6ZUFueUFycmF5ID0gZnVuY3Rpb24gKGJ1ZmZlciwgc3RhdGUpIHtcbiAgICB2YXIgbGVuID0gYnVmZmVyLmdldFZhcnVpbnQzMigpO1xuICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKGV4cG9ydHMuZGVzZXJpYWxpemVBbnl2YXIoYnVmZmVyLCBzdGF0ZSkpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbmV4cG9ydHMuZGVzZXJpYWxpemVBbnlBcnJheSA9IGRlc2VyaWFsaXplQW55QXJyYXk7XG52YXIgYWRkQWRkaXRpb25hbFR5cGVzID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBpbml0aWFsVHlwZXMgPSBleHBvcnRzLmNyZWF0ZUluaXRpYWxUeXBlcygpO1xuICAgIGluaXRpYWxUeXBlcy5zZXQoJ251bGxfdCcsIGNyZWF0ZVR5cGUoe1xuICAgICAgICBuYW1lOiAnbnVsbF90JyxcbiAgICAgICAgc2VyaWFsaXplOiBmdW5jdGlvbiAoYnVmZmVyLCBhbnl2YXIpIHsgfSxcbiAgICAgICAgZGVzZXJpYWxpemU6IGZ1bmN0aW9uIChidWZmZXIsIHN0YXRlKSB7IH1cbiAgICB9KSk7XG4gICAgaW5pdGlhbFR5cGVzLnNldCgnYW55X29iamVjdCcsIGNyZWF0ZVR5cGUoe1xuICAgICAgICBuYW1lOiAnYW55X29iamVjdCcsXG4gICAgICAgIHNlcmlhbGl6ZTogZXhwb3J0cy5zZXJpYWxpemVBbnlPYmplY3QsXG4gICAgICAgIGRlc2VyaWFsaXplOiBleHBvcnRzLmRlc2VyaWFsaXplQW55T2JqZWN0XG4gICAgfSkpO1xuICAgIGluaXRpYWxUeXBlcy5zZXQoJ2FueV9hcnJheScsIGNyZWF0ZVR5cGUoe1xuICAgICAgICBuYW1lOiAnYW55X2FycmF5JyxcbiAgICAgICAgc2VyaWFsaXplOiBleHBvcnRzLnNlcmlhbGl6ZUFueUFycmF5LFxuICAgICAgICBkZXNlcmlhbGl6ZTogZXhwb3J0cy5kZXNlcmlhbGl6ZUFueUFycmF5XG4gICAgfSkpO1xuICAgIHJldHVybiBpbml0aWFsVHlwZXM7XG59O1xudmFyIGFkZGl0aW9uYWxUeXBlcyA9IGFkZEFkZGl0aW9uYWxUeXBlcygpO1xudmFyIGFueXZhckRlZnMgPSB7XG4gICAgbnVsbF90OiB7IGluZGV4OiAwLCB1c2VTaG9ydEZvcm06IHRydWUsIHR5cGU6IGFkZGl0aW9uYWxUeXBlcy5nZXQoJ251bGxfdCcpIH0sXG4gICAgaW50NjQ6IHsgaW5kZXg6IDEsIHVzZVNob3J0Rm9ybTogZmFsc2UsIHR5cGU6IGFkZGl0aW9uYWxUeXBlcy5nZXQoJ2ludDY0JykgfSxcbiAgICB1aW50NjQ6IHsgaW5kZXg6IDIsIHVzZVNob3J0Rm9ybTogZmFsc2UsIHR5cGU6IGFkZGl0aW9uYWxUeXBlcy5nZXQoJ3VpbnQ2NCcpIH0sXG4gICAgaW50MzI6IHsgaW5kZXg6IDMsIHVzZVNob3J0Rm9ybTogdHJ1ZSwgdHlwZTogYWRkaXRpb25hbFR5cGVzLmdldCgnaW50MzInKSB9LFxuICAgIHVpbnQzMjogeyBpbmRleDogNCwgdXNlU2hvcnRGb3JtOiBmYWxzZSwgdHlwZTogYWRkaXRpb25hbFR5cGVzLmdldCgndWludDMyJykgfSxcbiAgICBpbnQxNjogeyBpbmRleDogNSwgdXNlU2hvcnRGb3JtOiBmYWxzZSwgdHlwZTogYWRkaXRpb25hbFR5cGVzLmdldCgnaW50MTYnKSB9LFxuICAgIHVpbnQxNjogeyBpbmRleDogNiwgdXNlU2hvcnRGb3JtOiBmYWxzZSwgdHlwZTogYWRkaXRpb25hbFR5cGVzLmdldCgndWludDE2JykgfSxcbiAgICBpbnQ4OiB7IGluZGV4OiA3LCB1c2VTaG9ydEZvcm06IGZhbHNlLCB0eXBlOiBhZGRpdGlvbmFsVHlwZXMuZ2V0KCdpbnQ4JykgfSxcbiAgICB1aW50ODogeyBpbmRleDogOCwgdXNlU2hvcnRGb3JtOiBmYWxzZSwgdHlwZTogYWRkaXRpb25hbFR5cGVzLmdldCgndWludDgnKSB9LFxuICAgIHRpbWVfcG9pbnQ6IHsgaW5kZXg6IDksIHVzZVNob3J0Rm9ybTogZmFsc2UsIHR5cGU6IGFkZGl0aW9uYWxUeXBlcy5nZXQoJ3RpbWVfcG9pbnQnKSB9LFxuICAgIGNoZWNrc3VtMjU2OiB7IGluZGV4OiAxMCwgdXNlU2hvcnRGb3JtOiBmYWxzZSwgdHlwZTogYWRkaXRpb25hbFR5cGVzLmdldCgnY2hlY2tzdW0yNTYnKSB9LFxuICAgIGZsb2F0NjQ6IHsgaW5kZXg6IDExLCB1c2VTaG9ydEZvcm06IGZhbHNlLCB0eXBlOiBhZGRpdGlvbmFsVHlwZXMuZ2V0KCdmbG9hdDY0JykgfSxcbiAgICBzdHJpbmc6IHsgaW5kZXg6IDEyLCB1c2VTaG9ydEZvcm06IHRydWUsIHR5cGU6IGFkZGl0aW9uYWxUeXBlcy5nZXQoJ3N0cmluZycpIH0sXG4gICAgYW55X29iamVjdDogeyBpbmRleDogMTMsIHVzZVNob3J0Rm9ybTogdHJ1ZSwgdHlwZTogYWRkaXRpb25hbFR5cGVzLmdldCgnYW55X29iamVjdCcpIH0sXG4gICAgYW55X2FycmF5OiB7IGluZGV4OiAxNCwgdXNlU2hvcnRGb3JtOiB0cnVlLCB0eXBlOiBhZGRpdGlvbmFsVHlwZXMuZ2V0KCdhbnlfYXJyYXknKSB9LFxuICAgIGJ5dGVzOiB7IGluZGV4OiAxNSwgdXNlU2hvcnRGb3JtOiBmYWxzZSwgdHlwZTogYWRkaXRpb25hbFR5cGVzLmdldCgnYnl0ZXMnKSB9LFxuICAgIHN5bWJvbDogeyBpbmRleDogMTYsIHVzZVNob3J0Rm9ybTogZmFsc2UsIHR5cGU6IGFkZGl0aW9uYWxUeXBlcy5nZXQoJ3N5bWJvbCcpIH0sXG4gICAgc3ltYm9sX2NvZGU6IHsgaW5kZXg6IDE3LCB1c2VTaG9ydEZvcm06IGZhbHNlLCB0eXBlOiBhZGRpdGlvbmFsVHlwZXMuZ2V0KCdzeW1ib2xfY29kZScpIH0sXG4gICAgYXNzZXQ6IHsgaW5kZXg6IDE4LCB1c2VTaG9ydEZvcm06IGZhbHNlLCB0eXBlOiBhZGRpdGlvbmFsVHlwZXMuZ2V0KCdhc3NldCcpIH0sXG59O1xudmFyIGFueXZhckRlZnNCeUluZGV4ID0gW1xuICAgIGFueXZhckRlZnMubnVsbF90LFxuICAgIGFueXZhckRlZnMuaW50NjQsXG4gICAgYW55dmFyRGVmcy51aW50NjQsXG4gICAgYW55dmFyRGVmcy5pbnQzMixcbiAgICBhbnl2YXJEZWZzLnVpbnQzMixcbiAgICBhbnl2YXJEZWZzLmludDE2LFxuICAgIGFueXZhckRlZnMudWludDE2LFxuICAgIGFueXZhckRlZnMuaW50OCxcbiAgICBhbnl2YXJEZWZzLnVpbnQ4LFxuICAgIGFueXZhckRlZnMudGltZV9wb2ludCxcbiAgICBhbnl2YXJEZWZzLmNoZWNrc3VtMjU2LFxuICAgIGFueXZhckRlZnMuZmxvYXQ2NCxcbiAgICBhbnl2YXJEZWZzLnN0cmluZyxcbiAgICBhbnl2YXJEZWZzLmFueV9vYmplY3QsXG4gICAgYW55dmFyRGVmcy5hbnlfYXJyYXksXG4gICAgYW55dmFyRGVmcy5ieXRlcyxcbiAgICBhbnl2YXJEZWZzLnN5bWJvbCxcbiAgICBhbnl2YXJEZWZzLnN5bWJvbF9jb2RlLFxuICAgIGFueXZhckRlZnMuYXNzZXQsXG5dO1xudmFyIHNlcmlhbGl6ZVF1ZXJ5ID0gZnVuY3Rpb24gKGJ1ZmZlciwgcXVlcnkpIHtcbiAgICB2YXIgX2EsIF9iLCBfYywgZV8xMywgX2Q7XG4gICAgdmFyIG1ldGhvZDtcbiAgICB2YXIgYXJnO1xuICAgIHZhciBmaWx0ZXI7XG4gICAgaWYgKHR5cGVvZiBxdWVyeSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgbWV0aG9kID0gcXVlcnk7XG4gICAgfVxuICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkocXVlcnkpICYmIHF1ZXJ5Lmxlbmd0aCA9PT0gMikge1xuICAgICAgICBfYSA9IF9fcmVhZChxdWVyeSwgMiksIG1ldGhvZCA9IF9hWzBdLCBmaWx0ZXIgPSBfYVsxXTtcbiAgICB9XG4gICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheShxdWVyeSkgJiYgcXVlcnkubGVuZ3RoID09PSAzKSB7XG4gICAgICAgIF9iID0gX19yZWFkKHF1ZXJ5LCAzKSwgbWV0aG9kID0gX2JbMF0sIGFyZyA9IF9iWzFdLCBmaWx0ZXIgPSBfYlsyXTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIF9jID0gX19yZWFkKFtxdWVyeS5tZXRob2QsIHF1ZXJ5LmFyZywgcXVlcnkuZmlsdGVyXSwgMyksIG1ldGhvZCA9IF9jWzBdLCBhcmcgPSBfY1sxXSwgZmlsdGVyID0gX2NbMl07XG4gICAgfVxuICAgIGJ1ZmZlci5wdXNoU3RyaW5nKG1ldGhvZCk7XG4gICAgaWYgKGFyZyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGJ1ZmZlci5wdXNoKDApO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgYnVmZmVyLnB1c2goMSk7XG4gICAgICAgIGV4cG9ydHMuc2VyaWFsaXplQW55dmFyKGJ1ZmZlciwgYXJnKTtcbiAgICB9XG4gICAgaWYgKGZpbHRlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGJ1ZmZlci5wdXNoKDApO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgYnVmZmVyLnB1c2hWYXJ1aW50MzIoZmlsdGVyLmxlbmd0aCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmb3IgKHZhciBmaWx0ZXJfMSA9IF9fdmFsdWVzKGZpbHRlciksIGZpbHRlcl8xXzEgPSBmaWx0ZXJfMS5uZXh0KCk7ICFmaWx0ZXJfMV8xLmRvbmU7IGZpbHRlcl8xXzEgPSBmaWx0ZXJfMS5uZXh0KCkpIHtcbiAgICAgICAgICAgICAgICB2YXIgcSA9IGZpbHRlcl8xXzEudmFsdWU7XG4gICAgICAgICAgICAgICAgZXhwb3J0cy5zZXJpYWxpemVRdWVyeShidWZmZXIsIHEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlXzEzXzEpIHsgZV8xMyA9IHsgZXJyb3I6IGVfMTNfMSB9OyB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBpZiAoZmlsdGVyXzFfMSAmJiAhZmlsdGVyXzFfMS5kb25lICYmIChfZCA9IGZpbHRlcl8xLnJldHVybikpIF9kLmNhbGwoZmlsdGVyXzEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzEzKSB0aHJvdyBlXzEzLmVycm9yOyB9XG4gICAgICAgIH1cbiAgICB9XG59O1xuZXhwb3J0cy5zZXJpYWxpemVRdWVyeSA9IHNlcmlhbGl6ZVF1ZXJ5O1xuIiwiLy8gaHR0cHM6Ly9naXN0LmdpdGh1YnVzZXJjb250ZW50LmNvbS93bHpsYTAwMC9iYWM4M2RmNmQzYzUxOTE2YzRkZDBiYzk0N2U0Njk0Ny9yYXcvN2VlMzQ2MmIwOTVhYjIyNTgwZGRhZjE5MWY0NGE1OTBkYTZmZTMzYi9SSVBFTUQtMTYwLmpzXG5cbi8qXG5cdFJJUEVNRC0xNjAuanNcblxuXHRcdGRldmVsb3BlZFxuXHRcdFx0YnkgSy4gKGh0dHBzOi8vZ2l0aHViLmNvbS93bHpsYTAwMClcblx0XHRcdG9uIERlY2VtYmVyIDI3LTI5LCAyMDE3LFxuXG5cdFx0bGljZW5zZWQgdW5kZXJcblxuXG5cdFx0dGhlIE1JVCBsaWNlbnNlXG5cblx0XHRDb3B5cmlnaHQgKGMpIDIwMTcgSy5cblxuXHRcdCBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvblxuXHRcdG9idGFpbmluZyBhIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uXG5cdFx0ZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0XG5cdFx0cmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsXG5cdFx0Y29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yXG5cdFx0c2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGVcblx0XHRTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZ1xuXHRcdGNvbmRpdGlvbnM6XG5cblx0XHQgVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmVcblx0XHRpbmNsdWRlZCBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuXHRcdCBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELFxuXHRcdEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFU1xuXHRcdE9GIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EXG5cdFx0Tk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFRcblx0XHRIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSxcblx0XHRXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkdcblx0XHRGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SXG5cdFx0T1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5jbGFzcyBSSVBFTUQxNjBcbntcbiAgICBjb25zdHJ1Y3RvcigpXG4gICAge1xuICAgICAgICAvLyBodHRwczovL3dlYmNhY2hlLmdvb2dsZXVzZXJjb250ZW50LmNvbS9zZWFyY2g/cT1jYWNoZTpDbkxPZ29sVEhZRUo6aHR0cHM6Ly93d3cuY29zaWMuZXNhdC5rdWxldXZlbi5iZS9wdWJsaWNhdGlvbnMvYXJ0aWNsZS0zMTcucGRmXG4gICAgICAgIC8vIGh0dHA6Ly9zaG9kaGdhbmdhLmluZmxpYm5ldC5hYy5pbi9iaXRzdHJlYW0vMTA2MDMvMjI5NzgvMTMvMTNfYXBwZW5kaXgucGRmXG4gICAgfVxuXG4gICAgc3RhdGljIGdldF9uX3BhZF9ieXRlcyhtZXNzYWdlX3NpemUgLyogaW4gYnl0ZXMsIDEgYnl0ZSBpcyA4IGJpdHMuICovKVxuICAgIHtcbiAgICAgICAgLy8gIE9idGFpbiB0aGUgbnVtYmVyIG9mIGJ5dGVzIG5lZWRlZCB0byBwYWQgdGhlIG1lc3NhZ2UuXG4gICAgICAgIC8vIEl0IGRvZXMgbm90IGNvbnRhaW4gdGhlIHNpemUgb2YgdGhlIG1lc3NhZ2Ugc2l6ZSBpbmZvcm1hdGlvbi5cbiAgICAgICAgLypcblx0XHRcdGh0dHBzOi8vd2ViY2FjaGUuZ29vZ2xldXNlcmNvbnRlbnQuY29tL3NlYXJjaD9xPWNhY2hlOkNuTE9nb2xUSFlFSjpodHRwczovL3d3dy5jb3NpYy5lc2F0Lmt1bGV1dmVuLmJlL3B1YmxpY2F0aW9ucy9hcnRpY2xlLTMxNy5wZGZcblxuXHRcdFx0VGhlIENyeXB0b2dyYXBoaWMgSGFzaCBGdW5jdGlvbiBSSVBFTUQtMTYwXG5cblx0XHRcdHdyaXR0ZW4gYnlcblx0XHRcdFx0QmFydCBQcmVuZWVsLFxuXHRcdFx0XHRIYW5zIERvYmJlcnRpbixcblx0XHRcdFx0QW50b29uIEJvc3NlbGFlcnNcblx0XHRcdGluXG5cdFx0XHRcdDE5OTcuXG5cblx0XHRcdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblx0XHRcdMKnNSAgICAgRGVzY3JpcHRpb24gb2YgUklQRU1ELTE2MFxuXG5cdFx0XHQuLi4uLi5cblxuXHRcdFx0IEluIG9yZGVyIHRvIGd1YXJhbnRlZSB0aGF0IHRoZSB0b3RhbCBpbnB1dCBzaXplIGlzIGFcblx0XHRcdG11bHRpcGxlIG9mIDUxMiBiaXRzLCB0aGUgaW5wdXQgaXMgcGFkZGVkIGluIHRoZSBzYW1lXG5cdFx0XHR3YXkgYXMgZm9yIGFsbCB0aGUgbWVtYmVycyBvZiB0aGUgTUQ0LWZhbWlseTogb25lXG5cdFx0XHRhcHBlbmRzIGEgc2luZ2xlIDEgZm9sbG93ZWQgYnkgYSBzdHJpbmcgb2YgMHMgKHRoZVxuXHRcdFx0bnVtYmVyIG9mIDBzIGxpZXMgYmV0d2VlbiAwIGFuZCA1MTEpOyB0aGUgbGFzdCA2NCBiaXRzXG5cdFx0XHRvZiB0aGUgZXh0ZW5kZWQgaW5wdXQgY29udGFpbiB0aGUgYmluYXJ5IHJlcHJlc2VudGF0aW9uXG5cdFx0XHRvZiB0aGUgaW5wdXQgc2l6ZSBpbiBiaXRzLCBsZWFzdCBzaWduaWZpY2FudCBieXRlIGZpcnN0LlxuXHRcdCovXG4gICAgICAgIC8qXG5cdFx0XHRodHRwczovL3Rvb2xzLmlldGYub3JnL3JmYy9yZmMxMTg2LnR4dFxuXG5cdFx0XHRSRkMgMTE4NjogTUQ0IE1lc3NhZ2UgRGlnZXN0IEFsZ29yaXRobS5cblxuXHRcdFx0d3JpdHRlbiBieVxuXHRcdFx0XHRSb25hbGQgTGlubiBSaXZlc3Rcblx0XHRcdGluXG5cdFx0XHRcdE9jdG9iZXIgMTk5MC5cblxuXHRcdFx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXHRcdFx0wqczICAgICBNRDQgQWxnb3JpdGhtIERlc2NyaXB0aW9uXG5cblx0XHRcdC4uLi4uLlxuXG5cdFx0XHRTdGVwIDEuIEFwcGVuZCBwYWRkaW5nIGJpdHNcblxuXHRcdFx0IFRoZSBtZXNzYWdlIGlzIFwicGFkZGVkXCIgKGV4dGVuZGVkKSBzbyB0aGF0IGl0cyBsZW5ndGhcblx0XHRcdChpbiBiaXRzKSBpcyBjb25ncnVlbnQgdG8gNDQ4LCBtb2R1bG8gNTEyLiBUaGF0IGlzLCB0aGVcblx0XHRcdG1lc3NhZ2UgaXMgZXh0ZW5kZWQgc28gdGhhdCBpdCBpcyBqdXN0IDY0IGJpdHMgc2h5IG9mXG5cdFx0XHRiZWluZyBhIG11bHRpcGxlIG9mIDUxMiBiaXRzIGxvbmcuIFBhZGRpbmcgaXMgYWx3YXlzXG5cdFx0XHRwZXJmb3JtZWQsIGV2ZW4gaWYgdGhlIGxlbmd0aCBvZiB0aGUgbWVzc2FnZSBpcyBhbHJlYWR5XG5cdFx0XHRjb25ncnVlbnQgdG8gNDQ4LCBtb2R1bG8gNTEyIChpbiB3aGljaCBjYXNlIDUxMiBiaXRzIG9mXG5cdFx0XHRwYWRkaW5nIGFyZSBhZGRlZCkuXG5cblx0XHRcdCBQYWRkaW5nIGlzIHBlcmZvcm1lZCBhcyBmb2xsb3dzOiBhIHNpbmdsZSBcIjFcIiBiaXQgaXNcblx0XHRcdGFwcGVuZGVkIHRvIHRoZSBtZXNzYWdlLCBhbmQgdGhlbiBlbm91Z2ggemVybyBiaXRzIGFyZVxuXHRcdFx0YXBwZW5kZWQgc28gdGhhdCB0aGUgbGVuZ3RoIGluIGJpdHMgb2YgdGhlIHBhZGRlZFxuXHRcdFx0bWVzc2FnZSBiZWNvbWVzIGNvbmdydWVudCB0byA0NDgsIG1vZHVsbyA1MTIuXG5cblx0XHRcdFN0ZXAgMi4gQXBwZW5kIGxlbmd0aFxuXG5cdFx0XHQgQSA2NC1iaXQgcmVwcmVzZW50YXRpb24gb2YgYiAodGhlIGxlbmd0aCBvZiB0aGUgbWVzc2FnZVxuXHRcdFx0YmVmb3JlIHRoZSBwYWRkaW5nIGJpdHMgd2VyZSBhZGRlZCkgaXMgYXBwZW5kZWQgdG8gdGhlXG5cdFx0XHRyZXN1bHQgb2YgdGhlIHByZXZpb3VzIHN0ZXAuIEluIHRoZSB1bmxpa2VseSBldmVudCB0aGF0XG5cdFx0XHRiIGlzIGdyZWF0ZXIgdGhhbiAyXjY0LCB0aGVuIG9ubHkgdGhlIGxvdy1vcmRlciA2NCBiaXRzXG5cdFx0XHRvZiBiIGFyZSB1c2VkLiAoVGhlc2UgYml0cyBhcmUgYXBwZW5kZWQgYXMgdHdvIDMyLWJpdFxuXHRcdFx0d29yZHMgYW5kIGFwcGVuZGVkIGxvdy1vcmRlciB3b3JkIGZpcnN0IGluIGFjY29yZGFuY2Vcblx0XHRcdHdpdGggdGhlIHByZXZpb3VzIGNvbnZlbnRpb25zLilcblxuXHRcdFx0IEF0IHRoaXMgcG9pbnQgdGhlIHJlc3VsdGluZyBtZXNzYWdlIChhZnRlciBwYWRkaW5nIHdpdGhcblx0XHRcdGJpdHMgYW5kIHdpdGggYikgaGFzIGEgbGVuZ3RoIHRoYXQgaXMgYW4gZXhhY3QgbXVsdGlwbGVcblx0XHRcdG9mIDUxMiBiaXRzLiBFcXVpdmFsZW50bHksIHRoaXMgbWVzc2FnZSBoYXMgYSBsZW5ndGhcblx0XHRcdHRoYXQgaXMgYW4gZXhhY3QgbXVsdGlwbGUgb2YgMTYgKDMyLWJpdCkgd29yZHMuIExldFxuXHRcdFx0TVswIC4uLiBOLTFdIGRlbm90ZSB0aGUgd29yZHMgb2YgdGhlIHJlc3VsdGluZyBtZXNzYWdlLFxuXHRcdFx0d2hlcmUgTiBpcyBhIG11bHRpcGxlIG9mIDE2LlxuXHRcdCovXG4gICAgICAgIC8vIGh0dHBzOi8vY3J5cHRvLnN0YWNrZXhjaGFuZ2UuY29tL2EvMzI0MDcvNTQ1NjhcbiAgICAgICAgLypcblx0XHRcdEV4YW1wbGUgY2FzZSAgIyAxXG5cdFx0XHRcdFswIGJpdDogbWVzc2FnZS5dXG5cdFx0XHRcdFsxIGJpdDogMS5dXG5cdFx0XHRcdFs0NDcgYml0czogMC5dXG5cdFx0XHRcdFs2NCBiaXRzOiBtZXNzYWdlIHNpemUgaW5mb3JtYXRpb24uXVxuXG5cdFx0XHRFeGFtcGxlIGNhc2UgICMgMlxuXHRcdFx0XHRbNTEyLWJpdHM6IG1lc3NhZ2VdXG5cdFx0XHRcdFsxIGJpdDogMS5dXG5cdFx0XHRcdFs0NDcgYml0czogMC5dXG5cdFx0XHRcdFs2NCBiaXRzOiBtZXNzYWdlIHNpemUgaW5mb3JtYXRpb24uXVxuXG5cdFx0XHRFeGFtcGxlIGNhc2UgICMgM1xuXHRcdFx0XHRbKDUxMiAtIDY0ID0gNDQ4KSBiaXRzOiBtZXNzYWdlLl1cblx0XHRcdFx0WzEgYml0OiAxLl1cblx0XHRcdFx0WzUxMSBiaXRzOiAwLl1cblx0XHRcdFx0WzY0IGJpdHM6IG1lc3NhZ2Ugc2l6ZSBpbmZvcm1hdGlvbi5dXG5cblx0XHRcdEV4YW1wbGUgY2FzZSAgIyA0XG5cdFx0XHRcdFsoNTEyIC0gNjUgPSA0NDcpIGJpdHM6IG1lc3NhZ2UuXVxuXHRcdFx0XHRbMSBiaXQ6IDEuXVxuXHRcdFx0XHRbMCBiaXQ6IDAuXVxuXHRcdFx0XHRbNjQgYml0czogbWVzc2FnZSBzaXplIGluZm9ybWF0aW9uLl1cblx0XHQqL1xuICAgICAgICAvLyBUaGUgbnVtYmVyIG9mIHBhZGRpbmcgemVybyBiaXRzOlxuICAgICAgICAvLyAgICAgIDUxMSAtIFt7KG1lc3NhZ2Ugc2l6ZSBpbiBiaXRzKSArIDY0fSAobW9kIDUxMildXG4gICAgICAgIHJldHVybiA2NCAtICgobWVzc2FnZV9zaXplICsgOCkgJiAwYjAwMTExMTExIC8qIDYzICovKTtcbiAgICB9XG4gICAgc3RhdGljIHBhZChtZXNzYWdlIC8qIEFuIEFycmF5QnVmZmVyLiAqLylcbiAgICB7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2Vfc2l6ZSA9IG1lc3NhZ2UuYnl0ZUxlbmd0aDtcbiAgICAgICAgY29uc3Qgbl9wYWQgPSBSSVBFTUQxNjAuZ2V0X25fcGFkX2J5dGVzKG1lc3NhZ2Vfc2l6ZSk7XG5cbiAgICAgICAgLy8gIGBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUmAgaXMgKCgyICoqIDUzKSAtIDEpIGFuZFxuICAgICAgICAvLyBiaXR3aXNlIG9wZXJhdGlvbiBpbiBKYXZhc2NyaXB0IGlzIGRvbmUgb24gMzItYml0cyBvcGVyYW5kcy5cbiAgICAgICAgY29uc3QgZGl2bW9kID0gKGRpdmlkZW5kLCBkaXZpc29yKSA9PiBbXG4gICAgICAgICAgICBNYXRoLmZsb29yKGRpdmlkZW5kIC8gZGl2aXNvciksXG4gICAgICAgICAgICBkaXZpZGVuZCAlIGRpdmlzb3JcbiAgICAgICAgXTtcbiAgICAgICAgLypcblRvIHNoaWZ0XG5cbiAgIDAwMDAwMDAwIDAwMD8/Pz8/ID8/Pz8/Pz8/ID8/Pz8/Pz8/ID8/Pz8/Pz8/ID8/Pz8/Pz8/ID8/Pz8/Pz8/ID8/Pz8/Pz8/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdCBvXG4gICAwMDAwMDAwMCA/Pz8/Pz8/PyA/Pz8/Pz8/PyA/Pz8/Pz8/PyA/Pz8/Pz8/PyA/Pz8/Pz8/PyA/Pz8/Pz8/PyA/Pz8/PzAwMFxuXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5NZXRob2QgIzFcblxuICAgIDAwMDAwMDAwIDAwMD8/Pz8/ID8/Pz8/Pz8/ID8/Pz8/Pz8/ICA/Pz8/Pz8/PyA/Pz8/Pz8/PyA/Pz8/Pz8/PyA/Pz8/Pz8/P1xuICAgWzAwMDAwMDAwIDAwMEFBQUFBIEFBQUFBQUFBIEFBQUFBQUFBXSAoPEE+IGNhcHR1cmVkKVxuICAgWzAwMDAwMDAwIEFBQUFBQUFBIEFBQUFBQUFBIEFBQUFBMDAwXSAoPEE+IHNoaWZ0ZWQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgKDxCPiBjYXB0dXJlZCkgW0JCQkJCQkJCIEJCQkJCQkJCIEJCQkJCQkJCIEJCQkJCQkJCXVxuICAgICAgICAgICAgICAgICAgICAgKDxCPiBzaGlmdGVkKSBbQkJCXVtCQkJCQkJCQiBCQkJCQkJCQiBCQkJCQkJCQiBCQkJCQjAwMF1cbiAgIFswMDAwMDAwMCBBQUFBQUFBQSBBQUFBQUFBQSBBQUFBQUJCQl0gKDxBPiAmIDxCXzI+IG1lcmdlZClcbiAgIFswMDAwMDAwMCBBQUFBQUFBQSBBQUFBQUFBQSBBQUFBQUJCQl1bQkJCQkJCQkIgQkJCQkJCQkIgQkJCQkJCQkIgQkJCQkIwMDBdXG4gICAgMDAwMDAwMDAgPz8/Pz8/Pz8gPz8/Pz8/Pz8gPz8/Pz8/Pz8gID8/Pz8/Pz8/ID8/Pz8/Pz8/ID8/Pz8/Pz8/ID8/Pz8/MDAwXG5cblx0XHRjb25zdCB1aW50MzJfbWF4X3BsdXNfMSA9IDB4MTAwMDAwMDAwOyAvLyAoMiAqKiAzMilcblx0XHRjb25zdCBbXG5cdFx0XHRtc2dfYnl0ZV9zaXplX21vc3QsIC8vIFZhbHVlIHJhbmdlIFswLCAoMiAqKiAyMSkgLSAxXS5cblx0XHRcdG1zZ19ieXRlX3NpemVfbGVhc3QgLy8gVmFsdWUgcmFuZ2UgWzAsICgyICoqIDMyKSAtIDFdLlxuXHRcdF0gPSBkaXZtb2QobWVzc2FnZV9zaXplLCB1aW50MzJfbWF4X3BsdXNfMSk7XG5cdFx0Y29uc3QgW1xuXHRcdFx0Y2FycnksIC8vIFZhbHVlIHJhbmdlIFswLCA3XS5cblx0XHRcdG1zZ19iaXRfc2l6ZV9sZWFzdCAvLyBWYWx1ZSByYW5nZSBbMCwgKDIgKiogMzIpIC0gOF0uXG5cdFx0XSA9IGRpdm1vZChtZXNzYWdlX2J5dGVfc2l6ZV9sZWFzdCAqIDgsIHVpbnQzMl9tYXhfcGx1c18xKTtcblx0XHRjb25zdCBtZXNzYWdlX2JpdF9zaXplX21vc3QgPSBtZXNzYWdlX2J5dGVfc2l6ZV9tb3N0ICogOFxuXHRcdFx0KyBjYXJyeTsgLy8gVmFsdWUgcmFuZ2UgWzAsICgyICoqIDI0KSAtIDFdLlxuXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5NZXRob2QgIzJcbiAgICAwMDAwMDAwMCAwMDA/Pz8/PyA/Pz8/Pz8/PyA/Pz8/Pz8/PyAgPz8/Pz8/Pz8gPz8/Pz8/Pz8gPz8/Pz8/Pz8gPz8/Pz8/Pz9cbiAgICAgIFswMDAwMCAwMDBBQUFBQSBBQUFBQUFBQSBBQUFBQUFBQSAgQUFBXSAoPEE+IGNhcHR1cmVkKVxuICAgICAgICAgICAgICAgICAgICAgICAgICg8Qj4gY2FwdHVyZWQpIFswMDBCQkJCQiBCQkJCQkJCQiBCQkJCQkJCQiBCQkJCQkJCQl1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgKDxCPiBzaGlmdGVkKSBbQkJCQkJCQkIgQkJCQkJCQkIgQkJCQkJCQkIgQkJCQkIwMDBdXG4gICBbMDAwMDAwMDAgQUFBQUFBQUEgQUFBQUFBQUEgQUFBQUFBQUFdW0JCQkJCQkJCIEJCQkJCQkJCIEJCQkJCQkJCIEJCQkJCMDAwXVxuICAgIDAwMDAwMDAwID8/Pz8/Pz8/ID8/Pz8/Pz8/ID8/Pz8/Pz8/ICA/Pz8/Pz8/PyA/Pz8/Pz8/PyA/Pz8/Pz8/PyA/Pz8/PzAwMFxuXG5cdFx0Ki9cbiAgICAgICAgY29uc3QgW1xuICAgICAgICAgICAgbXNnX2JpdF9zaXplX21vc3QsXG4gICAgICAgICAgICBtc2dfYml0X3NpemVfbGVhc3RcbiAgICAgICAgXSA9IGRpdm1vZChtZXNzYWdlX3NpemUsIDUzNjg3MDkxMiAvKiAoMiAqKiAyOSkgKi8pXG4gICAgICAgICAgICAubWFwKCh4LCBpbmRleCkgPT4gKGluZGV4ID8gKHggKiA4KSA6IHgpKTtcblxuICAgICAgICAvLyBgQXJyYXlCdWZmZXIudHJhbnNmZXIoKWAgaXMgbm90IHN1cHBvcnRlZC5cbiAgICAgICAgY29uc3QgcGFkZGVkID0gbmV3IFVpbnQ4QXJyYXkobWVzc2FnZV9zaXplICsgbl9wYWQgKyA4KTtcbiAgICAgICAgcGFkZGVkLnNldChuZXcgVWludDhBcnJheShtZXNzYWdlKSwgMCk7XG4gICAgICAgIGNvbnN0IGRhdGFfdmlldyA9IG5ldyBEYXRhVmlldyhwYWRkZWQuYnVmZmVyKTtcbiAgICAgICAgZGF0YV92aWV3LnNldFVpbnQ4KG1lc3NhZ2Vfc2l6ZSwgMGIxMDAwMDAwMCk7XG4gICAgICAgIGRhdGFfdmlldy5zZXRVaW50MzIoXG4gICAgICAgICAgICBtZXNzYWdlX3NpemUgKyBuX3BhZCxcbiAgICAgICAgICAgIG1zZ19iaXRfc2l6ZV9sZWFzdCxcbiAgICAgICAgICAgIHRydWUgLy8gTGl0dGxlLWVuZGlhblxuICAgICAgICApO1xuICAgICAgICBkYXRhX3ZpZXcuc2V0VWludDMyKFxuICAgICAgICAgICAgbWVzc2FnZV9zaXplICsgbl9wYWQgKyA0LFxuICAgICAgICAgICAgbXNnX2JpdF9zaXplX21vc3QsXG4gICAgICAgICAgICB0cnVlIC8vIExpdHRsZS1lbmRpYW5cbiAgICAgICAgKTtcblxuICAgICAgICByZXR1cm4gcGFkZGVkLmJ1ZmZlcjtcbiAgICB9XG5cbiAgICBzdGF0aWMgZihqLCB4LCB5LCB6KVxuICAgIHtcbiAgICAgICAgaWYoMCA8PSBqICYmIGogPD0gMTUpXG4gICAgICAgIHsgLy8gRXhjbHVzaXZlLU9SXG4gICAgICAgICAgICByZXR1cm4geCBeIHkgXiB6O1xuICAgICAgICB9XG4gICAgICAgIGlmKDE2IDw9IGogJiYgaiA8PSAzMSlcbiAgICAgICAgeyAvLyBNdWx0aXBsZXhpbmcgKG11eGluZylcbiAgICAgICAgICAgIHJldHVybiAoeCAmIHkpIHwgKH54ICYgeik7XG4gICAgICAgIH1cbiAgICAgICAgaWYoMzIgPD0gaiAmJiBqIDw9IDQ3KVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gKHggfCB+eSkgXiB6O1xuICAgICAgICB9XG4gICAgICAgIGlmKDQ4IDw9IGogJiYgaiA8PSA2MylcbiAgICAgICAgeyAvLyBNdWx0aXBsZXhpbmcgKG11eGluZylcbiAgICAgICAgICAgIHJldHVybiAoeCAmIHopIHwgKHkgJiB+eik7XG4gICAgICAgIH1cbiAgICAgICAgaWYoNjQgPD0gaiAmJiBqIDw9IDc5KVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4geCBeICh5IHwgfnopO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXRpYyBLKGopXG4gICAge1xuICAgICAgICBpZigwIDw9IGogJiYgaiA8PSAxNSlcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIDB4MDAwMDAwMDA7XG4gICAgICAgIH1cbiAgICAgICAgaWYoMTYgPD0gaiAmJiBqIDw9IDMxKVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyBNYXRoLmZsb29yKCgyICoqIDMwKSAqIE1hdGguU1FSVDIpXG4gICAgICAgICAgICByZXR1cm4gMHg1QTgyNzk5OTtcbiAgICAgICAgfVxuICAgICAgICBpZigzMiA8PSBqICYmIGogPD0gNDcpXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIE1hdGguZmxvb3IoKDIgKiogMzApICogTWF0aC5zcXJ0KDMpKVxuICAgICAgICAgICAgcmV0dXJuIDB4NkVEOUVCQTE7XG4gICAgICAgIH1cbiAgICAgICAgaWYoNDggPD0gaiAmJiBqIDw9IDYzKVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyBNYXRoLmZsb29yKCgyICoqIDMwKSAqIE1hdGguc3FydCg1KSlcbiAgICAgICAgICAgIHJldHVybiAweDhGMUJCQ0RDO1xuICAgICAgICB9XG4gICAgICAgIGlmKDY0IDw9IGogJiYgaiA8PSA3OSlcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gTWF0aC5mbG9vcigoMiAqKiAzMCkgKiBNYXRoLnNxcnQoNykpXG4gICAgICAgICAgICByZXR1cm4gMHhBOTUzRkQ0RTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGF0aWMgS1AoaikgLy8gSydcbiAgICB7XG4gICAgICAgIGlmKDAgPD0gaiAmJiBqIDw9IDE1KVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyBNYXRoLmZsb29yKCgyICoqIDMwKSAqIE1hdGguY2JydCgyKSlcbiAgICAgICAgICAgIHJldHVybiAweDUwQTI4QkU2O1xuICAgICAgICB9XG4gICAgICAgIGlmKDE2IDw9IGogJiYgaiA8PSAzMSlcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gTWF0aC5mbG9vcigoMiAqKiAzMCkgKiBNYXRoLmNicnQoMykpXG4gICAgICAgICAgICByZXR1cm4gMHg1QzRERDEyNDtcbiAgICAgICAgfVxuICAgICAgICBpZigzMiA8PSBqICYmIGogPD0gNDcpXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIE1hdGguZmxvb3IoKDIgKiogMzApICogTWF0aC5jYnJ0KDUpKVxuICAgICAgICAgICAgcmV0dXJuIDB4NkQ3MDNFRjM7XG4gICAgICAgIH1cbiAgICAgICAgaWYoNDggPD0gaiAmJiBqIDw9IDYzKVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyBNYXRoLmZsb29yKCgyICoqIDMwKSAqIE1hdGguY2JydCg3KSlcbiAgICAgICAgICAgIHJldHVybiAweDdBNkQ3NkU5O1xuICAgICAgICB9XG4gICAgICAgIGlmKDY0IDw9IGogJiYgaiA8PSA3OSlcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIDB4MDAwMDAwMDA7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhdGljIGFkZF9tb2R1bG8zMigvKiAuLi4uLi4gKi8pXG4gICAge1xuICAgICAgICAvLyAxLiAgTW9kdWxvIGFkZGl0aW9uIChhZGRpdGlvbiBtb2R1bG8pIGlzIGFzc29jaWF0aXZlLlxuICAgICAgICAvLyAgICBodHRwczovL3Byb29md2lraS5vcmcvd2lraS9Nb2R1bG9fQWRkaXRpb25faXNfQXNzb2NpYXRpdmVcbiBcdFx0Ly8gMi4gIEJpdHdpc2Ugb3BlcmF0aW9uIGluIEphdmFzY3JpcHRcbiAgICAgICAgLy8gICAgaXMgZG9uZSBvbiAzMi1iaXRzIG9wZXJhbmRzXG4gICAgICAgIC8vICAgIGFuZCByZXN1bHRzIGluIGEgMzItYml0cyB2YWx1ZS5cbiAgICAgICAgcmV0dXJuIEFycmF5XG4gICAgICAgICAgICAuZnJvbShhcmd1bWVudHMpXG4gICAgICAgICAgICAucmVkdWNlKChhLCBiKSA9PiAoYSArIGIpLCAwKSB8IDA7XG4gICAgfVxuICAgIHN0YXRpYyByb2wzMih2YWx1ZSwgY291bnQpXG4gICAgeyAvLyBDeWNsaWMgbGVmdCBzaGlmdCAocm90YXRlKSBvbiAzMi1iaXRzIHZhbHVlLlxuICAgICAgICByZXR1cm4gKHZhbHVlIDw8IGNvdW50KSB8ICh2YWx1ZSA+Pj4gKDMyIC0gY291bnQpKTtcbiAgICB9XG4gICAgc3RhdGljIGhhc2gobWVzc2FnZSAvKiBBbiBBcnJheUJ1ZmZlci4gKi8pXG4gICAge1xuICAgICAgICAvLyAvLy8vLy8vLyAgICAgICBQYWRkaW5nICAgICAgIC8vLy8vLy8vLy9cblxuICAgICAgICAvLyBUaGUgcGFkZGVkIG1lc3NhZ2UuXG4gICAgICAgIGNvbnN0IHBhZGRlZCA9IFJJUEVNRDE2MC5wYWQobWVzc2FnZSk7XG5cbiAgICAgICAgLy8gLy8vLy8vLy8gICAgIENvbXByZXNzaW9uICAgICAvLy8vLy8vLy8vXG5cbiAgICAgICAgLy8gTWVzc2FnZSB3b3JkIHNlbGVjdG9ycy5cbiAgICAgICAgY29uc3QgciA9IFtcbiAgICAgICAgICAgIDAsIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwLCAxMSwgMTIsIDEzLCAxNCwgMTUsXG4gICAgICAgICAgICA3LCA0LCAxMywgMSwgMTAsIDYsIDE1LCAzLCAxMiwgMCwgOSwgNSwgMiwgMTQsIDExLCA4LFxuICAgICAgICAgICAgMywgMTAsIDE0LCA0LCA5LCAxNSwgOCwgMSwgMiwgNywgMCwgNiwgMTMsIDExLCA1LCAxMixcbiAgICAgICAgICAgIDEsIDksIDExLCAxMCwgMCwgOCwgMTIsIDQsIDEzLCAzLCA3LCAxNSwgMTQsIDUsIDYsIDIsXG4gICAgICAgICAgICA0LCAwLCA1LCA5LCA3LCAxMiwgMiwgMTAsIDE0LCAxLCAzLCA4LCAxMSwgNiwgMTUsIDEzXG4gICAgICAgIF07XG4gICAgICAgIGNvbnN0IHJQID0gWyAvLyByJ1xuICAgICAgICAgICAgNSwgMTQsIDcsIDAsIDksIDIsIDExLCA0LCAxMywgNiwgMTUsIDgsIDEsIDEwLCAzLCAxMixcbiAgICAgICAgICAgIDYsIDExLCAzLCA3LCAwLCAxMywgNSwgMTAsIDE0LCAxNSwgOCwgMTIsIDQsIDksIDEsIDIsXG4gICAgICAgICAgICAxNSwgNSwgMSwgMywgNywgMTQsIDYsIDksIDExLCA4LCAxMiwgMiwgMTAsIDAsIDQsIDEzLFxuICAgICAgICAgICAgOCwgNiwgNCwgMSwgMywgMTEsIDE1LCAwLCA1LCAxMiwgMiwgMTMsIDksIDcsIDEwLCAxNCxcbiAgICAgICAgICAgIDEyLCAxNSwgMTAsIDQsIDEsIDUsIDgsIDcsIDYsIDIsIDEzLCAxNCwgMCwgMywgOSwgMTFcbiAgICAgICAgXTtcblxuICAgICAgICAvLyBBbW91bnRzIGZvciAncm90YXRlIGxlZnQnIG9wZXJhdGlvbi5cbiAgICAgICAgY29uc3QgcyA9IFtcbiAgICAgICAgICAgIDExLCAxNCwgMTUsIDEyLCA1LCA4LCA3LCA5LCAxMSwgMTMsIDE0LCAxNSwgNiwgNywgOSwgOCxcbiAgICAgICAgICAgIDcsIDYsIDgsIDEzLCAxMSwgOSwgNywgMTUsIDcsIDEyLCAxNSwgOSwgMTEsIDcsIDEzLCAxMixcbiAgICAgICAgICAgIDExLCAxMywgNiwgNywgMTQsIDksIDEzLCAxNSwgMTQsIDgsIDEzLCA2LCA1LCAxMiwgNywgNSxcbiAgICAgICAgICAgIDExLCAxMiwgMTQsIDE1LCAxNCwgMTUsIDksIDgsIDksIDE0LCA1LCA2LCA4LCA2LCA1LCAxMixcbiAgICAgICAgICAgIDksIDE1LCA1LCAxMSwgNiwgOCwgMTMsIDEyLCA1LCAxMiwgMTMsIDE0LCAxMSwgOCwgNSwgNlxuICAgICAgICBdO1xuICAgICAgICBjb25zdCBzUCA9IFsgLy8gcydcbiAgICAgICAgICAgIDgsIDksIDksIDExLCAxMywgMTUsIDE1LCA1LCA3LCA3LCA4LCAxMSwgMTQsIDE0LCAxMiwgNixcbiAgICAgICAgICAgIDksIDEzLCAxNSwgNywgMTIsIDgsIDksIDExLCA3LCA3LCAxMiwgNywgNiwgMTUsIDEzLCAxMSxcbiAgICAgICAgICAgIDksIDcsIDE1LCAxMSwgOCwgNiwgNiwgMTQsIDEyLCAxMywgNSwgMTQsIDEzLCAxMywgNywgNSxcbiAgICAgICAgICAgIDE1LCA1LCA4LCAxMSwgMTQsIDE0LCA2LCAxNCwgNiwgOSwgMTIsIDksIDEyLCA1LCAxNSwgOCxcbiAgICAgICAgICAgIDgsIDUsIDEyLCA5LCAxMiwgNSwgMTQsIDYsIDgsIDEzLCA2LCA1LCAxNSwgMTMsIDExLCAxMVxuICAgICAgICBdO1xuXG4gICAgICAgIC8vIFRoZSBzaXplLCBpbiBieXRlcywgb2YgYSB3b3JkLlxuICAgICAgICBjb25zdCB3b3JkX3NpemUgPSA0O1xuXG4gICAgICAgIC8vIFRoZSBzaXplLCBpbiBieXRlcywgb2YgYSAxNi13b3JkcyBibG9jay5cbiAgICAgICAgY29uc3QgYmxvY2tfc2l6ZSA9IDY0O1xuXG4gICAgICAgIC8vIFRoZSBudW1iZXIgb2YgdGhlIDE2LXdvcmRzIGJsb2Nrcy5cbiAgICAgICAgY29uc3QgdCA9IHBhZGRlZC5ieXRlTGVuZ3RoIC8gYmxvY2tfc2l6ZTtcblxuICAgICAgICAvLyAgVGhlIG1lc3NhZ2UgYWZ0ZXIgcGFkZGluZyBjb25zaXN0cyBvZiB0IDE2LXdvcmQgYmxvY2tzIHRoYXRcbiAgICAgICAgLy8gYXJlIGRlbm90ZWQgd2l0aCBYX2lbal0sIHdpdGggMOKJpGniiaQodCDiiJIgMSkgYW5kIDDiiaRq4omkMTUuXG4gICAgICAgIGNvbnN0IFggPSAobmV3IEFycmF5KHQpKVxuICAgICAgICAgICAgLmZpbGwodW5kZWZpbmVkKVxuICAgICAgICAgICAgLm1hcCgoXywgaSkgPT4gaiA9PiAoXG4gICAgICAgICAgICAgICAgbmV3IERhdGFWaWV3KFxuICAgICAgICAgICAgICAgICAgICBwYWRkZWQsIGkgKiBibG9ja19zaXplLCBibG9ja19zaXplXG4gICAgICAgICAgICAgICAgKS5nZXRVaW50MzIoXG4gICAgICAgICAgICAgICAgICAgIGogKiB3b3JkX3NpemUsXG4gICAgICAgICAgICAgICAgICAgIHRydWUgLy8gTGl0dGxlLWVuZGlhblxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICkpO1xuXG4gICAgICAgIC8vICBUaGUgcmVzdWx0IG9mIFJJUEVNRC0xNjAgaXMgY29udGFpbmVkIGluIGZpdmUgMzItYml0IHdvcmRzLFxuICAgICAgICAvLyB3aGljaCBmb3JtIHRoZSBpbnRlcm5hbCBzdGF0ZSBvZiB0aGUgYWxnb3JpdGhtLiBUaGUgZmluYWxcbiAgICAgICAgLy8gY29udGVudCBvZiB0aGVzZSBmaXZlIDMyLWJpdCB3b3JkcyBpcyBjb252ZXJ0ZWQgdG8gYSAxNjAtYml0XG4gICAgICAgIC8vIHN0cmluZywgYWdhaW4gdXNpbmcgdGhlIGxpdHRsZS1lbmRpYW4gY29udmVudGlvbi5cbiAgICAgICAgY29uc3QgaCA9IFtcbiAgICAgICAgICAgIDB4Njc0NTIzMDEsIC8vIGhfMFxuICAgICAgICAgICAgMHhFRkNEQUI4OSwgLy8gaF8xXG4gICAgICAgICAgICAweDk4QkFEQ0ZFLCAvLyBoXzJcbiAgICAgICAgICAgIDB4MTAzMjU0NzYsIC8vIGhfM1xuICAgICAgICAgICAgMHhDM0QyRTFGMCAgLy8gaF80XG4gICAgICAgIF07XG5cbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHQ7ICsraSlcbiAgICAgICAge1xuICAgICAgICAgICAgbGV0IEEgPSBoWzBdOyBsZXQgQiA9IGhbMV07IGxldCBDID0gaFsyXTsgbGV0IEQgPSBoWzNdOyBsZXQgRSA9IGhbNF07XG4gICAgICAgICAgICBsZXQgQVAgPSBBOyBsZXQgQlAgPSBCOyBsZXQgQ1AgPSBDOyBsZXQgRFAgPSBEOyBsZXQgRVAgPSBFO1xuICAgICAgICAgICAgZm9yKGxldCBqID0gMDsgaiA8IDgwOyArK2opXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgLy8gTGVmdCByb3VuZHNcbiAgICAgICAgICAgICAgICBsZXQgVCA9IFJJUEVNRDE2MC5hZGRfbW9kdWxvMzIoIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tc2hhZG93XG4gICAgICAgICAgICAgICAgICAgIFJJUEVNRDE2MC5yb2wzMihcbiAgICAgICAgICAgICAgICAgICAgICAgIFJJUEVNRDE2MC5hZGRfbW9kdWxvMzIoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSSVBFTUQxNjAuZihqLCBCLCBDLCBEKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBYW2ldKHJbal0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJJUEVNRDE2MC5LKGopXG4gICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgc1tqXVxuICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICBFXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBBID0gRTtcbiAgICAgICAgICAgICAgICBFID0gRDtcbiAgICAgICAgICAgICAgICBEID0gUklQRU1EMTYwLnJvbDMyKEMsIDEwKTtcbiAgICAgICAgICAgICAgICBDID0gQjtcbiAgICAgICAgICAgICAgICBCID0gVDtcblxuICAgICAgICAgICAgICAgIC8vIFJpZ2h0IHJvdW5kc1xuICAgICAgICAgICAgICAgIFQgPSBSSVBFTUQxNjAuYWRkX21vZHVsbzMyKFxuICAgICAgICAgICAgICAgICAgICBSSVBFTUQxNjAucm9sMzIoXG4gICAgICAgICAgICAgICAgICAgICAgICBSSVBFTUQxNjAuYWRkX21vZHVsbzMyKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFQLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJJUEVNRDE2MC5mKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA3OSAtIGosXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEJQLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDUCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRFBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFhbaV0oclBbal0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJJUEVNRDE2MC5LUChqKVxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNQW2pdXG4gICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgIEVQXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBBUCA9IEVQO1xuICAgICAgICAgICAgICAgIEVQID0gRFA7XG4gICAgICAgICAgICAgICAgRFAgPSBSSVBFTUQxNjAucm9sMzIoQ1AsIDEwKTtcbiAgICAgICAgICAgICAgICBDUCA9IEJQO1xuICAgICAgICAgICAgICAgIEJQID0gVDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IFQgPSBSSVBFTUQxNjAuYWRkX21vZHVsbzMyKGhbMV0sIEMsIERQKTtcbiAgICAgICAgICAgIGhbMV0gPSBSSVBFTUQxNjAuYWRkX21vZHVsbzMyKGhbMl0sIEQsIEVQKTtcbiAgICAgICAgICAgIGhbMl0gPSBSSVBFTUQxNjAuYWRkX21vZHVsbzMyKGhbM10sIEUsIEFQKTtcbiAgICAgICAgICAgIGhbM10gPSBSSVBFTUQxNjAuYWRkX21vZHVsbzMyKGhbNF0sIEEsIEJQKTtcbiAgICAgICAgICAgIGhbNF0gPSBSSVBFTUQxNjAuYWRkX21vZHVsbzMyKGhbMF0sIEIsIENQKTtcbiAgICAgICAgICAgIGhbMF0gPSBUO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gIFRoZSBmaW5hbCBvdXRwdXQgc3RyaW5nIHRoZW4gY29uc2lzdHMgb2YgdGhlIGNvbmNhdGVuYXRhdGlvblxuICAgICAgICAvLyBvZiBoXzAsIGhfMSwgaF8yLCBoXzMsIGFuZCBoXzQgYWZ0ZXIgY29udmVydGluZyBlYWNoIGhfaSB0byBhXG4gICAgICAgIC8vIDQtYnl0ZSBzdHJpbmcgdXNpbmcgdGhlIGxpdHRsZS1lbmRpYW4gY29udmVudGlvbi5cbiAgICAgICAgY29uc3QgcmVzdWx0ID0gbmV3IEFycmF5QnVmZmVyKDIwKTtcbiAgICAgICAgY29uc3QgZGF0YV92aWV3ID0gbmV3IERhdGFWaWV3KHJlc3VsdCk7XG4gICAgICAgIGguZm9yRWFjaCgoaF9pLCBpKSA9PiBkYXRhX3ZpZXcuc2V0VWludDMyKGkgKiA0LCBoX2ksIHRydWUpKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIFJJUEVNRDE2MFxufTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdGxvYWRlZDogZmFsc2UsXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuXHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5ubWQgPSAobW9kdWxlKSA9PiB7XG5cdG1vZHVsZS5wYXRocyA9IFtdO1xuXHRpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XG5cdHJldHVybiBtb2R1bGU7XG59OyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcImVvc2pzX2FwaVwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IChjaHVua0lkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwKTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWVdID0gZGF0YTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKChpZCkgPT4gKGluc3RhbGxlZENodW5rc1tpZF0gIT09IDApKSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtlb3Nqc1wiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtlb3Nqc1wiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1wiZXh0ZXJuYWxzXCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2Vvc2pzLWFwaS50c1wiKSkpXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9