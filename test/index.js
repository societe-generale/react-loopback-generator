var path = require('path');
var helpers = require('yeoman-test');
var assert = require('yeoman-assert');
var fs = require('fs-extra');
var generator;
var _ = require('lodash');


describe('react-loopback', function () {

    beforeEach(function (done) {
        generator = helpers
            .run(path.join(__dirname, '../generators/index.js'))
            .inDir(path.join(__dirname, _.uniqueId('.tmp-')))
            .withOptions({
                'skip-test':true,
            })
            .withArguments([])
            .withGenerators([path.join(__dirname, '../generators/client/index.js'),
                path.join(__dirname, '../generators/server/index.js')]);
        done();
    });

    after(function (done) {
        
      console.log(path.join(__dirname, '.tmp*'));
        fs.removeSync(path.join(__dirname, '.tmp*/'));
        done();
    });

    it('should generate base files', function (done) {
        generator
            .withPrompts({
                'application-name': 'plop',
                'application-folder': 'plop',
                'client-required': false,
                'server-required': false
            })
            .toPromise()
            .then(function () {
                assert.file([
                    'README.md',
                    '.yo-rc.json',
                    'package.json',
                    'circle.yml',
                    '.jshintrc',
                    '.gitignore',
                    '.editorconfig',
                    'doc/good-practices.md',
                    'doc/model.md',
                ]);
                done();
            })
            .catch(function (err) {
                done(err);
            });
    });

    it('should generate docker provisioning', function (done) {
        generator
            .withPrompts({
                'application-name': 'toto',
                'application-folder': 'toto',
                'client-required': true,
                'server-required': false,
            })
            .toPromise()
            .then(function () {
                assert.file([
                    'docker-compose.yml',
                ]);
                // docker-compose.yml
                assert.fileContent('docker-compose.yml', /\s+client/);
                assert.fileContent('docker-compose.yml', /\s+nginx/);
                done();
            })
            .catch(done);
    });

    it('should generate basic package.json file if neither server nor client', function (done) {
        let basicPackageJson = fs.readFileSync(path.resolve(__dirname, 'package.basic.json'), 'utf-8');
        generator
            .withPrompts({
                'application-name': 'plop',
                'application-folder': 'plop',
                'client-required': false,
                'server-required': false
            })
            .toPromise()
            .then(function () {
                assert.fileContent('package.json', basicPackageJson.toString());
                done();
            })
            .catch(function (err) {
                done(err);
            });
    });

    it('should generate basic package.json file if client only', function (done) {
        let clientPackageJson = fs.readFileSync(path.resolve(__dirname, 'package.client.json'), 'utf-8');
        generator
            .withPrompts({
                'application-name': 'plop',
                'application-folder': 'plop',
                'client-required': true,
                'server-required': false
            })
            .toPromise()
            .then(function () {
                assert.fileContent('package.json', clientPackageJson.toString());
                done();
            })
            .catch(function (err) {
                done(err);
            });
    });

    it('should generate basic package.json file if server only', function (done) {
        let serverPackageJson = fs.readFileSync(path.resolve(__dirname, 'package.server.json'), 'utf-8');
        generator
            .withPrompts({
                'application-name': 'plop',
                'application-folder': 'plop',
                'client-required': false,
                'server-required': true
            })
            .toPromise()
            .then(function () {
                assert.fileContent('package.json', serverPackageJson.toString());
                done();
            })
            .catch(function (err) {
                done(err);
            });
    });

    it('should generate basic package.json file if server and client', function (done) {
        var completePackageJson = fs.readFileSync(path.resolve(__dirname, 'package.client-server.json'), 'utf-8');
        generator
            .withPrompts({
                'application-name': 'plop',
                'application-folder': 'plop',
                'client-required': true,
                'server-required': true
            })
            .toPromise()
            .then(function () {
                assert.fileContent('package.json', completePackageJson.toString());
                done();
            })
            .catch(function (err) {
                done(err);
            });
    });
});
