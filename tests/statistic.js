var arrayIterator = require('../').arrayIterator;
var functionOperator = require('../').functionOperator;
var statistic = require('../').statistic;
var expect = require('chai').expect;

describe('statistic', function() {

var testData = [3.0, 4.8, 234.34, 34.5, 1.0, 123.0, 0.0, -0.455];

var check = function(expected, op) {
	expected.forEach(function(v) {
		if(v === undefined) {
			expect(op.next()).to.be.equal(v);
		} else if(Array.isArray(v)) {
			outputValues = op.next();

			v.forEach(function(el, index) {
				expect(outputValues[index]).to.be.closeTo(el, 0.001);
			})
		} else {
			expect(op.next()).to.be.closeTo(v, 0.001);
		}
	})
}

var data = [
['Variance', testData, [0, 1.62, 17701.67453, 12335.0344, 10180.43292, 8903.091467, 8056.196895, 7321.318335], statistic.Variance()],
['Variance k=4', testData, [0, 1.62, 17701.67453, 12335.0344, 12424.24773, 10884.88973, 3346.5625, 3771.45509], statistic.Variance(4)],
['Mean', testData, [3, 3.9, 80.71333333, 69.16, 55.528, 66.77333333, 57.23428571, 50.023125], statistic.Mean()],
['Mean(4)', testData, [3, 3.9, 80.71333333, 69.16, 68.66, 98.21, 39.625, 30.88625], statistic.Mean(4)]
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
