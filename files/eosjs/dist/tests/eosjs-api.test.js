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
Object.defineProperty(exports, "__esModule", { value: true });
var _a = require('util'), TextEncoder = _a.TextEncoder, TextDecoder = _a.TextDecoder;
var eosjs_api_1 = require("../eosjs-api");
var eosjs_jsonrpc_1 = require("../eosjs-jsonrpc");
var eosjs_jssig_1 = require("../eosjs-jssig");
var eosjs_numeric_1 = require("../eosjs-numeric");
var transaction = {
    expiration: '2018-09-04T18:42:49',
    ref_block_num: 38096,
    ref_block_prefix: 505360011,
    max_net_usage_words: 0,
    max_cpu_usage_ms: 0,
    delay_sec: 0,
    context_free_actions: [],
    actions: [
        {
            account: 'testeostoken',
            name: 'transfer',
            authorization: [
                {
                    actor: 'thegazelle',
                    permission: 'active',
                },
            ],
            data: {
                from: 'thegazelle',
                to: 'remasteryoda',
                quantity: '1.0000 EOS',
                memo: 'For a secure future.',
            },
            hex_data: "00808a517dc354cb6012f557656ca4ba102700000000000004454f530000000014466f722\n        06120736563757265206675747572652e",
        },
        {
            account: 'testeostoken',
            name: 'transfer',
            authorization: [
                {
                    actor: 'thegazelle',
                    permission: 'active',
                },
            ],
            data: {
                from: 'thegazelle',
                to: 'remasteryoda',
                quantity: '2.0000 EOS',
                memo: 'For a second secure future (multiverse?)',
            },
            hex_data: "00808a517dc354cb6012f557656ca4ba204e00000000000004454f530000000028466f722061207365636f6e642073656\n        37572652066757475726520286d756c746976657273653f29",
        },
    ],
    transaction_extensions: [],
};
var serializedTx = [
    41, 210, 142, 91, 208, 148, 139, 46, 31, 30, 0, 0, 0, 0, 2, 48, 21, 164,
    25, 83, 149, 177, 202, 0, 0, 0, 87, 45, 60, 205, 205, 1, 0, 128, 138, 81,
    125, 195, 84, 203, 0, 0, 0, 0, 168, 237, 50, 50, 0, 48, 21, 164, 25, 83,
    149, 177, 202, 0, 0, 0, 87, 45, 60, 205, 205, 1, 0, 128, 138, 81, 125,
    195, 84, 203, 0, 0, 0, 0, 168, 237, 50, 50, 0, 0,
];
var deserializedTx = {
    actions: [
        {
            account: 'testeostoken',
            authorization: [{ actor: 'thegazelle', permission: 'active' }],
            data: '',
            name: 'transfer',
        },
        {
            account: 'testeostoken',
            authorization: [{ actor: 'thegazelle', permission: 'active' }],
            data: '',
            name: 'transfer',
        },
    ],
    context_free_actions: [],
    delay_sec: 0,
    expiration: '2018-09-04T18:42:49.000',
    max_cpu_usage_ms: 0,
    max_net_usage_words: 0,
    ref_block_num: 38096,
    ref_block_prefix: 505360011,
    transaction_extensions: [],
};
var serializedActions = [
    {
        account: 'testeostoken',
        authorization: [{ actor: 'thegazelle', permission: 'active' }],
        data: '00808A517DC354CB6012F557656CA4BA102700000000000004454F530000000014466F72206120736563757265206675747572652E',
        name: 'transfer',
    },
    {
        account: 'testeostoken',
        authorization: [{ actor: 'thegazelle', permission: 'active' }],
        data: '00808A517DC354CB6012F557656CA4BA204E00000000000004454F530000000028466F722061207365636F6E64207365637572652066757475726520286D756C746976657273653F29',
        name: 'transfer',
    },
];
var deserializedActions = [
    {
        account: 'testeostoken',
        authorization: [{ actor: 'thegazelle', permission: 'active' }],
        data: {
            from: 'thegazelle',
            memo: 'For a secure future.',
            quantity: '1.0000 EOS',
            to: 'remasteryoda',
        },
        name: 'transfer',
    },
    {
        account: 'testeostoken',
        authorization: [{ actor: 'thegazelle', permission: 'active' }],
        data: {
            from: 'thegazelle',
            memo: 'For a second secure future (multiverse?)',
            quantity: '2.0000 EOS',
            to: 'remasteryoda',
        },
        name: 'transfer',
    },
];
describe('eosjs-api', function () {
    var api;
    var rpc;
    var fetch = function (input, init) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, ({
                    ok: true,
                    json: function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            if (input === '/v1/chain/get_raw_abi') {
                                return [2 /*return*/, {
                                        account_name: 'testeostoken',
                                        abi: 'DmVvc2lvOjphYmkvMS4wAQxhY2NvdW50X25hbWUEbmFtZQUIdHJhbnNmZXIABARmcm9tDGFjY291bnRfbmFtZQJ0bwxhY2NvdW50X25hbWUIcXVhbnRpdHkFYXNzZXQEbWVtbwZzdHJpbmcGY3JlYXRlAAIGaXNzdWVyDGFjY291bnRfbmFtZQ5tYXhpbXVtX3N1cHBseQVhc3NldAVpc3N1ZQADAnRvDGFjY291bnRfbmFtZQhxdWFudGl0eQVhc3NldARtZW1vBnN0cmluZwdhY2NvdW50AAEHYmFsYW5jZQVhc3NldA5jdXJyZW5jeV9zdGF0cwADBnN1cHBseQVhc3NldAptYXhfc3VwcGx5BWFzc2V0Bmlzc3VlcgxhY2NvdW50X25hbWUDAAAAVy08zc0IdHJhbnNmZXLnBSMjIFRyYW5zZmVyIFRlcm1zICYgQ29uZGl0aW9ucwoKSSwge3tmcm9tfX0sIGNlcnRpZnkgdGhlIGZvbGxvd2luZyB0byBiZSB0cnVlIHRvIHRoZSBiZXN0IG9mIG15IGtub3dsZWRnZToKCjEuIEkgY2VydGlmeSB0aGF0IHt7cXVhbnRpdHl9fSBpcyBub3QgdGhlIHByb2NlZWRzIG9mIGZyYXVkdWxlbnQgb3IgdmlvbGVudCBhY3Rpdml0aWVzLgoyLiBJIGNlcnRpZnkgdGhhdCwgdG8gdGhlIGJlc3Qgb2YgbXkga25vd2xlZGdlLCB7e3RvfX0gaXMgbm90IHN1cHBvcnRpbmcgaW5pdGlhdGlvbiBvZiB2aW9sZW5jZSBhZ2FpbnN0IG90aGVycy4KMy4gSSBoYXZlIGRpc2Nsb3NlZCBhbnkgY29udHJhY3R1YWwgdGVybXMgJiBjb25kaXRpb25zIHdpdGggcmVzcGVjdCB0byB7e3F1YW50aXR5fX0gdG8ge3t0b319LgoKSSB1bmRlcnN0YW5kIHRoYXQgZnVuZHMgdHJhbnNmZXJzIGFyZSBub3QgcmV2ZXJzaWJsZSBhZnRlciB0aGUge3t0cmFuc2FjdGlvbi5kZWxheX19IHNlY29uZHMgb3Igb3RoZXIgZGVsYXkgYXMgY29uZmlndXJlZCBieSB7e2Zyb219fSdzIHBlcm1pc3Npb25zLgoKSWYgdGhpcyBhY3Rpb24gZmFpbHMgdG8gYmUgaXJyZXZlcnNpYmx5IGNvbmZpcm1lZCBhZnRlciByZWNlaXZpbmcgZ29vZHMgb3Igc2VydmljZXMgZnJvbSAne3t0b319JywgSSBhZ3JlZSB0byBlaXRoZXIgcmV0dXJuIHRoZSBnb29kcyBvciBzZXJ2aWNlcyBvciByZXNlbmQge3txdWFudGl0eX19IGluIGEgdGltZWx5IG1hbm5lci4KAAAAAAClMXYFaXNzdWUAAAAAAKhs1EUGY3JlYXRlAAIAAAA4T00RMgNpNjQBCGN1cnJlbmN5AQZ1aW50NjQHYWNjb3VudAAAAAAAkE3GA2k2NAEIY3VycmVuY3kBBnVpbnQ2NA5jdXJyZW5jeV9zdGF0cwAAAA===', // eslint-disable-line
                                    }];
                            }
                            return [2 /*return*/, transaction];
                        });
                    }); },
                })];
        });
    }); };
    beforeEach(function () {
        rpc = new eosjs_jsonrpc_1.JsonRpc('', { fetch: fetch });
        var signatureProvider = new eosjs_jssig_1.JsSignatureProvider(['5JtUScZK2XEp3g9gh7F8bwtPTRAkASmNrrftmx4AxDKD5K4zDnr']);
        var chainId = '038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca';
        api = new eosjs_api_1.Api({
            rpc: rpc,
            signatureProvider: signatureProvider,
            chainId: chainId,
            textDecoder: new TextDecoder(),
            textEncoder: new TextEncoder()
        });
    });
    it('Doesnt crash', function () {
        expect(api).toBeTruthy();
    });
    it('getAbi returns an abi', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, api.getAbi('testeostoken')];
                case 1:
                    response = _a.sent();
                    expect(response).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
    it('getTransactionAbis returns abis by transactions', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, api.getTransactionAbis(transaction)];
                case 1:
                    response = _a.sent();
                    expect(response[0].abi.length).toBeGreaterThan(0);
                    return [2 /*return*/];
            }
        });
    }); });
    it('getContract returns a contract', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, api.getContract('testeostoken')];
                case 1:
                    response = _a.sent();
                    expect(response.actions).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
    it('deserializeTransaction converts tx from binary', function () {
        var tx = api.deserializeTransaction(serializedTx);
        expect(tx).toEqual(deserializedTx);
    });
    it('serializeActions converts actions to hex', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, api.serializeActions(transaction.actions)];
                case 1:
                    response = _a.sent();
                    expect(response).toEqual(serializedActions);
                    return [2 /*return*/];
            }
        });
    }); });
    it('deserializeActions converts actions from hex', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, api.deserializeActions(serializedActions)];
                case 1:
                    response = _a.sent();
                    expect(response).toEqual(deserializedActions);
                    return [2 /*return*/];
            }
        });
    }); });
    it('hasRequiredTaposFields returns true, if required fields are present', function () {
        var response = api.hasRequiredTaposFields(transaction);
        expect(response).toEqual(true);
    });
    it('rawAbiToJson returns correct Json from raw Abi', function () { return __awaiter(void 0, void 0, void 0, function () {
        var expected, response, actual;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, api.getAbi('testeostoken')];
                case 1:
                    expected = _a.sent();
                    return [4 /*yield*/, rpc.getRawAbi('testeostoken')];
                case 2:
                    response = _a.sent();
                    actual = api.rawAbiToJson(response.abi);
                    expect(actual).toEqual(expected);
                    return [2 /*return*/];
            }
        });
    }); });
    it('jsonToRawAbi returns correct raw Abi from Json', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, expected, jsonAbi, actual;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, rpc.getRawAbi('testeostoken')];
                case 1:
                    response = _a.sent();
                    expected = response.abi;
                    return [4 /*yield*/, api.getAbi('testeostoken')];
                case 2:
                    jsonAbi = _a.sent();
                    actual = api.jsonToRawAbi(jsonAbi);
                    expect(actual).toEqual(expected);
                    return [2 /*return*/];
            }
        });
    }); });
    it('confirms jsonToRawAbi and rawAbiToJson are reciprocal', function () { return __awaiter(void 0, void 0, void 0, function () {
        var expectedJsonAbi, response, expectedRawAbi, jsonAbi, rawAbi;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, api.getAbi('testeostoken')];
                case 1:
                    expectedJsonAbi = _a.sent();
                    return [4 /*yield*/, rpc.getRawAbi('testeostoken')];
                case 2:
                    response = _a.sent();
                    expectedRawAbi = response.abi;
                    jsonAbi = api.rawAbiToJson(api.jsonToRawAbi(expectedJsonAbi));
                    rawAbi = api.jsonToRawAbi(api.rawAbiToJson(expectedRawAbi));
                    expect(rawAbi).toEqual(expectedRawAbi);
                    expect(jsonAbi).toEqual(expectedJsonAbi);
                    return [2 /*return*/];
            }
        });
    }); });
    describe('Abi Serialization', function () {
        var serializedAbis = {
            '1.0': 'DmVvc2lvOjphYmkvMS4wAQxhY2NvdW50X25hbWUEbmFtZQUIdHJhbnNmZXIABARmcm9tDGFjY291bnRfbmFtZQJ0bwxhY2NvdW50X25hbWUIcXVhbnRpdHkFYXNzZXQEbWVtbwZzdHJpbmcGY3JlYXRlAAIGaXNzdWVyDGFjY291bnRfbmFtZQ5tYXhpbXVtX3N1cHBseQVhc3NldAVpc3N1ZQADAnRvDGFjY291bnRfbmFtZQhxdWFudGl0eQVhc3NldARtZW1vBnN0cmluZwdhY2NvdW50AAEHYmFsYW5jZQVhc3NldA5jdXJyZW5jeV9zdGF0cwADBnN1cHBseQVhc3NldAptYXhfc3VwcGx5BWFzc2V0Bmlzc3VlcgxhY2NvdW50X25hbWUDAAAAVy08zc0IdHJhbnNmZXLnBSMjIFRyYW5zZmVyIFRlcm1zICYgQ29uZGl0aW9ucwoKSSwge3tmcm9tfX0sIGNlcnRpZnkgdGhlIGZvbGxvd2luZyB0byBiZSB0cnVlIHRvIHRoZSBiZXN0IG9mIG15IGtub3dsZWRnZToKCjEuIEkgY2VydGlmeSB0aGF0IHt7cXVhbnRpdHl9fSBpcyBub3QgdGhlIHByb2NlZWRzIG9mIGZyYXVkdWxlbnQgb3IgdmlvbGVudCBhY3Rpdml0aWVzLgoyLiBJIGNlcnRpZnkgdGhhdCwgdG8gdGhlIGJlc3Qgb2YgbXkga25vd2xlZGdlLCB7e3RvfX0gaXMgbm90IHN1cHBvcnRpbmcgaW5pdGlhdGlvbiBvZiB2aW9sZW5jZSBhZ2FpbnN0IG90aGVycy4KMy4gSSBoYXZlIGRpc2Nsb3NlZCBhbnkgY29udHJhY3R1YWwgdGVybXMgJiBjb25kaXRpb25zIHdpdGggcmVzcGVjdCB0byB7e3F1YW50aXR5fX0gdG8ge3t0b319LgoKSSB1bmRlcnN0YW5kIHRoYXQgZnVuZHMgdHJhbnNmZXJzIGFyZSBub3QgcmV2ZXJzaWJsZSBhZnRlciB0aGUge3t0cmFuc2FjdGlvbi5kZWxheX19IHNlY29uZHMgb3Igb3RoZXIgZGVsYXkgYXMgY29uZmlndXJlZCBieSB7e2Zyb219fSdzIHBlcm1pc3Npb25zLgoKSWYgdGhpcyBhY3Rpb24gZmFpbHMgdG8gYmUgaXJyZXZlcnNpYmx5IGNvbmZpcm1lZCBhZnRlciByZWNlaXZpbmcgZ29vZHMgb3Igc2VydmljZXMgZnJvbSAne3t0b319JywgSSBhZ3JlZSB0byBlaXRoZXIgcmV0dXJuIHRoZSBnb29kcyBvciBzZXJ2aWNlcyBvciByZXNlbmQge3txdWFudGl0eX19IGluIGEgdGltZWx5IG1hbm5lci4KAAAAAAClMXYFaXNzdWUAAAAAAKhs1EUGY3JlYXRlAAIAAAA4T00RMgNpNjQBCGN1cnJlbmN5AQZ1aW50NjQHYWNjb3VudAAAAAAAkE3GA2k2NAEIY3VycmVuY3kBBnVpbnQ2NA5jdXJyZW5jeV9zdGF0cwAAAA===',
            '1.1': 'DmVvc2lvOjphYmkvMS4xABgIYWJpX2hhc2gAAgVvd25lcgRuYW1lBGhhc2gLY2hlY2tzdW0yNTYIYWN0aXZhdGUAAQ5mZWF0dXJlX2RpZ2VzdAtjaGVja3N1bTI1NglhdXRob3JpdHkABAl0aHJlc2hvbGQGdWludDMyBGtleXMMa2V5X3dlaWdodFtdCGFjY291bnRzGXBlcm1pc3Npb25fbGV2ZWxfd2VpZ2h0W10Fd2FpdHMNd2FpdF93ZWlnaHRbXRVibG9ja2NoYWluX3BhcmFtZXRlcnMAERNtYXhfYmxvY2tfbmV0X3VzYWdlBnVpbnQ2NBp0YXJnZXRfYmxvY2tfbmV0X3VzYWdlX3BjdAZ1aW50MzIZbWF4X3RyYW5zYWN0aW9uX25ldF91c2FnZQZ1aW50MzIeYmFzZV9wZXJfdHJhbnNhY3Rpb25fbmV0X3VzYWdlBnVpbnQzMhBuZXRfdXNhZ2VfbGVld2F5BnVpbnQzMiNjb250ZXh0X2ZyZWVfZGlzY291bnRfbmV0X3VzYWdlX251bQZ1aW50MzIjY29udGV4dF9mcmVlX2Rpc2NvdW50X25ldF91c2FnZV9kZW4GdWludDMyE21heF9ibG9ja19jcHVfdXNhZ2UGdWludDMyGnRhcmdldF9ibG9ja19jcHVfdXNhZ2VfcGN0BnVpbnQzMhltYXhfdHJhbnNhY3Rpb25fY3B1X3VzYWdlBnVpbnQzMhltaW5fdHJhbnNhY3Rpb25fY3B1X3VzYWdlBnVpbnQzMhhtYXhfdHJhbnNhY3Rpb25fbGlmZXRpbWUGdWludDMyHmRlZmVycmVkX3RyeF9leHBpcmF0aW9uX3dpbmRvdwZ1aW50MzIVbWF4X3RyYW5zYWN0aW9uX2RlbGF5BnVpbnQzMhZtYXhfaW5saW5lX2FjdGlvbl9zaXplBnVpbnQzMhdtYXhfaW5saW5lX2FjdGlvbl9kZXB0aAZ1aW50MTYTbWF4X2F1dGhvcml0eV9kZXB0aAZ1aW50MTYLY2FuY2VsZGVsYXkAAg5jYW5jZWxpbmdfYXV0aBBwZXJtaXNzaW9uX2xldmVsBnRyeF9pZAtjaGVja3N1bTI1NgpkZWxldGVhdXRoAAIHYWNjb3VudARuYW1lCnBlcm1pc3Npb24EbmFtZQprZXlfd2VpZ2h0AAIDa2V5CnB1YmxpY19rZXkGd2VpZ2h0BnVpbnQxNghsaW5rYXV0aAAEB2FjY291bnQEbmFtZQRjb2RlBG5hbWUEdHlwZQRuYW1lC3JlcXVpcmVtZW50BG5hbWUKbmV3YWNjb3VudAAEB2NyZWF0b3IEbmFtZQRuYW1lBG5hbWUFb3duZXIJYXV0aG9yaXR5BmFjdGl2ZQlhdXRob3JpdHkHb25lcnJvcgACCXNlbmRlcl9pZAd1aW50MTI4CHNlbnRfdHJ4BWJ5dGVzEHBlcm1pc3Npb25fbGV2ZWwAAgVhY3RvcgRuYW1lCnBlcm1pc3Npb24EbmFtZRdwZXJtaXNzaW9uX2xldmVsX3dlaWdodAACCnBlcm1pc3Npb24QcGVybWlzc2lvbl9sZXZlbAZ3ZWlnaHQGdWludDE2DHByb2R1Y2VyX2tleQACDXByb2R1Y2VyX25hbWUEbmFtZRFibG9ja19zaWduaW5nX2tleQpwdWJsaWNfa2V5DHJlcWFjdGl2YXRlZAABDmZlYXR1cmVfZGlnZXN0C2NoZWNrc3VtMjU2B3JlcWF1dGgAAQRmcm9tBG5hbWUGc2V0YWJpAAIHYWNjb3VudARuYW1lA2FiaQVieXRlcwpzZXRhbGltaXRzAAQHYWNjb3VudARuYW1lCXJhbV9ieXRlcwVpbnQ2NApuZXRfd2VpZ2h0BWludDY0CmNwdV93ZWlnaHQFaW50NjQHc2V0Y29kZQAEB2FjY291bnQEbmFtZQZ2bXR5cGUFdWludDgJdm12ZXJzaW9uBXVpbnQ4BGNvZGUFYnl0ZXMJc2V0cGFyYW1zAAEGcGFyYW1zFWJsb2NrY2hhaW5fcGFyYW1ldGVycwdzZXRwcml2AAIHYWNjb3VudARuYW1lB2lzX3ByaXYFdWludDgIc2V0cHJvZHMAAQhzY2hlZHVsZQ5wcm9kdWNlcl9rZXlbXQp1bmxpbmthdXRoAAMHYWNjb3VudARuYW1lBGNvZGUEbmFtZQR0eXBlBG5hbWUKdXBkYXRlYXV0aAAEB2FjY291bnQEbmFtZQpwZXJtaXNzaW9uBG5hbWUGcGFyZW50BG5hbWUEYXV0aAlhdXRob3JpdHkLd2FpdF93ZWlnaHQAAgh3YWl0X3NlYwZ1aW50MzIGd2VpZ2h0BnVpbnQxNhAAAAAqm+0yMghhY3RpdmF0Zd8CLS0tCnNwZWNfdmVyc2lvbjogIjAuMi4wIgp0aXRsZTogQWN0aXZhdGUgUHJvdG9jb2wgRmVhdHVyZQpzdW1tYXJ5OiAnQWN0aXZhdGUgcHJvdG9jb2wgZmVhdHVyZSB7e25vd3JhcCBmZWF0dXJlX2RpZ2VzdH19JwppY29uOiBodHRwOi8vMTI3LjAuMC4xL3JpY2FyZGlhbl9hc3NldHMvZW9zaW8uY29udHJhY3RzL2ljb25zL2FkbWluLnBuZyM5YmYxY2VjNjY0ODYzYmQ2YWFhYzBmODE0YjIzNWY4Nzk5ZmIwMmM4NTBlOWFhNWRhMzRlOGEwMDRiZDY1MThlCi0tLQoKe3skYWN0aW9uLmFjY291bnR9fSBhY3RpdmF0ZXMgdGhlIHByb3RvY29sIGZlYXR1cmUgd2l0aCBhIGRpZ2VzdCBvZiB7e2ZlYXR1cmVfZGlnZXN0fX0uALyJKkWFpkELY2FuY2VsZGVsYXnhAi0tLQpzcGVjX3ZlcnNpb246ICIwLjIuMCIKdGl0bGU6IENhbmNlbCBEZWxheWVkIFRyYW5zYWN0aW9uCnN1bW1hcnk6ICd7e25vd3JhcCBjYW5jZWxpbmdfYXV0aC5hY3Rvcn19IGNhbmNlbHMgYSBkZWxheWVkIHRyYW5zYWN0aW9uJwppY29uOiBodHRwOi8vMTI3LjAuMC4xL3JpY2FyZGlhbl9hc3NldHMvZW9zaW8uY29udHJhY3RzL2ljb25zL2FjY291bnQucG5nIzNkNTVhMmZjM2E1YzIwYjQ1NmY1NjU3ZmFmNjY2YmMyNWZmZDA2ZjQ4MzZjNWU4MjU2Zjc0MTE0OWIwYjI5NGYKLS0tCgp7e2NhbmNlbGluZ19hdXRoLmFjdG9yfX0gY2FuY2VscyB0aGUgZGVsYXllZCB0cmFuc2FjdGlvbiB3aXRoIGlkIHt7dHJ4X2lkfX0uAEDL2qisokoKZGVsZXRlYXV0aMwCLS0tCnNwZWNfdmVyc2lvbjogIjAuMi4wIgp0aXRsZTogRGVsZXRlIEFjY291bnQgUGVybWlzc2lvbgpzdW1tYXJ5OiAnRGVsZXRlIHRoZSB7e25vd3JhcCBwZXJtaXNzaW9ufX0gcGVybWlzc2lvbiBvZiB7e25vd3JhcCBhY2NvdW50fX0nCmljb246IGh0dHA6Ly8xMjcuMC4wLjEvcmljYXJkaWFuX2Fzc2V0cy9lb3Npby5jb250cmFjdHMvaWNvbnMvYWNjb3VudC5wbmcjM2Q1NWEyZmMzYTVjMjBiNDU2ZjU2NTdmYWY2NjZiYzI1ZmZkMDZmNDgzNmM1ZTgyNTZmNzQxMTQ5YjBiMjk0ZgotLS0KCkRlbGV0ZSB0aGUge3twZXJtaXNzaW9ufX0gcGVybWlzc2lvbiBvZiB7e2FjY291bnR9fS4AAAAtawOniwhsaW5rYXV0aPQELS0tCnNwZWNfdmVyc2lvbjogIjAuMi4wIgp0aXRsZTogTGluayBBY3Rpb24gdG8gUGVybWlzc2lvbgpzdW1tYXJ5OiAne3tub3dyYXAgYWNjb3VudH19IHNldHMgdGhlIG1pbmltdW0gcmVxdWlyZWQgcGVybWlzc2lvbiBmb3IgdGhlIHt7I2lmIHR5cGV9fXt7bm93cmFwIHR5cGV9fSBhY3Rpb24gb2YgdGhle3svaWZ9fSB7e25vd3JhcCBjb2RlfX0gY29udHJhY3QgdG8ge3tub3dyYXAgcmVxdWlyZW1lbnR9fScKaWNvbjogaHR0cDovLzEyNy4wLjAuMS9yaWNhcmRpYW5fYXNzZXRzL2Vvc2lvLmNvbnRyYWN0cy9pY29ucy9hY2NvdW50LnBuZyMzZDU1YTJmYzNhNWMyMGI0NTZmNTY1N2ZhZjY2NmJjMjVmZmQwNmY0ODM2YzVlODI1NmY3NDExNDliMGIyOTRmCi0tLQoKe3thY2NvdW50fX0gc2V0cyB0aGUgbWluaW11bSByZXF1aXJlZCBwZXJtaXNzaW9uIGZvciB0aGUge3sjaWYgdHlwZX19e3t0eXBlfX0gYWN0aW9uIG9mIHRoZXt7L2lmfX0ge3tjb2RlfX0gY29udHJhY3QgdG8ge3tyZXF1aXJlbWVudH19LgoKe3sjaWYgdHlwZX19e3tlbHNlfX1BbnkgbGlua3MgZXhwbGljaXRseSBhc3NvY2lhdGVkIHRvIHNwZWNpZmljIGFjdGlvbnMgb2Yge3tjb2RlfX0gd2lsbCB0YWtlIHByZWNlZGVuY2Uue3svaWZ9fQBAnpoiZLiaCm5ld2FjY291bnTXAy0tLQpzcGVjX3ZlcnNpb246ICIwLjIuMCIKdGl0bGU6IENyZWF0ZSBOZXcgQWNjb3VudApzdW1tYXJ5OiAne3tub3dyYXAgY3JlYXRvcn19IGNyZWF0ZXMgYSBuZXcgYWNjb3VudCB3aXRoIHRoZSBuYW1lIHt7bm93cmFwIG5hbWV9fScKaWNvbjogaHR0cDovLzEyNy4wLjAuMS9yaWNhcmRpYW5fYXNzZXRzL2Vvc2lvLmNvbnRyYWN0cy9pY29ucy9hY2NvdW50LnBuZyMzZDU1YTJmYzNhNWMyMGI0NTZmNTY1N2ZhZjY2NmJjMjVmZmQwNmY0ODM2YzVlODI1NmY3NDExNDliMGIyOTRmCi0tLQoKe3tjcmVhdG9yfX0gY3JlYXRlcyBhIG5ldyBhY2NvdW50IHdpdGggdGhlIG5hbWUge3tuYW1lfX0gYW5kIHRoZSBmb2xsb3dpbmcgcGVybWlzc2lvbnM6Cgpvd25lciBwZXJtaXNzaW9uIHdpdGggYXV0aG9yaXR5Ogp7e3RvX2pzb24gb3duZXJ9fQoKYWN0aXZlIHBlcm1pc3Npb24gd2l0aCBhdXRob3JpdHk6Cnt7dG9fanNvbiBhY3RpdmV9fQAAAODSe9WkB29uZXJyb3IAkFQ222VkrLoMcmVxYWN0aXZhdGVk/wItLS0Kc3BlY192ZXJzaW9uOiAiMC4yLjAiCnRpdGxlOiBBc3NlcnQgUHJvdG9jb2wgRmVhdHVyZSBBY3RpdmF0aW9uCnN1bW1hcnk6ICdBc3NlcnQgdGhhdCBwcm90b2NvbCBmZWF0dXJlIHt7bm93cmFwIGZlYXR1cmVfZGlnZXN0fX0gaGFzIGJlZW4gYWN0aXZhdGVkJwppY29uOiBodHRwOi8vMTI3LjAuMC4xL3JpY2FyZGlhbl9hc3NldHMvZW9zaW8uY29udHJhY3RzL2ljb25zL2FkbWluLnBuZyM5YmYxY2VjNjY0ODYzYmQ2YWFhYzBmODE0YjIzNWY4Nzk5ZmIwMmM4NTBlOWFhNWRhMzRlOGEwMDRiZDY1MThlCi0tLQoKQXNzZXJ0IHRoYXQgdGhlIHByb3RvY29sIGZlYXR1cmUgd2l0aCBhIGRpZ2VzdCBvZiB7e2ZlYXR1cmVfZGlnZXN0fX0gaGFzIGJlZW4gYWN0aXZhdGVkLgAAAKBlbay6B3JlcWF1dGi8Ai0tLQpzcGVjX3ZlcnNpb246ICIwLjIuMCIKdGl0bGU6IEFzc2VydCBBdXRob3JpemF0aW9uCnN1bW1hcnk6ICdBc3NlcnQgdGhhdCBhdXRob3JpemF0aW9uIGJ5IHt7bm93cmFwIGZyb219fSBpcyBwcm92aWRlZCcKaWNvbjogaHR0cDovLzEyNy4wLjAuMS9yaWNhcmRpYW5fYXNzZXRzL2Vvc2lvLmNvbnRyYWN0cy9pY29ucy9hY2NvdW50LnBuZyMzZDU1YTJmYzNhNWMyMGI0NTZmNTY1N2ZhZjY2NmJjMjVmZmQwNmY0ODM2YzVlODI1NmY3NDExNDliMGIyOTRmCi0tLQoKQXNzZXJ0IHRoYXQgYXV0aG9yaXphdGlvbiBieSB7e2Zyb219fSBpcyBwcm92aWRlZC4AAAAAuGOywgZzZXRhYmnKAi0tLQpzcGVjX3ZlcnNpb246ICIwLjIuMCIKdGl0bGU6IERlcGxveSBDb250cmFjdCBBQkkKc3VtbWFyeTogJ0RlcGxveSBjb250cmFjdCBBQkkgb24gYWNjb3VudCB7e25vd3JhcCBhY2NvdW50fX0nCmljb246IGh0dHA6Ly8xMjcuMC4wLjEvcmljYXJkaWFuX2Fzc2V0cy9lb3Npby5jb250cmFjdHMvaWNvbnMvYWNjb3VudC5wbmcjM2Q1NWEyZmMzYTVjMjBiNDU2ZjU2NTdmYWY2NjZiYzI1ZmZkMDZmNDgzNmM1ZTgyNTZmNzQxMTQ5YjBiMjk0ZgotLS0KCkRlcGxveSB0aGUgQUJJIGZpbGUgYXNzb2NpYXRlZCB3aXRoIHRoZSBjb250cmFjdCBvbiBhY2NvdW50IHt7YWNjb3VudH19LgAAzk66aLLCCnNldGFsaW1pdHPNAy0tLQpzcGVjX3ZlcnNpb246ICIwLjIuMCIKdGl0bGU6IEFkanVzdCBSZXNvdXJjZSBMaW1pdHMgb2YgQWNjb3VudApzdW1tYXJ5OiAnQWRqdXN0IHJlc291cmNlIGxpbWl0cyBvZiBhY2NvdW50IHt7bm93cmFwIGFjY291bnR9fScKaWNvbjogaHR0cDovLzEyNy4wLjAuMS9yaWNhcmRpYW5fYXNzZXRzL2Vvc2lvLmNvbnRyYWN0cy9pY29ucy9hZG1pbi5wbmcjOWJmMWNlYzY2NDg2M2JkNmFhYWMwZjgxNGIyMzVmODc5OWZiMDJjODUwZTlhYTVkYTM0ZThhMDA0YmQ2NTE4ZQotLS0KCnt7JGFjdGlvbi5hY2NvdW50fX0gdXBkYXRlcyB7e2FjY291bnR9feKAmXMgcmVzb3VyY2UgbGltaXRzIHRvIGhhdmUgYSBSQU0gcXVvdGEgb2Yge3tyYW1fYnl0ZXN9fSBieXRlcywgYSBORVQgYmFuZHdpZHRoIHF1b3RhIG9mIHt7bmV0X3dlaWdodH19IGFuZCBhIENQVSBiYW5kd2lkdGggcXVvdGEgb2Yge3tjcHVfd2VpZ2h0fX0uAAAAQCWKssIHc2V0Y29kZb0CLS0tCnNwZWNfdmVyc2lvbjogIjAuMi4wIgp0aXRsZTogRGVwbG95IENvbnRyYWN0IENvZGUKc3VtbWFyeTogJ0RlcGxveSBjb250cmFjdCBjb2RlIG9uIGFjY291bnQge3tub3dyYXAgYWNjb3VudH19JwppY29uOiBodHRwOi8vMTI3LjAuMC4xL3JpY2FyZGlhbl9hc3NldHMvZW9zaW8uY29udHJhY3RzL2ljb25zL2FjY291bnQucG5nIzNkNTVhMmZjM2E1YzIwYjQ1NmY1NjU3ZmFmNjY2YmMyNWZmZDA2ZjQ4MzZjNWU4MjU2Zjc0MTE0OWIwYjI5NGYKLS0tCgpEZXBsb3kgY29tcGlsZWQgY29udHJhY3QgY29kZSB0byB0aGUgYWNjb3VudCB7e2FjY291bnR9fS4AAMDSXFOzwglzZXRwYXJhbXOnAi0tLQpzcGVjX3ZlcnNpb246ICIwLjIuMCIKdGl0bGU6IFNldCBTeXN0ZW0gUGFyYW1ldGVycwpzdW1tYXJ5OiAnU2V0IHN5c3RlbSBwYXJhbWV0ZXJzJwppY29uOiBodHRwOi8vMTI3LjAuMC4xL3JpY2FyZGlhbl9hc3NldHMvZW9zaW8uY29udHJhY3RzL2ljb25zL2FkbWluLnBuZyM5YmYxY2VjNjY0ODYzYmQ2YWFhYzBmODE0YjIzNWY4Nzk5ZmIwMmM4NTBlOWFhNWRhMzRlOGEwMDRiZDY1MThlCi0tLQoKe3skYWN0aW9uLmFjY291bnR9fSBzZXRzIHN5c3RlbSBwYXJhbWV0ZXJzIHRvOgp7e3RvX2pzb24gcGFyYW1zfX0AAABgu1uzwgdzZXRwcml25AMtLS0Kc3BlY192ZXJzaW9uOiAiMC4yLjAiCnRpdGxlOiBNYWtlIGFuIEFjY291bnQgUHJpdmlsZWdlZCBvciBVbnByaXZpbGVnZWQKc3VtbWFyeTogJ3t7I2lmIGlzX3ByaXZ9fU1ha2Uge3tub3dyYXAgYWNjb3VudH19IHByaXZpbGVnZWR7e2Vsc2V9fVJlbW92ZSBwcml2aWxlZ2VkIHN0YXR1cyBvZiB7e25vd3JhcCBhY2NvdW50fX17ey9pZn19JwppY29uOiBodHRwOi8vMTI3LjAuMC4xL3JpY2FyZGlhbl9hc3NldHMvZW9zaW8uY29udHJhY3RzL2ljb25zL2FkbWluLnBuZyM5YmYxY2VjNjY0ODYzYmQ2YWFhYzBmODE0YjIzNWY4Nzk5ZmIwMmM4NTBlOWFhNWRhMzRlOGEwMDRiZDY1MThlCi0tLQoKe3sjaWYgaXNfcHJpdn19Cnt7JGFjdGlvbi5hY2NvdW50fX0gbWFrZXMge3thY2NvdW50fX0gcHJpdmlsZWdlZC4Ke3tlbHNlfX0Ke3skYWN0aW9uLmFjY291bnR9fSByZW1vdmVzIHByaXZpbGVnZWQgc3RhdHVzIG9mIHt7YWNjb3VudH19Lgp7ey9pZn19AAAAONFbs8IIc2V0cHJvZHOUAy0tLQpzcGVjX3ZlcnNpb246ICIwLjIuMCIKdGl0bGU6IFNldCBCbG9jayBQcm9kdWNlcnMKc3VtbWFyeTogJ1NldCBibG9jayBwcm9kdWNlciBzY2hlZHVsZScKaWNvbjogaHR0cDovLzEyNy4wLjAuMS9yaWNhcmRpYW5fYXNzZXRzL2Vvc2lvLmNvbnRyYWN0cy9pY29ucy9hZG1pbi5wbmcjOWJmMWNlYzY2NDg2M2JkNmFhYWMwZjgxNGIyMzVmODc5OWZiMDJjODUwZTlhYTVkYTM0ZThhMDA0YmQ2NTE4ZQotLS0KCnt7JGFjdGlvbi5hY2NvdW50fX0gcHJvcG9zZXMgYSBibG9jayBwcm9kdWNlciBzY2hlZHVsZSBvZjoKe3sjZWFjaCBzY2hlZHVsZX19CiAgMS4ge3t0aGlzLnByb2R1Y2VyX25hbWV9fSB3aXRoIGEgYmxvY2sgc2lnbmluZyBrZXkgb2Yge3t0aGlzLmJsb2NrX3NpZ25pbmdfa2V5fX0Ke3svZWFjaH19AEDL2sDp4tQKdW5saW5rYXV0aOgELS0tCnNwZWNfdmVyc2lvbjogIjAuMi4wIgp0aXRsZTogVW5saW5rIEFjdGlvbiBmcm9tIFBlcm1pc3Npb24Kc3VtbWFyeTogJ3t7bm93cmFwIGFjY291bnR9fSB1bnNldHMgdGhlIG1pbmltdW0gcmVxdWlyZWQgcGVybWlzc2lvbiBmb3IgdGhlIHt7I2lmIHR5cGV9fXt7bm93cmFwIHR5cGV9fSBhY3Rpb24gb2YgdGhle3svaWZ9fSB7e25vd3JhcCBjb2RlfX0gY29udHJhY3QnCmljb246IGh0dHA6Ly8xMjcuMC4wLjEvcmljYXJkaWFuX2Fzc2V0cy9lb3Npby5jb250cmFjdHMvaWNvbnMvYWNjb3VudC5wbmcjM2Q1NWEyZmMzYTVjMjBiNDU2ZjU2NTdmYWY2NjZiYzI1ZmZkMDZmNDgzNmM1ZTgyNTZmNzQxMTQ5YjBiMjk0ZgotLS0KCnt7YWNjb3VudH19IHJlbW92ZXMgdGhlIGFzc29jaWF0aW9uIGJldHdlZW4gdGhlIHt7I2lmIHR5cGV9fXt7dHlwZX19IGFjdGlvbiBvZiB0aGV7ey9pZn19IHt7Y29kZX19IGNvbnRyYWN0IGFuZCBpdHMgbWluaW11bSByZXF1aXJlZCBwZXJtaXNzaW9uLgoKe3sjaWYgdHlwZX19e3tlbHNlfX1UaGlzIHdpbGwgbm90IHJlbW92ZSBhbnkgbGlua3MgZXhwbGljaXRseSBhc3NvY2lhdGVkIHRvIHNwZWNpZmljIGFjdGlvbnMgb2Yge3tjb2RlfX0ue3svaWZ9fQBAy9qobFLVCnVwZGF0ZWF1dGjEAy0tLQpzcGVjX3ZlcnNpb246ICIwLjIuMCIKdGl0bGU6IE1vZGlmeSBBY2NvdW50IFBlcm1pc3Npb24Kc3VtbWFyeTogJ0FkZCBvciB1cGRhdGUgdGhlIHt7bm93cmFwIHBlcm1pc3Npb259fSBwZXJtaXNzaW9uIG9mIHt7bm93cmFwIGFjY291bnR9fScKaWNvbjogaHR0cDovLzEyNy4wLjAuMS9yaWNhcmRpYW5fYXNzZXRzL2Vvc2lvLmNvbnRyYWN0cy9pY29ucy9hY2NvdW50LnBuZyMzZDU1YTJmYzNhNWMyMGI0NTZmNTY1N2ZhZjY2NmJjMjVmZmQwNmY0ODM2YzVlODI1NmY3NDExNDliMGIyOTRmCi0tLQoKTW9kaWZ5LCBhbmQgY3JlYXRlIGlmIG5lY2Vzc2FyeSwgdGhlIHt7cGVybWlzc2lvbn19IHBlcm1pc3Npb24gb2Yge3thY2NvdW50fX0gdG8gaGF2ZSBhIHBhcmVudCBwZXJtaXNzaW9uIG9mIHt7cGFyZW50fX0gYW5kIHRoZSBmb2xsb3dpbmcgYXV0aG9yaXR5Ogp7e3RvX2pzb24gYXV0aH19AQAAAKBh09wxA2k2NAAACGFiaV9oYXNoAAAAAAAA=',
            '1.2': 'DmVvc2lvOjphYmkvMS4yAAcDZGVsAAEEdXVpZAZzdHJpbmcMZ2V0YnlhY2NuYW1lAAEMYWNjb3VudF9uYW1lBG5hbWUKdG9kb19lbnRyeQAEBHV1aWQGc3RyaW5nDGFjY291bnRfbmFtZRF0dXBsZV9zdHJpbmdfbmFtZQR0YXNrE3R1cGxlX3N0cmluZ19zdHJpbmcHY2hlY2tlZBF0dXBsZV9zdHJpbmdfYm9vbBF0dXBsZV9zdHJpbmdfYm9vbAACB2ZpZWxkXzAGc3RyaW5nB2ZpZWxkXzEEYm9vbBF0dXBsZV9zdHJpbmdfbmFtZQACB2ZpZWxkXzAGc3RyaW5nB2ZpZWxkXzEEbmFtZRN0dXBsZV9zdHJpbmdfc3RyaW5nAAIHZmllbGRfMAZzdHJpbmcHZmllbGRfMQZzdHJpbmcGdXBzZXJ0AAQEdXVpZAZzdHJpbmcMYWNjb3VudF9uYW1lBG5hbWUEdGFzawZzdHJpbmcHY2hlY2tlZARib29sAwAAAAAAAKJKA2RlbACgpJkIGX+yYgxnZXRieWFjY25hbWUAAAAAAOSrcNUGdXBzZXJ0AAAAAAAAAqCkmQgZf7JiDHRvZG9fZW50cnlbXQAAAADkq3DVCnRvZG9fZW50cnkBAAAAANBE84YKdG9kb19lbnRyeQAAAAAAkJzWBnN0cmluZwMAAABASTMRMhF0dXBsZV9zdHJpbmdfbmFtZQAAACApiFRDEXR1cGxlX3N0cmluZ19ib29sAAAAAAAAsckTdHVwbGVfc3RyaW5nX3N0cmluZw===',
        };
        it('deserializes/serializes the 1.0 abi', function () {
            var raw = eosjs_numeric_1.base64ToBinary(serializedAbis['1.0']);
            var deserializedAbi = api.rawAbiToJson(raw);
            var serializedAbi = api.jsonToRawAbi(deserializedAbi);
            expect(serializedAbi).toEqual(raw);
        });
        it('deserializes/serializes the 1.1 abi', function () {
            var raw = eosjs_numeric_1.base64ToBinary(serializedAbis['1.1']);
            var deserializedAbi = api.rawAbiToJson(raw);
            var serializedAbi = api.jsonToRawAbi(deserializedAbi);
            expect(serializedAbi).toEqual(raw);
        });
        it('deserializes/serializes the 1.2 abi', function () {
            var raw = eosjs_numeric_1.base64ToBinary(serializedAbis['1.2']);
            var deserializedAbi = api.rawAbiToJson(raw);
            var serializedAbi = api.jsonToRawAbi(deserializedAbi);
            expect(serializedAbi).toEqual(raw);
        });
    });
    describe('Api shorthand design (JsonAbi)', function () {
        it('errors if abi is not cached', function () {
            var abiCheck = function () {
                api.with('testeostoken').as('bob')
                    .transfer('thegazelle', 'remasteryoda', '1.0000 EOS', 'For a secure future.');
            };
            expect(abiCheck).toThrowError('ABI must be cached before using ActionBuilder, run api.getAbi()');
        });
        it('generates a valid serialized action using api.with()', function () { return __awaiter(void 0, void 0, void 0, function () {
            var serializedAction;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, api.getAbi('testeostoken')];
                    case 1:
                        _a.sent();
                        serializedAction = api.with('testeostoken').as('thegazelle')
                            .transfer('thegazelle', 'remasteryoda', '1.0000 EOS', 'For a secure future.');
                        expect(serializedAction).toEqual(serializedActions[0]);
                        return [2 /*return*/];
                }
            });
        }); });
        it('generates a valid serialized action using tx.with()', function () { return __awaiter(void 0, void 0, void 0, function () {
            var tx, serializedAction;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, api.getAbi('testeostoken')];
                    case 1:
                        _a.sent();
                        tx = api.buildTransaction();
                        serializedAction = tx.with('testeostoken').as('thegazelle')
                            .transfer('thegazelle', 'remasteryoda', '2.0000 EOS', 'For a second secure future (multiverse?)');
                        expect(serializedAction).toEqual(serializedActions[1]);
                        return [2 /*return*/];
                }
            });
        }); });
        it('confirms serializeActions and ActionBuilder return same serialized data', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, firstAction, secondAction;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, api.serializeActions(transaction.actions)];
                    case 1:
                        response = _a.sent();
                        firstAction = api.with('testeostoken').as('thegazelle')
                            .transfer('thegazelle', 'remasteryoda', '1.0000 EOS', 'For a secure future.');
                        secondAction = api.with('testeostoken').as('thegazelle')
                            .transfer('thegazelle', 'remasteryoda', '2.0000 EOS', 'For a second secure future (multiverse?)');
                        expect([firstAction, secondAction]).toEqual(response);
                        return [2 /*return*/];
                }
            });
        }); });
        it('generates the same serialized data using the longer authorization', function () { return __awaiter(void 0, void 0, void 0, function () {
            var firstSerializedAction, secondSerializedAction;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, api.getAbi('testeostoken')];
                    case 1:
                        _a.sent();
                        firstSerializedAction = api.with('testeostoken').as('thegazelle')
                            .transfer('thegazelle', 'remasteryoda', '1.0000 EOS', 'For a secure future.');
                        secondSerializedAction = api.with('testeostoken').as([{ actor: 'thegazelle', permission: 'active' }])
                            .transfer('thegazelle', 'remasteryoda', '1.0000 EOS', 'For a secure future.');
                        expect(firstSerializedAction).toEqual(secondSerializedAction);
                        return [2 /*return*/];
                }
            });
        }); });
        it('confirms the transaction extension serialization is reciprocal', function () { return __awaiter(void 0, void 0, void 0, function () {
            var resourcePayerTrx, serialized, deserialized, serializedTransactionExtensions, deserializedTransactionExtensions;
            return __generator(this, function (_a) {
                resourcePayerTrx = {
                    expiration: '2021-06-28T15:55:37.000',
                    ref_block_num: 2097,
                    ref_block_prefix: 1309445478,
                    actions: [{
                            account: 'eosio.token',
                            name: 'transfer',
                            authorization: [{
                                    actor: 'bob',
                                    permission: 'active',
                                }, {
                                    actor: 'alice',
                                    permission: 'active',
                                }],
                            data: '0000000000000E3D0000000000855C34010000000000000004535953000000000E7265736F75726365207061796572'
                        }],
                    context_free_actions: [],
                    resource_payer: {
                        payer: 'payer',
                        max_net_bytes: 4096,
                        max_cpu_us: 250,
                        max_memory_bytes: 0
                    }
                };
                serialized = [[1, '0000000080ABBCA90010000000000000FA000000000000000000000000000000']];
                deserialized = {
                    resource_payer: {
                        payer: 'payer',
                        max_net_bytes: 4096,
                        max_cpu_us: 250,
                        max_memory_bytes: 0
                    }
                };
                serializedTransactionExtensions = api.serializeTransactionExtensions(resourcePayerTrx);
                expect(serializedTransactionExtensions).toEqual(serialized);
                deserializedTransactionExtensions = api.deserializeTransactionExtensions(serialized);
                expect(deserializedTransactionExtensions).toEqual(deserialized);
                return [2 /*return*/];
            });
        }); });
    });
});
//# sourceMappingURL=eosjs-api.test.js.map