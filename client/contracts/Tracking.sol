// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Tracking {
    // Enum representing shipping status
    enum Status {
        Pending,
        Shipped,
        Accepted,
        Rejected,
        Canceled
    }


    Status public status;


    function get() public view returns (Status) {
        return status;
    }


    function set(Status _status) public {
        status = _status;
    }


    function cancel() public {
        status = Status.Canceled;
    }

    function reset() public {
        delete status;
    }
}
