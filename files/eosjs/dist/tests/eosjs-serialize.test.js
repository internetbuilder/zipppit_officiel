"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _a = require('util'), TextEncoder = _a.TextEncoder, TextDecoder = _a.TextDecoder;
var eosjs_serialize_1 = require("../eosjs-serialize");
describe('Serialize', function () {
    var types;
    beforeAll(function () {
        types = eosjs_serialize_1.createInitialTypes();
    });
    it('should be able to createInitialTypes', function () {
        expect(types).toBeTruthy();
    });
    describe('pushAsset', function () {
        var serialBuffer;
        var genericValidSymbolCharacter = 'A';
        var invalidSymbolErrorMessage = 'Expected symbol to be A-Z and between one and seven characters';
        beforeEach(function () {
            serialBuffer = new eosjs_serialize_1.SerialBuffer({
                textEncoder: new TextEncoder(),
                textDecoder: new TextDecoder()
            });
        });
        var expectSuccessForICharactersSymbol = function (i) {
            var symbol = genericValidSymbolCharacter.repeat(i);
            var asset = "10.000 " + symbol;
            serialBuffer.pushAsset(asset);
            expect(serialBuffer.length).not.toBe(0);
        };
        var expectExceptionThrown = function (asset) {
            var exceptionCaught = false;
            try {
                serialBuffer.pushAsset(asset);
            }
            catch (e) {
                expect(e.message).toBe(invalidSymbolErrorMessage);
                exceptionCaught = true;
            }
            expect(exceptionCaught).toBeTruthy();
        };
        var _loop_1 = function (i) {
            it("should be able to push asset with valid symbol of " + i + " character(s)", function () {
                expectSuccessForICharactersSymbol(i);
            });
        };
        for (var i = 1; i <= 7; i++) {
            _loop_1(i);
        }
        it('should be able to push asset with valid EOS symbol "10.000 EOS"', function () {
            var asset = '10.000 EOS';
            serialBuffer.pushAsset(asset);
            expect(serialBuffer.length).not.toBe(0);
        });
        it('should not be able to push no symbol "10.000 "', function () {
            var asset = '10.000 ';
            expectExceptionThrown(asset);
        });
        it('should not be able to push symbol with 8 or more characters "10.000 AAAAAAAA"', function () {
            var asset = '10.000 AAAAAAAA';
            expectExceptionThrown(asset);
        });
        it('should not be able to push invalid lowercase symbol "10.000 eos"', function () {
            var asset = '10.000 eos';
            expectExceptionThrown(asset);
        });
        it('should not be able to push two symbols "10.000 EOS blah"', function () {
            var asset = '10.000 EOS blah';
            expectExceptionThrown(asset);
        });
    });
    describe('name', function () {
        var serialBuffer;
        var invalidNameErrorMessage = 'Name should be less than 13 characters, or less than 14 if last character is between 1-5 or a-j, and only contain the following symbols .12345abcdefghijklmnopqrstuvwxyz';
        beforeEach(function () {
            serialBuffer = new eosjs_serialize_1.SerialBuffer({
                textEncoder: new TextEncoder(),
                textDecoder: new TextDecoder()
            });
        });
        it('should be able to push name with a valid account name', function () {
            var name = '.12345abcdefg';
            serialBuffer.pushName(name);
            expect(serialBuffer.getName()).toEqual(name);
        });
        it('should remove the `.` character from the end of the account name', function () {
            var name = 'abcd......';
            var expectedName = 'abcd';
            serialBuffer.pushName(name);
            expect(serialBuffer.getName()).toEqual(expectedName);
        });
        it('should not be able to push name with an account name too long', function () {
            var name = 'abcdabcdabcdab';
            var shouldFail = function () { return serialBuffer.pushName(name); };
            expect(shouldFail).toThrowError(invalidNameErrorMessage);
        });
        it('should not be able to push name with an account name with invalid characters', function () {
            var name = '6789$/,';
            var shouldFail = function () { return serialBuffer.pushName(name); };
            expect(shouldFail).toThrowError(invalidNameErrorMessage);
        });
    });
    describe('bool', function () {
        var boolType;
        var mockedBuffer;
        var shouldThrowErrorForValue = function (value) {
            try {
                boolType.serialize(mockedBuffer, value);
            }
            catch (e) {
                expect(e.message).toBe('Expected boolean or number equal to 1 or 0');
            }
        };
        var shouldNotThrowErrorForValue = function (value) {
            expect(function () {
                boolType.serialize(mockedBuffer, value);
            }).not.toThrow();
        };
        beforeAll(function () {
            boolType = types.get('bool');
            mockedBuffer = Object.create(eosjs_serialize_1.SerialBuffer);
            mockedBuffer.push = jest.fn().mockImplementation(function (value) {
                return;
            });
        });
        it('should be able to create bool type', function () {
            expect(boolType).toBeTruthy();
        });
        it('should throw error when calling serialize when type is not boolean or number', function () {
            var dataValue = 'string';
            shouldThrowErrorForValue(dataValue);
        });
        it('should throw error when calling serialize when number that is not 1 or 0', function () {
            var dataValue = 10;
            shouldThrowErrorForValue(dataValue);
        });
        it('should not throw error when calling serialize with false', function () {
            var dataValue = false;
            shouldNotThrowErrorForValue(dataValue);
        });
        it('should not throw error when calling serialize with true', function () {
            var dataValue = true;
            shouldNotThrowErrorForValue(dataValue);
        });
        it('should not throw error when calling serialize with 0', function () {
            var dataValue = 0;
            shouldNotThrowErrorForValue(dataValue);
        });
        it('should not throw error when calling serialize with 1', function () {
            var dataValue = 1;
            shouldNotThrowErrorForValue(dataValue);
        });
    });
});
//# sourceMappingURL=eosjs-serialize.test.js.map