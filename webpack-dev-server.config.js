module.exports = require('./make-webpack-config')({
	devServer: true,
	devtool: 'eval',
	debug: true,
  prerender: true
});
