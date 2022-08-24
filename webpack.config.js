const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ImageMinimizerWebpackPlugin = require('image-minimizer-webpack-plugin');

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
      {
        test: /\.(jpe?g|png|webp)$/i,
        type: 'asset',
      },
    ],
  },

  optimization: {
    minimizer: [
      new ImageMinimizerWebpackPlugin({
        minimizer: {
          implementation: ImageMinimizerWebpackPlugin.squooshMinify,
          options: {
            plugins: [['jpegtran', { progressive: true }]],
          },
        },
      }),
    ],
  },

  devServer: {
    port: 9000,
    hot: false,
    open: true,
    liveReload: true,
    watchFiles: ['src/*.html'],
    historyApiFallback: true,
  },
};
