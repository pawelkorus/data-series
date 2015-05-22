function Sum() {
	var sum = 0.0;
	return function(v) {
		sum = sum + v;
		return sum;
	}
}

function Difference() {
	var diff = 0.0;
	return function(v) {
		diff -= v;
		return diff;
	}
}

function Multiply() {
	var result = 1.0;
	return function(v) {
		result = v * result;
		return result;
	}
}

module.exports = exports = {
	Sum: Sum,
	Difference: Difference,
	Multiply: Multiply
}