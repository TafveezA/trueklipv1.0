// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
contract Validation{

mapping(uint256 =>mapping(bytes32=>bool)) public validateHashByKlipId;
function hashData( uint256 _klipId,string memory _batchNumber,uint256 _mfgDate, uint256 _expiryDate,uint256 _warranty,string memory _description ) public  returns  (bytes32)
{
    bytes32 _hash=keccak256(abi.encodePacked(_batchNumber,_mfgDate,_expiryDate,_warranty,_description));
    validateHashByKlipId[_klipId][_hash] =true ;
    return _hash;
}

function getHashById(uint256 _klipId, bytes32 _hashed) public view returns (bool)
{
return validateHashByKlipId[_klipId][_hashed] == true;
}
}