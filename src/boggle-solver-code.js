/**
 * Given a Boggle board and a dictionary, returns a list of available words in
 * the dictionary present inside of the Boggle board.
 * @param {string[][]} grid - The Boggle game board.
 * @param {string[]} dictionary - The list of available words.
 * @returns {string[]} solutions - Possible solutions to the Boggle board.
 */

function uppercaseStringArray(stringArray) {
	for (let i = 0; i < stringArray.length; i++)
		stringArray[i] = stringArray[i].toUpperCase();
}

function findAllSolutions(grid, dictionary) {
	let solutions = [];
	var word;
	if (grid.length === 0) return solutions;
	for (word of dictionary) {
		if (word.length >= 3 && findWord(word, grid)) {
			solutions.push(word);
		}
	}
	return solutions;
}

function findWord(word, grid, exceptions = [], previous_cell = undefined) {
	if (word.length === 0) {
		return true;
	}
	var cell, letter, i, j, rest, temp_exceptions;
	if (!previous_cell) {
		var surrounding_cells = getAllCells(grid[0].length);
		for (cell of surrounding_cells) {
			[i, j] = cell;
			letter = grid[i][j];
			if (begins(letter, word)) {
				rest = word.slice(letter.length);
				temp_exceptions = exceptions.slice();
				temp_exceptions.push(`${i}${j}`);
				if (findWord(rest, grid, temp_exceptions.slice(), cell)) {
					return true;
				}
			}
		}
	} else {
		surrounding_cells = getSurroundingCells(
			previous_cell,
			grid[0].length,
			exceptions.slice()
		);
		for (cell of surrounding_cells) {
			[i, j] = cell;
			letter = grid[i][j];
			if (begins(letter, word)) {
				rest = word.slice(letter.length);
				temp_exceptions = exceptions.slice();
				temp_exceptions.push(`${i}${j}`);
				if (findWord(rest, grid, temp_exceptions.slice(), cell)) {
					return true;
				}
			}
		}
	}
	return false;
}

function begins(letters, word) {
	if (letters.length === 0) {
		return true;
	}
	letters = letters.toLowerCase();
	word = word.toLowerCase();
	if (letters[0] === word[0]) {
		return begins(letters.slice(1), word.slice(1));
	}
	return false;
}

function getAllCells(length) {
	let my_array = [];
	var i = 0;
	while (i < length) {
		var j = 0;
		while (j < length) {
			my_array.push([i, j]);
			j++;
		}
		i++;
	}
	return my_array;
}

function getSurroundingCells(cell, length, exceptions = []) {
	var i = cell[0];
	var j = cell[1];
	let my_array = [];
	var i2 = i - 1;
	while (i2 < i + 2) {
		if (i2 >= 0 && i2 < length) {
			var j2 = j - 1;
			while (j2 < j + 2) {
				if (j2 >= 0 && j2 < length) {
					if (
						!(i2 === i && j2 === j) &&
						!exceptions.includes(`${i2}${j2}`)
					) {
						my_array.push([i2, j2]);
					}
				}
				j2++;
			}
		}
		i2++;
	}
	return my_array;
}

export { findAllSolutions, uppercaseStringArray };
// const grid = [
// 	["T", "W", "Y", "R"],
// 	["E", "N", "P", "H"],
// 	["G", "Z", "Qu", "R"],
// 	["O", "N", "T", "A"],
// ];
// const dictionary = [
// 	"art",
// 	"ego",
// 	"gent",
// 	"get",
// 	"net",
// 	"new",
// 	"newt",
// 	"prat",
// 	"pry",
// 	"qua",
// 	"quart",
// 	"quartz",
// 	"rat",
// 	"tar",
// 	"tarp",
// 	"ten",
// 	"went",
// 	"wet",
// 	"arty",
// 	"egg",
// 	"not",
// 	"quar",
// ];

// console.log(exports.findAllSolutions(grid, dictionary));
