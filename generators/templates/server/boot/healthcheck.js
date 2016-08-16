const _ = require('lodash');

module.exports = function(server) {
  var config = {};

  var addDatasourceConfig = function(adapter) {
    let connectorName = adapter.settings.connector;

    if (connectorName === 'postgresql') {
      config.postgres = {
        client: function() {
          return adapter.connector.pg;
        }
      }
    } else if (connectorName === 'mongodb') {
      config.mongo = {
        client: function() {
          return adapter.connector.db;
        }
      }
    } else if (connectorName === 'elasticsearch') {
      config.elasticsearch = {
        client: function() {
          return adapter.connector.db;
        }
      }
    }
  };

  _.each(server.datasources, function(adapter) {
    addDatasourceConfig(adapter);
  });


  healthcheck = require('healthcheck-fastit')(config);
  server.use(healthcheck);
};
