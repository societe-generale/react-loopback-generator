const generators = require('yeoman-generator');
const {assign, kebabCase, snakeCase} = require('lodash');

module.exports = generators.Base.extend({

  prompting: {

    informations: function() {
      return this.prompt({
        type: 'input',
        name: 'reducer-name',
        message: 'Your reducer name',
      }).then(answers => {
        assign(this.options, answers);
      });
    },

  },

  writing: {

    createReducer: function() {
      let reducerFilename = kebabCase(this.options['reducer-name']);
      return this.fs.copyTpl(
        this.templatePath('reducer.js'),
        this.destinationPath(`client/source/reducers/${reducerFilename}.js`),
        {reducerFilename}
      );
    },

    updateReducerList: function() {
      let reducers = this.fs.readJSON('client/source/reducers/reducers.json');
      if (!reducers) reducers = [];
      reducers.push(kebabCase(this.options['reducer-name']));
      this.fs.writeJSON('client/source/reducers/reducers.json', reducers);
    },

    createActions: function() {
      let reducerFilename = kebabCase(this.options['reducer-name']);
      return this.fs.copyTpl(
        this.templatePath('action.js'),
        this.destinationPath(`client/source/actions/${reducerFilename}.js`),
        {reducerFilename}
      );
    },

    createConstants: function() {
      let reducerFilename = kebabCase(this.options['reducer-name']);
      return this.fs.copyTpl(
        this.templatePath('constant.json'),
        this.destinationPath(`client/source/constants/${reducerFilename}.json`),
        {reducerFilename, constantPrefix: snakeCase(this.options['reducer-name']).toUpperCase()}
      );
    },

  },

});
