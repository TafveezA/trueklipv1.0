// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Tracking {
    
    enum Station{
        Factory,
        Shipping,
        RegionalFacility,
        Retailer,
        Store,
        Customer
    }
    Station public station;
    // Enum representing shipping status
    enum Status {
        Pending,
        Shipped,
        Accepted,
        Rejected,
        Canceled
    }


    Status public status;


    function getStatus() public view returns (Status) {
        return status;
    }

    function getStation() public view returns (Station) {
        return station;
    }


    function setStatus(Status _status) public {
        status = _status;
    }

     function setStation(Status _station) public {
        status = _station;
    }


    function cancelStatus() public {
        status = Status.Canceled;
    }

    function resetStatus() public {
        delete status;
    }

    function resetStation() public {
        delete station;
    }
}
