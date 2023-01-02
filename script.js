//CREATES THE CHESSBOARD
const newNode = (ID) => {
	let name = ID;
	return { name };
};
const chessBoardframe = [[], [], [], [], [], [], [], []];
let chessBoardframeCopy = [[], [], [], [], [], [], [], []];

const chessBoardBuilder = (arr, i = 0, j = 0) => {
	let chessSquare = newNode([i].concat(j)); //This makes it an array and not a string
	arr[i][j] = chessSquare;

	if (j < 7) {
		chessBoardBuilder(arr, i, (j += 1));
		return arr;
	} else {
		if (i >= 7) {
			return;
		}

		chessBoardBuilder(arr, (i += 1), (j = 0));
	}
};

let CHESSBOARD = chessBoardBuilder(chessBoardframe);

//CREATES A DEEP COPY OF THE CHESSBOARD ARRAY TO WORK ON SO ORIGINAL ARRAY IS NOT MUTATED
function deepCopy() {
	chessBoardframeCopy = [[], [], [], [], [], [], [], []];
	for (let i = 0; i < CHESSBOARD.length; i++) {
		for (let j = 0; j < CHESSBOARD[i].length; j++) {
			let obj = Object.create({});
			for (let key in CHESSBOARD[i][j]) {
				obj.name = CHESSBOARD[i][j].name;
			}
			chessBoardframeCopy[i].push(obj);
		}
	}
}
deepCopy();

//FINDS THE SHORTEST PATH TO DESTINATION
const CHESSMOVE = (
	start,
	end,
	arr = chessBoardframeCopy,
	directionStorage = []
) => {
	let moveStorage = [];
	verticalMove(true);
	function verticalMove(
		pass,
		startcopy = start,
		num = 2,
		i = startcopy[0],
		j = startcopy[1]
	) {
		if (
			(startcopy[0] == end[0] && startcopy[1] == end[1]) ||
			(startcopy[0] + 1 == end[0] && startcopy[1] == end[1]) ||
			(startcopy[0] - 1 == end[0] && startcopy[1] == end[1])
		) {
			if (directionStorage == "") {
				directionStorage.push(start);
			}
			directionStorage.push(end);
			moveStorage.push(directionStorage);
			directionStorage = []; //makes sure no extra moves are logged
			return;
		}

		if (
			(i + num <= 7 && arr[i + num][j] != undefined) ||
			(null && arr[i + 1][j] != null)
		) {
			//STOPS PIECE FROM MOVING OUT OF BOUNDS OR ONTO PREVIOUS BOX
			if (arr[i][j] != null) {
				directionStorage.push(arr[i][j].name);
				arr[i][j] = null;
			}

			if (num == 2) {
				directionStorage.push(arr[i + 1][j].name);
				//if chess piece moves once it should only null one box not two
				arr[i + 1][j] = null;
			}

			if (pass == true) {
				horizontalMove(false, arr[i + num][j].name, 1); //UP
			} else if (pass == false) {
				horizontalMove(true, arr[i + num][j].name, 2); //UP
			}
		}
		if (startcopy == start) {
			directionStorage = [];
			deepCopy();
			arr = chessBoardframeCopy;
		}
		if (
			(i - num >= 0 && arr[i - num][j] != undefined) ||
			(null && arr[i - 1][j] != null)
		) {
			//STOPS PIECE FROM MOVING OUT OF BOUNDS OR ONTO PREVIOUS BOX

			if (arr[i][j] != null) {
				directionStorage.push(arr[i][j].name);
				arr[i][j] = null;
			}

			if (num == 2) {
				directionStorage.push(arr[i - 1][j].name);
				arr[i - 1][j] = null; //stops travel to boxes previously moved to
			}

			if (pass == true) {
				horizontalMove(false, arr[i - num][j].name, 1); //DOWN
			} else if (pass == false) {
				horizontalMove(true, arr[i - num][j].name, 2); //DOWN
			}
		} else {
			//CREATES A TEST CALL TO SEE IF THE PIECE CAN MOVE HORIZONTAL
			//IF IT CAN'T THEN THAT MEANS THERE ARE NO MORE POSSIBLE MOVES
			return;
		}
	}
	//MID
	deepCopy();
	arr = chessBoardframeCopy;
	directionStorage = [];

	horizontalMove(true);
	function horizontalMove(
		pass,
		startcopy = start,
		num = 2,
		i = startcopy[0],
		j = startcopy[1]
	) {
		if (
			(startcopy[0] == end[0] && startcopy[1] == end[1]) ||
			(startcopy[0] == end[0] && startcopy[1] + 1 == end[1]) ||
			(startcopy[0] == end[0] && startcopy[1] - 1 == end[1])
		) {
			if (directionStorage == "") {
				//makes sure a move is logged it there is only one move to the end
				directionStorage.push(start);
			}

			directionStorage.push(end);
			moveStorage.push(directionStorage);
			directionStorage = []; //makes sure no extra moves are logged
			return;
		}

		if (
			(j - num >= 0 && arr[i][j - num] != undefined) ||
			(null && arr[i][j - 1] != null)
		) {
			//STOPS PIECE FROM MOVING OUT OF BOUNDS OR ONTO PREVIOUS BOX
			if (arr[i][j] != null) {
				directionStorage.push(arr[i][j].name);
				arr[i][j] = null;
			}

			if (num == 2) {
				directionStorage.push(arr[i][j - 1].name);
				arr[i][j - 1] = null; //stops travel to boxes previously moved to
			}

			if (pass == true) {
				verticalMove(false, arr[i][j - num].name, 1); //LEFT
			} else if (pass == false) {
				verticalMove(true, arr[i][j - num].name, 2); //LEFT
			}
		}
		if (startcopy == start) {
			directionStorage = [];
			deepCopy();
			arr = chessBoardframeCopy;
		}

		if (
			(j + num <= 7 && arr[i][j + num] != undefined) ||
			(null && arr[i][j + 1] != null)
		) {
			//STOPS PIECE FROM MOVING OUT OF BOUNDS OR ONTO PREVIOUS BOX
			if (arr[i][j] != null) {
				directionStorage.push(arr[i][j].name);
				arr[i][j] = null;
			}

			if (num == 2) {
				directionStorage.push(arr[i][j + 1].name);
				arr[i][j + 1] = null; //stops travel to boxes previously moved to
			}

			if (pass == true) {
				verticalMove(false, arr[i][j + num].name, 1); //RIGHT
			} else if (pass == false) {
				verticalMove(true, arr[i][j + num].name, 2); //RIGHT
			}
		} else {
			return;
		}
	}

	(function shortPath(num = 0, arr = moveStorage) {
		if (moveStorage.length == 1) {
			console.log(
				"You made it to the end in " + moveStorage[0].length + " moves!"
			);
			console.log("Your moves were ");
			console.log(arr[num]);
		}
		if (num + 1 == arr.length) {
			return arr[num].length;
		}
		let small = Math.min(arr[num].length, shortPath((num += 1)));

		if (moveStorage.length == 2) {
			console.log("You made it to the end in " + small + " moves!");
			console.log("Your moves were ");
			console.log(arr[num]);
		} else if (small == arr[num].length && num + 1 != arr.length) {
			//never print out the first comparison only the ones that follow
			//Use one because you can't compare something before zero (the first parameter)
			console.log("You made it to the end in " + small + " moves!");
			console.log("Your moves were ");
			console.log(arr[num]);
			return;
		}

		return small;
	})();
	deepCopy(); //resets the chessboardframe back to original values (no nulls)
};

CHESSMOVE([0, 0], [6, 7]);
