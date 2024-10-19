pragma solidity ^0.8.13;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20Burnable.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract ERC20BurnableWithInitSupply is ERC20Burnable, ERC20Detiled, Ownable {
    constructor()
        Ownable()
        ERC20Detailed("Example ERC20 Token With Initial Supply if 1 Million and Burnable", "RealtyToken", 18)
        ERC20Burnable()
        public {
            _mint(super.owner(), 1000000 * 10 * uint(super.decimals()));
        }
}