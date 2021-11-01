/*
 * Copyright (c) 2021 Aayu Technologies LLC. (https://aayutechnologies.com/).
 */

/**
 * Generates the signature for a JSON payload using the provided RSA private key
 * @param jsonPayload JSON object to generate the signature for
 * @param privateKey RSA private key value to be used for the signing
 */
export function getSignatureByKey(jsonPayload: { [key: string]: any }, privateKey: string): string;

/**
 * Generates the signature for a JSON payload using the provided RSA private key
 * @param jsonPayload JSON object to generate the signature for
 * @param privateKeyFile RSA private key file to be used for the signing
 */
export function getSignatureByKeyFile(jsonPayload: { [key: string]: any }, privateKeyFile: string): string;

/**
 * Verifies a signature against a JSON payload using the provided RSA public key
 * @param jsonPayload JSON object to verify the signature for
 * @param signature Signature to be verified
 * @param publicKey RSA public key value to be used for the verification
 */
export function verifySignatureByKey(jsonPayload: { [key: string]: any }, signature: string, publicKey: string): boolean;

/**
 * Verifies a signature against a JSON payload using the provided RSA public key
 * @param jsonPayload JSON object to verify the signature for
 * @param signature Signature to be verified
 * @param publicKeyFile RSA public key file to be used for the verification
 */
export function verifySignatureByKeyFile(jsonPayload: { [key: string]: any }, signature: string, publicKeyFile: string): boolean;


