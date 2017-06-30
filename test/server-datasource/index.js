var path = require('path');
var yaml = require('node-yaml');
var helpers = require('yeoman-test');
var assert = require('yeoman-assert');
var fs = require('fs-extra');
var _ = require('lodash');


describe('react-loopback:server-datasource', function () {

  let folder, generator;

  beforeEach(function() {
    generator = helpers
      .run(path.join( __dirname, '../../generators/server-datasource/index.js'))
      .inTmpDir(function(dir) {
        folder = dir;
      })
      .withOptions({})
      .withArguments([]);
  });

  after(function(done) {
    fs.remove(folder, done);
  });

  it('should generate mongodb configuration', function (done) {
    let currentDir;
    generator
      .withPrompts({'connector': 'Mongodb'})
      .inTmpDir(function(dir) {
        currentDir = dir;
        let done = this.async();
        fs.ensureDir(path.join(dir, 'server'), err => {
          if (err) return done(err);
          fs.writeJSON(path.join(dir, 'server/datasources.json'), {db: {}}, (err) => {
            fs.writeFile(path.join(dir, 'docker-compose.yml'), yaml.dump({
              services: {
                server: {}
              }
            }), done)
          });
        });
      })
      .toPromise()
      .then(function () {
        let name = _.kebabCase(path.basename(currentDir));
        assert.file(['server/datasources.json']);
        assert.jsonFileContent('server/datasources.json', {
          db: {
            connector: 'mongodb',
            host: 'mongodb',
            database: name,
          }
        });
        done();
      })
      .catch(done);
  });

  it('should generate postgresql configuration', function (done) {
    let currentDir;
    generator
      .withPrompts({
        'connector': 'Postgresql',
      })
      .inTmpDir(function(dir) {
        currentDir = dir;
        let done = this.async();
        fs.ensureDir(path.join(dir, 'server'), err => {
          if (err) return done(err);
          fs.writeJSON(path.join(dir, '.yo-rc.json'), {
            'generator-react-loopback': {
              applicationName: 'test',
              applicationFolder: 'test',
              serverRequired: true,
            },
          }, (err) => {
            fs.writeJSON(path.join(dir, 'server/datasources.json'), {db: {}}, (err) => {
              fs.writeFile(path.join(dir, 'docker-compose.yml'), yaml.dump({
                services: {
                  server: {}
                }
              }), done)
            });
          });
        });
      })
      .toPromise()
      .then(function () {
        let name = _.kebabCase(path.basename(currentDir));
        assert.file([
          'database.json',
          'server/datasources.json',
          'migrations/20160810124536-initial.js'
        ]);
        assert.jsonFileContent('server/datasources.json', {
          db: {
            connector: 'postgresql',
            host: 'postgresql',
            database: 'test',
            password: 'test',
            user: 'test'
          }
        });
        assert.fileContent('database.json', /{"ENV": "DATABASE_HOST"}/);
        done();
      })
      .catch(done);
  });

  it('shoult generate elasticsearch configuration', function (done) {
    let currentDir;
    generator
      .withPrompts({
        'connector': 'ElasticSearch',
      })
      .inTmpDir(function(dir) {
        currentDir = dir;
        let done = this.async();
        fs.ensureDir(path.join(dir, 'server'), err => {
          if (err) return done(err);
          fs.writeJSON(path.join(dir, 'server/datasources.json'), {db: {}}, (err) => {
            fs.writeFile(path.join(dir, 'docker-compose.yml'), yaml.dump({
              services: {
                server: {}
              }
            }), done)
          });
        });
      })
      .toPromise()
      .then(function () {
        let name = _.kebabCase(path.basename(currentDir));
        assert.file(['server/datasources.json']);
        assert.fileContent('server/datasources.json', /elasticsearch/);
        assert.fileContent('server/datasources.json', /protocol/);
        assert.fileContent('server/datasources.json', /db/);
        assert.fileContent('server/datasources.json', /es/);
        done();
      })
      .catch(done);
  });

});
