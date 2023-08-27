// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract CreditRequest {
    address public owner;

    mapping(address => uint256) public requests;
    address[] public addressesWithRequests;

    event IncreasedRequest(address requester, uint256 amount);
    event DecreasedRequest(address requester, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    function increaseRequest(uint256 amount) public {
        if (requests[msg.sender] == 0 && amount > 0) {
            addressesWithRequests.push(msg.sender);
        }
        requests[msg.sender] += amount;
        emit IncreasedRequest(msg.sender, amount);
    }

    function decreaseRequest(uint256 amount) public {
        if (requests[msg.sender] <= amount) {
            requests[msg.sender] = 0;
        } else {
            requests[msg.sender] -= amount;
        }
        if (requests[msg.sender] == 0) {
            removeAddressFromList(msg.sender);
        }
        emit DecreasedRequest(msg.sender, amount);
    }

    function removeAddressFromList(address _address) internal {
        uint index = 0;
        while (addressesWithRequests[index] != _address) {
            index++;
        }
        addressesWithRequests[index] = addressesWithRequests[addressesWithRequests.length - 1];
        addressesWithRequests.pop();
    }

    function getRequestedCredit(address _requester) external view returns (uint256) {
        return requests[_requester];
    }

    function getAddressesWithRequests() public view returns (address[] memory) {
        return addressesWithRequests;
    }
}
