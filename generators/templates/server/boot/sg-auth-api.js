const sgAuthApi = require('sg-auth-api').boot;

module.exports = function(server) {
  server.use(sgAuthApi({
    models: {
      user: _ => server.models.User,
      token: _ => server.models.AccessToken,
    }
  }));
};
