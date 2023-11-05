// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Upload {
    struct Access {
        address user;
        string url;
        bool access; 
    }

    mapping(address => string[]) value;
    mapping(address => mapping(string => mapping(address => bool))) ownership; // map users and their owned urls
    mapping(address => Access[]) accessList;
    mapping(address => string) public messages;

    function add(address _user, string memory url) external payable {
        value[_user].push(url);
        ownership[_user][url][msg.sender] = true; // the sender owns the url by default
    }
    

    function allow(address user, string memory url) external {
        require(ownership[msg.sender][url][msg.sender], "URL not owned by the sender"); 
        ownership[msg.sender][url][user] = true; 
        accessList[user].push(Access(msg.sender, url, true));
    }


    function disallow(address user, string memory url) public {
        require(ownership[msg.sender][url][msg.sender], "URL not owned by the sender");
        ownership[msg.sender][url][user] = false; 

        for (uint i = 0; i < accessList[user].length; i++) {
            if (keccak256(abi.encodePacked((accessList[user][i].url))) == keccak256(abi.encodePacked((url))) && accessList[user][i].user == msg.sender) {
                accessList[user][i].access = false;
            }
        }
    }

    function display(address _user) external view returns (string[] memory) {
        uint length = value[_user].length + accessList[_user].length;
        string[] memory result = new string[](length);
        uint counter = 0;

        for (uint i = 0; i < value[_user].length; i++) {
            result[counter] = value[_user][i];
            counter++;
        }

        for (uint i = 0; i < accessList[_user].length; i++) {
            if(accessList[_user][i].access){
                result[counter] = accessList[_user][i].url;
                counter++;
            }
        }
        
        return result;
    }

    // Untouched methods

    function shareAccess() public view returns (Access[] memory) {
        return accessList[msg.sender];
    }

    function sendMessage(
        address _receiver,
        string memory message
    ) public payable {
        messages[_receiver] = message;
    }

    function getMessage(address sender) public view returns (string memory){
        return messages[sender];
    } 
}
