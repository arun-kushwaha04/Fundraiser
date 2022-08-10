// import dotenv from 'dotenv';
import Web3 from 'web3';
let web3;

// dotenv.config();
const configureWeb3 = async() => {
  if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
      // this means we are in a brwoser with metamask installed
      web3 = new Web3(ethereum);

      try {
          //requesting access to metamask account if required
          await ethereum.enable();
      } catch (e) {
        console.log(e);
        throw e;
      }
  } else {
      // this means we on the server or the user doesn't running metamask
      const provider = new Web3.providers.HttpProvider(
          process.env.RINKBEY_INFURA_NODE,
      );
      //we got a rinbey node hosted on infura
      web3 = new Web3(provider);
  }
}
configureWeb3();
export default web3;
