const path = require('path');

const clientPath = path.join(__dirname, '../../client');

module.exports = {
  // source dir (entry)
  clientPath,
  // static assets dir
  assetsPath: path.join(clientPath, 'assets'),
  // build dir (output)
  buildPath: path.join(clientPath, 'build'),
  // loaders
  loaders: {
    // inline limits
    urlLoaderLimits: {
      // gif|jpe?g|png|webp
      image: 8 * 1024,
      // mp4|m4a|webm|ogv|oga|ogg|mp3|wav
      video: 8 * 1024,
      // woff|woff2
      font: 8 * 1024,
      // svg
      svg: 8 * 1024,
    },
  },
  // Plugins params
  plugins: {
    // WebPack plugin for generating favicons and their associated files.
    // https://github.com/jantimon/favicons-webpack-plugin
    faviconsWebpackPlugin: {
      logo: path.join(clientPath, 'assets/favicon.png'),
      icons: {
        android: false,
        appleIcon: false,
        appleStartup: false,
        coast: false,
        favicons: true,
        firefox: false,
        opengraph: false,
        twitter: false,
        yandex: false,
        windows: false,
      },
    },
    // WebPack plugin for generating index.html page
    // https://github.com/jantimon/html-webpack-plugin
    htmlWebpackPlugin: {
      template: path.join(clientPath, 'assets/index.html'),
    },
  },
  // PostCss
  postCss: {
    // Autoprefixer
    // https://github.com/ai/browserslist
    browsers: ['last 2 versions'],
  },
};
