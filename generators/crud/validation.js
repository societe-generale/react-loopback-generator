const { includes, isEmpty } = require('lodash');

module.exports = {
  validateCrudJSON: (crudObj) => {
    let propertyErrors = []
    if( !crudObj ) {
      propertyErrors.push('File doesn\'t exist');
      return propertyErrors;
    }

    const crudObjKeys = Object.keys(crudObj);
    const keysToCheck = [
      "name",
      "plural",
      "properties",
    ];

    keysToCheck.forEach((compulsoryKey) => {
      if(!includes(crudObjKeys, compulsoryKey)) {
        propertyErrors.push(`Key missing : ${compulsoryKey}`);
      }
    })

    return propertyErrors;
  }
}