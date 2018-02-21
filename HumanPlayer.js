var Board = require('./Board.js');
var Game = require('./Game.js');


class HumanPlayer {
	constructor(game) {
		this.game = game;
		this.curRow;
		this.curCol;
		this.makeMove;
	}
	
	
	askForMove(makeMove) {
		
		return this.game.getInputs(["Select A Row: ", "Select A Column: "]);
		/**
		var getrow = this.game.getNextInput("Select A Row: ")
		
		var getcol = getrow.then((row) => {
			return new Promise((resolve, reject) => {
				this.game.getNextInput("Select A Column: ").then((col) => {
					resolve([row, col]);
				});
			});
		});
		
		return getcol;
		**/
	}
	
	getRow() {
		process.stdout.write("Select A Row: ");
		return new Promise((resolve, reject) => {
			this.game.setInputCallback((input) => {
				this.curRow = input;
				resolve();
			})
		});
	}
	
	getCol() {
		process.stdout.write("Select A Column: ");
		return new Promise((resolve, reject) => {
			this.game.setInputCallback((input) => {
				this.curCol = input;
				resolve();
			})
		});
	}
	

	
}


module.exports = HumanPlayer;