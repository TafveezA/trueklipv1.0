// SPDX-License-Identifier: MIT
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
