pragma solidity ^0.4.6;

contract E2TrackIt {
    struct Location {
        string name;
        address locationId;
        address previousLocationId;
        uint timestamp;
        string details;
    }
    
    mapping(address => Location) public trail;
    address[] public locationList;

    function E2TrackIt() public {
        address locationId = msg.sender;
        Location memory newLocation;
        newLocation.name = "Producer1";
        newLocation.locationId = locationId;
        newLocation.details = "Harvert Details";
        newLocation.timestamp = now;
        newLocation.previousLocationId = address(0);
        trail[locationId] = newLocation;
        locationList.push(locationId);
    }

    function addNewLocation(address locationId, address prevLocationId, string name, string details) public {
        Location memory newLocation;
        newLocation.name = name;
        newLocation.locationId = locationId;
        newLocation.details = details;
        newLocation.timestamp = now;
        newLocation.previousLocationId = prevLocationId;
        trail[locationId] = newLocation;
        locationList.push(locationId);
    }

    function getLocation(address locationId) public constant returns (string, address, address, uint, string) {
        return (trail[locationId].name, trail[locationId].locationId, trail[locationId].previousLocationId, trail[locationId].timestamp,trail[locationId].details);
    }

  function getAll() public constant returns(address[]) {
      return locationList;
  }
}