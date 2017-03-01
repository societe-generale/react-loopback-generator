'use strict';

const _ = require('lodash');
const winston = require('winston');

const logger = require('../services/winston-config')();

module.exports = function (server, config) {
  server.log = {};
  // Add logging hooks on models
  _.each(server.models, (model, name) => {
    model.beforeRemote('*', function (ctx, instance, next) {
      logger.log(`${name}.${ctx.method.name}#beforeRemote`, ctx.req.params);
      next();
    });
    model.afterRemote('*', function (ctx, instance, next) {
      logger.log(`${name}.${ctx.method.name}#afterRemote`, ctx.req.params, instance);
      next();
    });
    model.afterRemoteError('*', function (ctx, next) {
      logger.error(`${name}.${ctx.method.name}#afterRemoteError`, ctx.req.params, ctx.error);
      next();
    });
  });
};
