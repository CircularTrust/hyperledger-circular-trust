import Web3 from 'web3';

const Config = {
    url: 'http://127.0.0.1:8545',
    token: '',
    privKey: '',
    to: '',
    value: '',
}

const token = `Bearer ${Config}`;

const web3 = new Web3(new Web3.providers.HttpProvider(Config.url, {headers: [{name: 'Authorization', value: token}]}));

const validatorWalletPrivateKey = "";

const claimDataTx = {
    to: Config.to,
    value: Config.value,
    gasPrice: "0x174876E800", // 100 GWei
    gasLimit: "0x5208" // 21k single transaction
}

console.log("create and sign the txn")
const signedTx = await web3.eth.accounts.signTransaction(claimDataTx, validatorWalletPrivateKey);
console.log("sending the txn")
const txReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
console.log("tx transactionHash: " + txReceipt.transactionHash);
