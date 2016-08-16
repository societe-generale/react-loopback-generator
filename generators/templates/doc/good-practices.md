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
