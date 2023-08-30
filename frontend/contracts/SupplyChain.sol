
pragma solidity ^0.8.18;

contract Tracking {
    
    enum Station{
        Manufacturer,
        Shipping,
        RegionalFacility,
        Retailer,
        Customer
    }
   
    mapping(uint256=>Station) public trackProductStation;
    mapping(uint256=>mapping (Station =>bool)) public traceProductStation;

    enum Status {
        Pending,
        Shipped,
        Accepted,
        Rejected,
        Canceled
    }


 
    mapping(uint256=>Status) public trackShippingStatus;


    function getStatus(uint256 _truKlipId) public view returns (Status) {
        return trackShippingStatus[_truKlipId];
    }

    function getStation(uint256 _truKlipId) public view returns (Station) {
        return trackProductStation[_truKlipId];
    }


    function setStatus(uint256 _truKlipId,Status _shippingStatus)onlyFactory(_truKlipId) public {
        trackShippingStatus[_truKlipId] = _shippingStatus;
    }

     function setStation(uint256 _truKlipId,Station _productStation) public {
        trackProductStation[_truKlipId]= _productStation;
    }


    function cancelStatus(uint256 _truKlipId)onlyFactory(_truKlipId) public {
        trackShippingStatus[_truKlipId] = Status.Canceled;
    }

    function resetStatus(uint256 _truKlipId)onlyFactory(_truKlipId) public {
        delete trackShippingStatus[_truKlipId];
    }

    function resetStation(uint256 _truKlipId) public {
        delete trackProductStation[_truKlipId];
    }
    modifier onlyFactory(uint256 _truKlipId){
        require(trackProductStation[_truKlipId] == Station.Shipping,"Product is not at Factory Bluff You");
        _;
    }
  
}



// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;




contract SupplyChain is Tracking {
address public admin;
constructor(){
    admin = msg.sender;
}



address producer;
address retailer;
mapping(uint256=>mapping(address=>bool)) public registeredProducer;
mapping(uint256=>mapping(address=>bool)) public registeredRetailer;
mapping(uint256=>mapping (address=>bool)) public registeredDistributor;

function registerProducer(uint256 _producerId,address _producerAddress)onlyAdmin public {
   registeredProducer[_producerId][_producerAddress] =true;
}

function registerRetailer(uint256 _retailerId,address _retailerAddress)onlyAdmin public {
   registeredRetailer[_retailerId][_retailerAddress] =true;
}

function registerDestributor(uint256 _distributorId,address _destributorAddress)onlyAdmin public {
   registeredRetailer[_distributorId][_destributorAddress] =true;
}




struct Product{
    string certificate;
    string batchNumber;
    string productionData;
    string otherDetails;
    uint256 truklipId;
    uint256 producerId;
    address producerAddress;
    bool isConsumable;
    Distributor distributorDetails;
    Retailer retailerDetail;
    Customer customerDetails;
   }


uint256 public truklipId;
mapping(uint256 => Product) public productsMapping;

function addProduct(
string memory _certificate,
string memory _batchNumber,
string memory _productionData,
string memory  _otherDetails,
uint256 _producerId,
uint256 _truklipId,
bool _isConsumable
) onlyProducer(_producerId) public {
    productsMapping[truklipId] = Product({
    certificate:_certificate,
    batchNumber:_batchNumber,
    productionData:_productionData,
    producerAddress:msg.sender,
    truklipId:_truklipId,
    otherDetails:_otherDetails,
    producerId:_producerId,
    isConsumable:_isConsumable,
    distributorDetails:Distributor({
         truklipId:0,
         shipmentDate:0,
         orderNumber:0,
         hssCode:0,
         barcode:""

    }),
    retailerDetail: Retailer({
        truklipId:0,
        recieveDate:0,
        pickDate:0,
        packagingBarcode:"",
        otherDetails:"",
        orderNumber:0,
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

struct Distributor{
uint256 truklipId;
uint256 shipmentDate;
uint256 orderNumber;
uint256 hssCode;
string barcode;
}

function addDistributorDetails(uint256 _truklip,uint256 _shipmentDate,uint256 _orderNumber,uint256 _hssCode,string memory  _barcode) public {
productsMapping[_truklip].distributorDetails= Distributor({
    truklipId:_truklip,
    shipmentDate:_shipmentDate,
    orderNumber:_orderNumber,
    hssCode:_hssCode,
    barcode:_barcode
});

}



struct Retailer{
    uint256 truklipId;
    uint256 recieveDate;
    uint256 pickDate;
    string packagingBarcode;
    string otherDetails;
    uint256 orderNumber;
    address retailerAddress;
}




function addRetailerDetails(uint256 _truklipId,uint256 _recievedate,uint256 _pickdate,uint256 _orderNumber,string memory _otherdetails,string memory _packingbarcode) public {
productsMapping[_truklipId].retailerDetail = Retailer({
    truklipId:_truklipId,
    recieveDate:_recievedate,
    pickDate:_pickdate,
    packagingBarcode:_packingbarcode,
    otherDetails:_otherdetails,
    orderNumber:_orderNumber,
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

     modifier onlyRetailer(uint256 _producerId){
    require(true == registeredRetailer[_producerId][msg.sender],"only admin can register a Retailer");
    _;
}

   modifier onlyDistributor(uint256 _producerId){
    require(true == registeredDistributor[_producerId][msg.sender],"only admin can register a Distributor");
    _;
}

}

