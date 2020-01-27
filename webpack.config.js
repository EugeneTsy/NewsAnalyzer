const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');


module.exports = {
  entry: {
     commons: './src/scripts/commons.js',
     index: './src/scripts/index.js',
     about: './src/scripts/about.js',
     analytics: './src/scripts/analytics.js',
     },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
       {
        test: /\.(png|jpg|gif|ico|svg)$/,
        use: [
                'file-loader?name=./images/[name].[ext]', 
                {
                        loader: 'image-webpack-loader',
                        options: {}
                },
        ]
       },
       {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file-loader?name=./vendor/[name].[ext]'
        },
    ]
  },
  plugins: [ 
    new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css'
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
              preset: ['default'],
      },
      canPrint: true
 }),
    new WebpackMd5Hash(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, `./src/html/index.html`),
      inject: true,
      hash: true,
      chunks: ["commons", "index"],
    }),
    new HtmlWebpackPlugin({
      filename: 'about.html',
      template: path.resolve(__dirname, `./src/html/about.html`),
      inject: true,
      hash: true,
      chunks: [/*"flickity",*/ "commons", "about"],
    }),
    new HtmlWebpackPlugin({
      filename: 'analytics.html',
      template: path.resolve(__dirname, `./src/html/analytics.html`),
      inject: true,
      hash: true,
      chunks: ["commons", "analytics"],
    })
  ]
};