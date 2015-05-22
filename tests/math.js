var arrayIterator = require('../').arrayIterator;
var functionOperator = require('../').functionOperator;
var math = require('../').math;
var expect = require('chai').expect;

describe('math', function() {

var check = function(expected, op) {
	expected.forEach(function(v) {
		if(v === undefined) {
			expect(op.next()).to.be.equal(v);
		} else if(Array.isArray(v)) {
			outputValues = op.next();

			v.forEach(function(el, index) {
				// taking into account rounding error
				expect(outputValues[index]).to.equal(el, 0.0001);
			})
		} else {
			// taking into account rounding error
			expect(op.next()).to.be.closeTo(v, 0.0001);
		}
	})
}

var testData = [3.0, 4.8, 1.0, 0.0, -2.3];

var data = [
['Sum()', testData, [3.0, 7.8, 8.8, 8.8, 6.5], math.Sum()],
['Difference()', testData, [-3.0, -7.8, -8.8, -8.8, -6.5], math.Difference()],
['Multiply()', testData, [3.0, 14.4, 14.4, 0, 0], math.Multiply()]
];

data.forEach(function(v) {
	var label = v[0];
	var testData = v[1];
	var expected = v[2];
	var fun = v[3];
	
	it(label, function(done) {
		var it = arrayIterator(testData);
		var op = functionOperator(it, fun);
		
		check(expected, op);
		
		done();
	});
	
});

});