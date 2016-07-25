const {readFileSync} = require('fs');
const {join} = require('path');

const read = function() {
  return readFileSync(join(__dirname, '../resources/logo.txt'), 'utf8');
}

module.exports = {
  read,
};
