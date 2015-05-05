function functionOperator(inputs, fun) {
	if(!inputs) throw 'Input source must be defined.';
	if(!fun) throw 'Function that calculates results must be defined';

	var context = {};
	var p = {
		pipe: function(fun) {
			return functionOperator(this, fun);
		},
		next: function() {
			if(inputs.hasNext()) {
				var v = inputs.next();
				if(!v) {
					return fun.call(context, v);
				} else if(v.length) {
					return fun.apply(context, v);
				} else {
					return fun.call(context, v);
				}
			} else {
				return undefined;
			}
		},
		hasNext: function() {
			return inputs.hasNext();
		}
	}
		
	return Object.create(p);
}

function arrayIterator(arr) {
	if(!arr) throw 'Array must be defined.'

	var _arr = arr;
	var _curIndex = -1;
	var p = {
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
	}
		
	return Object.create(p);
}

function valueIterator(v) {
	var _data = v;
	
	var p = {
		/** iterator interface */
		next: function() {
			return _data;
		},
		hasNext: function() {
			return true;
		},
		/** end of iterator interface */	
		setValue: function(v) {
			_data = v;	
		}
	}
	
	return Object.create(p);
}

module.exports = exports = {
	functionOperator: functionOperator,
	arrayIterator: arrayIterator,
	valueIterator: valueIterator
}
