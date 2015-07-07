var core = require('./lib/core');

module.exports = exports = {
	functionOperator: core.functionOperator,
	arrayIterator: core.arrayIterator,
	valueProvider: core.valueProvider,
	utils: require('./lib/utils'),
	math: require('./lib/math')
};