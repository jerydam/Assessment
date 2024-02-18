// SimpleCalculator.sol

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract SimpleCalculator {
    function add(uint256 a, uint256 b) public pure returns (uint256) {
        return a + b;
    }

    function subtract(int256 a, int256 b) public pure returns (int256) {
        return a - b;
    }

    function multiply(uint256 a, uint256 b) public pure returns (uint256) {
        return a * b;
    }
}
