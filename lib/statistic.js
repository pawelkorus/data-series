var util = require("./util");

function Mean(k) {
	var sum = 0;
	
	if(util.isInt(k)) {
		var buffer = [];
		
		return function(v) {
			buffer.push(v);

			sum += v;
			
			if(buffer.length <= k) {
				return sum/buffer.length;
			} else {
				var oldval = buffer.shift();
				sum -= oldval;
				
				return sum/buffer.length;
			}
						
		}
	
	
	} else {
		var n = 0;
	
		return function(v) {
			n += 1;
			
			sum += v;
			
			return sum/n;
		}
	}
}

/**
 * For first element in set it returns 0.0.
 */
function Variance(k) {
	var K = undefined;
	var E = 0;
	var E2 = 0;
	
	if(!k) {
		var n = 0;
		
		return function(v) {
			if(!K) K = v;
			
			n++;
		
			E += v - K;
			E2 += (v - K) * (v - K);
			
			if(n == 1) {
				return 0.0;
			} else {
				return (E2 - (E*E)/n)/(n - 1);
			}
		}
	} else {
		var buffer = [];
		
		return function(v) {
			if(v === undefined) return undefined;
			
			if(!K) K = v;
			
			buffer.push(v);
			
			E += v - K;
			E2 += (v - K) * (v - K);
			
			if(k && buffer.length > k) {
				var oldV = buffer.shift();
				E -= (oldV - K);
				E2 -= (oldV - K) * (oldV - K);
			}
			
			if(buffer.length == 1) {
				return 0.0;
			} else {
				return (E2 - (E*E)/buffer.length)/(buffer.length - 1);
			}
		}
	}
}

module.exports = exports = {
	Mean: Mean,
	Variance: Variance
}