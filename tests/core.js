var expect = require('chai').expect
var ta = require('../');

var prepareRandomArray = function(n) {
	n = n || 3;
	
	var testArray = [];
	
	while(n > 0) {
		testArray.push(Math.random());
		n--;
	}

	return testArray;
}

describe('arrayIterator tests', function() {

it('iterating over elements', function(done) {
	var testArray = prepareRandomArray(3);
	var expectedHasNext = [true, true, true];
	var it = ta.arrayIterator(testArray);

	for(var i = 0; i < testArray.length; i++) {
		expect(it.hasNext()).to.equal(expectedHasNext[i]);
		expect(it.next()).to.equal(testArray[i]);
	}

	expect(it.hasNext()).to.equal(false);
	expect(it.next()).to.be.undefined;

	done();
});

it('iterating more times than there is elements in input array', function(done) {
	var testArray = prepareRandomArray(3);
	var expectedResults = [];
	Array.prototype.push.apply(expectedResults, testArray);
	Array.prototype.push.apply(expectedResults, [undefined, undefined]);
	var expectedHasNext = [true, true, true, false, false];
	
	// we will iterate over testArray, but exepctedResults.length times
	var it = ta.arrayIterator(testArray)

	expectedResults.forEach(function(v, index) {
		expect(it.hasNext()).to.equal(expectedHasNext[index])
		expect(it.next()).to.equal(v);
	})

	done();
});

it('hasNext for empty array should give true', function(done) {
	var testArray = [];

	var it = ta.arrayIterator(testArray);

	expect(it.hasNext()).to.be.false;

	done();
});

});

describe('function operator tests', function() {
	
it('operator over array of elements', function(done) {
	var testArray = prepareRandomArray(5);
	var testIt = ta.arrayIterator(testArray);
	
	var it = ta.arrayIterator(testArray);
	var op = ta.functionOperator(it, function(v) {
		expect(v).to.equal(testIt.next());
		return v;
	})

	testArray.forEach(function(v) {
		expect(op.next()).to.equal(v);
	})
	
	done();
})

it('piped operators over array of elements', function(done) {
	var testArray = prepareRandomArray(5);
	var testIt = ta.arrayIterator(testArray);
	
	var it = ta.arrayIterator(testArray);
	var op = ta.functionOperator(it, function(v) {
		return v;
	})
	.pipe(function(v) {
		expect(v).to.equal(testIt.next());
		return v;
	});
	
	testArray.forEach(function(v) {
		expect(op.next()).to.equal(v);
	})
	
	done();
})
	
})
