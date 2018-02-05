const { componentExists } = require("../utils/component-exists");
const { isDashCase } = require("../utils/component-name");

module.exports = {
  description: "Add a container component",
  prompts: [
    {
      type: "input",
      name: "name",
      message: "What should it be called?",
      default: "Form",
      validate: value => {
        if (/.+/.test(value)) {
          return componentExists(value)
            ? "A component or container with this name already exists"
            : true;
        }

        return "The name is required";
      }
    },
    {
      type: "list",
      name: "component",
      message: "Select a base component:",
      default: "PureComponent",
      choices: () => ["PureComponent", "Component"]
    },
    {
      type: "confirm",
      name: "wantMessages",
      default: true,
      message: "Do you want to use ReactIntl?"
    },
    {
      type: "confirm",
      name: "wantCssStyle",
      default: true,
      message: "Do you want to use CSS style?"
    }
  ],
  actions: data => {
    let componentTemplate;
    const styleExtension = data.wantCssStyle ? "css" : "js";
    const usedCase = isDashCase(data.name) ? "dashCase" : "properCase";
    switch (data.component) {
      case "Component": {
        componentTemplate = "./container/component.js.hbs";
        break;
      }
      default: {
        componentTemplate = "./container/component.pure.js.hbs";
      }
    }

    const actions = [
      {
        type: "add",
        path: `../../../client/source/containers/{{${usedCase} name}}/index.js`,
        templateFile: "./container/index.js.hbs",
        abortOnFail: true
      },
      {
        type: "add",
        path: `../../../client/source/containers/{{${usedCase} name}}/{{${usedCase} name}}.test.js`,
        templateFile: "./container/test.js.hbs",
        abortOnFail: true
      },
      {
        type: "add",
        path: `../../../client/source/containers/{{${usedCase} name}}/{{${usedCase} name}}.component.js`,
        templateFile: componentTemplate,
        abortOnFail: true
      },
      {
        type: "add",
        path: `../../../client/source/containers/{{${usedCase} name}}/{{${usedCase} name}}.container.js`,
        templateFile: "./container/container.js.hbs",
        abortOnFail: true
      },
      {
        type: "add",
        path: `../../../client/source/containers/{{${usedCase} name}}/{{${usedCase} name}}.style.${styleExtension}`,
        templateFile: `./container/style.${styleExtension}.hbs`,
        abortOnFail: true
      }
    ];

    return actions;
  }
};
