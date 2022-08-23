const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',

  entry: './src/index.js',

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'development'),
    clean: {
      dry: true,
    },
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'My PWA',
      filename: 'index.html',
      template: './src/template.html',
      favicon: './src/fav/fav-pwa.png',
    }),
  ],

  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },

  devServer: {
    port: 9000,
    hot: false,
    open: true,
    devMiddleware: {
      writeToDisk: true,
    },
  },
};
