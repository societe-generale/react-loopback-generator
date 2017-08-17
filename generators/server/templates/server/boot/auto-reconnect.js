'use strict';

const logger = require('../services/winston-config')();

module.exports = function (server) {
  for (const source in server.datasources) {
    const adapterName = server.datasources[source].adapter.name;
    if (adapterName === 'postgresql') {
      server.datasources[source].connector.pg.on('error', err => {
        if (err.code === '57P01') {
          logger.log('error', err);
        }
      });
    }
  }
};
