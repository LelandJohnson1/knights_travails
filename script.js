//CREATES THE CHESSBOARD
const newNode = (ID) => {
	let name = ID;
	return { name };
};
const chessBoard = [[], [], [], [], [], [], [], []];

const chessBoardBuilder = (arr, i = 0, j = 0) => {
	let temp = newNode(i + "," + j);
	arr[i][j] = temp;

	if (j < 7) {
		chessBoardBuilder(arr, i, (j += 1));
	} else {
		if (i >= 7) {
			console.log(arr);
			return arr;
		}

		chessBoardBuilder(arr, (i += 1), (j = 0));
	}
};

chessBoardBuilder(chessBoard);
