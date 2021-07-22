# JSON Sign

This is a utility that can be used to generate a signature for a JSON object and to verify such a signature against a
JSON object.

## Installation

This module can be installed via NPM.

`npm install @aayu-tech/json-sign --save`

## Generating a key-pair

A private-public key pair is required for the signing and verification operations. You can generate such a key pair
using `openssl` as follows.

#### Generate Private Key
`openssl genrsa -out private.pem 2048`

This will generate a Private Key and store it in to the `private.pem` file.

#### Export the Public Key
`openssl rsa -in private.pem -outform PEM -pubout -out public.pem`

This will export the Public key of the previously created Private Key it in to the `public.pem` file.

## Generate a Signature

#### By providing Private Key content

```
const {getSignatureByKey} = require('@aayu-tech/json-sign');

const obj = {a: 123, b: "foo", c: true};
const signature = getSignatureByKey(obj, '-----BEGIN RSA PRIVATE KEY-----\nMIIEowIBAA....\n-----END RSA PRIVATE KEY-----\n');
```

#### By providing Private Key file path

```
const {getSignatureByKeyFile} = require('@aayu-tech/json-sign');

const obj = {a: 123, b: "foo", c: true};
const signature = getSignatureByKeyFile(obj, 'private.pem');
```

## Verify a Signature

#### By providing Signature and Public Key content

```
const {verifySignatureByKey} = require('@aayu-tech/json-sign');

const obj = {a: 123, b: "foo", c: true};
const signature = 'kZNzGnfoFYqunxRo/CPoSep6TXfbhtkqACYX70D1leh/bRe+AAI.......';
const isValid = verifySignatureByKey(obj, signature, '-----BEGIN PUBLIC KEY-----\nMIIBIjAN......\n-----END PUBLIC KEY-----');
```

#### By providing Signature and Public Key file path

```
const {verifySignatureByKeyFile} = require('@aayu-tech/json-sign');

const obj = {a: 123, b: "foo", c: true};
const signature = 'kZNzGnfoFYqunxRo/CPoSep6TXfbhtkqACYX70D1leh/bRe+AAI.......';
const isValid = verifySignatureByKeyFile(obj, signature, 'public.pem');
```

