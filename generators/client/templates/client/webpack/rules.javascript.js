const path = require('path');

module.exports = (params) => {
  const rules = [];
  const sourcePath = path.join(params.clientPath, 'source');
  const isProd = process.env.NODE_ENV === 'production';

  const presets = ['es2015', 'react', 'stage-0'];
  rules.push({
    test: /\.(js|jsx)$/,
    loader: 'babel',
    include: [sourcePath],
    query: {
      cacheDirectory: isProd ? true : '/tmp',
      plugins: isProd ? ['transform-runtime'] : [],
      presets: isProd ? presets : [...presets, 'react-hmre'],
    },
  });

  rules.push({
    test: /\.json$/,
    loader: 'json',
  });

  return rules;
};
