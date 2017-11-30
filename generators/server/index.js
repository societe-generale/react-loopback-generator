const generators = require('yeoman-generator');
const _ = require('lodash');
const fs = require('fs');
const path = require('path');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);
  },

  installServerTemplate: function () {
    Promise.all([
      'server/models/sg-user.js',
      'server/models/sg-user.json',
      'server/.eslintrc',
      'server/component-config.json',
      'server/component-config.test.json',
      'server/config.json',
      'server/datasources.json',
      'server/datasources.local.js',
      'server/middleware.development.json',
      'server/middleware.json',
      'server/model-config.json',
      'server/server.js',
      'server/server.test.js',
      'server/boot/auto-reconnect.js',
      'server/boot/healthcheck.js',
      'server/boot/root.js',
      'server/boot/security.js',
      'server/components/logger.js',
      'server/services/winston-config.js',
    ].map(file => {
      return this.fs.copyTpl(
        this.templatePath(file),
        this.destinationPath(file),
        {
          serverPort: this.config.get('serverPort'),
          applicationName: this.config.get('applicationName'),
          applicationFolder: this.config.get('applicationFolder'),
        }
      );
    }));
  },

  installServerDependencies: function () {
    const newContent = {
      dependencies: {
        'compression': '1.7.1',
        'cookie-parser': '1.4.3', 
        'cors': '2.8.4',
        'csurf': '1.9.0', 
        'debug': '3.1.0',
        'healthcheck-fastit': 'git+ssh://git@github.com:fastit/health-check.git#1.0.1',
        'loopback': '3.14.0',
        'loopback-boot': '2.26.2',
        'loopback-component-explorer': '5.1.0',
        'helmet': '3.9.0',
        'moment': '2.19.1',
        'serve-favicon': '2.4.5',
        'strong-error-handler': '2.3.0',
        'winston': '2.4.0',
      },
      devDependencies:{
        'nodemon': '1.11.0',
        'eslint-config-walmart': '1.2.2', 
        'eslint-plugin-filenames': '1.1.0',
      },
    };

    const packageJsonPath = 'package.json'
    const currentPackageJson = this.fs.readJSON(packageJsonPath);
    //const newPackageJson = Object.assign({}, currentPackageJson, newContent);
    let newPackageJson = {};
    _.merge(currentPackageJson, newContent)
    return this.fs.writeJSON(this.destinationPath(packageJsonPath), currentPackageJson);
  },

});
