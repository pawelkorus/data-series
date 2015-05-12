var core = require('./lib/core')
var ta = require('./lib/ta')

module.exports = exports = {
	functionOperator: core.functionOperator,
	arrayIterator: core.arrayIterator,
	valueIterator: core.valueIterator,
	ta: ta,
	statistic: require('./lib/statistic')
}