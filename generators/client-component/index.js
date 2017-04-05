const generators = require('yeoman-generator');
const {assign, kebabCase} = require('lodash');
const {join} = require('path');

module.exports = generators.Base.extend({

  promptInformations: function() {
    return this.prompt([
      {
        type: 'input',
        name: 'component-name',
        message: 'Your component name',
      },
      {
        type: 'list',
        name: 'component-type',
        message: 'Your component type',
        choices: ['Component', 'View']
      },
      {
        type: 'input',
        name: 'component-folder',
        message: 'Your folder to put the component',
      }
    ]).then(answers => {
      assign(this.options, answers);
    });
  },

  copySourceFile: function() {
    let inputFile, outputFolder;
    if (this.options['component-type'] === 'Component') {
      inputFile = 'component.jsx';
      outputFolder = 'client/source/components';
    } else {
      inputFile = 'view.jsx';
      outputFolder = 'client/source/containers';
    }
    const outputFile = join(
      outputFolder,
      this.options['component-folder'],
      kebabCase(this.options['component-name']),
      'index.jsx'
    );
    this.fs.copyTpl(
      this.templatePath(inputFile),
      this.destinationPath(outputFile),
      {componentName: this.options['component-name']}
    );
  },

});
