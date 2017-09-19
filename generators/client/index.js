const generators = require('yeoman-generator');
const _ = require('lodash');
const fs = require('fs');
const path = require('path');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);
  },

  installAssets: function () {
    Promise.all([
      'client/assets/favicon.png',
    ].map(file => {
      return this.fs.copy(
        this.templatePath(file),
        this.destinationPath(file)
      );
    }));
  },

  installLanguageTemplate: function () {
    if (this.config.get('clientLanguage') === 'es6') {
      Promise.all([
        '.babelrc',
        'nightwatch.conf.js',
        'client/.eslintrc',
        'client/assets/index.html',
        'client/source/main.css',
        'client/source/components/header-bar/index.jsx',
        'client/source/components/hello-card/index.jsx',
        'client/source/components/side-bar/index.jsx',
        'client/source/stores/configure-store.js',
        'client/source/reducers/index.js',
        'client/source/reducers/authentication.js',
        'client/source/reducers/authentication.test.js',
        'client/source/reducers/side-bar.js',
        'client/source/reducers/side-bar.test.js',
        'client/source/reducers/networking.js',
        'client/source/reducers/networking.test.js',
        'client/source/reducers/reducers.json',
        'client/source/reducers/language.js',
        'client/source/reducers/language.test.js',
        'client/source/locale/locale-en.json',
        'client/source/locale/locale-fr.json',
        'client/source/constants/authentication.json',
        'client/source/constants/side-bar.json',
        'client/source/constants/language.json',
        'client/source/constants/url-config.json',
        'client/source/constants/networking.json',
				'client/source/crud-routes/index.js',
				'client/source/crud-routes/crud-routes.json',
        'client/source/actions/authentication.js',
        'client/source/actions/authentication.test.js',
        'client/source/actions/side-bar.js',
        'client/source/actions/side-bar.test.js',
        'client/source/actions/language.js',
        'client/source/actions/language.test.js',
        'client/source/actions/networking.js',
        'client/source/actions/networking.test.js',
        'client/source/containers/home-view/index.jsx',
        'client/source/containers/root/index.jsx',
        'client/source/containers/root/root.test.js',
        'client/source/effects/fakeuser.json',
        'client/source/effects/authentication.js',
        'client/source/effects/authentication.test.js',
        'client/source/index.jsx',
        'client/source/index.dev.jsx',
        'client/source/main.jsx',
        'client/source/routes.jsx',
        'client/source/CSSStub.js',
        'client/webpack/params.js',
        'client/webpack/plugins.js',
        'client/webpack/rules.javascript.js',
        'client/webpack/rules.media.js',
        'client/webpack/rules.styles.js',
        'client/webpack/webpack.config.js',
        'client/webpack/webpack.config.dev.js',
        'test/e2e/sample.test.js',
        'test/e2e/nightwatch.sh',
        'test/e2e/createTestUserMongo.txt'
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
    }
  },

  installClientDependencies: function () {
    const newContent = {
      dependencies: {
      'flexboxgrid': '6.3.1',
      'js-cookie': '2.1.3',
      'material-ui': '0.19.0',
      'moment': '2.15.0',
      'prop-types': '15.5.10',
      'react': '15.6.1',
      'react-dom': '15.6.1',
      'react-intl': '2.3.0',
      'react-interpolate-component': '0.10.0',
      'react-redux': '4.4.8',
      'react-router': '3.0.2',
      'react-router-redux': '4.0.8',
      'react-table': '6.5.3',
      'react-tap-event-plugin': '2.0.1',
      'redux': '3.6.0',
      'redux-localstorage': '1.0.0-rc4',
      'redux-localstorage-filter': '0.1.1',
      'redux-thunk': '2.1.0'
      },
    };

    const packageJsonPath = 'package.json'
    const currentPackageJson = this.fs.readJSON(packageJsonPath);
    const newPackageJson = Object.assign({}, currentPackageJson, newContent);
    if (this.options['test']) return;
    return this.fs.writeJSON(this.destinationPath(packageJsonPath), newPackageJson);
  },

  installClientDevDependencies: function () {
    const newContent = {
      devDependencies:{
        'babel-cli': '6.24.1',
        'babel-core': '6.24.1',
        'babel-eslint': '7.1.1',
        'babel-istanbul': '0.12.2',
        'babel-jest': '19.0.0',
        'babel-loader': '6.4.1',
        'babel-plugin-transform-runtime': '6.23.0',
        'babel-polyfill': '6.23.0',
        'babel-preset-es2015': '6.24.1',
        'babel-preset-react-hmre': '1.1.1',
        'babel-preset-react': '6.24.1',
        'babel-preset-stage-0': '6.24.1',
        'chai': '3.5.0',
        'chromedriver': '2.28.0',
        'clean-webpack-plugin': '0.1.16',
        'css-loader': '0.27.3',
        'enzyme': '2.7.1',
        'eslint-config-airbnb': '14.1.0',
        'eslint-loader': '1.6.3',
        'eslint-plugin-import': '2.2.0',
        'eslint-plugin-jsx-a11y': '3.0.2',
        'eslint-plugin-react': '6.10.0',
        'eslint': '3.19.0',
        'expect': '1.20.2',
        'extract-text-webpack-plugin': '2.1.0',
        'favicons-webpack-plugin': '0.0.7',
        'file-loader': '0.10.1',
        'html-webpack-plugin': '2.28.0',
        'istanbul': '0.4.5',
        'jest-css-modules': '1.1.0',
        'jest': '19.0.2',
        'jsdom-global': '2.1.1',
        'jsdom': '9.12.0',
        'jshint': '2.9.4',
        'json-loader': '0.5.4',
        'mocha': '3.2.0',
        'nightwatch': '0.9.13',
        'nock': '9.0.9',
        'nodemon': '1.11.0',
        'nyc': '10.1.2',
        'postcss-cssnext': '2.10.0',
        'postcss-import': '9.1.0',
        'postcss-loader': '1.3.3',
        'react-addons-test-utils': '15.4.2',
        'react-hot-loader': '3.0.0-beta.6',
        'react-tools': '0.13.3',
        'redux-mock-store': '1.2.2',
        'selenium-server-standalone-jar': '3.0.1',
        'sinon': '2.0.0',
        'style-loader': '0.16.1',
        'stylelint-config-standard': '16.0.0',
        'stylelint': '7.10.0',
        'supertest': '3.0.0',
        'url-loader': '0.5.8',
        'webpack-dev-server': '2.4.2',
        'webpack': '2.3.2',
      },
    };

    const packageJsonPath = 'package.json'
    const currentPackageJson = this.fs.readJSON(packageJsonPath);
    //const newPackageJson = Object.assign({}, currentPackageJson, newContent);
    let newPackageJson = {};
    _.merge(currentPackageJson, newContent)
    return this.fs.writeJSON(this.destinationPath(packageJsonPath), currentPackageJson);
    //if (this.options['test']) return;
    //return this.fs.writeJSON(this.destinationPath(packageJsonPath), newPackageJson);
  }
});
