const _ = require('lodash');
const Promise = require('bluebird');

module.exports = function(server) {
  var config = {};

  var addDatasourceConfig = function(adapter, adapterName) {
    return new Promise(function(resolve, reject) {
      let connectorName = adapter.settings.connector;

      if (connectorName === 'postgresql') {
        config['postgres'] = {
          client: function() {
            console.log(adapter.connector)
            return adapter.connector.pg;
          }
        }
      } else if (connectorName === 'mongodb') {
        config['mongo'] = {
          client: function() {
            return adapter.connector.db;
          }
        }
      } else if (connectorName === 'elasticsearch') {
        config['elasticsearch'] = {
          client: function() {
            return adapter.connector.db;
          }
        }
      }
      resolve();
    });
  };

  let promises = [];

  _.each(server.datasources, function(adapter, adapterName) {
    promises.push(addDatasourceConfig(adapter, adapterName));
  });

  Promise.all(promises)
  .then(function() {
    server.use(require('healthcheck-fastit')(config));
  });
};
