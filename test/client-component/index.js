var path = require('path');
var helpers = require('yeoman-test');
var assert = require('yeoman-assert');
var fs = require('fs-extra');
var generator;
var _ = require('lodash');


describe('sg-fastit:client-component', function () {

  beforeEach(function(done) {
    generator = helpers
      .run(path.join( __dirname, '../../generators/client-component/index.js'))
      .inDir(path.join(__dirname, _.uniqueId('.tmp-')))
      .withOptions({})
      .withArguments([]);
    done();
  });

  after(function(done) {
    fs.removeSync(path.join(__dirname, '.tmp*'));
    done();
  });

  it('should generate view', function (done) {
    generator
      .withPrompts({
        'component-name': 'PlopView',
        'component-folder': 'plop',
        'component-type': 'View',
      })
      .toPromise()
      .then(function () {
        assert.file([
          'client/source/containers/plop/plop-view/index.jsx'
        ]);
        assert.fileContent('client/source/containers/plop/plop-view/index.jsx', /PlopView/);
        done();
      })
      .catch(done);
  });

  it('should generate component', function (done) {
    generator
      .withPrompts({
        'component-name': 'PlopComponent',
        'component-folder': 'plop',
        'component-type': 'Component',
      })
      .toPromise()
      .then(function () {
        assert.file([
          'client/source/components/plop/plop-component/index.jsx'
        ]);
        assert.fileContent('client/source/components/plop/plop-component/index.jsx', /PlopComponent/);
        done();
      })
      .catch(done);
  });

});
