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

it('hasNext for empty array should give false', function(done) {
	var testArray = [];

	var it = ta.arrayIterator(testArray);

	expect(it.hasNext()).to.be.false;

	done();
});

});

describe('valueIterator tests', function() {

it('iterating when no value was set should give undefined', function(done) {
	var it = ta.valueIterator();
	expect(it.hasNext()).to.be.true;
	expect(it.next()).to.be.undefined;
	
	done();
});

it('iterating after value was set should give this value', function(done) {
	var trials = 3;
	var testValue = Math.random();
	
	var it = ta.valueIterator(testValue);
	
	while(trials) {
		expect(it.hasNext()).to.be.true;
		expect(it.next()).to.be.equal(testValue);
		trials--;
	}
	
	done();
});

it('after changing value next should give value that was set last', function(done) {
	var testValues = [
		Math.random(),
		Math.random(),
		undefined,
		0,
		-1000,
		"test string",
		function() {},
		{}
	]
	
	var it = ta.valueIterator();
	
	testValues.forEach(function(v) {
		it.setValue(v);
		
		expect(it.hasNext()).to.be.true;
		expect(it.next()).to.be.equal(v);
	})

	done();
});

})

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
