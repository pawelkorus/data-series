/**
 * @module core
 */

/**
 * @interface Provider
 */

/**
 * Returns next value or undefined if there is no more values. 
 *
 * @function
 * @name module:core~Provider#next
 * @returns {Any|undefined}
 */
 
/**
 * Checks if value is available
 *
 * @function
 * @name module:core~Provider#hasNext
 * @returns {Boolean} true if values are available. false otherwise.
 */

/**
 * @classdesc Objects implementing this interface are used for executing 
 * calculations on provided values. Calculated values are available 
 * through the [next]{@link FunctionOperator#next} 
 * method. 
 *
 * @interface FunctionOperator
 */


/**
 * Creates the pipe between two instances of FunctionOperator.
 * Instance for which this method is called becomes data provider
 * for the new FunctionOperator class instance.
 * 
 * @name module:core~FunctionOperator#pipe 
 * @param {Function} fun	function that will be used for calculating new values
 * @returns {FunctionOperator} object implementing FunctionOperator interface
 * @method
 */

/**
 * Returns next value. It is calculated by the function passed
 * to the constuctor.
 * 
 * @name module:core~FunctionOperator#next
 * @returns {Any}
 * @method
 */

/**
 * Checks if more values are available.
 * 
 * @name module:core~FunctionOperator#hasNext
 * @returns {Boolean} true if more values are available. Otherwise false.
 * @method
 * @public
 * @instance
 */

function FunctionOperator(inputs, fun) {
	this._context = {};
	this._inputs = inputs;
	this._fun = fun;
}
FunctionOperator.prototype = Object.create(/** @lends module:core~FunctionOperator */ {
	pipe: function(fun) {
		return new FunctionOperator(this, fun);
	},
	next: function() {
		if(this._inputs.hasNext()) {
			var v = this._inputs.next();
			if(!v) {
				return this._fun.call(this._context, v);
			} else if(v.length) {
				return this._fun.apply(this._context, v);
			} else {
				return this._fun.call(this._context, v);
			}
		} else {
			return undefined;
		}
	},
	hasNext: function() {
		return this._inputs.hasNext();
	}
})
 
/**
 * Creates object implementing [FunctionOperator]{@link module:core~FunctionOperator}
 * interface.
 *
 * @see module:core~FunctionOperator
 * @function
 * @static
 */
function functionOperator(inputs, fun) {
	if(!inputs) throw 'Input source must be defined.';
	if(!fun) throw 'Function that calculates results must be defined';

	return new FunctionOperator(inputs, fun);
}
 
/**
 * Creates object that implements Provider interface and returns it. The
 * object iterates over all elements defined in array.
 * 
 * @function
 * @param {Array} arr
 * @returns {Provider}
 * @static
 */
function arrayIterator(arr) {
	if(!arr) throw 'Array must be defined.'

	var _arr = arr;
	var _curIndex = -1;
	var p = {
		// provider interface
		next: function() {
			_curIndex++;
			if(_curIndex < _arr.length) {
				return _arr[_curIndex];
			}

			return undefined;
		},
		hasNext: function() {
			var nextIndex = _curIndex + 1;
			return nextIndex >= 0 && nextIndex < _arr.length;
		}
		// end of provider interface
	}
		
	return Object.create(p);
}

/**
 * Creates object that implements Provider interface and returns it.
 * Returned object for every call of Provider#next function returns
 * same value.
 *
 * The value returned by the provider can be set by calling setValue method.
 *
 * @function
 * @param {Any} initial value
 * @static
 */
function valueProvider(v) {
	var _data = v;
	
	var p = {
		// provider interface
		next: function() {
			return _data;
		},
		hasNext: function() {
			return true;
		},
		// end of provider interface
		setValue: function(v) {
			_data = v;	
		}
	}
	
	return Object.create(p);
}

module.exports = exports = {
	functionOperator: functionOperator,
	arrayIterator: arrayIterator,
	valueProvider: valueProvider
}
