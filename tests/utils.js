var expect = require('chai').expect;
var utils = require('../').utils;

describe('utils', function() {

var data = [
//	inputs			outputs	function
[	12,				true,	'isInt'	],
[	12.3,			false,	'isInt'	],
[	'aaaa',			false,	'isInt'	],
[	undefined,		false,	'isInt'	],
[	NaN,			false,	'isInt'	],
[	0,				true,	'isInt'	],
[	-23,			true,	'isInt'	],
[	-0.24,			false,	'isInt'	],
[	{},				false,	'isInt'	],
// to pass array we need to put here array of parameters
[	[ [] ],			false,	'isInt'	],
[	function(){},	false,	'isInt'	]	
]

data.forEach(function(data) {

var inputs = Array.isArray(data[0])? data[0] : [ data[0] ];
var expectedOutput = data[1];
var fun = utils[data[2]];

it('testing ' + data[2] + ' for ' + inputs, function(done) {
	var output = fun.apply(null, inputs);

	expect(output).to.equal(expectedOutput);
	
	done();
})

})

})