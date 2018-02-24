var Board = require('../Board.js');
var expect = require('Chai').expect;


describe("getInput(prompt)", function() {
  var stdin;
  beforeEach(function () {
    stdin = require('mock-stdin').stdin();
  });
	
	it("should print the given prompt to the console", function() { 
		
		expect('s').to.be.equal('a');
	})
})
