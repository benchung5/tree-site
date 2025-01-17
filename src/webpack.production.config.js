// import fs from 'fs';
// import yaml from 'js-yaml';
const fs = require('fs');
const yaml = require('js-yaml')
const path = require('path');

const absPath = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin')


//Load settings from settings.yml
const { PATHS } = loadConfig();

function loadConfig() {
  let ymlFile = fs.readFileSync('config.yml', 'utf8');
  return yaml.load(ymlFile);
}

//define packages, each string is name of package to include in vendor files
//that don't update very often
// const VENDOR_LIBS = [ 
// "axios",
// "foundation-sites",
// "hammerjs",
// "html-escape",
// "lodash",
// "mapbox-gl",
// "react",
// // "react-cropper",
// "react-dom",
// "react-dropzone",
// "react-mapbox-gl",
// "react-redux",
// "react-router-dom",
// "react-router-redux",
// "react-select",
// "react-share",
// "react-transition-group",
// "redux",
// "redux-form",
// "redux-thunk",
// "sanitize-filename",
// "what-input"
//  ]

module.exports = {
  mode: 'production',
  entry: './src/js/react-app/app.js',
  // entry: {
  //   //split up the entries
  //   react: './src/js/react-app/app.js'
  //   // vendor2: VENDOR_LIBS
  // },
  output: {
    path: absPath.resolve(__dirname, PATHS.dist + '/assets/js'),
    //location of bundle in relation to index.html
    publicPath: '/assets/js/',
    //output is: react.<hash>.js and vendor2.<hash>.js (hash to let know if file changed)
    filename: '[name].[chunkhash].js'
  },
  module: {
    // rules for modules (configure loaders, parser options, etc.)
    rules: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
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
  optimization: {
    //look at the total output of imports and pull out any duplicates to only
    //include in the 'vendor2' bundle. Create a manifest.js file to let browser know if vendor file actually got changed
    // new webpack.optimize.CommonsChunkPlugin({
    //   names: ['vendor2', 'manifest']
    // }),
    splitChunks: {
      // include all types of chunks
      chunks: 'all'
    },
    // you can set this to fale in 'production' mode this equals to true
    minimize: true
  },
  plugins: [
    //new webpack.EnvironmentPlugin(['MapboxAccessToken'])
    new webpack.EnvironmentPlugin({
      MapboxAccessToken: 'mapboxtokenhere...'
    }),
    new webpack.DefinePlugin({
      "process.env": { 
         //NODE_ENV: JSON.stringify("production"),   // this is now defined in modd: production
         TEST_VAR: JSON.stringify('http://yougotit')
       }
    }),

    // new HtmlWebpackPlugin({
    //   //the template file to use (two steps out of the bundle directory)
    //   template: './layout-template.php',
    //   //the output file to write to
    //   filename: '../../layout.php',
    // }),
    // new webpack.optimize.UglifyJsPlugin({  // replaced by optimization: minimize
    //     compress: {
    //         warnings: false,
    //         // don't optimize comparisons or 
    //         //will cause error with mapbox
    //         comparisons: false,  
    //     },
    // }),
    new webpack.ProvidePlugin({
      //for promises to work for ie11
      Promise: 'es6-promise-promise', // works as expected
    }),
  ],
};