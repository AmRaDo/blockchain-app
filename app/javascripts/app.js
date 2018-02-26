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
    var partId = document.getElementById("partId").value;
    var name = document.getElementById("name").value;
    var children = this.getSelectValues(document.getElementById("compoments"));
    console.log(children);
    var details = document.getElementById("details").value;
    deployede2TrackIt.addNewPart(partId, name, children, details, function (error) {
      console.log(error);
      alert(error);
    })
  },
  getSelectValues: function (select) {
    var result = [];
    var options = select && select.options;
    var opt;

    for (var i = 0, iLen = options.length; i < iLen; i++) {
      opt = options[i];

      if (opt.selected) {
        result.push(parseInt(opt.value));
      }
    }
    return result;
  },
  displayAll: function () {
    var contractAddress = document.getElementById("contractAddress").value;
    var deployede2TrackIt = e2TrackItContract.at(contractAddress);

    deployede2TrackIt.getAll.call(function (error, allParts) {
      for (let i = 0; i < allParts.length; i++) {
        if (allParts[i] != 0) {
          deployede2TrackIt.getPart.call(allParts[i], function (error, partInfo) {
            localStorage.setItem("errr", error);
            localStorage.setItem("data", partInfo);
            var children = partInfo[2];
            var locationInfo = {
              name: partInfo[0],
              id: partInfo[1],
              children: children,
              details: partInfo[3]
            };
            allLocationData.push(locationInfo);
            localStorage.setItem("test", JSON.stringify(allLocationData));

          });
        }
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
      e2TrackitABI = [{"constant": true,"inputs": [{"name": "","type": "uint8"}],"name": "trail","outputs": [{"name": "name","type": "string"},{"name": "id","type": "uint8"},{"name": "details","type": "string"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"name": "partId","type": "uint256"}],"name": "remove","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [],"name": "getAll","outputs": [{"name": "","type": "uint8[]"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"name": "partId","type": "uint8"},{"name": "name","type": "string"},{"name": "children","type": "uint8[4]"},{"name": "details","type": "string"}],"name": "addNewPart","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [{"name": "","type": "uint256"}],"name": "partList","outputs": [{"name": "","type": "uint8"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "partId","type": "uint8"}],"name": "getPart","outputs": [{"name": "","type": "string"},{"name": "","type": "uint8"},{"name": "","type": "uint8[4]"},{"name": "","type": "string"}],"payable": false,"stateMutability": "view","type": "function"},{"inputs": [],"payable": false,"stateMutability": "nonpayable","type": "constructor"}];
      e2TrackItContract = web3.eth.contract(e2TrackitABI);
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
