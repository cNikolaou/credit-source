# Credit Source

Credit Source is a web application that depends on the `CreditRequest.sol` contract.
It aims to allow the underwriting of credit lines from vouchers to requesters,
where the the first group of people doesn't know how much they can trust the other.

Credit Source aims to provide more information about the requesters that might
be valuable to the vouchers.

Providing lines of credit is a risky operation and the additional information
might not be enough. We, by no means, vouch for any requester, and you should
assume that any line of credit is very risky and will likely result to a default
so you can adjust the interest accordingly.

The information that Credit Source currently provides:
- Current credit lines on [Union Protocol]()
    alongside repayments and amount borrowed so far.
- Ownership of native currencies.
- Ownership of tokens and NFTs, when they are used as filters.


## Smart Contract
The smart contract `contract-hardhat/contracts/CreditRequest.sol` is currently
deployed on Arbitrum Goerli at: 0x1646b92dc747103ec0F6E71914B8Eca18ca21648

The smart contract keeps track of the line of credit that users have requested
and it is updated only by the users' themselves.

To deploy the smart contract:

```bash
cd contract-hardhat/
npx hardhat run scripts/deploy.js --network arbitrumGoerli
```

## Web Application

The web application is built with Next.js.

To run the development server:

```bash
npm run dev
```
