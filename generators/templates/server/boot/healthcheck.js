module.exports = function(server) {
  // @TODO: add healthchecks https://github.com/fastit/health-check#database-health-check
  var config = {};
  healthcheck = require('healthcheck-fastit')(config);

  server.use(healthcheck);
};
