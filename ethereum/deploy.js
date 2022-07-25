// this script deploy the complied contract from build to etherum network
require('dotenv').config();
const HDWalledtProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');

console.log(process.env.METAMASK_ACCOUNT_MEMONIC);
const provider = new HDWalledtProvider({
    mnemonic: {
        phrase: process.env.METAMASK_ACCOUNT_MEMONIC,
    },
    providerOrUrl: process.env.RINKBEY_INFURA_NODE,
});
const web3 = new Web3(provider);

const deploy = async() => {
    const accounts = await web3.eth.getAccounts();

    //now deploying the complied contract on the infura rinkbey node.
    const result = await new web3.eth.Contract(compiledFactory.abi)
        .deploy({ data: compiledFactory.evm.bytecode.object })
        .send({ gas: '6721975', from: accounts[0] });

    console.log('Contracts deployed to', result.options.address);
};

deploy();