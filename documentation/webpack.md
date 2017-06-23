# Webpack

Webpack configuration lives in `client/webpack` directory.

|File|Description|
|---|---|
|`params.js`|Basic webpack/plugins/loaders configuration|
|`plugins.js`|Plugins configuration|
|`postcss.js`|PostCss configuration (stylelint, cssnext)|
|`rules.javascript.js`|Javascript loaders (eslint/babel...)|
|`rules.media.js`|Media loaders (images, video, fonts...)|
|`rules.styles.js`|CSS loaders (CSS modules, PostCss)|
|`webpack.config.dev.js`|Webpack dev configuration|
|`webpack.config.js`|Webpack prod configuration|


## CSS-LOADER rules

css-loader is configured with the following rules:

|File|Source|Treated as|
|---|----|---|
|`*.css`|node_modules|global CSS|
|`*.global.css`|source<br>node_modules|global CSS|
|`*.css`|source|scoped CSS|

See `rules.styles.js` for more details.
