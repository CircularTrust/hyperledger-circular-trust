const jwt = require('jsonwebtoken');
const {generateKeyPairSync} = require('crypto');
const fs = require('fs');

const REGENERATE_KEYS = true;

let publicKey = '';
let privateKey = '';
if (REGENERATE_KEYS) {
    const keyPair = generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem'
        }
    });
    publicKey = keyPair.publicKey;
    privateKey = keyPair.privateKey;
    fs.writeFileSync('./keys/rpcPublicKey.pem', publicKey);
    fs.writeFileSync('./keys/rpcPrivateKey.pem', privateKey);
} else {
    publicKey = fs.readFileSync('./keys/rpcPublicKey.pem').toString();
    privateKey = fs.readFileSync('./keys/rpcPrivateKey.pem').toString();
}

const token = jwt.sign(
{
       permissions: ["*:*"],
       exp: 2524608000000
   }, privateKey, { algorithm: 'RS256'});

console.log("Token:")
console.log(token)

