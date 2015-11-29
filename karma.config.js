const webpack = require('webpack'),
  webpackConfig = require('./webpack-dev-server.config');

module.exports = function (config) {
  config.set({
    browsers: [ 'PhantomJS' ],
    singleRun: true,
    frameworks: [ 'mocha', 'phantomjs-shim' ],
    files: [
      'test-runner.js' //just load this file
    ],
    preprocessors: {
      'test-runner.js': [ 'webpack' ]
    },
    reporters: [ 'spec' ],
    webpack: webpackConfig,
    webpackServer: {
      noInfo: false
    },
    plugins: ['karma-phantomjs-launcher', 'karma-mocha', 'karma-spec-reporter', 'karma-phantomjs-shim', 'karma-webpack']
  });
};