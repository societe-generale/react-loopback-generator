"use strict";

const { componentExists } = require("../utils/component-exists");
const { isDashCase } = require("../utils/component-name");

module.exports = {
  description: "Add an unconnected component",
  prompts: [
    {
      type: "list",
      name: "type",
      message: "Select the type of component",
      default: "ES6 Class (Pure)",
      choices: () => ["ES6 Class (Pure)", "ES6 Class", "Stateless Function"]
    },
    {
      type: "input",
      name: "name",
      message: "What should it be called?",
      default: "Button",
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
    switch (data.type) {
      case "ES6 Class (Pure)": {
        componentTemplate = "./component/es6.pure.js.hbs";
        break;
      }
      case "ES6 Class": {
        componentTemplate = "./component/es6.js.hbs";
        break;
      }
      case "Stateless Function": {
        componentTemplate = "./component/stateless.js.hbs";
        break;
      }
      default: {
        componentTemplate = "./component/es6.pure.js.hbs";
      }
    }

    const actions = [
      {
        type: "add",
        path: `../../../client/source/components/{{${usedCase} name}}/index.js`,
        templateFile: componentTemplate,
        abortOnFail: true
      },
      {
        type: "add",
        path: `../../../client/source/components/{{${usedCase} name}}/{{${usedCase} name}}.test.js`,
        templateFile: "./component/test.js.hbs",
        abortOnFail: true
      },
      {
        type: "add",
        path: `../../../client/source/components/{{${usedCase} name}}/{{${usedCase} name}}.style.${styleExtension}`,
        templateFile: `./component/style.${styleExtension}.hbs`,
        abortOnFail: true
      }
    ];

    return actions;
  }
};
