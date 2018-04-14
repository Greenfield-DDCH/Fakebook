const path = require('path');
const SRC_DIR = path.join(__dirname, '/client');
const DIST_DIR = path.join(__dirname, '/client/dist');

const webpackConfig = {
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    path: DIST_DIR,
    filename: 'bundle.js',
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      include: SRC_DIR,
      loader: 'babel-loader',
      options: { presets: ['env', 'react']},
    }]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  mode: 'development',
};

module.exports = webpackConfig;