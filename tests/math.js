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
['Multiply()', testData, [3.0, 14.4, 14.4, 0, 0], math.Multiply()],
['Min() %inputs', [1, 2, 3], [1, 1, 1], math.Min()],
['Min() %inputs', [3, 2, 1], [3, 2, 1], math.Min()],
['Min() %inputs', [2, 1, 3], [2, 1, 1], math.Min()],
['Min() %inputs', [2, 1, 3, 0], [2, 1, 1, 0], math.Min()],
['Min() %inputs', [-1, 0, 1], [-1, -1, -1], math.Min()],
['Min(3) %inputs', [1, 2, 3, 4], [1, 1, 1, 2], math.Min(3)],
['Min(3) %inputs', [2, 1, 0, 1], [2, 1, 0, 0], math.Min(3)],
['Min(3) %inputs', [0, 0, 0, -1], [0, 0, 0, -1], math.Min(3)],
['Max() %inputs', [1, 2, 3], [1, 2, 3], math.Max()],
['Max() %inputs', [3, 2, 1], [3, 3, 3], math.Max()],
['Max() %inputs', [2, 1, 3], [2, 2, 3], math.Max()],
['Max() %inputs', [2, 1, 3, 0], [2, 2, 3, 3], math.Max()],
['Max() %inputs', [-1, 0, 1], [-1, 0, 1], math.Max()],
['Max(3) %inputs', [1, 2, 3, 4], [1, 2, 3, 4], math.Max(3)],
['Max(3) %inputs', [4, 3, 2, 1], [4, 4, 4, 3], math.Max(3)],
['Max(3) %inputs', [1, 0, 1, 2], [1, 1, 1, 2], math.Max(3)]
];

data.forEach(function(v) {
	var label = v[0];
	var testData = v[1];
	var expected = v[2];
	var fun = v[3];
	
	label = label.replace("%inputs", testData.toString());
	
	it(label, function(done) {
		var it = arrayIterator(testData);
		var op = functionOperator(it, fun);
		
		check(expected, op);
		
		done();
	});
	
});

});