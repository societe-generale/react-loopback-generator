const generators = require('yeoman-generator');
const fs = require('fs');
const {kebabCase} = require('lodash');
const yaml = require('node-yaml');

/**
 * A l'heure actuelle, Loopback ne permet pas de récupérer des variables d'environnement à partir de fichier JSON.
 * Pour contourner ce problème, il a été décidé de récupérer des fichiers de configuration js selon la DB choisie
 * Une solution est envisageable avec Esprima et Escodegen
 * @type {*}
 */
module.exports = generators.Base.extend({

  prompting: {

    promptConnector: function() {
      return this.prompt({
        type: 'list',
        name: 'connector',
        message: 'Which datasource do you want to use ?',
        choices: [
          'Postgresql',
          'Mongodb',
          'ElasticSearch'
        ]
      }).then(res => {
        this.connector = res.connector;
      });
    },

  },

  writing: {

    installDependencies: function() {
      switch(this.connector) {
        case 'Mongodb':
          return this.npmInstall([
            'loopback-connector-mongodb',
          ], {save: true});
        case 'Postgresql':
          return this.npmInstall([
            'loopback-connector-postgresql',
            'db-migrate',
            'db-migrate-pg'
          ], {save: true});
        case 'ElasticSearch':
          return this.npmInstall([
            'loopback-connector-es'
          ], {save: true});
      }
    },

    copyPostgresqlFiles: function() {
      if (this.connector !== 'Postgresql') return;
      let content = JSON.parse(fs.readFileSync(this.destinationPath('server/datasources.json'), 'utf-8'));
      content.db.connector = 'postgresql';
      content.db.host = 'postgresql';
      content.db.user = content.db.password = content.db.database = kebabCase(this.config.get('applicationName'));
      this.fs.writeJSON('server/datasources.json', content);
      return Promise.all([
        'database.json',
        'migrations/20160810124536-initial.js',
        'migrations/sqls/20160810124536-initial-up.sql',
        'migrations/sqls/20160810124536-initial-down.sql',
        'server/datasources.local.js',
      ].map(file => {
        return this.fs.copyTpl(
          this.templatePath(file),
          this.destinationPath(file),
          {
            applicationFolder: kebabCase(this.config.get('applicationName')),
            applicationName: kebabCase(this.config.get('applicationName')),
          }
        );
      })).then(() => {
        return yaml.parse(fs.readFileSync(this.destinationPath('docker-compose.yml')))
      }).then(compose => {
        const appname = kebabCase(this.config.get('applicationName'));
        if(!compose.services.server.depends_on) {
          compose.services.server.depends_on = [];
        }
        if(!compose.services.server.environment) {
          compose.services.server.environment = [];
        }
        compose.services.server.environment = [
          `DATABASE_USER=${appname}`,
          `DATABASE_PASSWORD=${appname}`,
          `DATABASE_DB=${appname}`,
          "DATABASE_HOST=postgresql",
          "DATABASE_PORT=5432",
          `DATABASE_SCHEMA=${appname}`,
        ];
        if (compose.services.server.depends_on.indexOf('postgresql') < 0) {
          compose.services.server.depends_on.push('postgresql');
        }
        compose.services.postgresql = {
          image: 'postgres:9.5.5',
          environment: [
            `POSTGRES_USER=${appname}`,
            `POSTGRES_PASSWORD=${appname}`,
            `POSTGRES_DB=${appname}`,
          ]
        };
        this.fs.write('docker-compose.yml', yaml.dump(compose));
        return Promise.all([
          'server/datasources.local.js'
        ].map(file => {
          return this.fs.copyTpl(
          this.templatePath(file),
          this.destinationPath(file))
        }))
      });
    },

    addDbMigrateScript: function() {
      if (this.connector !== 'Postgresql') return;
      const packageJson = this.fs.readJSON('package.json') || {
        scripts: {},
      };
      packageJson.scripts['docker:db-migrate'] = "docker-compose exec server './node_modules/.bin/db-migrate'";
      this.fs.writeJSON(this.destinationPath('package.json'), packageJson);
    },

    copyMongodbFiles: function() {
      if (this.connector !== 'Mongodb') return;
      const content = JSON.parse(fs.readFileSync(this.destinationPath('server/datasources.json'), 'utf-8'));
      content.db.connector = 'mongodb';
      content.db.host = 'mongodb';
      content.db.database = kebabCase(this.appname);
      this.fs.writeJSON('server/datasources.json', content);
      const compose = yaml.parse(fs.readFileSync(this.destinationPath('docker-compose.yml')))
      const appname = kebabCase(this.config.get('applicationName'));
      if(!compose.services.server.depends_on) {
        compose.services.server.depends_on = [];
      }
      if (compose.services.server.depends_on.indexOf('mongodb') < 0) {
        compose.services.server.depends_on.push('mongodb');
      }
      if(!compose.services.server.environment) {
          compose.services.server.environment = [];
        }
        compose.services.server.environment = [
          `DATABASE_USER=${appname}`,
          `DATABASE_PASSWORD=${appname}`,
          `DATABASE_DB=${appname}`,
          `DATABASE_HOST=mongodb`,
          `DATABASE_PORT=27017`,
          `DATABASE_SCHEMA=${appname}`,
        ];
      compose.services.mongodb = {
        image: 'mongo'
      };
      return this.fs.write('docker-compose.yml', yaml.dump(compose));
    },

    copyElasticSearchFiles: function() {
      if (this.connector !== 'ElasticSearch') return;
      const content = JSON.parse(fs.readFileSync(this.destinationPath('server/datasources.json'), 'utf-8'));
      content.es = {
        connector: 'es',
        name: 'es',
        index: kebabCase(this.config.get('applicationName')),
        apiVersion: '2.3',
        hosts: [
          {
            protocol: 'http',
            host: 'elasticsearch',
            port: 9200
          }
        ],
        requestTimeout: 3000,
        mappings: []
      };
      this.fs.writeJSON('server/datasources.json', content);
      let compose = yaml.parse(fs.readFileSync(this.destinationPath('docker-compose.yml')))
      let appname = kebabCase(this.config.get('applicationName'))
      if(!compose.services.server.depends_on) {
        compose.services.server.depends_on = [];
      }
      if (compose.services.server.depends_on.indexOf('elasticsearch') < 0) {
        compose.services.server.depends_on.push('elasticsearch');
        if(compose.services.server.depends_on.indexOf('mongodb'| 'postgresql') > 0){
        compose.services.server.environment.push([
            `ELASTIC_INDEX=${appname}`,
            `ELASTIC_HOST=9200`,
            `ELASTIC_PORT=elasticsearch`])
      }else{
        compose.services.server.environment = [
            `ELASTIC_INDEX=${appname}`,
            `ELASTIC_HOST=elasticsearch`,
            `ELASTIC_PORT=9200`]
        }
      }

      compose.services.elasticsearch = {
        image: 'elasticsearch'
      };
      this.fs.write('docker-compose.yml', yaml.dump(compose));
      let file = 'server/datasources.elastic.js';
      if(content.db.connector === 'memory'){
        file = 'server/datasources.only-elastic.js'
      }
      return Promise.all([
          file
        ].map(file => {
          return this.fs.copyTpl(
            this.templatePath(file),
            this.destinationPath('server/datasources.local.js'))
        }))
    },

  },

});
