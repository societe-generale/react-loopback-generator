const fileName = 'assets/[name].[hash:8].[ext]';

module.exports = params => [
  {
    test: /\.(gif|jpe?g|png|webp)$/,
    loader: 'url-loader',
    query: {
      limit: params.loaders.urlLoaderLimits.image,
      name: fileName,
    },
  },
  {
    test: /\.(mp4|m4a|webm|ogv|oga|ogg|mp3|wav)$/,
    loader: 'url-loader',
    query: {
      limit: params.loaders.urlLoaderLimits.video,
      name: fileName,
    },
  },
  {
    test: /\.(woff|woff2)$/,
    loader: 'url-loader',
    query: {
      limit: params.loaders.urlLoaderLimits.font,
      name: fileName,
    },
  },
  {
    test: /^(?!.*\.(inline|react)\.svg$).*\.svg$/,
    loader: 'url-loader',
    query: {
      limit: params.loaders.urlLoaderLimits.svg,
      name: fileName,
    },
  },
];
