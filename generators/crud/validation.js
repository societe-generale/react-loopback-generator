const { includes, isEmpty, reduce } = require('lodash');

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
      if(!includes(crudObjKeys, compulsoryKey)){
        propertyErrors.push(`Key missing : ${compulsoryKey}`);
      }
    })

    if(!isEmpty(propertyErrors)){ return propertyErrors; }

    const crudProperties = crudObj.properties;
    if(!Array.isArray(crudProperties)){
      propertyErrors.push(`Expected 'properties' to be an array, got ${typeof crudProperties} instead`);
    }

    const compulsoryKeys = ["name", "type"];
    const propertyCriteria = {
      "name": 'string',
      "type": 'string',
      "required": 'boolean',
    };

    crudProperties.forEach((property, index) => {
      const propertyKeys = Object.keys(property);

      const hasAllCompulsoryKeys = reduce(compulsoryKeys, (truthValue, compulsoryKey) => {
        const hasCompulsoryKey = includes(propertyKeys, compulsoryKey);
        if(!hasCompulsoryKey){
          propertyErrors.push(`Expected ${compulsoryKey} to be part of properties at property of index ${index}`);
        }
        return truthValue && hasCompulsoryKey;
      }, true);

      const hasMatchingPropertyTypes = reduce(propertyKeys, (truthValue, propertyKey) => {
        const isValidType = (typeof property[propertyKey] == propertyCriteria[propertyKey]);
        if(!isValidType){
          propertyErrors.push(`Expected ${propertyKey} to be of type ${propertyCriteria[propertyKey]} at property of index ${index}`);
        }
        return truthValue && isValidType;
      }, true);
    })

    return propertyErrors;
  }
}