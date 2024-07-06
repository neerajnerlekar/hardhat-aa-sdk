// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

contract Example{
    uint256 public x;

    event XChanged(uint256 oldX, uint256 newX);

    function changeX(uint _x) external {
        emit XChanged(x, _x);
        x = _x;
    }
}