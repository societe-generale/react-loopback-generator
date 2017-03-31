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
   npm run database:migrate`
   ```

 * Cancel last migration:

   ``` bash
   npm run database:migrate:down
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
