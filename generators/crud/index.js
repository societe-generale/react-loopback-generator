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
          required: property.required
        }
      }
      this.fs.writeJSON(this.destinationPath(jsonPath), modelDefinition);
    },
    activateModelInLoopbackConfig: function(){
      const modelFileName = snakeCase(this.options.name);
      const LoopbackModelsConfigPath = 'server/model-config.json'
      const modelConfig = this.fs.readJSON(LoopbackModelsConfigPath);
      const newModel = {
        [camelCase(this.options.name)]:{
          "dataSource": "db",
          "public": true
        }
      }
      
      const newModelConfig = Object.assign({}, modelConfig, newModel);
      this.fs.writeJSON(this.destinationPath(LoopbackModelsConfigPath), newModelConfig);
    },
    createMigration: function() {
      const migrationName = `${moment().format('YYYYMMDDHHmmSS')}-create-${snakeCase(this.options.name)}`;
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
            this.templatePath(`model/migration-${file}.sql`),
            this.destinationPath(filePath),
            {
              tableName: camelCase(this.options.name),
              properties: sqlProperties || [],
            }
          );
        } else {
          const fileNameMigrationUp = `${migrationName}-up.sql`;
          const fileNameMigrationDown = `${migrationName}-down.sql`;
          const filePath = `migrations/${migrationName}.js`;
          return this.fs.copyTpl(
            this.templatePath(`model/migration-${file}.js`),
            this.destinationPath(filePath),
            {
              fileNameMigrationDown,
              fileNameMigrationUp,
            }
          );
        }
      }));
    },
    createConstant: function () {
      const constantFileName = snakeCase(this.options.name);
      return this.fs.copyTpl(
        this.templatePath('redux-files/constant.json'),
        this.destinationPath(`client/source/constants/${constantFileName}.json`),
        {
          actionPrefix: this.options.name.toUpperCase(),
        }
      );
    },
    createAction: function () {
      const actionFileName = snakeCase(this.options.name);
      return this.fs.copyTpl(
        this.templatePath('redux-files/action.js'),
        this.destinationPath(`client/source/actions/${actionFileName}.js`),
        {
          constantFileName: snakeCase(this.options.name),
          apiUrl: `api/${this.options.plural}`
        }
      );
    },
    createReducer: function () {
      const reducerFileName = snakeCase(this.options.name);
      return this.fs.copyTpl(
        this.templatePath('redux-files/reducer.js'),
        this.destinationPath(`client/source/reducers/${reducerFileName}.js`),
        {
          constantFileName: snakeCase(this.options.name),
          actionReduxName: this.options.name.toUpperCase(),
        }
      );
    },
    addReducerToReducerList: function () {
      const reducers = this.fs.readJSON('client/source/reducers/reducers.json') || [];
      reducers.push(snakeCase(this.options.name));
      return this.fs.writeJSON(this.destinationPath('client/source/reducers/reducers.json'), reducers);
    },
    listView: function(){
      const containerFolder = snakeCase(this.options.name);
      return Promise.all([
        this.fs.copyTpl(
          this.templatePath('crud-views/list-view.tmpl.js'),
          this.destinationPath(`client/source/containers/models/${containerFolder}/list-view/index.jsx`),
          {
            modelName: snakeCase(this.options.name),
          }
        ),
        this.fs.copy(
          this.templatePath('crud-views/list-view.css'),
          this.destinationPath(`client/source/containers/models/${containerFolder}/list-view/style.css`)
        ),
        this.fs.copy(
          this.templatePath('crud-views/list-view.test.js'),
          this.destinationPath(`client/source/containers/models/${containerFolder}/list-view/index.test.js`)
        ),
      ]);
    },
    editView: function(){
      const containerFolder = snakeCase(this.options.name);
      return this.fs.copyTpl(
        this.templatePath('crud-views/edit-view.tmpl.js'),
        this.destinationPath(`client/source/containers/models/${containerFolder}/edit-view/index.jsx`),
        {
          modelName: snakeCase(this.options.name),
        }
      );
    },
    createView: function(){
      const containerFolder = snakeCase(this.options.name);
      return this.fs.copyTpl(
        this.templatePath('crud-views/create-view.tmpl.js'),
        this.destinationPath(`client/source/containers/models/${containerFolder}/create-view/index.jsx`),
        {
          modelName: snakeCase(this.options.name),
        }
      );
    },
  },
});

/**
 *     addCrudToRouteList: function () {
      const jsonPath = 'client/source/crud-routes/crud-routes.json';
      const routes = this.fs.readJSON(jsonPath) || [];
      routes.push(snakeCase(this.options.name));
      return this.fs.writeJSON(this.destinationPath(jsonPath), routes);
    },

    genericCrudHelpers: function(){

    },

    genericCrudHelpers: function(){
      return Promise.all([
        this.fs.copy(
          this.templatePath('crud-views/list-view.css'),
          this.destinationPath(`client/source/containers/models/${containerFolder}/list-view/style.css`),
        ),
        this.fs.copy(
          this.templatePath('crud-views/list-view.test.js'),
          this.destinationPath(`client/source/containers/models/${containerFolder}/list-view/index.test.js`),
        ),
        this.fs.copy(
          this.templatePath('crud-views/list-view.test.js'),
          this.destinationPath(`client/source/containers/models/${containerFolder}/list-view/index.test.js`),
        ),
        this.fs.copy(
          this.templatePath('crud-views/list-view.test.js'),
          this.destinationPath(`client/source/containers/models/${containerFolder}/list-view/index.test.js`),
        ),
        this.fs.copy(
          this.templatePath('crud-views/list-view.test.js'),
          this.destinationPath(`client/source/containers/models/${containerFolder}/list-view/index.test.js`),
        ),
      ]);
    },
**/