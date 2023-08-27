const { expect } = require('chai');

describe('CreditRequest', function () {
  it('Deployment should start from a zero-request state', async function () {
    const [owner] = await ethers.getSigners();

    const creditRequest = await ethers.deployContract('CreditRequest');

    const requestedCredit = await creditRequest.getRequestedCredit(owner.address);
    expect(requestedCredit).to.equal(0);
  });

  it('Increasing the requested amount requested by non-owner', async function () {
    const [owner, addr1] = await ethers.getSigners();

    const creditRequest = await ethers.deployContract('CreditRequest');

    await creditRequest.connect(addr1).increaseRequest(50);

    const addr1RequestedCredit = await creditRequest.getRequestedCredit(addr1.address);
    expect(addr1RequestedCredit).to.equal(50);

    const ownerRequestedCredit = await creditRequest.getRequestedCredit(owner.address);
    expect(ownerRequestedCredit).to.equal(0);
  });

  it('Multiple increases of requested amount', async function () {
    const [owner, addr1] = await ethers.getSigners();

    const creditRequest = await ethers.deployContract('CreditRequest');

    await creditRequest.connect(addr1).increaseRequest(50);

    const addr1RequestedCreditStart = await creditRequest.getRequestedCredit(addr1.address);
    expect(addr1RequestedCreditStart).to.equal(50);

    await creditRequest.connect(addr1).increaseRequest(30);

    const addr1RequestedCreditEnd = await creditRequest.getRequestedCredit(addr1.address);
    expect(addr1RequestedCreditEnd).to.equal(80);

    const requestersList = await creditRequest.getAddressesWithRequests();
    expect(requestersList.length).to.equal(1);
    expect(requestersList[0]).to.equal(addr1.address);
  });

  it('Increase and then decrease requested amount', async function () {
    const [owner, addr1] = await ethers.getSigners();

    const creditRequest = await ethers.deployContract('CreditRequest');

    await creditRequest.connect(addr1).increaseRequest(50);

    const addr1RequestedCreditStart = await creditRequest.getRequestedCredit(addr1.address);
    expect(addr1RequestedCreditStart).to.equal(50);

    await creditRequest.connect(addr1).decreaseRequest(30);

    const addr1RequestedCreditEnd = await creditRequest.getRequestedCredit(addr1.address);
    expect(addr1RequestedCreditEnd).to.equal(20);

    const requestersList = await creditRequest.getAddressesWithRequests();
    expect(requestersList.length).to.equal(1);
    expect(requestersList[0]).to.equal(addr1.address);
  });

  it('Decreasing requested amount results to 0 when the decrease is greater than the decrease', async function () {
    const [owner, addr1] = await ethers.getSigners();

    const creditRequest = await ethers.deployContract('CreditRequest');

    await creditRequest.connect(addr1).increaseRequest(50);

    const addr1RequestedCreditStart = await creditRequest.getRequestedCredit(addr1.address);
    expect(addr1RequestedCreditStart).to.equal(50);

    await creditRequest.connect(addr1).decreaseRequest(100);

    const addr1RequestedCreditEnd = await creditRequest.getRequestedCredit(addr1.address);
    expect(addr1RequestedCreditEnd).to.equal(0);

    const requestersList = await creditRequest.getAddressesWithRequests();
    expect(requestersList.length).to.equal(0);
  });
});
