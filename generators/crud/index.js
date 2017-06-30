const generators = require('yeoman-generator');
const { assign, kebabCase, snakeCase, camelCase } = require('lodash');
const moment = require('moment');

const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

module.exports = generators.Base.extend({
  prompting: {
    model: function () {
      return this.prompt([
        {
          type: 'input',
          name: 'modelName',
          message: 'Enter the model name:',
        },
        {
          type: 'input',
          name: 'modelPlural',
          message: 'Custom plural form (used to build REST URL):',
        },
      ]).then(answers => {
        assign(this.options, answers);
      });
    },

    delim: function () {
      this.log(`Let\'s add some ${this.options.modelName} properties now.\n`);
    },

    properties: askForProperties,
  },

  writing: {
    writeYorc: function() {
      let entities = this.config.get('crudEntites');
      if(entities === undefined)
        entities = [];
      entities.push(capitalize(kebabCase(this.options.modelName)))
      this.config.set('crudEntites', entities);
      this.config.save();
    },
    createCrudRoutes: function() {
      const hasString = this.options.properties.filter(property => property.type === 'string').length > 0;
      const hasNumber = this.options.properties.filter(property => property.type === 'number').length > 0;
      const hasBoolean = this.options.properties.filter(property => property.type === 'boolean').length > 0;
      const hasDate = this.options.properties.filter(property => property.type === 'date').length > 0;
      const hasJson = this.options.properties.filter(property => property.type === 'json').length > 0;
      const entityFileName = snakeCase(this.options.modelName);
      return this.fs.copyTpl(
        this.templatePath('crud-routes/crud-route.tmpl.js'),

        this.destinationPath(`client/source/crud-routes/${entityFileName}.js`),
        {
          entityFileName: entityFileName,
          viewClassName: capitalize(kebabCase(this.options.modelName)),
          actionName: kebabCase(this.options.modelName),
          getActionName: `get${capitalize(kebabCase(this.options.modelName))}`,
          createActionName: `create${capitalize(kebabCase(this.options.modelName))}`,
          propName: kebabCase(this.options.modelPlural),
          properties: this.options.properties || [],
          reduxFileName: snakeCase(this.options.modelName),
          hasString,
          hasNumber,
          hasBoolean,
          hasDate,
          hasJson,
        }
      );
    },
    addCrudRoute: function () {
      const jsonPath = 'client/source/crud-routes/crud-routes.json';
      const routes = this.fs.readJSON(jsonPath) || [];
      routes.push(snakeCase(this.options.modelName));
      this.fs.writeJSON(this.destinationPath(jsonPath), routes);
    },
    createView: function() {
      const hasString = this.options.properties.filter(property => property.type === 'string').length > 0;
      const hasNumber = this.options.properties.filter(property => property.type === 'number').length > 0;
      const hasBoolean = this.options.properties.filter(property => property.type === 'boolean').length > 0;
      const hasDate = this.options.properties.filter(property => property.type === 'date').length > 0;
      const hasJson = this.options.properties.filter(property => property.type === 'json').length > 0;
      const viewFolderName = snakeCase(this.options.modelName);
      return this.fs.copyTpl(
        this.templatePath('view.jsx'),
        this.destinationPath(`client/source/containers/${viewFolderName}/index.jsx`),
        {
          viewClassName: capitalize(kebabCase(this.options.modelName)),
          actionName: kebabCase(this.options.modelName),
          getActionName: `get${capitalize(kebabCase(this.options.modelName))}`,
          createActionName: `create${capitalize(kebabCase(this.options.modelName))}`,
          propName: kebabCase(this.options.modelPlural),
          properties: this.options.properties || [],
          reduxFileName: snakeCase(this.options.modelName),
          hasString,
          hasNumber,
          hasBoolean,
          hasDate,
          hasJson,
        }
      );
    },

    createAction: function () {
      const actionFileName = snakeCase(this.options.modelName);
      return this.fs.copyTpl(
        this.templatePath('action.js'),
        this.destinationPath(`client/source/actions/${actionFileName}.js`),
        {
          constantFileName: snakeCase(this.options.modelName),
          createActionName: `create${capitalize(kebabCase(this.options.modelName))}`,
          getActionName: `get${capitalize(kebabCase(this.options.modelName))}`,
          actionReduxName: this.options.modelName.toUpperCase(),
          apiUrl: `api/${this.options.modelPlural}`
        }
      );
    },

    createConstant: function () {
      const constantFileName = snakeCase(this.options.modelName);
      return this.fs.copyTpl(
        this.templatePath('constant.json'),
        this.destinationPath(`client/source/constants/${constantFileName}.json`),
        {
          actionReduxName: this.options.modelName.toUpperCase(),
        }
      );
    },

    createReducer: function () {
      const reducerFileName = snakeCase(this.options.modelName);
      return this.fs.copyTpl(
        this.templatePath('reducer.js'),
        this.destinationPath(`client/source/reducers/${reducerFileName}.js`),
        {
          constantFileName: snakeCase(this.options.modelName),
          actionReduxName: this.options.modelName.toUpperCase(),
        }
      );
    },

    
    addReducer: function () {
      const reducers = this.fs.readJSON('client/source/reducers/reducers.json') || [];
      reducers.push(snakeCase(this.options.modelName));
      this.fs.writeJSON(this.destinationPath('client/source/reducers/reducers.json'), reducers);
    },

    createMigration: function() {
      const migrationName = `${moment().format('YYYYMMDDHHmmSS')}-create-${snakeCase(this.options.modelName)}`;
      return Promise.all([
        'up',
        'down',
        'general',
      ].map(file => {
        if (file === 'up' || file === 'down') {
          const sqlProperties = this.options.properties.map((property) => {
            let sqlType;
            switch (property.type) {
              case 'number':
                sqlType = 'integer';
                break;
              case 'string':
                sqlType = 'text';
                break;
              case 'date':
                sqlType = 'timestamp with time zone';
                break;
              case 'json':
                sqlType = 'json';
                break;
              case 'boolean':
                sqlType = 'boolean';
                break;
              default:
                sqlType = null;
                break;
            }
            return {
              name: property.name,
              type: sqlType,
              required: property.required,
            };
          });
          const filePath = `migrations/sqls/${migrationName}-${file}.sql`;
          return this.fs.copyTpl(
            this.templatePath(`migration-${file}.sql`),
            this.destinationPath(filePath),
            {
              tableName: camelCase(this.options.modelName),
              properties: sqlProperties || [],
            }
          );
        } else {
          const fileNameMigrationUp = `${migrationName}-up.sql`;
          const fileNameMigrationDown = `${migrationName}-down.sql`;
          const filePath = `migrations/${migrationName}.js`;
          return this.fs.copyTpl(
            this.templatePath(`migration-${file}.js`),
            this.destinationPath(filePath),
            {
              fileNameMigrationDown,
              fileNameMigrationUp,
            }
          );
        }
      }));
    },
  },
});

function askForProperty() {
  const prompt = [
    {
      type: 'input',
      name: 'propertyName',
      message: 'Property name:',
    },
  ];

  return this.prompt(prompt).then(function (answer) {
    this.options = props;
    this.async();
  }.bind(this));
}

function askForProperties() {
  const done = this.async();
  askForProperty.call(this, done);
}

function askForProperty(done) {
  const prompt = [
    {
      type: 'input',
      name: 'propertyName',
      message: 'Property name:',
    },
  ];
  this.prompt(prompt).then(function(answer) {
    if (answer.propertyName === null || answer.propertyName === '' || typeof answer.propertyName === 'undefined') {
      return done();
    }

    const propertyPrompts = [
      {
        type: 'list',
        name: 'propertyType',
        message: 'Property type:',
        choices: ['string', 'date', 'json', 'boolean', 'number'],
      },
      {
        type: 'confirm',
        name: 'propertyRequired',
        message: 'Property required:',
        default: false,
      }
    ];

    this.prompt(propertyPrompts).then(function(answers) {
      let defaultValue;
      switch (answers.propertyType) {
        case 'string':
          defaultValue = '\'\'';
          break;
        case 'date':
          defaultValue = 'moment().format(\'YYYY-MM-DD\')';
          break;
        case 'json':
          defaultValue = '{}';
          break;
        case 'boolean':
          defaultValue = true;
          break;
        case 'number':
          defaultValue = 0;
          break;
        default:
          defaultValue = null;
      }
      const properties = {
        name: kebabCase(answer.propertyName),
        type: answers.propertyType,
        required: answers.propertyRequired,
        defaultValue,
      };
      if (this.options.properties) {
        assign(this.options, { properties: this.options.properties.concat(properties) });
      } else {
        assign(this.options, { properties: [properties] });
      }

      this.log(`\nLet's add another ${this.options.modelName} property.`);
      askForProperty.call(this, done);
    }.bind(this));
  }.bind(this));
}
