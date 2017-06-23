const fileName = 'assets/[name].[hash:8].[ext]';

module.exports = params => [
  {
    test: /\.(gif|jpe?g|png|webp)$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          name: fileName,
          limit: params.loaders.urlLoaderLimits.image,
        },
      },
    ],
  },
  {
    test: /\.(mp4|m4a|webm|ogv|oga|ogg|mp3|wav)$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          name: fileName,
          limit: params.loaders.urlLoaderLimits.video,
        },
      },
    ],
  },
  {
    test: /\.(woff|woff2)$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          name: fileName,
          limit: params.loaders.urlLoaderLimits.font,
        },
      },
    ],
  },
  {
    test: /^(?!.*\.(inline|react)\.svg$).*\.svg$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          name: fileName,
          limit: params.loaders.urlLoaderLimits.svg,
        },
      },
    ],
  },
];
