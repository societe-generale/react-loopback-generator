const sgAuthApi = require('sg-auth-api').boot;

module.exports = function(server) {
  server.use(sgAuthApi({
    models: {
      user: () => server.models.SgUser,
      token: () => server.models.AccessToken,
    }
  }));
};
