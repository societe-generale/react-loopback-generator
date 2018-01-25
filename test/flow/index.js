const assert = require('yeoman-assert');
const fs = require('fs-extra');
const helpers = require('yeoman-test');
const path = require('path');
const yaml = require('node-yaml');

describe('react-loopback:flow', function () {

  const tmpFolders = []
  let folder, generator;

  beforeEach(function() {
    generator = helpers
      .run(path.join( __dirname, '../../generators/flow/index.js'))
      .inTmpDir(function(dir) {
        folder = dir;
      })
      .withOptions({})
      .withArguments([]);
  });

  after(function(done) {
    fs.remove(folder, done);
  });

  it('should generate flow configuration', function (done) {
    let currentDir;
    generator
      .withPrompts({
        overwrite: true
      })
      .toPromise()
      .then(function () {
        assert.file(['.flowconfig']);
        assert.jsonFileContent('package.json', {
          scripts: {
            flow: 'flow',
            'flow-typed': 'flow-typed',
          },
        });
        done();
      })
      .catch(done);
  });

});
