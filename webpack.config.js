const path = require('path');

module.exports = {
  mode: 'development',

  entry: './src/index.js',

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'production'),
    clean: {
      dry: true,
    },
  },
};
