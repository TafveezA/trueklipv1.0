// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract reciept{
    struct recieptDetails {
        address buyer;
        uint128 price;
        uint128 quantity;
        uint256 id;
        uint256 buyTime;
        uint256 sellTime;
        bool isSold;
        string rctUrl;

    }
mapping(address=>mapping(uint =>recieptDetails)) recieptDetailMapping;
uint256  recieptId;
event recieptIsCreated(address indexed byAddress,uint256 indexed atPrice,uint256 time);

    function createReciept(address _buyer,uint64 _price ,uint64 _quantity) public  returns (uint256)
    {
       
   recieptDetailMapping[msg.sender][recieptId] = recieptDetails({
   buyer:_buyer,
   price:_price,
   quantity:_quantity,
   id:recieptId,
   buyTime:block.timestamp,
   sellTime:0,
   isSold:false,
   rctUrl:"http://bafybeie4i6746h2mva2rbl653cwjo7zwqowufdqwt57dko5jg5etrswuti.ipfs.localhost:8080/?filename=ereceipt-sample.png"});
   recieptId++;
   emit recieptIsCreated(_buyer,_price,block.timestamp);
    return recieptId-1;
    }

 function sellReciept(uint256 _recieptId) public
 {
     require(recieptDetailMapping[msg.sender][_recieptId].buyer == msg.sender,"Not a product owner");
      recieptDetailMapping[msg.sender][_recieptId].isSold =true;
      

 }
 function getReciptId() public view returns (uint256){
     return recieptId;
 }
    function getRecieptDetails(uint256 _recieptId) public view returns ( recieptDetails memory)
    {
        return recieptDetailMapping[msg.sender][_recieptId];
    } 

    function getRecieptUrl(uint256 _recieptId) public view returns(string memory){
        return recieptDetailMapping[msg.sender][_recieptId].rctUrl;
    }
}

  