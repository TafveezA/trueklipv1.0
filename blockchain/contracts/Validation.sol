// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
contract Validation{

mapping (uint256 =>bytes32) hashByKlipId;
function hashData( uint256 _klipId,string memory _batchNumber,uint256 _mfgDate, uint256 _expiryDate,uint256 _warranty) public  returns  (bytes32)
{
    
    return hashByKlipId[_klipId] = keccak256(abi.encodePacked(_batchNumber,_mfgDate,_expiryDate,_warranty));
}

function getHashById(uint256 _klipId) public view returns (bytes32)
{
return hashByKlipId[_klipId];
}
}