// import dotenv from 'dotenv';
import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

// dotenv.config();

const instance = new web3.eth.Contract(
    CampaignFactory.abi,
    process.env.DEPLOYED_CONTRACT_ADDRESS,
);

export default instance;
