'use strict';

const sgAuthApi = require('sg-auth-api').boot;
const logger = require('../services/winston-config.js')();

module.exports = function (server) {
  server.use(sgAuthApi({
    models: {
      user: () => server.models.SgUser,
      token: () => server.models.AccessToken
    }
  }, logger));
};
