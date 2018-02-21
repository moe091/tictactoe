
/**
	The Board class is responsive for maintaining the state of the board, modifying the board, and performing all of the board functions.
**/
class Board {
	//store the board internally as a 2d(3x3) array. e.g board[0][2] represents the cell in row 0, column 2
	constructor() {
		this.board = [
			[" ", " ", " "],
			[" ", " ", " "],
			[" ", " ", " "]
		];
	}

	//renders the entire board in its current state
	renderBoard() {
		process.stdout.write("\n\n"); //print a couple new lines, because the board should always have space around it to prevent clutter
		
		//loop through every cell on the board, printing the value of each cell from this.board
		for (var y = 0; y < 3; y++) { //loop through each row of board
			for (var x = 0; x < 3; x++) { //loop through each column of each row
				//for the middle colum(x = 1), print " | " on each side of the cells value to create the frame of the board
				if (x == 1) {
					process.stdout.write(" | " + this.board[y][x] + " | ");
				} else {
					process.stdout.write(this.board[y][x]);
				}
			}
			//after printing the cells for a row, print a line of '_'s on the next line to create the frame of the board
			//unless it is the last row(y==2), because the frame of a tictactoe board doesn't have a line across the bottom
			if (y != 2) {
				process.stdout.write("\n_________\n");
			}
		}
		
		process.stdout.write("\n\n"); //newlines to prevent clutter
	}
	
	
	tryMove(row, col, mark) {
		if (this.board[row][col] == " ") {
			this.board[row][col] = mark;
			return true;
		} else {
			return false;
		}
	}
	
	
}

module.exports = Board;