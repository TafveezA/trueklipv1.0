// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
contract Validation{

mapping(string =>mapping(bytes32=>bool)) public validateHashByTruklipId;
mapping(string =>bytes32) hashByKlipId;
mapping(string=>bool) public validatByTruklipProduct;
function hashData( string memory _truKlipId,string memory _batchNumber,uint256 _mfgDate, uint256 _expiryDate,uint256 _warranty,string memory _description ) public  returns  (bytes32)
{
    bytes32 _hash=keccak256(abi.encodePacked(_batchNumber,_mfgDate,_expiryDate,_warranty,_description));
    validateHashByTruklipId[_truKlipId][_hash] =true ;
    hashByKlipId[_truKlipId]=_hash;
    return _hash;
}

mapping(uint256=>string) public certificationHash;
mapping(uint256=>string) public productHash;

function addProduct( string memory _truKlipId) public {
    validatByTruklipProduct[_truKlipId] = true;
}

mapping(string=>string) productEncryptedData;
function addProductEncryptedData(string memory _truKlipId,string memory _encData) public {
 productEncryptedData[_truKlipId] = _encData;
}

function getProductEncryptedData(string memory _truKlipId ) public view returns (string memory){
return productEncryptedData[_truKlipId];
}

function hashProductData(uint256 _truKlipId,string memory _hash) public{
    productHash[_truKlipId]=_hash;
}

function hashCertificationData(uint256 _truKlipId,string memory _certificationHash) public {
 certificationHash[_truKlipId]=_certificationHash;
}

function getProductHash(uint256 _truKlipId) public view returns (string memory){
    return productHash[_truKlipId];
}

function getCertificationHash(uint256 _truKlipId) public view returns(string memory){
    return certificationHash[_truKlipId];
}


function getHashById(string memory _truKlipId) public view returns (bytes32)
{
return hashByKlipId[_truKlipId];
}

function validateProduct(uint256 _truKlipId ,string calldata _productHash) public view returns(bool){
   bool  result;
    if(keccak256(abi.encode(productHash[_truKlipId])) != keccak256(abi.encode(_productHash))){
        result;
     }
     else{
        result =true;
     }
     return result;

}

function validationResult(string  memory _truKlipId) public view returns (bool){
    return validatByTruklipProduct[_truKlipId];
}

function validate(string  memory _truKlipId) public view returns (bool){
    return validateHashByTruklipId[_truKlipId][hashByKlipId[_truKlipId]];
}
}