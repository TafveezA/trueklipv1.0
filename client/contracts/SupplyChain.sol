// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract SupplyChain {
address admin;
constructor(){
    admin = msg.sender;

}



address producer;
address retailer;
mapping(uint256=>mapping(address=>bool)) public registeredProducer;
mapping(uint256=>mapping(address=>bool)) public registeredRetailer;

function registerProducer(uint256 _producerId,address _producerAddress)onlyAdmin public {
   registeredProducer[_producerId][_producerAddress] =true;
}

function registerRetailer(uint256 _producerId,address _retailerAddress)onlyAdmin public {
   registeredRetailer[_producerId][_retailerAddress] =true;
}




struct Product{
    string certificate;
    string batchNumber;
    string productionData;
    string truklipId;
    bytes32 uriInfo;
    address producerAddress;
    uint256 producerId;
   }


uint256 public truklipId;
mapping(uint256 => Product) productsMapping;

function addProduct(string memory _certificate,
string memory _batchNumber,
string memory _productionData,
uint256 _producerId,
string memory _truklipId,
bytes32  uriInfo,
address _producerAddress) onlyProducer(_producerId) public {
    productsMapping[_producerId] = Product({
    certificate:_certificate,
    batchNumber:_batchNumber,
    productionData:_productionData,
    producerAddress:_producerAddress,
    truklipId:_truklipId,
    uriInfo:uriInfo,
    producerId:_producerId
});
truklipId++;

}

function addRetailerDetails(uint256 _productId,uint256 _recievedate,uint256 _pickdate,uint256 _packingSpecification,string memory _packingbarcode) public {
productsMapping[_productId].uriInfo =keccak256(abi.encode(_productId,_recievedate,_pickdate,_packingSpecification,_packingbarcode));
}

struct Customer{
    uint256 klipId;
    address customerAddress; 
}
mapping(uint256=>Customer) customersMapping;
    
function addCustomer(uint256 _klipId,address _customerAddress)onlyAdmin public {


} 



   modifier onlyAdmin(){
    require(msg.sender == admin,"only admin can register a PRODUCER");
    _;
}

   modifier onlyProducer(uint256 _producerId){
    require(true == registeredProducer[_producerId][msg.sender],"only admin can register a PRODUCER");
    _;
}

}

