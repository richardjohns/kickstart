pragma solidity ^0.4.17;

contract CampaignFactory {
    address[] public deployedCampaigns;
    
    function createCampaign(uint minimum) public {
        // newly deployed campaign will return an address which we can capture in variable.
        // msg.sender needed to be passed down to the Campaign to set as campaign manager.
        address newCampaign = new Campaign(minimum, msg.sender);
        deployedCampaigns.push(newCampaign);
    }
    
    function getDeployedCampaigns() public view returns (address[]) {
        return deployedCampaigns;
    }
}

contract Campaign {
    // definition, ie introduces a new type into a contract. Not an instance of a variable.
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }
    
    // storage variables
    Request[] public requests;
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    uint public approversCount;
    
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
    
    function Campaign(uint minimum, address creator) public {
        // msg.sender can't be set from within campaign as this would be the factory's account. Need to pass in from factory.
        manager = creator;
        minimumContribution = minimum;
    }
    
    function contribute() public payable {
        require(msg.value > minimumContribution);
        // msg.sender address key isn't stored in the mapping - just value 'true' for lookup
        approvers[msg.sender] = true;
        approversCount++;
    }
    
    function createRequest(string description, uint value, address recipient) public restricted {
        // require(approvers[msg.sender]) would check if address has contributed, but not needed.

        // 'Request' means new variable will have type Request.
        // newRequest is variable name
        // final 'Request({})' creates an instance of Request type.
        // ie left is about storing the value, right hand side is about creating it.
        // alternative syntax: Request(description, value, recipient, false).
        // not recommended. If struct definition altered it will break all instances.
        // Request created automatically in memory so need to use explicit 'memory'. Not able to re-point to 'storage'
        Request memory newRequest = Request({
            description: description,
            value: value,
            recipient: recipient,
            complete: false,
            approvalCount: 0
        });
        // Don't have to add mapping line to the struct instance.
        requests.push(newRequest);
    }
    
    function approveRequest(uint index) public {
        // need storage as we want to modify the contents of stored requests array.
        Request storage request = requests[index];
        // should get back true or will exit.
        require(approvers[msg.sender]); 
        // checks if address of approver has already been added to the request approvers mapping
        // we require that the approver have not been added to the mapping ie so they can't vote > once
        require(!request.approvals[msg.sender]);
        
        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }
    
    function finaliseRequest(uint index) public restricted {
        Request storage request = requests[index];
        require(request.approvalCount > (approversCount / 2));
        require(!request.complete);
        
        request.recipient.transfer(request.value);
        request.complete = true;
    }
}