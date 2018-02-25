var Board = require('./Board.js');
var Game = require('./Game.js');
var Player = require('./Player.js');


class BotPlayer extends Player {
	
	requestMove(board) { 
		return this.findBestMove(board);
	} 
	
	findBestMove(board) {
		var move = null;
		for (var y in board.board) {
			for (var x in board.board[y]) {
				
			}
		}
	}
	
	miniMax(board, depth) {
		
	}

	
}


module.exports = BotPlayer;