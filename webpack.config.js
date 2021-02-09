const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');


module.exports = {

  entry: {
    index: ['./src/scripts/index.js', './src/styles/main.scss',],
    create: ['./src/scripts/create.js', './src/styles/main.scss',]
  }
 ,
  output: {
    path: path.resolve(__dirname, 'dist'),
    // filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   loader: 'babel-loader',
      //   options: {
      //     presets: [
      //       { plugins: ['@babel/plugin-proposal-class-properties'] }],
      //   },
      // },
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
        // exclude: path.resolve(__dirname, 'public/index.html'),
      },
      {
      // test: /\.css$/i,
      // use: ['style-loader' , 'css-loader', 'sass-loader'],
        test: /\.scss$/,
        use: [
        // fallback to style-loader in development
          process.env.NODE_ENV !== 'production'
            ? 'style-loader'
            : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },

  plugins: [
    new ESLintPlugin(),
    new CleanWebpackPlugin(),
    // new HtmlWebpackPlugin({
    //   title: 'Output Management',
    //   filename: 'index.html',
    //   template: 'public/index.html',
    //   inject: 'body',
    // }),
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