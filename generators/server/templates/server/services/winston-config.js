'use strict';

const moment = require('moment');
const winston = require('winston');
const debug = require('debug');
const os = require('os');

module.exports = function () {
  winston.loggers.add('SG', {
    console: {
      level: 'debug',
      colorize: true,
      timestamp() {
        return moment().format('YYYY-MM-DD HH:mm:ss.SSS');
      },
      formatter(options) {
        return `${options.timestamp()} [<%= applicationName %>] [${os.hostname()}] ${
        options.level.toUpperCase()} : ${options.message ? options.message : ''
        }${options.meta && Object.keys(options.meta).length ? `\t${
        JSON.stringify(options.meta)}` : ''}`;
      }
    }
  });

  const sglogger = winston.loggers.get('SG');

  debug.log = sglogger.debug.bind(sglogger);
  debug.error = sglogger.error.bind(sglogger);
  return debug;
};
