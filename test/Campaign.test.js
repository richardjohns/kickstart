const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledFactory = require('../ethereum/build/CampaignFactory.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');

let accounts;
let factory; // ie deployed instance of factory
let campaignAddress;
let campaign;

beforeEach (async () => {
    accounts = await web3.eth.getAccounts();

    factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({ data: compiledFactory.bytecode })
        .send({ from: accounts[0], gas: '1000000' });

        await factory.methods.createCampaign('100').send({
            from: accounts[0],
            gas: '1000000'
        });
        // destructuring first element out of an array and assigning as campaignAddress
        [campaignAddress] = await factory.methods.getDeployedCampaigns().call();

        campaign = await new web3.eth.Contract(
            JSON.parse(compiledCampaign.interface),
            campaignAddress
        );
});

describe('Campaigns', () => {
    it('deploys a factory and a campaign', () => {
        assert.ok(factory.options.address);
        assert.ok(campaign.options.address);
    })

    it('marks caller as the campaign manager', async () => {
        const manager = await campaign.methods.manager().call();
        assert.equal(accounts[0], manager);
    })

    it('allows people to contribute money, and marks them as approvers', async () => {
        await campaign.methods.contribute().send({
            value: '200',
            from: accounts[1]
        });
        const isContributor = await campaign.methods.approvers(accounts[1]).call();
        assert(isContributor);
    })

    it('requires a minimum contribution', async () => {
        try {
            await campaign.methods.contribute().send({
                value: '5',
                from: accounts[1]
            });
            // assert below ensures that if try block executes then the test will fail... ie a fallback.
            assert(false);
        } catch(err) {
            assert(err);
        }
    });

    it('allows a manager to make a payment request', async () => {
        await campaign.methods
            .createRequest('buy batteries', '100', accounts[1])
            .send({
                from: accounts[0],
                gas: '1000000'
            })
        // call requests struct from contract in order to check result, ie no return values are received so have to go get.
        const request = await campaign.methods.requests(0).call();
        assert.equal('buy batteries', request.description);
    })

    it('processes request (end-to-end test)', async () => {
        await campaign.methods.contribute().send({
            from: accounts[0],
            value: web3.utils.toWei('10', 'ether')
        })

        await campaign.methods
            .createRequest('A', web3.utils.toWei('5', 'ether'), accounts[1])
            .send({ from: accounts[0], gas: '1000000'});

        await campaign.methods.approveRequest(0).send({
            from: accounts[0],
            gas: '1000000'
        })

        await campaign.methods.finalizeRequest(0).send({
            from: accounts[0],
            gas: '1000000'
        })

        // let for reassignment of balance
        let balance = await web3.eth.getBalance(accounts[1]);
        // balance will be a string so will need float for comparison
        balance = web3.utils.fromWei(balance, 'ether');
        balance = parseFloat(balance);
        console.log('      This is balance: ',balance)
        // Can be point of failure if ganache account balance is higher due to other tests.
        assert(balance > 104)
    })

});

