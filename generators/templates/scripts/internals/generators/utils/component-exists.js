const fs = require("fs");
const path = require("path");

const components = fs.readdirSync(
  path.join(__dirname, "../../../../client/source/components")
);
const containers = fs.readdirSync(
  path.join(__dirname, "../../../../client/source/containers")
);
const allComponents = containers.concat(components);

function componentExists(component) {
  return allComponents.indexOf(component) >= 0;
}

module.exports = {
  componentExists
};
