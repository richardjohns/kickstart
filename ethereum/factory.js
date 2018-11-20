import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

// instance has address of already deployed factory instance
// save the new address of the factory if you re-compile and deploy. Then restart server to check factory can be interacted with.
const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0xFf78ac01eBDb557D32E3e6054D4e9ecc594E5Dd7'
);

export default instance;