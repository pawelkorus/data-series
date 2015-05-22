var core = require('./lib/core')

module.exports = exports = {
	functionOperator: core.functionOperator,
	arrayIterator: core.arrayIterator,
	valueProvider: core.valueProvider,
	ta: require('./lib/ta'),
	statistic: require('./lib/statistic'),
	math: require('./lib/math')
}