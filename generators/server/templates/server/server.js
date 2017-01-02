'use strict';

const loopback = require('loopback');
const boot = require('loopback-boot');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');

const app = module.exports = loopback();

if (process.env.NODE_ENV !== 'test') {
  app.use(cookieParser());
  app.use(csrf({ cookie: true }));
  app.use((req, res, next) => {
    const token = req.csrfToken();
    res.cookie('XSRF-TOKEN', token, { secure: true });
    res.locals.csrftoken = token;
    next();
  });
}

app.start = function () {
  // start the web server
  return app.listen(function () {
    app.emit('started');
    const baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl); //eslint-disable-line no-console
    if (app.get('loopback-component-explorer')) {
      const explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath); //eslint-disable-line
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function (err) {
  if (err) {throw err;}

  // start the server if `$ node server.js`
  if (require.main === module) {
    app.start();
  }
});
