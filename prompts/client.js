module.exports = {

  required: function() {
    if (this.options['client-required'] !== undefined) {
      this.log('client requirement already specified');
      return;
    }
    return this.prompt({
      type: 'confirm',
      name: 'client-required',
      message: 'Do you need a client',
      default: true,
    }).then(answers => {
      this.options['client-required'] = answers['client-required'];
    });
  },

};
