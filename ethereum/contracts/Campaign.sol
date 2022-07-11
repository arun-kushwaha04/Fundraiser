//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CampaignFactory {
  address[] public deployedCampaigns;

  constructor(uint minimumContri){
    address newCampaign = address(new Campaign(minimumContri, msg.sender));
    deployedCampaigns.push(newCampaign);
  }

  function getDeployedCampaigns() public view returns (address [] memory) {
    return deployedCampaigns;
  }
}

contract Campaign{
  struct Request{
    string description;
    uint moneyRequired;
    address payable recepient;
    bool isCompleted;
    uint approversCount;
    mapping(address => bool) approvers;
  }

  Request[] public campaignRequest;
  address public manager;
  uint public minimunContribution;
  uint public contributersCount;
  mapping(address => bool) public contributers;

  //setting manager and minimum wei required to become a contributer to the campaign
  constructor(uint minimun, address contractManager){
    manager = contractManager;
    minimunContribution = minimun;
    contributersCount = 0;
  }

  //modifier for allowing contract's manager to modifiy data.
  modifier restricted(){
    require(msg.sender == manager);
    _;
  }

  //function to add contributers to the campaign
  function addContributers() public payable{
    require(msg.value > minimunContribution);

    contributers[msg.sender] = true;
    contributersCount++;
  }

  //fucntion to create a request for spending wei by manager
  function createRequest(string memory description, uint moneyRequired, address recepient) public restricted{
    //gives error in solidity version > 0.8.0 as newer version doesn't allow mapping to stored in memory.

    // Request memory newRequest = Request({
    //   description: description,
    //   moneyRequired: moneyRequired,
    //   recepient: recipient,
    //   isCompleted: false,
    //   approversCount: 0
    // });

    // campaignRequest.push(newRequest);

    Request storage newRequest = campaignRequest.push();
    newRequest.description = description;
    newRequest.moneyRequired = moneyRequired;
    newRequest.recepient = payable(recepient);
    newRequest.isCompleted = false;
    newRequest.approversCount = 0;
  }

  //a function so that the contributers can approve the request raised by the manager
  function approveRequest(uint requestId) public{
    Request storage request = campaignRequest[requestId];

    require(contributers[msg.sender] && !request.approvers[msg.sender]);
  
    request.approvers[msg.sender] = true;
    request.approversCount ++;
  }

  //this function helps manager to finalize the request when there are enough approvers
  function finalizeRequest(uint requestIndex) public restricted{
    Request storage request = campaignRequest[requestIndex];

    require(request.approversCount > (contributersCount/2) && !request.isCompleted);

    request.recepient.transfer(request.moneyRequired);
    request.isCompleted = true;    
  }

  function contarctSummary() public view returns (uint,uint,uint,uint,address){
    return (
      minimunContribution,
      address(this).balance,
      campaignRequest.length,
      contributersCount,
      manager
    );
  }

  function getRequestsCount() public view returns (uint) {
    return campaignRequest.length;
  }



}