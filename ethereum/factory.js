import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

// instance has address of already deployed factory instance
const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x00a71cAb97cC35e1A5470cE4B5af2061E3D3e592'
);

export default instance;