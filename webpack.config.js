const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProd = (process.env.NODE_ENV === 'production');

module.exports = {
  entry: {
    index: ['./src/scripts/index.js', './src/styles/main.scss',],
    create: ['./src/scripts/create.js', './src/styles/main.scss',]
  } ,
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.scss$/,
       use: [
          !isProd ? 'style-loader': MiniCssExtractPlugin.loader,
         'css-loader',
         'sass-loader',
       ],
     },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'main.css',
      chunkFilename: 'main.css'
    }),
    new ESLintPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "public/index.html",
      filename: 'index',
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      template: "public/create.html",
      filename: 'create',
      chunks: ['create']
    })
    ],
  devServer: {
    contentBase: path.join(__dirname, './dist'),
    watchContentBase: true,
    open: true,
    compress: true,
    port: 9000,
  },
};