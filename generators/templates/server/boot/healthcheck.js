const _ = require('lodash');
const healthcheck = require('healthcheck-fastit');

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

  server.use(healthcheck(config));
};
