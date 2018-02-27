// Allows us to use ES6 in our migrations and tests.
require('babel-register');

module.exports = {
  networks: {
    development: {
      host: '10.34.209.63',
      port: 8545,
      network_id: '*' // Match any network id
    },
    production: {
      host: 'amigorvnwffr.westindia.cloudapp.azure.com',
      port: 8545,
      network_id: '*',
      gas: 3000000000
    }
  }
}
