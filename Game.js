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
		this.playerX = new HumanPlayer(this);
		this.playerO = new HumanPlayer(this);
		this.currentPlayer;
		this.turn;
	}
	
	startGame() {
		this.listen();
		this.playerX.initPlayer("X");
		this.playerO.initPlayer("O");
		
		this.currentPlayer = this.playerX;
		this.takeTurn();
	}
	 
	
	
	/**
		The main game loop - each call of step() executes a single turn for one of the players.
		
		step() checks which players turn it is, and tells that player to make their move.
		after the players move is made, endTurn() is called.
		unless the game is over, endTurn() will change the turn to the other player and then call step() again.
		
		
		If the game is not over, step() calls itself recursively.
		If the game is Over, step() calls the endGame() function.
	**/
	takeTurn() { 
		this.board.renderBoard();
		process.stdout.write("\n\nPlayer " + this.currentPlayer.mark + "'s Turn:\n");
		this.getMove();
		
	}
	
	getMove() {
		var row;
		var col;
		//ask the current player for their move
		this.currentPlayer.requestMove().then((move) => {
			row = move[0] - 1;
			col = move[1] - 1;
			
			//ask the board if the players move is valid
			if (this.board.checkMoveIsValid(row, col)) {
				//if the move is valid, place it on the board and then end the current players turn
				this.board.placeMove(row, col, this.currentPlayer.mark);
				this.currentPlayer.updateScore(row, col);
				this.endTurn();
			} else {
				//if the move is not valid, tell the user their move is invalid then call getMove() recursively so they can try again
				process.stdout.write("\n*********Invalid Move - try again*********\n")
				this.getMove();
			}
		});
		
	}

	endTurn() {
		//ask board if the game is over(either somebody won or the game ended in a draw)
		//if (this.board.isGameOver()) {
		if (this.currentPlayer.isWinner) { //stand in for now, until this.gameOver is implemented
			this.gameOver() //show the game over screen
		} else {
		//if the game is not over switch who's turn it is and then start their turn
			if (this.currentPlayer.mark == "X") //checking if players mark is 'X' is simpler/faster than checking if currentPlayer object is equal to playerX, and if playerX/playerO don't have correct marks this will make the bug apparent rather than working correctly and causing issues down the line
				this.currentPlayer = this.playerO;
			else
				this.currentPlayer = this.playerX;
			this.takeTurn();
		}
	}
	
	gameOver() {
		this.clearConsole();
	 	process.stdout.write("****************************************************\n");
		process.stdout.write("***************--- Player " + this.currentPlayer.mark + " Has Won ---*************\n")
	 	process.stdout.write("****************************************************\n");
	}

	
	listen() {
		process.stdin.on('data', (response) => {
			this.inputCB(Number(response));
		});
	}
	
	//get the users input after optionally asking for a prompt. (don't pass in a prompt, or pass in an empty string, if you don't want to prompt the user)
	//returns a promise that evaluates after the user has entered their input
	getInput(prompt) {
		if (prompt)
			process.stdout.write(prompt);
		
		return new Promise((resolve, reject) => {
			this.setInputCallback((input) => {
				resolve(input);
			});
		});
	}
	
	
	/**
	*	Get Multiple inputs from the user. Accepts 1 or more prompts to display to the user, and retreives 1 input for each prompt. returns the values input by the user
	*
	*	@param [String] prompts - a list of prompts/questions to print to the console before requesting each input from the user
	* @returns Promise ([String]) - returns a promise that is fulfilled when user has entered n inputs(n = prompts.length). Resolves with an array of strings containing each value input by the user, in order.
	*
	* TODO: handle promise rejection.
	**/
	getInputs(prompts) {
		return new Promise((resolve, reject) => {
			var answers = [];
			process.stdout.write(prompts.shift());
			this.setInputCallback((input) => {
				answers.push(input);
				if (prompts.length == 0) {
					resolve(answers);
				} else {
					process.stdout.write(prompts.shift());
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
