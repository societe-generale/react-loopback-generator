const generators = require('yeoman-generator');
const fs = require('fs-extra');
const {kebabCase} = require('lodash');
const yaml = require('node-yaml');

module.exports = generators.Base.extend({
  configuring: {
    installDependencies: function() {
      console.log('installDependencies: ');
      return this.npmInstall([
        'flow-bin',
        'flow-typed',
        'babel-preset-flow',
        'eslint-plugin-flowtype'
      ], {'save-dev': true});
    },
    addFlowScript: function() {
      const packageJsonPath = 'package.json'
      const currentPackageJson = this.fs.readJSON(packageJsonPath);
      currentPackageJson.scripts.flow = 'flow';
      currentPackageJson.scripts['flow-typed'] = 'flow-typed';
      if (this.options['test']) return;
      return this.fs.writeJSON(this.destinationPath(packageJsonPath), currentPackageJson);
    }
  },

  writing: {
    copyFlowFiles: function() {
      return Promise.all([
        '.flowconfig',
      ].map(file => {
        return this.fs.copyTpl(
          this.templatePath(file),
          this.destinationPath(file),
          {}
        );
      }));
    },

    updateTemplates: function () {
      Promise.all([
        'client/source/components/header-bar/index.jsx',
        'client/source/components/hello-card/index.jsx',
        'client/source/components/side-bar/index.jsx',
        'client/source/actions/authentication.js',
        'client/source/actions/authentication.test.js',
        'client/source/actions/side-bar.js',
        'client/source/actions/side-bar.test.js',
        'client/source/actions/language.js',
        'client/source/actions/language.test.js',
        'client/source/actions/networking.js',
        'client/source/actions/networking.test.js',
        'client/source//containers/home-view/index.jsx',
        'client/source/containers/root/index.jsx',
        'client/source/effects/authentication.js',
        'client/source/common/user.js',
        'client/.eslintrc',
        '.babelrc',
      ].map(file => {
        return this.fs.copyTpl(
          this.templatePath(file),
          this.destinationPath(file),
          {
            applicationName: this.config.get('applicationName'),
            applicationFolder: this.config.get('applicationFolder'),
          }
        );
      }));
    },
  },

  end: {
    addFlowTypedDefinitions: function() {
      var exec = require('child_process').exec;
      exec('npm run flow-typed install --overwrite', (error) => {
        console.log(error);
      });
      exec('npm run flow-typed install lodash@4.17.4 --overwrite', (error) => {
        console.log(error);
      });
      exec('npm run flow-typed install isomorphic-fetch@^2.2.1 --overwrite', (error) => {
        console.log(error);
      });
    }
  }

});
