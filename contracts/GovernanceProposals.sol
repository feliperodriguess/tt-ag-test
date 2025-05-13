// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract GovernanceProposals {
    struct Proposal {
        uint256 id;
        string title;
        string description;
        address proposer;
        uint256 timestamp;
    }

    Proposal[] public proposals;
    mapping(address => uint256[]) public userProposals;

    event ProposalCreated(uint256 indexed proposalId, address indexed proposer, string title);

    function createProposal(string memory _title, string memory _description) public {
        uint256 proposalId = proposals.length;
        
        proposals.push(Proposal({
            id: proposalId,
            title: _title,
            description: _description,
            proposer: msg.sender,
            timestamp: block.timestamp
        }));

        userProposals[msg.sender].push(proposalId);
        
        emit ProposalCreated(proposalId, msg.sender, _title);
    }

    function getProposal(uint256 _proposalId) public view returns (
        uint256 id,
        string memory title,
        string memory description,
        address proposer,
        uint256 timestamp
    ) {
        require(_proposalId < proposals.length, "Proposal does not exist");
        Proposal memory proposal = proposals[_proposalId];
        return (
            proposal.id,
            proposal.title,
            proposal.description,
            proposal.proposer,
            proposal.timestamp
        );
    }

    function getProposalCount() public view returns (uint256) {
        return proposals.length;
    }

    function getUserProposals(address _user) public view returns (uint256[] memory) {
        return userProposals[_user];
    }
} 