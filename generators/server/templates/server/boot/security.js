'use strict';

const cookieParser = require('cookie-parser');
const csrf = require('csurf');

module.exports = function(server) {
  let secure = true;
  if (process.env.NODE_ENV === 'development') {
    secure = false;
  }

  server.use(cookieParser());
    server.use(csrf({cookie: {
        key: 'XSRF-SECRET',
        secure,
        httpOnly: true,
        path: '/<%= applicationFolder %>'
    }}));

  server.use((err, req, res, next) => { // eslint-disable-line
    if (err.code !== 'EBADCSRFTOKEN') {
      return next(err);
    }

    // handle CSRF token errors here
    res.status(403); // eslint-disable-line no-magic-numbers
    res.send('invalid csrf token');
  });

  server.use((req, res, next) => {
    const token = req.csrfToken();
    res.header('x-powered-by', '');
    res.cookie('XSRF-TOKEN', token, { secure, path: '/<%= applicationFolder %>' });
    next();
  });
};
