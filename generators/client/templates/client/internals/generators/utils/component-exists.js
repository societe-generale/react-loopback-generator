const fs = require("fs");
const path = require("path");
const pageComponents = fs.readdirSync(
  path.join(__dirname, "../../../../client/source/components")
);
const pageContainers = fs.readdirSync(
  path.join(__dirname, "../../../../client/source/containers")
);
const components = pageComponents.concat(pageContainers);

function componentExists(component) {
  return components.indexOf(component) >= 0;
}

module.exports = {
  componentExists
};
