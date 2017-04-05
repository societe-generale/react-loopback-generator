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
    let dependencies = [
      'csurf@1.9.0', 
      'cookie-parser@1.4.3', 
      'nodemon@1.11.0',
      'eslint-config-walmart@1.2.2', 
      'eslint-plugin-filenames@1.1.0',
    ];
    if(this.options['test']) return;
    return this.npmInstall(dependencies, {saveDev: true, saveExact: true, quiet: true});
  },

});
