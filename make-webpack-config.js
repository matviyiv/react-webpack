var path = require('path'),
  webpack = require('webpack'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function (options) {
  var alias = {};
  var aliasLoader = {};
  var externals = [];
  var modulesDirectories = ['web_modules', 'node_modules'];
  var extensions = ['', '.web.js', '.js', '.jsx'];
  var root = path.join(__dirname, 'client');
  var excludeFromStats = [
    /node_modules[\\\/]react(-router)?[\\\/]/,
    /node_modules[\\\/]items-store[\\\/]/
  ];
  var plugins = [
    new webpack.PrefetchPlugin('react'),
    new webpack.PrefetchPlugin('react/lib/ReactComponentBrowserEnvironment'),
    new HtmlWebpackPlugin({
      template: path.join(root + '/index.html')
    })
  ];
  if (options.prerender) {
    aliasLoader['react-proxy$'] = 'react-proxy/unavailable';
    aliasLoader['react-proxy-loader$'] = 'react-proxy-loader/unavailable';
    externals.push(
      /^react(\/.*)?$/,
      /^reflux(\/.*)?$/,
      'superagent',
      'async'
    );
    plugins.push(new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }));
  }

  if (options.commonsChunk) {
    plugins.push(new webpack.optimize.CommonsChunkPlugin('commons', 'commons.js' + (options.longTermCaching && !options.prerender ? '?[chunkhash]' : '')));
  }

  if (options.separateStylesheet && !options.prerender) {
    plugins.push(new ExtractTextPlugin('[name].css' + (options.longTermCaching ? '?[contenthash]' : '')));
  }
  if (options.minimize && !options.prerender) {
    plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        compressor: {
          warnings: false
        }
      }),
      new webpack.optimize.DedupePlugin()
    );
  }
  if (options.minimize) {
    plugins.push(
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      }),
      new webpack.NoErrorsPlugin()
    );
  }

  return {
    entry: entry(options),
    output: output(options),
    target: target(options),
    module: {
      preLoaders: preLoaders(options),
      loaders: loaders(options)
    },
    devtool: options.devtool,
    debug: options.debug,
    resolveLoader: {
      root: path.join(__dirname, 'node_modules'),
      alias: aliasLoader
    },
    externals: externals,
    resolve: {
      root: root,
      modulesDirectories: modulesDirectories,
      extensions: extensions,
      alias: alias
    },
    plugins: plugins,
    devServer: {
      stats: {
        cached: false,
        exclude: excludeFromStats
      }
    },
    eslint: {  
      configFile: '.eslintrc',
      fix: true
    }
  };
};

function target(options) {
  return options.prerender ? 'node' : 'web';
}

function loaders(options) {
  return [asyncLoader(options)].
    concat(baseLoaders(options)).
    concat(stylesheetLoaders(options)).
    concat(additionalLoaders(options))
}

function preLoaders(options) {
  return options.linterOff ? [] : [{
    loader: 'eslint-loader',
    test: /(\.js$|\.jsx$)/,
    exclude: /node_modules/
  }];
}

function stylesheetLoaders(options) {
  var loadersByExtension = require('./loadersByExtension'),
    cssLoader = options.minimize ? 'css-loader' : 'css-loader?localIdentName=[path][name]---[local]---[hash:base64:5]',
    base = {
      'css': cssLoader,
      'scss|sass': [cssLoader, 'sass-loader?includePaths[]=' + (path.resolve(__dirname, './node_modules'))]
    };

  Object.keys(base).forEach(function (extension) {
    var stylesheetLoader = base[extension];

    if (Array.isArray(stylesheetLoader)) {
      stylesheetLoader = stylesheetLoader.join('!');
    }
    if (options.prerender) {
      base[extension] = stylesheetLoader.replace(/^css-loader/, 'css-loader/locals');
    } else if (options.separateStylesheet) {
      base[extension] = ExtractTextPlugin.extract('style-loader', stylesheetLoader);
    } else {
      base[extension] = 'style-loader!' + stylesheetLoader;
    }
  });

  return loadersByExtension(base);
}

function baseLoaders(options) {
  var loadersByExtension = require('./loadersByExtension'),
    babe6HotLoader = {
      presets: ['es2015', 'stage-0', 'react'],
      env: {
        development: {
          plugins: [['react-transform', {
            transforms: [{
              transform: 'react-transform-hmr',
              imports: ['react'],
              locals: ['module']
            }]
          }]]
        }
      }
    },
    base = {
      'jsx': {
        loader: 'babel-loader',
        query: options.hotComponents ? babe6HotLoader : {presets: ['es2015', 'stage-0', 'react']}
      },
      'js': {
        loader: 'babel-loader',
        query: {presets: ['es2015', 'stage-0']},
        include: path.join(__dirname, 'client')
      },
      'json': 'json-loader',
      'json5': 'json5-loader',
      'txt': 'raw-loader',
      'png|jpg|jpeg|gif|svg': 'url-loader?limit=10000',
      'woff|woff2': 'url-loader?limit=100000',
      'html': 'html-loader'
    };

  return loadersByExtension(base);
}

function asyncLoader(options) {
  return {
    test: [].map(function(name) {
      return path.join(__dirname, 'client', 'route-handlers', name);
    }),
    loader: options.prerender ? 'react-proxy-loader/unavailable' : 'react-proxy-loader'
  };
}

function additionalLoaders(options) {
  return [
    // { test: /some-reg-exp$/, loader: 'any-loader' }
  ];
}

function output(options) {
  var publicPath = options.devServer ?
    'http://localhost:2992/_assets/' :
    '/_assets/';

  return {
    path: path.join(__dirname, 'build', options.prerender ? 'prerender' : 'public'),
    publicPath: publicPath,
    filename: '[name].js' + (options.longTermCaching && !options.prerender ? '?[chunkhash]' : ''),
    chunkFilename: (options.devServer ? '[id].js' : '[name].js') + (options.longTermCaching && !options.prerender ? '?[chunkhash]' : ''),
    sourceMapFilename: 'debugging/[file].map',
    libraryTarget: options.prerender ? 'commonjs2' : undefined,
    pathinfo: options.debug || options.prerender
  };
}

function entry(options) {
  return {
    main: './client/app'
  };
}
