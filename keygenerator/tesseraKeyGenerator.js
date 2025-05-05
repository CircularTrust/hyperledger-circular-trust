const nacl = require ("tweetnacl");
const fs = require("fs");

const keyPairUint8Array = nacl.box.keyPair();

if (!fs.existsSync('./keys')) {
    fs.mkdirSync('./keys')
}

let aux = `{"data":{"bytes":"${Buffer.from(keyPairUint8Array.secretKey).toString("base64")}"},"type":"unlocked"}`

fs.writeFile('./keys/tm.key', aux, err => {
    if (err) {
        console.error(err);
    }
})

fs.writeFile('./keys/tm.pub', Buffer.from(keyPairUint8Array.publicKey).toString("base64"), err => {
    if (err) {
        console.error(err);
    }
})

console.log("PrivateKey: ", Buffer.from(keyPairUint8Array.secretKey).toString("base64"));
console.log("PublicKey: ", Buffer.from(keyPairUint8Array.publicKey).toString("base64"));