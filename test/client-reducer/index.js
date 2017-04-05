var path = require('path');
var helpers = require('yeoman-test');
var assert = require('yeoman-assert');
var fs = require('fs-extra');
var generator;
var _ = require('lodash');


describe('sg-fastit:client-reducer', function () {

  beforeEach(function(done) {
    generator = helpers
      .run(path.join( __dirname, '../../generators/client-reducer/index.js'))
      .inDir(path.join(__dirname, _.uniqueId('.tmp-')))
      .inTmpDir(function(dir) {
        let done = this.async();
        fs.writeJSON('client/source/reducers/reducers.json', [], done);
      })
      .withOptions({})
      .withArguments([]);
    done();
  });

  after(function(done) {
    fs.removeSync(path.join(__dirname, '.tmp*'));
    done();
  });

  it('should generate base files', function (done) {
    generator
      .withPrompts({
        'reducer-name': 'plopPlip',
      })
      .toPromise()
      .then(function () {
        assert.file([
          'client/source/reducers/plop-plip.js',
          'client/source/constants/plop-plip.json',
          'client/source/actions/plop-plip.js',
        ]);
        assert.fileContent('client/source/constants/plop-plip.json', /PLOP_PLIP_PUSH/);
        done();
      })
      .catch(function (err) {
        done(err);
      });
  });

});
