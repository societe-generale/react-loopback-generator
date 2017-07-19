const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const fs = require('fs-extra');
let generator;
const _ = require('lodash');

describe('react-loopback:crud', function () {
   
  var tmpFolders = []
  beforeEach(function(done) {
    var tmpFolder = path.join(__dirname, _.uniqueId('.tmp-'))
    tmpFolders.push(tmpFolder)
    generator = helpers
    .run(path.join( __dirname, '../../generators/crud/index.js'))
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
      modelName: 'user',
      modelPlural: 'users',
      propertyName: '',
    })
    .toPromise()
    .then(function () {
      assert.file([
        'client/source/containers/user/index.jsx'
      ]);
      assert.fileContent('client/source/containers/user/index.jsx', /User/);
      assert.fileContent('client/source/containers/user/index.jsx', /mapStateToProps/);
      assert.fileContent('client/source/containers/user/index.jsx', /mapDispatchToProps/);
      done();
    })
    .catch(function(error) {
      done();
    });
  });

  it('should generate action', function (done) {
    generator
    .withPrompts({
      'modelName': 'user',
      'modelPlural': 'users',
    })
    .toPromise()
    .then(function () {
      assert.file([
        'client/source/actions/user.js'
      ]);
      assert.fileContent('client/source/actions/user.js', /getUser/);
      assert.fileContent('client/source/actions/user.js', /createUser/);
      done();
    })
    .catch(done);
  });

  it('should generate reducer', function (done) {
    generator
    .withPrompts({
      'modelName': 'user',
      'modelPlural': 'users',
    })
    .toPromise()
    .then(function () {
      assert.file([
        'client/source/reducers/user.js'
      ]);
      assert.fileContent('client/source/reducers/user.js', /GET_USER_SUCCESS/);
      assert.fileContent('client/source/reducers/user.js', /CREATE_USER_SUCCESS/);
      done();
    })
    .catch(done);
  });

  it('should generate model', function (done) {
    generator
    .withPrompts({
      'modelName': 'user',
      'modelPlural': 'users',
    })
    .toPromise()
    .then(function () {
      assert.file([
        'client/source/reducers/user.js'
      ]);
      assert.fileContent('client/source/reducers/user.js', /GET_USER_SUCCESS/);
      assert.fileContent('client/source/reducers/user.js', /CREATE_USER_SUCCESS/);
      done();
    })
    .catch(done);
  });

});
