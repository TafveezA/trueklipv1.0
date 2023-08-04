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

function registerRetailer(uint256 _retailerId,address _retailerAddress)onlyAdmin public {
   registeredRetailer[_retailerId][_retailerAddress] =true;
}




struct Product{
    string certificate;
    string batchNumber;
    string productionData;
    uint256 truklipId;
    bytes32 uriInfo;
    address producerAddress;
    uint256 producerId;
    Retailer retailerDetail;
    Customer customerDetails;
   }


uint256 public truklipId;
mapping(uint256 => Product) productsMapping;

function addProduct(string memory _certificate,
string memory _batchNumber,
string memory _productionData,
uint256 _producerId,
uint256 _truklipId,
bytes32  uriInfo,
address _producerAddress) onlyProducer(_producerId) public {
    productsMapping[_producerId] = Product({
    certificate:_certificate,
    batchNumber:_batchNumber,
    productionData:_productionData,
    producerAddress:_producerAddress,
    truklipId:_truklipId,
    uriInfo:uriInfo,
    producerId:_producerId,
    retailerDetail: Retailer({
        truklipId:0,
        recieveDate:0,
        pickDate:0,
        packagingBarcode:"",
        otherDetails:"",
        retailerAddress:address(0)}),
    customerDetails:Customer({
    klipId:0,
    customerAddress:address(0), 
    recieveDate:0,
    invoiceNumber:0,
    orderNumber:0,
    otherDetails:""

    })
    });
truklipId++;

}


struct Retailer{
    uint256 truklipId;
    uint256 recieveDate;
    uint256 pickDate;
    string packagingBarcode;
    string otherDetails;
    address retailerAddress;
}


mapping(uint256=>Retailer) retailerDetail;


function addRetailerDetails(uint256 _truklipId,uint256 _recievedate,uint256 _pickdate,string memory _otherdetails,string memory _packingbarcode) public {
productsMapping[_truklipId].retailerDetail = Retailer({
    truklipId:_truklipId,
    recieveDate:_recievedate,
    pickDate:_pickdate,
    packagingBarcode:_packingbarcode,
    otherDetails:_otherdetails,
    retailerAddress:msg.sender
});
}


mapping(uint256=>address) customers;

function addCustomer(uint256 _klipId,address _customerAddress) onlyAdmin public {
    customers[_klipId]=_customerAddress;

}


struct Customer{
    uint256 klipId;
    address customerAddress; 
    uint256 recieveDate;
    uint256 invoiceNumber;
    uint256 orderNumber;
    string otherDetails;
}
mapping(uint256=>Customer) customersDetails;

    






   modifier onlyAdmin(){
    require(msg.sender == admin,"only admin can register a PRODUCER");
    _;
}

   modifier onlyProducer(uint256 _producerId){
    require(true == registeredProducer[_producerId][msg.sender],"only admin can register a PRODUCER");
    _;
}

}

