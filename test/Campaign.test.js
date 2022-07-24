const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledFactory = require('../ethereum/build/CampaignFactory.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');

let accounts;
let factory;
let campaignAddress;
let campaign;

//before running each test
beforeEach(async() => {
    accounts = await web3.eth.getAccounts();

    const balance = await web3.eth.getBalance(accounts[0]);
    console.log(balance);

    factory = await new web3.eth.Contract(compiledFactory.abi)
        .deploy({ data: compiledFactory.evm.bytecode.object })
        .send({ from: accounts[0], gas: '6721975' });

    //creating campaign with minimun contribution of 100 wei using account at 0 index from factory campaign.
    await factory.methods.createCampaign('100').send({
        from: accounts[0],
        gas: '6721975',
    });

    //getting campaign address using factory campaing method
    [campaignAddress] = await factory.methods.getDeployedCampaigns().call();
    campaign = await new web3.eth.Contract(compiledCampaign.abi, campaignAddress);
});

//writing unit test to test different functionality of the contract
describe('Campaign', () => {
    it('check for proper deployment of factory and campaign contract', () => {
        assert.ok(factory.options.address);
        assert.ok(campaign.options.address);
    });

    it('account used for creating the contract should be stord correctly in managers address', async() => {
        const manager = await campaign.methods.manager().call();
        assert.equal(accounts[0], manager);
    });

    it('camaign has some minimun contribution to be added as contribution', async() => {
        //we already during contract creation set the min contri to 100 wei
        try {
            await campaign.methods.contribute().send({
                value: '5',
                from: accounts[1],
            });
            assert(false);
        } catch (error) {
            assert(error);
        }
    });

    it('checking if campaign allow people to become contribution when sending minimum contri', async() => {
        await campaign.methods.addContributers().send({
            value: '101',
            from: accounts[1],
        });
        const isAContributor = await campaign.methods
            .contributers(accounts[1])
            .call();
        assert(isAContributor);
    });

    it('only allow manager to create a payment request', async() => {
        try {
            await campaign.methods.createRequest('test', '50000', accounts[1]).send({
                gas: '6721975',
                from: accounts[1],
            });
            assert(false);
        } catch (error) {
            assert(error);
        }
    });
    it('checking if the contract allows the manager to create a payment request', async() => {
        await campaign.methods
            .createRequest(
                'Raising money for buying motor components',
                '500',
                accounts[1],
            )
            .send({
                from: accounts[0],
                gas: '6721975',
            });

        let requestCount = await campaign.methods.getRequestsCount().call();
        assert(requestCount > 0);
    });
    it('allow manager to apporve a request', async() => {
        await campaign.methods.addContributers().send({
            value: web3.utils.toWei('10', 'ether'),
            from: accounts[1],
        });
        await campaign.methods
            .createRequest(
                'Raising money for buying motor components',
                web3.utils.toWei('10', 'ether'),
                accounts[2],
            )
            .send({
                from: accounts[0],
                gas: '6721975',
            });
        await campaign.methods.approveRequest(0).send({
            from: accounts[1],
            gas: '6721975',
        });
        await campaign.methods.finalizeRequest(0).send({
            from: accounts[0],
            gas: '6721975',
        });

        let balance = await web3.eth.getBalance(accounts[2]);
        balance = web3.utils.fromWei(balance, 'ether');
        balance = parseFloat(balance);

        assert(balance > 104);
    });
    it('only allow contributers to approve a request', async() => {
        try {
            await campaign.methods.approveRequest(0).send({
                from: accounts[1],
                gas: '6721975',
            });
            assert(false);
        } catch (error) {
            assert(error);
        }
    });
    it('only allow manager to finalize a request', async() => {
        try {
            await campaign.methods
                .createRequest(
                    'Raising money for buying motor components',
                    web3.utils.toWei('10', 'ether'),
                    accounts[2],
                )
                .send({
                    from: accounts[0],
                    gas: '6721975',
                });
            await campaign.methods.finalizeRequest(0).send({
                from: accounts[1],
                gas: '6721975',
            });
            assert(false);
        } catch (error) {
            assert(error);
        }
    });
    it('manager can only process request if it has enough approvers', async() => {
        try {
            await campaign.methods.addContributers().send({
                value: web3.utils.toWei('10', 'ether'),
                from: accounts[1],
            });
            await campaign.methods
                .createRequest(
                    'Raising money for buying motor components',
                    web3.utils.toWei('10', 'ether'),
                    accounts[2],
                )
                .send({
                    from: accounts[0],
                    gas: '6721975',
                });
            await campaign.methods.finalizeRequest(0).send({
                from: accounts[0],
                gas: '6721975',
            });
            assert(false);
        } catch (error) {
            assert(error);
        }
    });
});