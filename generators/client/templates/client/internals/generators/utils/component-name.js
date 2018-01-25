const dashRegExp = /(-\w)/g;

function isDashCase(componentName) {
  return componentName.match(dashRegExp);
}

module.exports = {
  isDashCase
};
