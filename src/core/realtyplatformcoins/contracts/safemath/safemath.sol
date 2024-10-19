pragma solidity ^0.8.13;

// --------------------------------------------------------------
// Realty Social Utility Token
//
// Symbol           : RealtySocial Token
// Name             : Realty Platform Social Utility Token
// Total Supply     : 100000
// Decimals         : 2
// Owner Account    : // ETH Address
//
// (c) Realty Social Platform  - XDivision
//---------------------------------------------------------------

contract SafeMath {
    function safeAdd(uint a, uint b) public pure returns (uint c) {
        c = a + b;
        require(c >= a);
    }

    function safeSub(uint a, uint b) public pure returns (uint c) {
        require(b <= a);
        c = a - b;
    }

    function safeMul(uint a, uint b) public pure returns (uint c) {
        c = a * b;
        require(a == 0 || c / a == b);
    }

    function safeDiv(uint a, uint b) public pure returns (uint c) {
        require(b > 0);
        c = a / b;
    }
}