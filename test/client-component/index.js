var path = require('path');
var helpers = require('yeoman-test');
var assert = require('yeoman-assert');
var fs = require('fs-extra');
var _ = require('lodash');

var generator;

describe('react-loopback:client-component', function () {

  var tmpFolders = []

  beforeEach(function(done) {
    var tmpFolder = path.join(__dirname, _.uniqueId('.tmp-'))
    tmpFolders.push(tmpFolder)
    generator = helpers
      .run(path.join( __dirname, '../../generators/client-component/index.js'))
      .inDir(tmpFolder)
      .withOptions({})
      .withArguments([]);
    done();
  });

  after(function(done) {
      var promises = []
      for(let tmpFolder of tmpFolders){
          promises.push(fs.remove(tmpFolder));
      }

      Promise.all(promises).then(() => done());
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
