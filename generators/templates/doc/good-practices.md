Frontend development
===================

* In order to create new React components, use `yarn generate` and answer the following questions:

  * Do you want a container or a component? *Containers are linked to the application pages whereas components tend to be reusable pieces of your application*
  * What should it be called? *Specify the name of your React component*
  * Select a type of component *Choose between PureComponents, Components and stateless functions for your Reach component*
  * Do you want to connect your component to redux? *Use Redux to handle your global state*
  * Do you want to use react-intl? *Use `react-intl` to handle the translations within your application*
  * Do you want to use styled-components? *Use [styled-components](https://github.com/styled-components/styled-components) to easily style your components using a CSS syntax*
  * Do you want snapshot tests? *Use [snapshot testing](https://facebook.github.io/jest/docs/en/snapshot-testing.html) to make sure your UI does not change unexpectedly*

Database migrations
===================

 * Create a migration:

   ``` bash
   node_modules/.bin/db-migrate create MIGRATION_NAME
   ```

   Then you can edit your migration through the 'up' and 'down' SQL files located
   in `migrations/sqls/DATE-MIGRATION_NAME-*.sql`.

 * Run missing migrations:

   ``` bash
   yarn database:migrate`
   ```

 * Cancel last migration:

   ``` bash
   yarn database:migrate:down
   ```

Logger
======

The logger configuration is set in the `server/component-config.json` file.

To use the logger in the model, do the following

```javascript
  Model.myMethod = function(next) {
    Model.app.log.<channel>.info('I log from my method');
    return next();
  }
```

To have more informations about the logger, please read the [documentation of winston](https://github.com/winstonjs/winston).


Loopback Mixins
===============

Mixins with Loopback are used to **apply common logic to a set of __models__**: no code/logic/test repetition.

Examples: upload field, createdAt/updatedAt attributes, count instances, etc

 * Define your mixin: that is common logic
 * For each model, enable mixin in Model.js

See:
 * [How to create/add mixin?](https://github.com/CyrilleHugues/demo-mixin-loopback/pull/1/files)
 * [How to test mixin?](https://github.com/CyrilleHugues/demo-mixin-loopback/pull/2/files)
