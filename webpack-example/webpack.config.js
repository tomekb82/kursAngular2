const path               = require('path');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const CopyWebpackPlugin  = require('copy-webpack-plugin');

module.exports = {
  entry: {
    'main'  : './app/main.ts',
    'vendor': './app/vendor.ts'
  },
  output: {
    path    : './dist',
    filename: 'bundle.js'
  },
  plugins: [
    new CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    new CopyWebpackPlugin([{from: './app/index.html', to: 'index.html'}])
  ],
  resolve: {
    extensions: ['', '.ts', '.js']
  },
  module: {
    loaders: [
      {test: /\.ts$/, loader: 'ts-loader'}
    ],
    noParse: [path.join(__dirname, 'node_modules', 'angular2', 'bundles')]
  },
  //watch: true,
  devServer: {
    contentBase: 'app',
    historyApiFallback: true
  },
  devtool: 'source-map'
};