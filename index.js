const loaderUtils = require('loader-utils');

module.exports = function() {
	var query = loaderUtils.getOptions(this);

	var outfile = loaderUtils.interpolateName(this, query.folder + '/[name].[ext]', {
		context: this.context
	});

	if (query && query.prod)
		outfile = 'resources/' + outfile;

return (
    `try {global.process.dlopen(module, ${JSON.stringify(
      outfile
    )}); } catch(e) {` +
    `throw new Error('node-loader: Cannot open ' + ${JSON.stringify(
      outfile
    )} + ': ' + e);}`
  );
};
