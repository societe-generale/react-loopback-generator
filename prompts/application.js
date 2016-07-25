const kebabCase = require('lodash.kebabcase');

module.exports = {

  name: function() {
    if (this.options['application-name']) {
      this.log('application name already specified');
      return;
    }
    return this.prompt({
      type: 'input',
      name: 'application-name',
      message: 'Your application name',
    }).then(answers => {
      this.options['application-name'] = answers['application-name'];
    });
  },

  folder: function() {
    if (this.options['application-folder']) {
      this.log('application folder already specified');
      return;
    }
    return this.prompt({
      type: 'input',
      name: 'application-folder',
      message: 'Your application folder',
      default: kebabCase(this.options['application-name']),
    }).then(answers => {
      this.options['application-folder'] = answers['application-folder'];
    });
  },

};
