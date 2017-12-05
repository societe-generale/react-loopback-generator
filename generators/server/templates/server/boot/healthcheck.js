'use strict';

const healthcheck = require('healthcheck-fastit');

module.exports = function (server) {
  const config = {};

  const addDatasourceConfig = function (adapter) {
    const connectorName = adapter.settings.connector;

    if (connectorName === 'postgresql') {
      config.postgres = {
        client() {
          return adapter.connector.pg;
        }
      };
    } else if (connectorName === 'mongodb') {
      config.mongo = {
        client() {
          return adapter.connector.db;
        }
      };
    } else if (connectorName === 'es') {
      config.elasticsearch = {
        client() {
          return adapter.connector.db;
        }
      };
    }
  };

  Object.keys(server.datasources).forEach(key => {
    addDatasourceConfig(server.datasources[key]);
  });

  server.use(healthcheck(config));
};
