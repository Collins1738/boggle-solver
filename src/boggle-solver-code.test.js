const boggle_solver = require("./boggle-solver-code");

/** Lowercases a string array in-place. (Used for case-insensitive string array
 *  matching).
 * @param {string[]} stringArray - String array to be lowercase.
 */
function lowercaseStringArray(stringArray) {
	for (let i = 0; i < stringArray.length; i++)
		stringArray[i] = stringArray[i].toLowerCase();
}

describe("Boggle Solver tests suite:", () => {
	describe("Basic tests", () => {
		let grid = [
			["A", "B", "C"],
			["D", "E", "F"],
			["G", "H", "I"],
		];
		test("Vertical matching", () => {
			const dictionary = ["ADG", "AHF"];
			const expected_solution = ["ADG"];
			const recieved_solution = boggle_solver.findAllSolutions(
				grid,
				dictionary
			);
			expect(expected_solution.sort()).toEqual(recieved_solution.sort());
		});

		test("Horizontal matching", () => {
			const dictionary = ["ABC", "ABI"];
			const expected_solution = ["ABC"];
			const recieved_solution = boggle_solver.findAllSolutions(
				grid,
				dictionary
			);
			expect(expected_solution.sort()).toEqual(recieved_solution.sort());
		});

		test("Diagonal matching", () => {
			const dictionary = ["AEI", "ADI"];
			const expected_solution = ["AEI"];
			const recieved_solution = boggle_solver.findAllSolutions(
				grid,
				dictionary
			);
			expect(expected_solution.sort()).toEqual(recieved_solution.sort());
		});

		test("Combinations matching", () => {
			const dictionary = ["ABFHD", "ADCFI"];
			const expected_solution = ["ABFHD"];
			const recieved_solution = boggle_solver.findAllSolutions(
				grid,
				dictionary
			);
			expect(expected_solution.sort()).toEqual(recieved_solution.sort());
		});
	});

	describe("Edge cases", () => {
		let grid = [
			["A", "B", "C"],
			["D", "E", "F"],
			["G", "H", "I"],
		];

		test("Short words", () => {
			const dictionary = ["AD", "AE", "AB"];
			const expected_solution = [];
			const recieved_solution = boggle_solver.findAllSolutions(
				grid,
				dictionary
			);
			expect(expected_solution.sort()).toEqual(recieved_solution.sort());
		});

		test("Empty dictionary", () => {
			const dictionary = [];
			const expected_solution = [];
			const recieved_solution = boggle_solver.findAllSolutions(
				grid,
				dictionary
			);
			expect(expected_solution.sort()).toEqual(recieved_solution.sort());
		});

		test("Empty grid", () => {
			grid = [[]];
			const dictionary = ["ABC"];
			const expected_solution = [];
			const recieved_solution = boggle_solver.findAllSolutions(
				grid,
				dictionary
			);
			expect(expected_solution.sort()).toEqual(recieved_solution.sort());
		});

		test("Duplicate letters", () => {
			grid = [
				["A", "B", "C"],
				["D", "A", "F"],
				["G", "H", "A"],
			];
			const dictionary = ["ABA", "DAA", "FAF", "BAFB"];
			const expected_solution = ["ABA", "DAA"];
			const recieved_solution = boggle_solver.findAllSolutions(
				grid,
				dictionary
			);
			expect(expected_solution.sort()).toEqual(recieved_solution.sort());
		});
	});

	describe("Q Tests", () => {
		test("Q Test", () => {
			let grid = [
				["A", "QU", "C"],
				["D", "E", "Q"],
				["G", "H", "I"],
			];
			const dictionary = ["QAD", "AQU", "AQC", "CQI"];
			const expected_solution = ["AQU", "CQI"];
			const recieved_solution = boggle_solver.findAllSolutions(
				grid,
				dictionary
			);
			expect(expected_solution.sort()).toEqual(recieved_solution.sort());
		});
	});

	describe("Piazza test cases", () => {
		test("Test1", () => {
			let grid = [
				["A", "QU"],
				["C", "D"],
			];
			const dictionary = ["QAC"];
			const expected_solution = [];
			const recieved_solution = boggle_solver.findAllSolutions(
				grid,
				dictionary
			);
			expect(expected_solution.sort()).toEqual(recieved_solution.sort());
		});

		test("Test2", () => {
			let grid = [
				["A", "B"],
				["C", "D"],
			];
			const dictionary = ["AB", "ABD", "DCA", "XY"];
			const expected_solution = ["ABD", "DCA"];
			const recieved_solution = boggle_solver.findAllSolutions(
				grid,
				dictionary
			);
			expect(expected_solution.sort()).toEqual(recieved_solution.sort());
		});

		test("Test3", () => {
			let grid = [
				["A", "QU"],
				["C", "D"],
			];
			const dictionary = ["AQU"];
			const expected_solution = ["AQU"];
			const recieved_solution = boggle_solver.findAllSolutions(
				grid,
				dictionary
			);
			expect(expected_solution.sort()).toEqual(recieved_solution.sort());
		});
	});

	describe("Problem contraints", () => {
		// Cases such as Qu
		test("XXXXZZZZZZZZZ", () => {
			// (Edge case) Since there are no possible solutiona, it should return an
			// empty list.
			const grid = [
				["A", "B", "C", "D"],
				["E", "F", "G", "H"],
				["I", "J", "K", "L"],
				["M", "N", "O", "P"],
			];
			const dictionary = [];
			const expected = [];

			let solutions = boggle_solver.findAllSolutions(grid, dictionary);

			// Lowercasing for case-insensitive string array matching.
			lowercaseStringArray(solutions);
			lowercaseStringArray(expected);
			expect(solutions.sort()).toEqual(expected.sort());
		});
	});

	describe("Input edge cases", () => {
		// Example Test using Jess
		test("Dictionary is empty", () => {
			// (Edge case) Since there are no possible solutiona, it should return an
			// empty list.
			const grid = [
				["A", "B", "C", "D"],
				["E", "F", "G", "H"],
				["I", "J", "K", "L"],
				["M", "N", "O", "P"],
			];
			const dictionary = [];
			const expected = [];

			let solutions = boggle_solver.findAllSolutions(grid, dictionary);

			// Lowercasing for case-insensitive string array matching.
			lowercaseStringArray(solutions);
			lowercaseStringArray(expected);
			expect(solutions.sort()).toEqual(expected.sort());
		});
	});
});
