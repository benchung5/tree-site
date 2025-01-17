// import fs from 'fs';
// import yaml from 'js-yaml';
const fs = require('fs');
const yaml = require('js-yaml');

const absPath = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

//Load settings from settings.yml
const { PATHS } = loadConfig();

function loadConfig() {
  let ymlFile = fs.readFileSync('config.yml', 'utf8');
  return yaml.load(ymlFile);
}

module.exports = {
  mode: 'development',
  entry: './src/js/react-app/app.js',
  output: {
    // path: absPath.resolve(__dirname, PATHS.dist + '/assets/js'),
    filename: 'react.js',
    //location of bundle in relation to index.html
    //publicPath: '/assets/js/',
    //so we can use with xamp
    publicPath: 'http://localhost/assets/js/'
  },
    module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' },
      { test: /\.css$/, use: 'style-loader'}
    ]
  },
  module: {
    // rules for modules (configure loaders, parser options, etc.)
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ]
      },
      {
        test: /\.(js|jsx)$/,
        loaders: 'babel-loader',
        // options: { presets: ["react", "es2015"] },
        // exclude: absPath.resolve(__dirname, "node_modules")
        include: [
                    absPath.resolve(__dirname, "src/js/react-app"),
                    absPath.resolve(__dirname, 'node_modules/foundation-sites'),
                  ]
      }
    ]
  },
  externals: {
      // enable jQuery as an external script to use in imports
      jquery: "jQuery"
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      // From mapbox-gl-js README. Required for non-browserify bundlers (e.g. webpack):
      'mapbox-gl$': absPath.resolve('./node_modules/mapbox-gl/dist/mapbox-gl.js')
    }
  },
  plugins: [
    //new webpack.EnvironmentPlugin(['MapboxAccessToken'])
    new webpack.EnvironmentPlugin({
      MapboxAccessToken: 'mapboxtokenhere...'
    }),
    new webpack.DefinePlugin({
      "process.env": { 
         NODE_ENV: JSON.stringify("development"),
         // DEV_SERVER_SCRIPT: JSON.stringify('dev-server-script')
       }
    }),
    // new HtmlWebpackPlugin({
    //   //the template file to use (two steps out of the bundle directory)
    //   template: './layout-template.php',
    //   //the output file to write to
    //   filename: '../../layout.php',
    //   inject: 'dev-server-script',
    //   // environment: process.env.DEV_SERVER_SCRIPT
    // }),
    new webpack.ProvidePlugin({
      //for promises to work for ie11
      Promise: 'es6-promise-promise', // works as expected
    }),
    // new BundleAnalyzerPlugin({
    //     analyzerMode: 'static'
    // }),
  ],
  devServer: {
    //dev server is actually located in the gulpfile since we're
    //running it using gulp instead of through webpack
  },
  devtool: "source-map"
  // devtool: "eval",
}
