//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract TestingThings is ERC721A, Ownable, ReentrancyGuard {
    uint256 public maxSupply;
    string private _tokenBaseURI;

    event SetTokenBaseURI(string indexed baseTokenURI);

    constructor(
        string memory name,
        string memory symbol,
        uint256 _maxSupply
    ) ERC721A(name, symbol) {
        maxSupply = _maxSupply;
    }

    function setTokenBaseURI(string memory baseURI) external onlyOwner {
        _tokenBaseURI = baseURI;
        emit SetTokenBaseURI(_tokenBaseURI);
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return _tokenBaseURI;
    }

    function mint(uint256 quantity) external payable nonReentrant {
        uint256 price = 1000000000000000;
        require(
            totalSupply() + quantity <= maxSupply,
            "You're trying to mint too many"
        );
        require(
            msg.value == price * quantity,
            "Did not send appropriate funds"
        );
        _safeMint(msg.sender, quantity);
    }
}
