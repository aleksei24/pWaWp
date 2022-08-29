const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PostCssPresetEnv = require('postcss-preset-env');
const ImageMinimizerWebpackPlugin = require('image-minimizer-webpack-plugin');

module.exports = {
  mode: 'production',

  entry: './src/index.js',

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'production'),
    clean: true,
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
      {
        test: /\.(png|jpe?g|webp)$/i,
        type: 'asset/resource',
      },
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
                  quality: 50,
                },
              },
            },
          },
        ],
      }),
    ],
  },
};
