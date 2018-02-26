pragma solidity ^0.4.6;

contract E2TrackIt {
    struct Part {
        string name;
        uint8 id;
        uint8[4] children;
        string details;
    }
    
    mapping(uint8 => Part) public trail;
    uint8[] public partList;

    function E2TrackIt() public {
        Part memory newPart1;
        newPart1.name = "Laptop_1";
        newPart1.id = 1;
        newPart1.details = "";
        newPart1.children = [2, 3, 4, 5];
        trail[newPart1.id] = newPart1;
       

        Part memory newPart2;
        newPart2.name = "SSD_1";
        newPart2.id = 2;
        newPart2.details = "";
        newPart2.children = [0, 0, 0, 0];
        trail[newPart2.id] = newPart2;

        Part memory newPart3;
        newPart3.name = "RAM_1";
        newPart3.id = 3;
        newPart3.details = "";
        newPart3.children = [0, 0, 0, 0];
        trail[newPart3.id] = newPart3;

        Part memory newPart4;
        newPart4.name = "MBOARD_1";
        newPart4.id = 4;
        newPart4.details = "";
        newPart4.children = [6, 0, 0, 0];
        trail[newPart4.id] = newPart4;
        Part memory newPart5;
        newPart5.name = "BATTERY_X";
        newPart5.id = 5;
        newPart5.details = "";
        newPart5.children = [0, 0, 0, 0];
        trail[newPart5.id] = newPart5;
        Part memory newPart6;
        newPart6.name = "PROCESSOR_1";
        newPart6.id = 6;
        newPart6.details = "";
        newPart6.children = [0, 0, 0, 0];
        trail[newPart6.id] = newPart6;

         partList.push(newPart1.id);
         partList.push(newPart2.id);
         partList.push(newPart3.id);
         partList.push(newPart4.id);
         partList.push(newPart5.id);
         partList.push(newPart6.id);
    }

    function addNewPart(uint8 partId, string name, uint8[4] children, string details) public {
        Part memory newPart;
        newPart.name = name;
        newPart.id = partId;
        newPart.details = details;
        newPart.children = children;
        trail[partId] = newPart;
        remove(partId);
        partList.push(partId);
    }

    function remove(uint partId) public{
        for (uint i = 0; i<partList.length; i++) {
            if (partList[i] == partId) {
            partList[i] = 0;
            }
        }
    }

    function getPart(uint8 partId) public constant returns (string, uint8, uint8[4], string) {
        return (trail[partId].name, trail[partId].id, trail[partId].children, trail[partId].details);
    }

    function getAll() public constant returns (uint8[]) {
        return partList;
    }
}