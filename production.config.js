const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageMinimizerWebpackPlugin = require('image-minimizer-webpack-plugin');
const PostCssPresetEnv = require('postcss-preset-env');

module.exports = {
  mode: 'production',

  entry: './src/index.js',

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'production'),
    clean: {
      dry: true,
    },
  },

  devtool: 'inline-source-map',

  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  PostCssPresetEnv({
                    stage: 2,
                    browsers: 'last 2 versions',
                    autoprefixer: { grid: true },
                  }),
                ],
              },
            },
          },
        ],
      },
    ],
  },

  optimization: {
    minimizer: [
      new ImageMinimizerWebpackPlugin({
        generator: [
          {
            preset: 'webp',
            implementation: ImageMinimizerWebpackPlugin.squooshGenerate,
            options: {
              encodeOptions: {
                webp: {
                  quality: 90,
                },
              },
            },
          },
        ],
      }),
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      title: 'My PWA',
      favicon: './src/fav/fav-pwa.png',
      template: path.resolve(__dirname, './src/template.html'),
    }),
    new MiniCssExtractPlugin(),
  ],
};
