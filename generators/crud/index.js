const generators = require('yeoman-generator');
const { assign, kebabCase, snakeCase, camelCase, isEmpty } = require('lodash');
const moment = require('moment');

const { validateCrudJSON } = require('./validation.js');
const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

module.exports = generators.Base.extend({
  prompting: {
    pathToConfig: function () {
      return this.prompt([
        {
          type: 'input',
          name: 'configFile',
          message: 'Enter the path to the model config (JSON):',
        },
      ]).then(userPrompt => {
        const file = this.fs.readJSON(userPrompt.configFile);
        const errors = validateCrudJSON(file);
        if (!isEmpty(errors)) {
          this.log('----------INVALID JSON-----------');
          this.log(errors.join('\n'));
          done();
          return;
        }
        assign(this.options, file);
      })
    },
  },

  writing: {
    copyLoopbackModelJS: function () {
      const modelFileName = snakeCase(this.options.name);
      return this.fs.copyTpl(
        this.templatePath('model/model.tmpl.js'),
        this.destinationPath(`server/models/${modelFileName}.js`),
        {}
      );
    },
    createLoopbackModel: function () {
      const modelFileName = snakeCase(this.options.name);
      const jsonPath = `server/models/${modelFileName}.json`;
      const modelDefinition = {
        name: camelCase(this.options.name),
        plural: snakeCase(this.options.plural),
        base: "PersistedModel",
        idInjection: true,
        options: {
          validateUpsert: true,
        },
        properties: {
          id: {
            type: "number",
            id: true
          },
        },
        validations: [],
        relations: {},
        acls: [],
        methods: {}
      }

      for (const property of this.options.properties) {
        modelDefinition.properties[property.name]={
          type: property.type,
          required: property.required || false
        }
      }
      this.fs.writeJSON(this.destinationPath(jsonPath), modelDefinition);
    },
    activateModelInLoopbackConfig: function(){
      const modelFileName = snakeCase(this.options.name);
      const modelConfigPath = 'server/model-config.json'
      const modelConfig = this.fs.readJSON(modelConfigPath);
      const newModel = {
        [camelCase(this.options.name)]:{
          "dataSource": "db",
          "public": true
        }
      }
      
      const newModelConfig = Object.assign({}, modelConfig, newModel);
      this.fs.writeJSON(this.destinationPath(modelConfigPath), newModelConfig);
    },
  },
});

/**
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
**/