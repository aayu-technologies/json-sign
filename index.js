/*
 * Copyright (c) 2021 Aayu Technologies LLC. (https://aayutechnologies.com/).
 */
const fs = require('fs');
const NodeRSA = require('node-rsa');

module.exports = {
    getSignatureByKey,
    getSignatureByKeyFile,
    verifySignatureByKey,
    verifySignatureByKeyFile
};

function getSignatureByKey(jsonPayload, privateKey) {
    const privateK = getPrivateKey(privateKey);
    const jsonStr = sortAndStringify(jsonPayload);
    return privateK.sign(jsonStr, 'base64', 'utf-8');
}

function getSignatureByKeyFile(jsonPayload, privateKeyFile) {
    return getSignatureByKey(jsonPayload, readFile(privateKeyFile));
}

function verifySignatureByKey(jsonPayload, signature, publicKey) {
    const publicK = getPublicKey(publicKey);
    const jsonStr = sortAndStringify(jsonPayload);
    return publicK.verify(jsonStr, signature, 'utf-8', 'base64');
}

function verifySignatureByKeyFile(jsonPayload, signature, publicKeyFile) {
    return verifySignatureByKey(jsonPayload, signature, readFile(publicKeyFile));
}

/* Utility functions */

function readFile(filePath) {
    try {
        return fs.readFileSync(filePath, {encoding: 'utf-8'});
    } catch (err) {
        throw new Error('Failed to read file:' + filePath + '\n' + err);
    }
}

function getPublicKey(publicKeyStr) {
    const pubKey = new NodeRSA(publicKeyStr);
    if (!pubKey.isPrivate()) {
        return pubKey;
    } else {
        throw new Error('Provided key is not a Public Key');
    }
}

function getPrivateKey(privateKeyStr) {
    const privateKey = new NodeRSA(privateKeyStr);
    if (privateKey.isPrivate()) {
        return privateKey;
    } else {
        throw new Error('Provided key is not a Private Key');
    }
}

function sortAndStringify(jsonPayload) {
    const sorted = {};
    Object.keys(jsonPayload).sort().forEach(k => {
        sorted[k] = jsonPayload[k];
    });
    return JSON.stringify(sorted);
}
