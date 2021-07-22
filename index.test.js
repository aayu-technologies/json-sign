const {getSignatureByKeyFile, verifySignatureByKeyFile} = require('./index');
const assert = require('assert').strict;

const PRIVATE_KEY_FILE = 'test-keys/private.pem';
const PUBLIC_KEY_FILE = 'test-keys/public.pem';

const OBJ_1 = {a: 123, b: "foo", c: true};
const OBJ_2 = {a: 123, c: true, b: "foo"}; // Order of keys are changed
const OBJ_3 = {a: 123, b: "bar", c: true}; // Values are changed
const OBJ_4 = {a: 123, b: "foo"}; // Less fields
const OBJ_5 = {a: 123, b: "foo", c: true, d: 'bar'}; // More fields


describe('Unit Tests', () => {
    it('Test - Same Field Order', () => {
        const signature = getSignatureByKeyFile(OBJ_1, PRIVATE_KEY_FILE);
        const isValid = verifySignatureByKeyFile(OBJ_1, signature, PUBLIC_KEY_FILE);
        assert.equal(isValid, true);
    });

    it('Test - Different Field Order', () => {
        const signature = getSignatureByKeyFile(OBJ_1, PRIVATE_KEY_FILE);
        const isValid = verifySignatureByKeyFile(OBJ_2, signature, PUBLIC_KEY_FILE);
        assert.equal(isValid, true);
    });

    it('Test - Field Value Changed', () => {
        const signature = getSignatureByKeyFile(OBJ_1, PRIVATE_KEY_FILE);
        const isValid = verifySignatureByKeyFile(OBJ_3, signature, PUBLIC_KEY_FILE);
        assert.equal(isValid, false);
    });

    it('Test - Less Fields', () => {
        const signature = getSignatureByKeyFile(OBJ_1, PRIVATE_KEY_FILE);
        const isValid = verifySignatureByKeyFile(OBJ_4, signature, PUBLIC_KEY_FILE);
        assert.equal(isValid, false);
    });

    it('Test - More Fields', () => {
        const signature = getSignatureByKeyFile(OBJ_1, PRIVATE_KEY_FILE);
        const isValid = verifySignatureByKeyFile(OBJ_5, signature, PUBLIC_KEY_FILE);
        assert.equal(isValid, false);
    });
});
