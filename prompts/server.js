module.exports = {

  port: function() {
    if (!this.options['server-required']) {
      return;
    }
    if (this.options['server-port']) {
      this.log('server port already specified');
      return;
    }
    return this.prompt({
      type: 'input',
      name: 'server-port',
      message: 'Your server port',
      default: 3000,
    }).then(answers => {
      this.options['server-port'] = answers['server-port'];
    });
  },

  required: function() {
    if (this.options['server-required'] !== undefined) {
      this.log('server requirement already specified');
      return;
    }
    return this.prompt({
      type: 'confirm',
      name: 'server-required',
      message: 'Do you need a server',
      default: true,
    }).then(answers => {
      this.options['server-required'] = answers['server-required'];
    });
  },

};
