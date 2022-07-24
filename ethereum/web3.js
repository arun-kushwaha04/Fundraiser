import Web3 from 'web3';
let web3;

if (typeof window !== undefined && typeof window.web3 !== undefined) {
    // this means we are in a brwoser with metamask installed
    web3 = new Web3(window.web3.currentProvider);
} else {
    // this means we on the server or the user doesn't running metamask
    const provider = new Web3.providers.HttpProvider(
        'https://rinkeby.infura.io/orDImgKRzwNrVCDrAk5Q',
    );
    //we got a rinbey node hosted on infura
    web3 = new Web3(provider);
}

export default web3;