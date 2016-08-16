const _ = require('lodash');
const winston = require('winston');

const getToken = function(ctx) {
  return ctx.req.headers.authorization || 'anonymous';
};

module.exports = function(server, config) {
  server.log = {};
  // Initialize channels
  _.each(config.channels, (loggerConfig, loggerName) => {
    winston.loggers.add(loggerName, loggerConfig);
    server.log[loggerName] = winston.loggers.get(loggerName);
  });
  // Add logging hooks on models
  _.each(server.models, (model, name) => {
    model.beforeRemote('*', function(ctx, instance, next) {
      server.log[config.default].debug(getToken(ctx), `${name}.${ctx.method.name}#beforeRemote`, ctx.req.params);
      next();
    });
    model.afterRemote('*', function(ctx, instance, next) {
      server.log[config.default].debug(getToken(ctx), `${name}.${ctx.method.name}#afterRemote`, ctx.req.params, instance);
      next();
    });
    model.afterRemoteError('*', function(ctx, next) {
      server.log[config.default].error(getToken(ctx), `${name}.${ctx.method.name}#afterRemoteError`, ctx.req.params, ctx.error);
      next();
    });
  });
  return;
}
