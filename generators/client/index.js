const generators = require('yeoman-generator');
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
        'client/source/main.jsx',
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
    let dependencies = [
      'counterpart@0.17.5',
      'flexboxgrid@6.3.1',
      'js-cookie@2.1.3',
      'material-ui@0.17.0',
      'moment@2.15.0',
      'react@15.4.2',
      'react-dom@15.4.2',
      'react-interpolate-component@0.10.0',
      'react-redux@4.4.8',
      'react-router@2.8.1',
      'react-router-redux@4.0.5',
      'react-tap-event-plugin@2.0.1',
      'react-translate-component@0.13.1',
      'redux@3.6.0',
      'redux-localstorage@1.0.0-rc4',
      'redux-localstorage-filter@0.1.1',
      'redux-thunk@2.1.0'
    ];
    if (this.options['test']) return;
    return this.npmInstall(dependencies, {save: true, saveExact: true, quiet: true});
  },

  installClientDevDependencies: function () {
    let dependencies = [
      'babel@6.23.0',
      'babel-cli@6.24.1',
      'babel-core@6.24.1',
      'babel-eslint@7.1.1',
      'babel-istanbul@0.12.2',
      'babel-jest@19.0.0',
      'babel-loader@6.4.0',
      'babel-preset-es2015@6.24.1',
      'babel-polyfill@6.23.0',
      'babel-preset-react@6.24.1',
      'babel-preset-stage-0@6.24.1',
      'babel-plugin-transform-runtime@6.23.0',
      'babel-preset-react-hmre@1.1.1',
      'chai@3.5.0',
      'chromedriver@2.28.0',
      'clean-webpack-plugin@0.1.16',
      'css-loader@0.27.2',
      'enzyme@2.7.1',
      'eslint@3.19.0',
      'eslint-config-airbnb@14.1.0',
      'eslint-loader@1.6.3',
      'eslint-plugin-import@2.2.0',
      'eslint-plugin-jsx-a11y@3.0.2',
      'eslint-plugin-react@6.10.0',
      'expect@1.20.2',
      'extract-text-webpack-plugin@1.0.1',
      'favicons-webpack-plugin@0.0.7',
      'file-loader@0.10.1',
      'html-webpack-plugin@2.28.0',
      'istanbul@0.4.5',
      'jest@19.0.2',
      'jest-css-modules@1.1.0',
      'jsdom@9.12.0',
      'jsdom-global@2.1.1',
      'jshint@2.9.4',
      'json-loader@0.5.4',
      'mocha@3.2.0',
      'nightwatch@0.9.13',
      'nock@9.0.9',
      'nodemon@1.11.0',
      'nyc@10.1.2',
      'react-addons-test-utils@15.4.2',
      'react-hot-loader@3.0.0-beta.6',
      'react-tools@0.13.3',
      'redux-mock-store@1.2.2',
      'selenium-server-standalone-jar@3.0.1',
      'sinon@2.0.0',
      'style-loader@0.13.2',
      'supertest@3.0.0',
      'url-loader@0.5.8',
      'webpack@1.13.2',
      'webpack-dev-server@1.16.1'
    ];
    if (this.options['test']) return;
    return this.npmInstall(dependencies, {saveDev: true, saveExact: true, quiet: true});
  }
});
