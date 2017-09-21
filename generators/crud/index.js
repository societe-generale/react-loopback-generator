const generators = require('yeoman-generator');
const moment = require('moment');
const {
  assign,
  kebabCase,
  camelCase,
  snakeCase,
  capitalize,
  lowerCase,
  isEmpty,
  pick
} = require('lodash');


const { validateCrudJSON } = require('./validation.js');

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
    writeYorc: function() {
      let entities = this.config.get('generated_models');
      if(entities === undefined)
        entities = [];
      entities.push(pick(this.options, ['name', 'plural', 'properties']));
      this.config.set('generated_models', entities);
      this.config.save();
    },
    copyLoopbackModelJS: function () {
      const modelFileName = kebabCase(this.options.name);
      return this.fs.copyTpl(
        this.templatePath('model/model.tmpl.js'),
        this.destinationPath(`server/models/${modelFileName}.js`),
        {}
      );
    },
    createLoopbackModel: function () {
      const modelFileName = kebabCase(this.options.name);
      const jsonPath = `server/models/${modelFileName}.json`;
      const modelDefinition = {
        name: capitalize(camelCase(this.options.name)),
        plural: kebabCase(this.options.plural),
        base: "PersistedModel",
        idInjection: true,
        options: {
          validateUpsert: true,
          postgresql: {
            table: snakeCase(this.options.name)
          }
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
      const modelFileName = kebabCase(this.options.name);
      const LoopbackModelsConfigPath = 'server/model-config.json'
      const modelConfig = this.fs.readJSON(LoopbackModelsConfigPath);
      const newModel = {
        [capitalize(camelCase(this.options.name))]:{
          "dataSource": "db",
          "public": true
        }
      }
      
      const newModelConfig = Object.assign({}, modelConfig, newModel);
      this.fs.writeJSON(this.destinationPath(LoopbackModelsConfigPath), newModelConfig);
    },
    createMigration: function() {
      const migrationName = `${moment().format('YYYYMMDDHHmmSS')}-create-${kebabCase(this.options.name)}`;
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
      const constantFileName = kebabCase(this.options.name);
      return this.fs.copyTpl(
        this.templatePath('redux-files/constant.json'),
        this.destinationPath(`client/source/constants/models/${constantFileName}.json`),
        {
          actionPrefix: this.options.name.toUpperCase(),
        }
      );
    },
    createAction: function () {
      const actionFileName = kebabCase(this.options.name);
      return this.fs.copyTpl(
        this.templatePath('redux-files/action.js'),
        this.destinationPath(`client/source/actions/models/${actionFileName}.js`),
        {
          constantFileName: kebabCase(this.options.name),
          apiUrl: `api/${kebabCase(this.options.plural)}`
        }
      );
    },
    createReducer: function () {
      const reducerFileName = kebabCase(this.options.name);
      return this.fs.copyTpl(
        this.templatePath('redux-files/reducer.js'),
        this.destinationPath(`client/source/reducers/models/${reducerFileName}.js`),
        {
          constantFileName: kebabCase(this.options.name),
          actionReduxName: this.options.name.toUpperCase(),
        }
      );
    },
    listView: function(){
      const containerFolder = kebabCase(this.options.name);
      return Promise.all([
        this.fs.copyTpl(
          this.templatePath('crud-views/list-view.tmpl.js'),
          this.destinationPath(`client/source/containers/models/${containerFolder}/list-view/index.jsx`),
          {
            modelName: kebabCase(this.options.name),
          }
        ),
        this.fs.copy(
          this.templatePath('crud-views/list-view.css'),
          this.destinationPath(`client/source/containers/models/${containerFolder}/list-view/styles.css`)
        ),
        this.fs.copy(
          this.templatePath('crud-views/list-view.test.js'),
          this.destinationPath(`client/source/containers/models/${containerFolder}/list-view/index.test.js`)
        ),
      ]);
    },
    editView: function(){
      const containerFolder = kebabCase(this.options.name);
      return Promise.all([
        this.fs.copyTpl(
          this.templatePath('crud-views/edit-view.tmpl.js'),
          this.destinationPath(`client/source/containers/models/${containerFolder}/edit-view/index.jsx`),
          {
            modelName: kebabCase(this.options.name),
          }
        ),
        this.fs.copy(
          this.templatePath('crud-views/edit-view.css'),
          this.destinationPath(`client/source/containers/models/${containerFolder}/edit-view/styles.css`)
        ),
        this.fs.copyTpl(
          this.templatePath('crud-views/edit-view.test.js'),
          this.destinationPath(`client/source/containers/models/${containerFolder}/edit-view/index.test.js`),
          {
            modelName: kebabCase(this.options.name),
          }
        ),
      ]);
    },
    createView: function(){
      const containerFolder = kebabCase(this.options.name);
      return Promise.all([
        this.fs.copyTpl(
          this.templatePath('crud-views/create-view.tmpl.js'),
          this.destinationPath(`client/source/containers/models/${containerFolder}/create-view/index.jsx`),
          {
            modelName: kebabCase(this.options.name),
          }
        ),
        this.fs.copy(
          this.templatePath('crud-views/create-view.css'),
          this.destinationPath(`client/source/containers/models/${containerFolder}/create-view/styles.css`)
        ),
        this.fs.copy(
          this.templatePath('crud-views/create-view.test.js'),
          this.destinationPath(`client/source/containers/models/${containerFolder}/create-view/index.test.js`)
        )
      ]);
    },
    addCrudToJSON: function () {
      const jsonPath = 'client/source/crud-routes/crud-routes.json';
      const routes = this.fs.readJSON(jsonPath) || { active: [], inactive: [] };
      const name = kebabCase(this.options.name);
      const newCrudEntry = {
        path: `/${name}`,
        componentName: name,
        name: capitalize(lowerCase(this.options.name)),
      }
      routes.active.push(newCrudEntry);
      return this.fs.writeJSON(this.destinationPath(jsonPath), routes);
    },
  },
});