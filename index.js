var core = require('./lib/core')

module.exports = exports = {
	functionOperator: core.functionOperator,
	arrayIterator: core.arrayIterator,
	valueProvider: core.valueProvider,
	statistic: require('./lib/statistic'),
	math: require('./lib/math')
}