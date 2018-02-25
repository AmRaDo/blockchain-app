import "../stylesheets/app.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { default as Web3 } from 'web3';
import "./graph.js";


var accounts;
var account;
var e2TrackitABI;
var e2TrackItContract;
var e2TrackItCode;
var allLocationData = [];
window.App = {

  addNewLocation: function () {
    var contractAddress = document.getElementById("contractAddress").value;
    localStorage.setItem("contractAddr", contractAddress);
    var deployede2TrackIt = e2TrackItContract.at(contractAddress);
    var locationId = document.getElementById("locationId").value;
    var locationName = document.getElementById("locationName").value;
    var prevLocationid = document.getElementById("prevLocationId").value;
    var details = document.getElementById("details").value;
    deployede2TrackIt.addNewLocation(locationId, prevLocationid, locationName, details, function (error) {
      console.log(error);
      alert(error);
    })
  },
  getCurrentLocation: function () {
    web3.eth.getAccounts(function (err, accs) {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }
      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }
      accounts = accs;
      account = accounts[0];
      document.getElementById("locationId").value = account;
    });
  },
  displayAll: function () {
    var contractAddress = document.getElementById("contractAddress").value;
    var deployede2TrackIt = e2TrackItContract.at(contractAddress);
    deployede2TrackIt.getAll.call(function (error, addrList) {
      localStorage.setItem("errr", error);
      localStorage.setItem("data", addrList);
      for (let i = 0; i < addrList.length; i++) {
        deployede2TrackIt.getLocation.call(addrList[i], function (error, locationData) {
          var locationInfo = {
            name: locationData[0],
            locationId: locationData[1],
            previousLocationId: locationData[2],
            timestamp: locationData[3],
            details: locationData[4]
          };
          allLocationData.push(locationInfo);
          localStorage.setItem("test", JSON.stringify(allLocationData));
        });
      }
    });
  },
  start: function () {
    var self = this;
    web3.eth.getAccounts(function (err, accs) {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }
      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }

      accounts = accs;
      account = accounts[0];
      web3.eth.defaultAccount = account;
      e2TrackitABI =  [{"constant": true,"inputs": [],"name": "getAll","outputs": [{"name": "","type": "address[]"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "uint256"}],"name": "locationList","outputs": [{"name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"name": "locationId","type": "address"},{"name": "prevLocationId","type": "address"},{"name": "name","type": "string"},{"name": "details","type": "string"}],"name": "addNewLocation","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [{"name": "locationId","type": "address"}],"name": "getLocation","outputs": [{"name": "","type": "string"},{"name": "","type": "address"},{"name": "","type": "address"},{"name": "","type": "uint256"},{"name": "","type": "string"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "trail","outputs": [{"name": "name","type": "string"},{"name": "locationId","type": "address"},{"name": "previousLocationId","type": "address"},{"name": "timestamp","type": "uint256"},{"name": "details","type": "string"}],"payable": false,"stateMutability": "view","type": "function"},{"inputs": [],"payable": false,"stateMutability": "nonpayable","type": "constructor"}];
      e2TrackItContract = web3.eth.contract(e2TrackitABI);
      document.getElementById("locationId").value = account;
      document.getElementById("contractAddress").value = localStorage.getItem("contractAddr");
      App.displayAll();
    });
    
  }
};
window.addEventListener('load', function () {
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source.  If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }
  App.start();
});
