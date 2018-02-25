var HumanPlayer = require('../HumanPlayer.js');
var Game = require('../Game.js');
var expect = require('Chai').expect;




describe("initPlayer", function() {
	var player
	
    beforeEach(function() {
      player = new HumanPlayer(new Game()); 
    });
	
	it("should set all scores to 0", function() {
		player.initPlayer('X');
        for (var i in player.rowScores) {
          expect(player.rowScores[i]).to.be.equal(0);
        }
        for (var i in player.colScores) {
          expect(player.colScores[i]).to.be.equal(0);
        }
        for (var i in player.diagScores) {
          expect(player.diagScores[i]).to.be.equal(0);
        }
	});
  
    it("should set the players mark to whatever value is passed in", function() {
        var mark1 = 'X';
        var mark2 = 'O';
      
		player.initPlayer(mark1);
        expect(player.mark).to.be.equal(mark1);
        
        player.initPlayer(mark2);
        expect(player.mark).to.be.equal(mark2);
      
    });
  
    it("should throw an error if a string value isn't passed as the argument", function() {
      var mark = 5;
      try{
        expect(player.initPlayer.bind(player, mark)).to.throw("mark must be of type 'string', instead received number");
      } finally {
        
      }
    });
});

describe("updateScore()", function() {
	var player
	
    beforeEach(function() {
      player = new HumanPlayer(new Game()); 
    });
  
    it("should set player.isWinner to true if updateScores is called for all 3 of the spaces in any row", function() {
      expect(player.isWinner).to.be.equal(false);
      player.updateScore(1, 1);
      player.updateScore(1, 2);
      player.updateScore(1, 3);
      expect(player.isWinner).to.be.equal(true);
      
      player = new Player(new Game());
      expect(player.isWinner).to.be.equal(false);
      player.updateScore(2, 1);
      player.updateScore(2, 2);
      player.updateScore(2, 3);
      expect(player.isWinner).to.be.equal(true);
      
      
      player = new Player(new Game());
      expect(player.isWinner).to.be.equal(false);
      player.updateScore(3, 1);
      player.updateScore(3, 2);
      player.updateScore(3, 3);
      expect(player.isWinner).to.be.equal(true);
      
      
    });
  
    it("should set player.isWinner to true if updateScores is called for all 3 of the spaces in any column", function() {
      player.initPlayer('X');
      expect(player.isWinner).to.be.equal(false);
      player.updateScore(1, 1);
      player.updateScore(2, 1);
      player.updateScore(3, 1);
      expect(player.isWinner).to.be.equal(true);
      
      player.initPlayer('O');
      expect(player.isWinner).to.be.equal(false);
      player.updateScore(1, 2);
      player.updateScore(2, 2);
      player.updateScore(3, 2);
      expect(player.isWinner).to.be.equal(true);
      
      
      player.initPlayer('X');
      expect(player.isWinner).to.be.equal(false);
      player.updateScore(1, 3);
      player.updateScore(2, 3);
      player.updateScore(3, 3);
      expect(player.isWinner).to.be.equal(true);
      
      
    });
});
