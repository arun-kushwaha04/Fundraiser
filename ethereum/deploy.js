// this script deploy the complied contract from build to etherum network

const HDWalledtProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');

const provider = new HDWalledtProvider(
    //your mimic code
    //a rinkbey node on infura
    'https://rinkeby.infura.io/orDImgKRzwNrVCDrAk5Q',
);
const web3 = new Web3(provider);

const deploy = async() => {
    const accounts = await web3.eth.getAccounts();

    //now deploying the complied contract on the infura rinkbey node.
    const result = await new web3.eth.Contract(
            JSON.parse(compiledFactory.interface),
        )
        .deploy({ data: compiledFactory.bytecode })
        .send({ gas: '1000000', from: accounts[0] });

    console.log('Contracts deployed to', result.options.address);
};