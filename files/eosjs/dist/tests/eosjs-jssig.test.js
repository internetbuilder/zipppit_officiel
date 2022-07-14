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
var eosjs_key_conversions_1 = require("../eosjs-key-conversions");
var eosjs_jssig_1 = require("../eosjs-jssig");
var eosjs_numeric_1 = require("../eosjs-numeric");
describe('JsSignatureProvider', function () {
    var privateKeys = [
        '5Juww5SS6aLWxopXBAWzwqrwadiZKz7XpKAiktXTKcfBGi1DWg8',
        '5JnHjSFwe4r7xyqAUAaVs51G7HmzE86DWGa3VAA5VvQriGYnSUr',
        '5K4XZH5XR2By7Q5KTcZnPAmUMU5yjUNBdoKzzXyrLfmiEZJqoKE',
    ];
    var privateKeysK1 = [
        'PVT_K1_26fMPzM27mXhoSF8y56ro7pN2te7rFT6W6wXiUi5joY79NHfZf',
        'PVT_K1_y19korZcH8hyStRy8bn2G8tgx51zE8nTWGFz7LG3ZDYkaELTY',
        'PVT_K1_2FEybdSLZcyrPh3RR7tJ82M8sG4XLW6uzGDmMw76nv54xk8FLu',
    ];
    var privateKeysR1 = [
        'PVT_R1_GrfEfbv5at9kbeHcGagQmvbFLdm6jqEpgE1wsGbrfbZNjpVgT',
        'PVT_R1_wCpPsaY9o8NU9ZsuwaYVQUDkCfj1aWJZGVcmMM6XyYHJVqvqp',
    ];
    var legacyPublicKeys = [
        'EOS7tgwU6E7pAUQJgqEJt66Yi8cWvanTUW8ZfBjeXeJBQvhTU9ypi',
        'EOS8VaY5CiTexYqgQZyPTJkc3qvWuZUi12QrZL9ssjqW2es6aQk2F',
        'EOS7VGhqctkKprW1VUj19DZZiiZLX3YcJqUJCuEcahJmUCw3wJEMu',
    ];
    var k1FormatPublicKeys = [
        'PUB_K1_7tgwU6E7pAUQJgqEJt66Yi8cWvanTUW8ZfBjeXeJBQvhYTBFvY',
        'PUB_K1_8VaY5CiTexYqgQZyPTJkc3qvWuZUi12QrZL9ssjqW2es7e7bRJ',
        'PUB_K1_7VGhqctkKprW1VUj19DZZiiZLX3YcJqUJCuEcahJmUCw9RT8v2',
    ];
    var r1FormatPublicKeys = [
        'PUB_R1_4ztaVy8L9zbmzTdpfq5GcaFYwGwXTNmN3qW7qcgHMmfUZhpzQQ',
        'PUB_R1_5xawnnr3mWayv2wkiqBGWqu4RQLNJffLSXHiL3BofdY7ortMy4',
    ];
    var signatures = [
        'SIG_K1_HKkqi3zray76i63ZQwAHWMjoLk3wTa1ajZWPcUnrhgmSWQYEHDJsxkny6VDTWEmVdfktxpGoTA81qe6QuCrDmazeQndmxh',
        'SIG_K1_HCaY9Y9qdjnkRhE9hokAyp3pFtkMmjpxF6xTd514Vo8vLVSWKek5m5aHfCaka9TqZUbajkhhd4BfBLxSwCwZUEmy8cvt1x',
        'SIG_K1_GrZqp9ZkuhBeNpeQ5b2L2UWUUrNU1gHbTyMzkyWRhiXNkxPP84Aq9eziU399eBf9xJw8MqHHjz7R2wMTMXhXjHLgpZYFeA',
    ];
    var eccSignatures = [
        'SIG_K1_KeEyJFpkp63Qq5E1zRD9aNZtTjpStvdkdnL31Z7wVmhYtrKGtpVdMBJnXyEUXNkNEyo4d4i4Q79qmRpCUsCRdFqhV6KAeF',
        'SIG_K1_JvgMmFSDhipS1SeBLNBMdAxayAsWS3GuVGSHS7YQth5Z5ZpijxnZgaa23dYD1efQhpEgtEggdRfHMmp31RDXjmJdZYoKLm',
        'SIG_K1_JwMqV2nbEntHSq9AuG3Zq1JBc5YqD2SftMHCTGK4A8DYGn1VPQ8QAduwCNksT5JhYgAmGMzPyJdZ2Ws4p8TCvQ16LeNhrw',
    ];
    // These are simplified tests simply to verify a refactor didn't mess with existing code
    describe('secp256k1 elliptic', function () {
        it('generates a private and public key pair', function () {
            var _a = eosjs_key_conversions_1.generateKeyPair(eosjs_numeric_1.KeyType.k1, { secureEnv: true }), privateKey = _a.privateKey, publicKey = _a.publicKey;
            expect(privateKey).toBeInstanceOf(eosjs_key_conversions_1.PrivateKey);
            expect(privateKey.isValid()).toBeTruthy();
            expect(publicKey).toBeInstanceOf(eosjs_key_conversions_1.PublicKey);
            expect(publicKey.isValid()).toBeTruthy();
        });
        it('throws error with no options.secureEnv variable', function () {
            expect(function () { return eosjs_key_conversions_1.generateKeyPair(eosjs_numeric_1.KeyType.k1); }).toThrowError();
        });
        it('Retrieves the public key from a private key', function () {
            var privateKey = eosjs_key_conversions_1.PrivateKey.fromString(privateKeys[0]);
            var publicKey = privateKey.getPublicKey();
            expect(publicKey.toString()).toEqual(k1FormatPublicKeys[0]);
        });
        it('builds public keys from private when constructed', function () { return __awaiter(void 0, void 0, void 0, function () {
            var provider, actualPublicKeys;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        provider = new eosjs_jssig_1.JsSignatureProvider(privateKeys);
                        return [4 /*yield*/, provider.getAvailableKeys()];
                    case 1:
                        actualPublicKeys = _a.sent();
                        expect(actualPublicKeys).toEqual(k1FormatPublicKeys);
                        return [2 /*return*/];
                }
            });
        }); });
        it('signs a transaction', function () { return __awaiter(void 0, void 0, void 0, function () {
            var provider, chainId, requiredKeys, serializedTransaction, signOutput;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        provider = new eosjs_jssig_1.JsSignatureProvider(privateKeys);
                        chainId = '12345';
                        requiredKeys = k1FormatPublicKeys;
                        serializedTransaction = new Uint8Array([
                            0, 16, 32, 128, 255,
                        ]);
                        return [4 /*yield*/, provider.sign({ chainId: chainId, requiredKeys: requiredKeys, serializedTransaction: serializedTransaction })];
                    case 1:
                        signOutput = _a.sent();
                        expect(signOutput).toEqual({
                            signatures: expect.any(Array),
                            serializedTransaction: serializedTransaction,
                            serializedContextFreeData: undefined
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('confirm elliptic conversion functions are actually reciprocal', function () { return __awaiter(void 0, void 0, void 0, function () {
            var provider, chainId, requiredKeys, serializedTransaction, signOutput, sig, ellipticSig, eosSig;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        provider = new eosjs_jssig_1.JsSignatureProvider(privateKeys);
                        chainId = '12345';
                        requiredKeys = k1FormatPublicKeys;
                        serializedTransaction = new Uint8Array([
                            0, 16, 32, 128, 255,
                        ]);
                        return [4 /*yield*/, provider.sign({ chainId: chainId, requiredKeys: requiredKeys, serializedTransaction: serializedTransaction })];
                    case 1:
                        signOutput = _a.sent();
                        sig = eosjs_key_conversions_1.Signature.fromString(signOutput.signatures[0]);
                        ellipticSig = sig.toElliptic();
                        eosSig = eosjs_key_conversions_1.Signature.fromElliptic(ellipticSig, eosjs_numeric_1.KeyType.k1);
                        expect(sig).toEqual(eosSig);
                        return [2 /*return*/];
                }
            });
        }); });
        it('verify a transaction', function () { return __awaiter(void 0, void 0, void 0, function () {
            var provider, chainId, requiredKeys, serializedTransaction, signOutput, signature;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        provider = new eosjs_jssig_1.JsSignatureProvider([privateKeys[0]]);
                        chainId = '12345';
                        requiredKeys = [k1FormatPublicKeys[0]];
                        serializedTransaction = new Uint8Array([
                            0, 16, 32, 128, 255,
                        ]);
                        return [4 /*yield*/, provider.sign({ chainId: chainId, requiredKeys: requiredKeys, serializedTransaction: serializedTransaction })];
                    case 1:
                        signOutput = _a.sent();
                        signature = eosjs_key_conversions_1.Signature.fromString(signOutput.signatures[0]);
                        expect(signature.verify(eosjs_jssig_1.digestFromSerializedData(chainId, serializedTransaction), eosjs_key_conversions_1.PublicKey.fromString(k1FormatPublicKeys[0]), false)).toEqual(true);
                        return [2 /*return*/];
                }
            });
        }); });
        it('ensure public key functions are actual inverses of each other', function () { return __awaiter(void 0, void 0, void 0, function () {
            var eosioPubKey, ellipticPubKey, finalEosioKeyAsK1String;
            return __generator(this, function (_a) {
                eosioPubKey = eosjs_key_conversions_1.PublicKey.fromString(k1FormatPublicKeys[0]);
                ellipticPubKey = eosioPubKey.toElliptic();
                finalEosioKeyAsK1String = eosjs_key_conversions_1.PublicKey.fromElliptic(ellipticPubKey, eosjs_numeric_1.KeyType.k1).toString();
                expect(finalEosioKeyAsK1String).toEqual(k1FormatPublicKeys[0]);
                return [2 /*return*/];
            });
        }); });
        it('verify that PUB_K1_ and Legacy pub formats are consistent', function () {
            var eosioLegacyPubKey = legacyPublicKeys[0];
            var ellipticPubKey = eosjs_key_conversions_1.PublicKey.fromString(eosioLegacyPubKey).toElliptic();
            expect(eosjs_key_conversions_1.PublicKey.fromElliptic(ellipticPubKey, eosjs_numeric_1.KeyType.k1).toString()).toEqual(k1FormatPublicKeys[0]);
        });
        it('verify that privateKey toLegacyString() and toString() are consistent', function () {
            var privKeyFromK1 = eosjs_key_conversions_1.PrivateKey.fromString(privateKeysK1[0]);
            var privKeyFromLegacy = eosjs_key_conversions_1.PrivateKey.fromString(privateKeys[0]);
            expect(privKeyFromK1.toLegacyString()).toEqual(privateKeys[0]);
            expect(privKeyFromLegacy.toString()).toEqual(privateKeysK1[0]);
        });
        it('verify that publicKey toLegacyString() and toString() are consistent', function () {
            var pubKeyFromK1 = eosjs_key_conversions_1.PublicKey.fromString(k1FormatPublicKeys[0]);
            var pubKeyFromLegacy = eosjs_key_conversions_1.PublicKey.fromString(legacyPublicKeys[0]);
            expect(pubKeyFromK1.toLegacyString()).toEqual(legacyPublicKeys[0]);
            expect(pubKeyFromLegacy.toString()).toEqual(k1FormatPublicKeys[0]);
        });
        it('ensure private key functions are actual inverses of each other', function () { return __awaiter(void 0, void 0, void 0, function () {
            var priv, privEosioKey, privEllipticKey, finalEosioKeyAsString;
            return __generator(this, function (_a) {
                priv = privateKeys[0];
                privEosioKey = eosjs_key_conversions_1.PrivateKey.fromString(priv);
                privEllipticKey = privEosioKey.toElliptic();
                finalEosioKeyAsString = eosjs_key_conversions_1.PrivateKey.fromElliptic(privEllipticKey, eosjs_numeric_1.KeyType.k1).toString();
                expect(privEosioKey.toString()).toEqual(finalEosioKeyAsString);
                return [2 /*return*/];
            });
        }); });
        it('verify that public key validate function correctly assesses public keys', function () {
            var publicKey = eosjs_key_conversions_1.PublicKey.fromString(k1FormatPublicKeys[0]);
            expect(publicKey.isValid()).toEqual(true);
        });
        it('Ensure elliptic sign, recover, verify flow works', function () {
            var KPrivStr = privateKeys[0];
            var KPriv = eosjs_key_conversions_1.PrivateKey.fromString(KPrivStr);
            var dataAsString = 'some string';
            var ellipticHashedString = eosjs_key_conversions_1.sha256(dataAsString);
            var sig = KPriv.sign(ellipticHashedString);
            var KPub = sig.recover(ellipticHashedString);
            expect(KPub.toString()).toEqual(k1FormatPublicKeys[0]);
            var valid = sig.verify(ellipticHashedString, KPub);
            expect(valid).toEqual(true);
        });
        it('Ensure elliptic sign, recover, verify flow works with shouldHash', function () {
            var KPrivStr = privateKeys[0];
            var KPriv = eosjs_key_conversions_1.PrivateKey.fromString(KPrivStr);
            var dataAsString = 'some string';
            var sig = KPriv.sign(dataAsString, true);
            var KPub = sig.recover(dataAsString, true);
            expect(KPub.toString()).toEqual(k1FormatPublicKeys[0]);
            var valid = sig.verify(dataAsString, KPub, true);
            expect(valid).toEqual(true);
        });
        it('Ensure elliptic sign, recover, verify flow works with shouldHash and encoding', function () {
            var KPrivStr = privateKeys[0];
            var KPriv = eosjs_key_conversions_1.PrivateKey.fromString(KPrivStr);
            var dataAsString = 'some string';
            var sig = KPriv.sign(dataAsString, true, 'utf8');
            var KPub = sig.recover(dataAsString, true, 'utf8');
            expect(KPub.toString()).toEqual(k1FormatPublicKeys[0]);
            var valid = sig.verify(dataAsString, KPub, true, 'utf8');
            expect(valid).toEqual(true);
        });
    });
    describe('p256 elliptic', function () {
        it('generates a private and public key pair', function () {
            var _a = eosjs_key_conversions_1.generateKeyPair(eosjs_numeric_1.KeyType.r1, { secureEnv: true }), privateKey = _a.privateKey, publicKey = _a.publicKey;
            expect(privateKey).toBeInstanceOf(eosjs_key_conversions_1.PrivateKey);
            expect(privateKey.isValid()).toBeTruthy();
            expect(publicKey).toBeInstanceOf(eosjs_key_conversions_1.PublicKey);
            expect(publicKey.isValid()).toBeTruthy();
        });
        it('throws error with no options.secureEnv variable', function () {
            expect(function () { return eosjs_key_conversions_1.generateKeyPair(eosjs_numeric_1.KeyType.r1); }).toThrowError();
        });
        it('throws error when attempting a legacy private key from r1 format', function () {
            var privateKey = eosjs_key_conversions_1.PrivateKey.fromString(privateKeysR1[0]);
            expect(function () { return privateKey.toLegacyString(); }).toThrowError('Key format not supported in legacy conversion');
        });
        it('throws error when attempting a legacy public key from r1 format', function () {
            var publicKey = eosjs_key_conversions_1.PublicKey.fromString(r1FormatPublicKeys[0]);
            expect(function () { return publicKey.toLegacyString(); }).toThrowError('Key format not supported in legacy conversion');
        });
        it('Retrieves the public key from a private key', function () {
            var privateKey = eosjs_key_conversions_1.PrivateKey.fromString(privateKeysR1[0]);
            var publicKey = privateKey.getPublicKey();
            expect(publicKey.toString()).toEqual(r1FormatPublicKeys[0]);
        });
        it('builds public keys from private when constructed', function () { return __awaiter(void 0, void 0, void 0, function () {
            var provider, actualPublicKeys;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        provider = new eosjs_jssig_1.JsSignatureProvider(privateKeysR1);
                        return [4 /*yield*/, provider.getAvailableKeys()];
                    case 1:
                        actualPublicKeys = _a.sent();
                        expect(actualPublicKeys).toEqual(r1FormatPublicKeys);
                        return [2 /*return*/];
                }
            });
        }); });
        it('signs a transaction', function () { return __awaiter(void 0, void 0, void 0, function () {
            var provider, chainId, requiredKeys, serializedTransaction, signOutput;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        provider = new eosjs_jssig_1.JsSignatureProvider(privateKeysR1);
                        chainId = '12345';
                        requiredKeys = r1FormatPublicKeys;
                        serializedTransaction = new Uint8Array([
                            0, 16, 32, 128, 255,
                        ]);
                        return [4 /*yield*/, provider.sign({ chainId: chainId, requiredKeys: requiredKeys, serializedTransaction: serializedTransaction })];
                    case 1:
                        signOutput = _a.sent();
                        expect(signOutput).toEqual({
                            signatures: expect.any(Array),
                            serializedTransaction: serializedTransaction,
                            serializedContextFreeData: undefined
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('confirm elliptic conversion functions are actually reciprocal', function () { return __awaiter(void 0, void 0, void 0, function () {
            var provider, chainId, requiredKeys, serializedTransaction, signOutput, sig, ellipticSig, eosSig;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        provider = new eosjs_jssig_1.JsSignatureProvider(privateKeysR1);
                        chainId = '12345';
                        requiredKeys = r1FormatPublicKeys;
                        serializedTransaction = new Uint8Array([
                            0, 16, 32, 128, 255,
                        ]);
                        return [4 /*yield*/, provider.sign({ chainId: chainId, requiredKeys: requiredKeys, serializedTransaction: serializedTransaction })];
                    case 1:
                        signOutput = _a.sent();
                        sig = eosjs_key_conversions_1.Signature.fromString(signOutput.signatures[0]);
                        ellipticSig = sig.toElliptic();
                        eosSig = eosjs_key_conversions_1.Signature.fromElliptic(ellipticSig, eosjs_numeric_1.KeyType.r1);
                        expect(sig).toEqual(eosSig);
                        return [2 /*return*/];
                }
            });
        }); });
        it('verify a transaction', function () { return __awaiter(void 0, void 0, void 0, function () {
            var provider, chainId, requiredKeys, serializedTransaction, signOutput, signature;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        provider = new eosjs_jssig_1.JsSignatureProvider([privateKeysR1[0]]);
                        chainId = '12345';
                        requiredKeys = [r1FormatPublicKeys[0]];
                        serializedTransaction = new Uint8Array([
                            0, 16, 32, 128, 255,
                        ]);
                        return [4 /*yield*/, provider.sign({ chainId: chainId, requiredKeys: requiredKeys, serializedTransaction: serializedTransaction })];
                    case 1:
                        signOutput = _a.sent();
                        signature = eosjs_key_conversions_1.Signature.fromString(signOutput.signatures[0]);
                        expect(signature.verify(eosjs_jssig_1.digestFromSerializedData(chainId, serializedTransaction), eosjs_key_conversions_1.PublicKey.fromString(r1FormatPublicKeys[0]), false)).toEqual(true);
                        return [2 /*return*/];
                }
            });
        }); });
        it('ensure public key functions using p256 format are actual inverses of each other', function () { return __awaiter(void 0, void 0, void 0, function () {
            var eosioPubKey, ellipticPubKey, finalEosioKeyAsR1String;
            return __generator(this, function (_a) {
                eosioPubKey = eosjs_key_conversions_1.PublicKey.fromString(r1FormatPublicKeys[0]);
                ellipticPubKey = eosioPubKey.toElliptic();
                finalEosioKeyAsR1String = eosjs_key_conversions_1.PublicKey.fromElliptic(ellipticPubKey, eosjs_numeric_1.KeyType.r1).toString();
                expect(finalEosioKeyAsR1String).toEqual(r1FormatPublicKeys[0]);
                return [2 /*return*/];
            });
        }); });
        it('ensure private key functions using p256 format are actual inverses of each other', function () { return __awaiter(void 0, void 0, void 0, function () {
            var priv, privEosioKey, privEllipticKey, finalEosioKeyAsString;
            return __generator(this, function (_a) {
                priv = privateKeysR1[0];
                privEosioKey = eosjs_key_conversions_1.PrivateKey.fromString(priv);
                privEllipticKey = privEosioKey.toElliptic();
                finalEosioKeyAsString = eosjs_key_conversions_1.PrivateKey.fromElliptic(privEllipticKey, eosjs_numeric_1.KeyType.r1).toString();
                expect(privEosioKey.toString()).toEqual(finalEosioKeyAsString);
                return [2 /*return*/];
            });
        }); });
        it('verify that public key validate function correctly assesses public keys', function () {
            var publicKey = eosjs_key_conversions_1.PublicKey.fromString(r1FormatPublicKeys[0]);
            expect(publicKey.isValid()).toEqual(true);
        });
        it('Ensure elliptic sign, recover, verify flow works', function () {
            var KPrivStr = privateKeysR1[0];
            var KPriv = eosjs_key_conversions_1.PrivateKey.fromString(KPrivStr);
            var dataAsString = 'some string';
            var ellipticHashedString = eosjs_key_conversions_1.sha256(dataAsString);
            var sig = KPriv.sign(ellipticHashedString);
            var KPub = sig.recover(ellipticHashedString);
            expect(KPub.toString()).toEqual(r1FormatPublicKeys[0]);
            var valid = sig.verify(ellipticHashedString, KPub);
            expect(valid).toEqual(true);
        });
        it('Ensure elliptic sign, recover, verify flow works with shouldHash', function () {
            var KPrivStr = privateKeysR1[0];
            var KPriv = eosjs_key_conversions_1.PrivateKey.fromString(KPrivStr);
            var dataAsString = 'some string';
            var sig = KPriv.sign(dataAsString, true);
            var KPub = sig.recover(dataAsString, true);
            expect(KPub.toString()).toEqual(r1FormatPublicKeys[0]);
            var valid = sig.verify(dataAsString, KPub, true);
            expect(valid).toEqual(true);
        });
        it('Ensure elliptic sign, recover, verify flow works with shouldHash and encoding', function () {
            var KPrivStr = privateKeysR1[0];
            var KPriv = eosjs_key_conversions_1.PrivateKey.fromString(KPrivStr);
            var dataAsString = 'some string';
            var sig = KPriv.sign(dataAsString, true, 'utf8');
            var KPub = sig.recover(dataAsString, true, 'utf8');
            expect(KPub.toString()).toEqual(r1FormatPublicKeys[0]);
            var valid = sig.verify(dataAsString, KPub, true, 'utf8');
            expect(valid).toEqual(true);
        });
    });
});
//# sourceMappingURL=eosjs-jssig.test.js.map