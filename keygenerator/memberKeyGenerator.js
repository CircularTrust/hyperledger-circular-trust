const {randomBytes} = require("crypto");
const secp256k1 = require("secp256k1");
const keccak = require("keccak");
const fs = require('fs');

// For using a fixed private key, comment and uncomment the next two lines
// const fixedPrivateKey = "";
const fixedPrivateKey = null;

function generatePrivateKey() {
    if (fixedPrivateKey) {
        return Buffer.from(fixedPrivateKey, 'hex');
    } else {
        let privKey;
        do {
            privKey = randomBytes(32);
        } while (!secp256k1.privateKeyVerify(privKey));
        return privKey;
    }
}

function derivePublicKey(privKey) {
    const pubKey = secp256k1.publicKeyCreate(privKey, false).slice(1);
    return Buffer.from(pubKey);
}

function deriveAddress(pubKey) {
    if (!Buffer.isBuffer(pubKey)) {
        console.error("ERROR - pubKey is not a buffer");
        process.exit();
    }
    const keyHash = keccak('keccak256').update(pubKey).digest();
    return keyHash.slice(Math.max(keyHash.length - 20, 1));
}

let privateKey = generatePrivateKey();
let publicKey = derivePublicKey(privateKey);
let address = deriveAddress(publicKey);

if (!fs.existsSync('./keys')) {
    fs.mkdirSync('./keys')
}

fs.writeFile('./keys/nodekey', privateKey.toString('hex'), err => {
    if (err) {
        console.error(err);
    }
})

fs.writeFile('./keys/nodekey.pub', publicKey.toString('hex'), err => {
    if (err) {
        console.error(err);
    }
})

fs.writeFile('./keys/address', `0x${address.toString('hex')}`, err => {
    if (err) {
        console.error(err);
    }
})

console.log("PrivateKey: ", privateKey.toString('hex'));
console.log("PublicKey: ", publicKey.toString('hex'));
console.log("Address: ", `0x${address.toString('hex')}`);
