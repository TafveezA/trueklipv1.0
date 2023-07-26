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
   // Station public productStation;
    mapping(uint256=>Station) public trackProductStation;

    enum Status {
        Pending,
        Shipped,
        Accepted,
        Rejected,
        Canceled
    }


   // Status public shippingStatus;
    mapping(uint256=>Status) public trackShippingStatus;


    function getStatus(uint256 _truKlipId) public view returns (Status) {
        return trackShippingStatus[_truKlipId];
    }

    function getStation(uint256 _truKlipId) public view returns (Station) {
        return trackProductStation[_truKlipId];
    }


    function setStatus(uint256 _truKlipId,Status _shippingStatus) public {
        trackShippingStatus[_truKlipId] = _shippingStatus;
    }

     function setStation(uint256 _truKlipId,Station _productStation) public {
        trackProductStation[_truKlipId]= _productStation;
    }


    function cancelStatus(uint256 _truKlipId) public {
        trackShippingStatus[_truKlipId] = Status.Canceled;
    }

    function resetStatus(uint256 _truKlipId) public {
        delete trackShippingStatus[_truKlipId];
    }

    function resetStation(uint256 _truKlipId) public {
        delete trackProductStation[_truKlipId];
    }
}
