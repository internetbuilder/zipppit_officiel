"use strict";
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
var tests = require('./node');
describe('Node JS environment', function () {
    var transactionResponse;
    var transactionSignatures;
    var failedAsPlanned;
    it('transacts with configuration object containing blocksBehind', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, tests.transactWithConfig({
                        blocksBehind: 3,
                        expireSeconds: 30
                    }, 'transactWithBlocksBehind')];
                case 1:
                    transactionResponse = _a.sent();
                    expect(Object.keys(transactionResponse)).toContain('transaction_id');
                    return [2 /*return*/];
            }
        });
    }); });
    it('transacts with configuration object containing useLastIrreversible', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, tests.transactWithConfig({
                        useLastIrreversible: true,
                        expireSeconds: 30
                    }, 'transactWithUseLastIrreversible')];
                case 1:
                    transactionResponse = _a.sent();
                    expect(Object.keys(transactionResponse)).toContain('transaction_id');
                    return [2 /*return*/];
            }
        });
    }); });
    it('transacts with manually configured TAPOS fields', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (process.env.NODEOS_VER && process.env.NODEOS_VER === 'release/2.0.x')
                        return [2 /*return*/];
                    return [4 /*yield*/, tests.transactWithoutConfig()];
                case 1:
                    transactionResponse = _a.sent();
                    expect(Object.keys(transactionResponse)).toContain('transaction_id');
                    return [2 /*return*/];
            }
        });
    }); }, 10000);
    it('transacts with compressed transaction', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, tests.transactWithConfig({
                        blocksBehind: 3,
                        expireSeconds: 30,
                        compression: true
                    }, 'transactWithCompression')];
                case 1:
                    transactionResponse = _a.sent();
                    expect(Object.keys(transactionResponse)).toContain('transaction_id');
                    return [2 /*return*/];
            }
        });
    }); });
    it('transacts with context free action', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, tests.transactWithContextFreeAction()];
                case 1:
                    transactionResponse = _a.sent();
                    expect(Object.keys(transactionResponse)).toContain('transaction_id');
                    return [2 /*return*/];
            }
        });
    }); });
    it('transacts with context free data', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, tests.transactWithContextFreeData()];
                case 1:
                    transactionResponse = _a.sent();
                    expect(Object.keys(transactionResponse)).toContain('transaction_id');
                    return [2 /*return*/];
            }
        });
    }); });
    it('transacts without broadcasting, returning signatures and packed transaction', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, tests.transactWithConfig({
                        broadcast: false,
                        blocksBehind: 3,
                        expireSeconds: 30
                    }, 'transactWithoutBroadcast')];
                case 1:
                    transactionSignatures = _a.sent();
                    expect(Object.keys(transactionSignatures)).toContain('signatures');
                    expect(Object.keys(transactionSignatures)).toContain('serializedTransaction');
                    return [2 /*return*/];
            }
        });
    }); });
    it('broadcasts packed transaction, given valid signatures', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, tests.transactWithConfig({
                        broadcast: false,
                        blocksBehind: 3,
                        expireSeconds: 30
                    }, 'transactWithoutBroadcast2')];
                case 1:
                    transactionSignatures = _a.sent();
                    return [4 /*yield*/, tests.broadcastResult(transactionSignatures)];
                case 2:
                    transactionResponse = _a.sent();
                    expect(Object.keys(transactionResponse)).toContain('transaction_id');
                    return [2 /*return*/];
            }
        });
    }); });
    describe('Json Abi with Shorthand Design', function () {
        it('transacts with shorthand structure using api', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, tests.transactWithShorthandApiJson()];
                    case 1:
                        transactionResponse = _a.sent();
                        expect(Object.keys(transactionResponse)).toContain('transaction_id');
                        return [2 /*return*/];
                }
            });
        }); });
        it('transacts with shorthand structure using tx', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, tests.transactWithShorthandTxJson()];
                    case 1:
                        transactionResponse = _a.sent();
                        expect(Object.keys(transactionResponse)).toContain('transaction_id');
                        return [2 /*return*/];
                }
            });
        }); });
        it('transacts with shorthand structure using tx and context free action', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, tests.transactWithShorthandTxJsonContextFreeAction()];
                    case 1:
                        transactionResponse = _a.sent();
                        expect(Object.keys(transactionResponse)).toContain('transaction_id');
                        return [2 /*return*/];
                }
            });
        }); });
        it('transacts with shorthand structure using tx and context free data', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, tests.transactWithShorthandTxJsonContextFreeData()];
                    case 1:
                        transactionResponse = _a.sent();
                        expect(Object.keys(transactionResponse)).toContain('transaction_id');
                        return [2 /*return*/];
                }
            });
        }); });
    });
    it('transacts with elliptic p256/KeyType.R1 keys and signatures', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, tests.transactWithConfig({
                        blocksBehind: 3,
                        expireSeconds: 30
                    }, 'transactWithR1KeySignature', 'bobr1', 'alicer1')];
                case 1:
                    transactionResponse = _a.sent();
                    expect(Object.keys(transactionResponse)).toContain('transaction_id');
                    return [2 /*return*/];
            }
        });
    }); });
    it('confirms an action\'s return value can be verified', function () { return __awaiter(void 0, void 0, void 0, function () {
        var expectedValue;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (process.env.NODEOS_VER && process.env.NODEOS_VER === 'release/2.0.x')
                        return [2 /*return*/];
                    expectedValue = 10;
                    return [4 /*yield*/, tests.transactWithReturnValue()];
                case 1:
                    transactionResponse = _a.sent();
                    expect(transactionResponse.processed.action_traces[0].return_value_data).toEqual(expectedValue);
                    return [2 /*return*/];
            }
        });
    }); });
    it('transacts with resource payer', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (process.env.NODEOS_VER && (process.env.NODEOS_VER === 'release/2.0.x' || process.env.NODEOS_VER === 'release/2.1.x'))
                        return [2 /*return*/];
                    return [4 /*yield*/, tests.transactWithResourcePayer()];
                case 1:
                    transactionResponse = _a.sent();
                    expect(Object.keys(transactionResponse)).toContain('transaction_id');
                    return [2 /*return*/];
            }
        });
    }); });
    it('confirms the return value of the read-only query', function () { return __awaiter(void 0, void 0, void 0, function () {
        var expectedValue;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (process.env.NODEOS_VER && (process.env.NODEOS_VER === 'release/2.0.x' || process.env.NODEOS_VER === 'release/2.1.x'))
                        return [2 /*return*/];
                    expectedValue = [
                        { 'age': 25, 'gender': 1, 'id': 1, 'name': 'Bob Smith' },
                        { 'age': 42, 'gender': 1, 'id': 3, 'name': 'John Smith' },
                        { 'age': 27, 'gender': 1, 'id': 4, 'name': 'Jack Smith' },
                        { 'age': 20, 'gender': 0, 'id': 2, 'name': 'Alice Smith' },
                        { 'age': 26, 'gender': 0, 'id': 5, 'name': 'Youko Niihara' },
                        { 'age': 18, 'gender': 0, 'id': 6, 'name': 'Rose Lee' },
                        { 'age': 25, 'gender': 0, 'id': 7, 'name': 'Youko Kawakami' },
                        { 'age': 24, 'gender': 0, 'id': 8, 'name': 'Yuu Yamada' }
                    ];
                    return [4 /*yield*/, tests.readOnlyQuery()];
                case 1:
                    transactionResponse = _a.sent();
                    expect(transactionResponse.result.action_traces[0].return_value_data).toEqual(expectedValue);
                    return [2 /*return*/];
            }
        });
    }); });
    it('returns failure trace for failed transaction', function () { return __awaiter(void 0, void 0, void 0, function () {
        var e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (process.env.NODEOS_VER && (process.env.NODEOS_VER === 'release/2.0.x' || process.env.NODEOS_VER === 'release/2.1.x'))
                        return [2 /*return*/];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, tests.readOnlyFailureTrace()];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    expect(e_1.details.code).toEqual(3090004);
                    expect(e_1.details.stack[0].format).toEqual('missing authority of ${account}');
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    it('throws appropriate error message without configuration object or TAPOS in place', function () { return __awaiter(void 0, void 0, void 0, function () {
        var e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    failedAsPlanned = true;
                    return [4 /*yield*/, tests.transactShouldFail()];
                case 1:
                    _a.sent();
                    failedAsPlanned = false;
                    return [3 /*break*/, 3];
                case 2:
                    e_2 = _a.sent();
                    if (e_2.message !== 'Required configuration or TAPOS fields are not present') {
                        failedAsPlanned = false;
                    }
                    return [3 /*break*/, 3];
                case 3:
                    expect(failedAsPlanned).toEqual(true);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws an an error with RpcError structure for invalid RPC calls', function () { return __awaiter(void 0, void 0, void 0, function () {
        var e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    failedAsPlanned = true;
                    return [4 /*yield*/, tests.rpcShouldFail()];
                case 1:
                    _a.sent();
                    failedAsPlanned = false;
                    return [3 /*break*/, 3];
                case 2:
                    e_3 = _a.sent();
                    if (!e_3.json || !e_3.json.error || !(e_3.json.error.hasOwnProperty('details'))) {
                        failedAsPlanned = false;
                    }
                    return [3 /*break*/, 3];
                case 3:
                    expect(failedAsPlanned).toEqual(true);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=node.test.js.map