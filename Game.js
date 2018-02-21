var Board = require('./Board.js');
var HumanPlayer = require('./HumanPlayer.js');


/**
	Game class is responsible for the actual gameplay, controlling the flow of the game by communicating with Players and Board.
	
	when the game is started with startGame(),
**/
class Game {
	constructor() {
		this.board = new Board();
		this.curRow;
		this.curCol;
		this.mark = "X";
		this.inputCB; 
		this.player1 = new HumanPlayer(this);
	}
	
	startGame() {
		this.listen();
		this.player1.askForMove().then((ans) => {
			console.log("\n\nans:", ans);
		})
	}
	
	startTurn(message) { 
		this.clearConsole();
		this.board.renderBoard();
		process.stdout.write(message);
		this.askRow();
	}
	
	
	askCol() {
		process.stdout.write("select a column: ");
		this.inputCB = this.getCol;
	}
	
	getCol(col) {
		this.curCol = col;
		var validMove = this.board.tryMove(this.curRow, this.curCol, this.mark);
		if (validMove) {
			this.endTurn();
		} else {
			this.restartTurn();
		} 
	}
	
	
	askRow() {
		process.stdout.write("select a row: ");
		this.inputCB = this.getRow;
	}
	
	getRow(row) {
		this.curRow = row;
		this.askCol();
	}
	
	endTurn() {
		this.mark = (this.mark == "X") ? "O" : "X";
		this.startTurn(this.createMessage());
	}
	
	restartTurn() {
		this.startTurn("--- Invalid Move - Space already Selected! ---\n" + this.createMessage());
	}
	
	
	createMessage() {
		return "Player " + this.mark + "'s Turn\n";	
	}
	
	listen() {
		process.stdin.on('data', (response) => {
			this.inputCB(Number(response));
		});
	}
	
	getNextInput(prompt) {
		if (prompt)
			process.stdout.write(prompt);
		
		return new Promise((resolve, reject) => {
			this.setInputCallback((input) => {
				resolve(input);
			});
		});
	}
	
	getInputs(prompts) {
		return new Promise((resolve, reject) => {
			var answers = [];
			console.log(prompts.pop());
			this.setInputCallback((input) => {
				answers.push(input);
				if (prompts.length == 0) {
					resolve(answers);
				} else {
					console.log(prompts.pop());
				}
			});
		});
	}
	
	setInputCallback(cb) {
		this.inputCB = cb;
	}
	
	clearConsole() {
		var lines = process.stdout.getWindowSize()[1];
		for(var i = 0; i < lines; i++) {
				console.log('\r\n');
		}
	}
	

	
}

module.exports = Game;
