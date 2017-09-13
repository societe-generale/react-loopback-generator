const generators = require('yeoman-generator');
const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const {basename, join} = require('path');
const logo = require('../tools/logo');
const workspace = require('loopback-workspace');
const Workspace = workspace.models.Workspace;

const copyRecursive = function (copy, src, dest) {
  let isDir = fs.statSync(src).isDirectory();
  if (isDir) {
    let content = fs.readdirSync(src);
    return Promise.all(content.map(item => {
      return copyRecursive(copy, path.join(src, item), path.join(dest, item));
    }));
  } else {
    return Promise.resolve(copy(src, dest));
  }
};

const copyAll = function (files, context) {
  Promise.all(files.map(fileName => {
    let src = _.isString(fileName) ? fileName : fileName.src;
    let dest = _.isString(fileName) ? fileName : fileName.dest;
    return this.fs.copyTpl(
      this.templatePath(src),
      this.destinationPath(dest),
      context
    );
  }));
};

module.exports = generators.Base.extend({

  constructor: function () {
    generators.Base.apply(this, arguments);
    this.option('application-name', {type: String, required: true});
    this.option('application-folder', {type: String, required: true});
    this.option('server-required', {type: Boolean, required: false});
    this.option('server-port', {type: Number, required: false});
    this.conflicter.force = true;

    Workspace.copyRecursive = (src, dest, cb) => {
      return copyRecursive(this.fs.copy.bind(this.fs), src, dest)
        .then(r => cb())
        .catch(cb);
    }

  },

  prompting: {
    welcome: function () {
      if (process.env.NODE_ENV && process.env.NODE_ENV === 'test') return;
      console.log(logo.read());
    },

    promptApplicationName: function () {
      if (this.options['application-name']) {
        this.log('application name already specified');
        return;
      }
      return this.prompt({
        type: 'input',
        name: 'application-name',
        message: 'Your application name?',
        default: this.config.get('applicationName'),
      }).then(answers => {
        this.options['application-name'] = answers['application-name'];
      });
    },

    promptApplicationFolder: function () {
      if (this.options['application-folder']) {
        this.log('application folder already specified');
        return;
      }
      return this.prompt({
        type: 'input',
        name: 'application-folder',
        message: 'Your application folder?',
        default: _.kebabCase(this.options['application-name']),
      }).then(answers => {
        this.options['application-folder'] = answers['application-folder'];
      });
    },

    promptClientRequired: function () {
      if (this.options['client-required'] !== undefined) {
        this.log('client requirement already specified');
        return;
      }
      return this.prompt({
        type: 'confirm',
        name: 'client-required',
        message: 'Do you need a ReactJS client?',
        default: true,
      }).then(answers => {
        this.options['client-required'] = answers['client-required'];
      });
    },

    promptClientLanguage: function(){
      if (!this.options['client-required']) {
        this.log('the client is not required');
        return;
      }
      if (this.options['client-language']) {
        this.log('client language already specified');
        return;
      }
      return this.prompt({
        type: 'list',
        name: 'client-language',
        message: 'What is your language desire ?',
        choices: ['ES6'],
        filter: function(val){
          return val.toLowerCase();
        }
      }).then(answers => {
        this.options['client-language'] = answers['client-language'];
      })
    },

    promptServerRequired: function () {
      if (this.options['server-required'] !== undefined) {
        this.log('server requirement already specified');
        return;
      }
      return this.prompt({
        type: 'confirm',
        name: 'server-required',
        message: 'Do you need a Loopback server?',
        default: true,
      }).then(answers => {
        this.options['server-required'] = answers['server-required'];
      });
    },

    promptServerPort: function () {
      if (!this.options['server-required']) {
        this.log('the server is not required');
        return;
      }
      if (this.options['server-port']) {
        this.log('server port already specified');
        return;
      }
      return this.prompt({
        type: 'input',
        name: 'server-port',
        message: 'Your server port (see http://bit.ly/2aRi238)',
        default: this.config.get('serverPort') || 3000,
      }).then(answers => {
        this.options['server-port'] = answers['server-port'];
      });
    },
  },

  configuring: {
    setDestinationRoot: function () {
      if (basename(this.destinationRoot()) === this.options['application-folder']) {
        return;
      } else {
        this.destinationRoot(join(this.destinationRoot(), this.options['application-folder']));
      }
    },
  },

  writing: {

    writeYorc: function() {
      this.config.set('applicationName', this.options['application-name']);
      this.config.set('applicationFolder', this.options['application-folder']);
      this.config.set('clientRequired', this.options['client-required']);
      this.config.set('clientLanguage', this.options['client-language']);
      this.config.set('serverRequired', this.options['server-required']);
      this.config.set('serverPort', this.options['server-port']);
      this.config.save();
    },

    createDocker: function () {
      let files = [
        'Dockerfile',
        'docker-compose.yml',
        'provisioning/docker/nginx.conf',
      ];
      let context = {
        applicationName: this.options['application-name'],
        applicationFolder: this.options['application-folder'],
        clientRequired: this.options['client-required'],
        serverRequired: this.options['server-required'],
      };
      if (this.options['server-port']) {
        context.serverPort = this.options['server-port'];
      }

      return copyAll.bind(this)(files, context);
    },


    createDoc: function () {
      let files = [
        'README.md',
        'circle.yml',
        '.jshintrc',
        '.eslintignore',
        '.editorconfig',
        {src: 'gitignore', dest: '.gitignore'},
        '.stylelintignore',
        '.stylelintrc',
        'doc/contributing.md',
        'doc/data.md',
        'doc/good-practices.md',
        'doc/installation.md',
        'doc/model.md',
      ];

      let context = {
        applicationName: this.options['application-name'],
        applicationFolder: this.options['application-folder'],
      };
      return copyAll.bind(this)(files, context);
    },

    createPackageJson: function () {
      let content = {
        name: this.options['application-name'],
        version: '0.0.1',
        main: 'server/server.js',
        scripts: {
          'package': 'npm install; npm run client:build; npm prune --production',
          'postdeploy': 'echo "Put here a command to be called during the deployment, like the database migration"',
          'start': 'node .',
          'posttest': 'npm run lint && nsp check',
        },
        dependencies: {},
        devDependencies: {
          'eslint': '3.9.1',
          'babel-eslint':'7.1.1',
          'nsp': '2.6.3'
        },
        engines: {
          node: '>= 6.2'
        }
      };
      if (this.options['client-required']) {
        _.merge(content, {
          scripts: {
            'client:build': 'webpack --config client/webpack/webpack.config.js',
            'client:watch': 'webpack-dev-server --config client/webpack/webpack.config.dev.js',
            'client:lint' : 'eslint --ext .jsx,.js -c client/.eslintrc client/source',
            'client:stylelint': 'stylelint client/source/**/*.css',
            'client:test': "NODE_ENV=test jest",
            'client:test:watch': "NODE_ENV=test jest --watch",
            'e2e': 'nightwatch',
            'lint': 'npm run client:lint',
            'pree2e': 'sh ./test/e2e/nightwatch.sh',
            'test': 'npm run client:test',
            'postinstall': 'npm run client:build',
          },
          jest: {
            'rootDir': './client/source',
            'moduleNameMapper': {
              '^.+\\.(css|less)$': '<rootDir>/CSSStub.js',
            },
            'collectCoverage': true,
            'coverageDirectory': '<rootDir>/../../coverage',
            'verbose': true,
            'coveragePathIgnorePatterns': [
              '<rootDir>/../../node_modules/',
            ],
            'moduleFileExtensions': [
              'js',
              'jsx',
              'json'
            ],
          },
        })
      }
      if (this.options['server-required']) {
        _.merge(content, {
          scripts: {
            'server:watch': 'nodemon --inspect server/server.js --ignore client/',
            'server:test': 'mocha --compilers js:babel-core/register \'server/**/{*,}test.js\'',
            'server:test:coverage': 'nyc node_modules/.bin/babel-istanbul cover node_modules/.bin/_mocha -- \'server/**/{*,}test.js\'',
            'test': 'npm run server:test:coverage',
            'server:lint' : 'eslint -c server/.eslintrc server',
            'lint': 'npm run server:lint',
          }
        })
      }
      if(this.options['client-required'] && this.options['server-required']){
        _.merge(content, {
          scripts: {
            'test': 'npm run client:test && npm run server:test:coverage',
            'lint': 'npm run client:lint && npm run server:lint',
          }
        })
      }
      try {
        let existingPackage = this.fs.readJSON('package.json');
        _.merge(content, existingPackage);
      } catch (e) {
        console.log(e);
      }

      this.fs.writeJSON(this.destinationPath('package.json'), content);
    },

    installClient: function(){
      if(!this.options['client-required']) return;

      const client = require.resolve('../generators/client');

      this.composeWith(client, {
        options: {
          test: this.options['skip-test'],
        }
      });
    },

    installServer: function(){
      if (!this.options['server-required']) return;

      const server = require.resolve('../generators/server');

      this.composeWith(server, {
        options: {
          test: this.options['skip-test'],
        }
      })
    },
  },


  install: function () {
    if (process.env.NODE_ENV !== 'test')
      this.spawnCommand('yarn', ['install']);
  },
});
