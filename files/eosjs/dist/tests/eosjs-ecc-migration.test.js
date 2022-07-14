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
var ecc = require('eosjs-ecc');
var eosjs_ecc_migration_1 = require("../eosjs-ecc-migration");
var eosjs_key_conversions_1 = require("../eosjs-key-conversions");
describe('ecc Migration', function () {
    var privateKeys = [
        '5Juww5SS6aLWxopXBAWzwqrwadiZKz7XpKAiktXTKcfBGi1DWg8',
        '5JnHjSFwe4r7xyqAUAaVs51G7HmzE86DWGa3VAA5VvQriGYnSUr',
        '5K4XZH5XR2By7Q5KTcZnPAmUMU5yjUNBdoKzzXyrLfmiEZJqoKE',
    ];
    var legacyPublicKeys = [
        'EOS7tgwU6E7pAUQJgqEJt66Yi8cWvanTUW8ZfBjeXeJBQvhTU9ypi',
        'EOS8VaY5CiTexYqgQZyPTJkc3qvWuZUi12QrZL9ssjqW2es6aQk2F',
        'EOS7VGhqctkKprW1VUj19DZZiiZLX3YcJqUJCuEcahJmUCw3wJEMu',
    ];
    it('verifies `initialize` returns console.error message', function () {
        console.error = jest.fn();
        eosjs_ecc_migration_1.ecc.initialize();
        expect(console.error).toHaveBeenCalledWith('Method deprecated');
    });
    it('verifies `unsafeRandomKey` returns console.error message', function () {
        console.error = jest.fn();
        eosjs_ecc_migration_1.ecc.unsafeRandomKey();
        expect(console.error).toHaveBeenCalledWith('Method deprecated');
    });
    it('verifies `randomKey` calls generateKeyPair', function () { return __awaiter(void 0, void 0, void 0, function () {
        var privateKey;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.warn = jest.fn();
                    return [4 /*yield*/, eosjs_ecc_migration_1.ecc.randomKey(0, { secureEnv: true })];
                case 1:
                    privateKey = _a.sent();
                    expect(console.warn).toHaveBeenCalledWith('Argument `cpuEntropyBits` is deprecated, ' +
                        'use the options argument instead');
                    expect(typeof privateKey).toEqual('string');
                    expect(eosjs_key_conversions_1.PrivateKey.fromString(privateKey).isValid()).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
    it('verifies `seedPrivate` returns console.error message', function () {
        console.error = jest.fn();
        eosjs_ecc_migration_1.ecc.seedPrivate();
        expect(console.error).toHaveBeenCalledWith('Method deprecated');
    });
    it('verifies `privateToPublic` function is consistent between ecc objects', function () {
        console.warn = jest.fn();
        var eccPublicKey = ecc.privateToPublic(privateKeys[0], 'EOS');
        var eccMigrationPublicKey = eosjs_ecc_migration_1.ecc.privateToPublic(privateKeys[0], 'EOS');
        expect(console.warn).toHaveBeenCalledWith('Argument `pubkey_prefix` is deprecated, ' +
            'keys prefixed with PUB_K1_/PUB_R1_/PUB_WA_ going forward');
        expect(eccPublicKey).toEqual(eccMigrationPublicKey);
    });
    it('verifies `isValidPublic` function is consistent between ecc objects', function () {
        console.warn = jest.fn();
        var eccValid = ecc.isValidPublic(legacyPublicKeys[0], 'EOS');
        var eccMigrationValid = eosjs_ecc_migration_1.ecc.isValidPublic(legacyPublicKeys[0], 'EOS');
        expect(console.warn).toHaveBeenCalledWith('Argument `pubkey_prefix` is deprecated, ' +
            'keys prefixed with PUB_K1_/PUB_R1_/PUB_WA_ going forward');
        expect(eccValid).toEqual(eccMigrationValid);
        expect(eccValid).toBeTruthy();
        expect(eccMigrationValid).toBeTruthy();
    });
    it('verifies `isValidPublic` function is consistent during an error', function () {
        console.warn = jest.fn();
        var eccValid = ecc.isValidPublic('publickey', 'EOS');
        var eccMigrationValid = eosjs_ecc_migration_1.ecc.isValidPublic('publickey', 'EOS');
        expect(console.warn).toHaveBeenCalledWith('Argument `pubkey_prefix` is deprecated, ' +
            'keys prefixed with PUB_K1_/PUB_R1_/PUB_WA_ going forward');
        expect(eccValid).toEqual(eccMigrationValid);
        expect(eccValid).toBeFalsy();
        expect(eccMigrationValid).toBeFalsy();
    });
    it('verifies `isValidPrivate` function is consistent between ecc objects', function () {
        var eccValid = ecc.isValidPrivate(privateKeys[0]);
        var eccMigrationValid = eosjs_ecc_migration_1.ecc.isValidPrivate(privateKeys[0]);
        expect(eccValid).toEqual(eccMigrationValid);
        expect(eccValid).toBeTruthy();
        expect(eccMigrationValid).toBeTruthy();
    });
    it('verifies `isValidPrivate` function is consistent during an error', function () {
        var eccValid = ecc.isValidPrivate('privatekey');
        var eccMigrationValid = eosjs_ecc_migration_1.ecc.isValidPrivate('privatekey');
        expect(eccValid).toEqual(eccMigrationValid);
        expect(eccValid).toBeFalsy();
        expect(eccMigrationValid).toBeFalsy();
    });
    it('verifies `sign`, `recover`, and `verify` functions are consistent between ecc objects', function () {
        var dataAsString = 'some string';
        var eccSig = ecc.sign(dataAsString, privateKeys[0], 'utf8');
        var eccMigrationSig = eosjs_ecc_migration_1.ecc.sign(dataAsString, privateKeys[0], 'utf8');
        // signatures are different
        expect(eccSig).not.toEqual(eccMigrationSig);
        var eccKPub = ecc.recover(eccSig, dataAsString, 'utf8');
        var eccMigrationKPub = eosjs_ecc_migration_1.ecc.recover(eccMigrationSig, dataAsString, 'utf8');
        expect(eccKPub).toEqual(eccMigrationKPub);
    });
    it('verifies `signHash`, `recoverHash`, and `sha256` functions are consistent between ecc objects', function () {
        console.warn = jest.fn();
        var dataAsString = 'some string';
        var eccHash = Buffer.from(ecc.sha256(dataAsString), 'hex');
        var eccMigrationHash = Buffer.from(eosjs_ecc_migration_1.ecc.sha256(dataAsString, 'hex', 'utf8'), 'hex');
        expect(console.warn).toBeCalledWith('Argument `encoding` is deprecated');
        expect(console.warn).toBeCalledWith('Argument `resultEncoding` is deprecated');
        expect(eccHash).toEqual(eccMigrationHash);
        var eccSig = ecc.signHash(eccHash, privateKeys[0], 'utf8');
        var eccMigrationSig = eosjs_ecc_migration_1.ecc.signHash(eccMigrationHash, privateKeys[0], 'utf8');
        // signatures are different
        expect(eccSig).not.toEqual(eccMigrationSig);
        var eccKPub = ecc.recoverHash(eccSig, eccHash, 'utf8');
        var eccMigrationKPub = eosjs_ecc_migration_1.ecc.recoverHash(eccSig, eccMigrationHash, 'utf8');
        expect(eccKPub).toEqual(eccMigrationKPub);
    });
});
//# sourceMappingURL=eosjs-ecc-migration.test.js.map