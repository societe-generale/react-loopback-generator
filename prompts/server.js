module.exports = {

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
