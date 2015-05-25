var util = require("./util");

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

function Min(n) {
	var min = Number.MAX_VALUE;

	if(util.isInt(n)) {
		var buffer = [];
		
		return function(v) {
			buffer.push(v);
					
			if(min > v) {
				min = v;
			}
					
			if(buffer.length <= n) {
				return min;
			} else {
				var oldval = buffer.shift();
				if(oldval <= min) {
					min = Math.min.apply(Math, buffer);
				}
				return min;
			}
		}
		
	} else {
		return function(v) {
			if(min > v) {
				min = v;
			}
			
			return min;
		}
	}
}

function Max(n) {
	var max = -Number.MAX_VALUE;

	if(util.isInt(n)) {
		var buffer = [];
		
		return function(v) {
			buffer.push(v);
					
			if(max < v) {
				max = v;
			}
					
			if(buffer.length <= n) {
				return max;
			} else {
				var oldval = buffer.shift();
				if(oldval <= max) {
					max = Math.max.apply(Math, buffer);
				}
				return max;
			}
		}
		
	} else {
		return function(v) {
			if(max < v) {
				max = v;
			}
			
			return max;
		}
	}
}

module.exports = exports = {
	Sum: Sum,
	Difference: Difference,
	Multiply: Multiply,
	Min: Min,
	Max: Max
}