import "./App.css";
import React, { Component } from "react";
import "./boggle-solver-code";
import { findAllSolutions } from "./boggle-solver-code";

const grid = [
	["T", "W", "Y", "R"],
	["E", "N", "P", "H"],
	["G", "Z", "Qu", "R"],
	["O", "N", "T", "A"],
];

const dictionary = [
	"art",
	"ego",
	"gent",
	"get",
	"net",
	"new",
	"newt",
	"prat",
	"pry",
	"qua",
	"quart",
	"quartz",
	"rat",
	"tar",
	"tarp",
	"ten",
	"went",
	"wet",
	"arty",
	"egg",
	"not",
	"quar",
];

class App extends Component {
	constructor() {
		super();
		this.state = {
			grid: grid,
			dictionary: dictionary,
			solutions: [],
			value: "",
			found: [],
			prompt: "",
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	render() {
		const { value, prompt } = this.state;
		return (
			<div>
				<h2>Boggle Solver</h2>
				{this.renderButtonsGrid()}
				<form>
					<input
						id="value"
						value={value}
						onChange={this.handleChange}
						onSubmit={this.handleSubmit}
					/>
					<button type="submit" onClick={this.handleSubmit}>
						Submit
					</button>
				</form>

				<div>{prompt}</div>

				{this.foundWords()}
			</div>
		);
	}

	renderButtonsGrid = () => {
		const { grid } = this.state;
		var rowNum = 0;
		var renderGrid = grid.map((row) => {
			var colNum = 0;
			var boxRow = row.map((letter) => {
				return (
					<div key={`${rowNum} ${colNum++}`} className="grid-letter">
						{letter}
					</div>
				);
			});
			return (
				<div key={`${rowNum++}`} className="grid-row">
					{boxRow}
				</div>
			);
		});
		return <div className="grid-container">{renderGrid}</div>;
	};

	foundWords = () => {
		const { found } = this.state;
		var foundWords = found.map((word) => {
			return <div>{word}</div>;
		});
		return <div>Found Words: {foundWords}</div>;
	};

	componentDidMount() {
		const { grid, dictionary } = this.state;
		const solutions = findAllSolutions(grid, dictionary);
		this.setState({ solutions });
	}

	handleChange(event) {
		this.setState({ [event.target.id]: event.target.value });
	}

	handleSubmit(event) {
		event.preventDefault();
		const { value, found, solutions } = this.state;
		if (found.includes(value)) {
			this.setState({ prompt: `${value} already found` });
		} else if (solutions.includes(value)) {
			this.setState({ prompt: `${value} is CORRECT!` });
			if (found.length + 1 === solutions.length) {
				this.setState({ prompt: `All words have been found!!` });
			}
			this.state.found.push(value);
		} else {
			this.setState({ prompt: `${value} is wrong` });
		}
		this.setState({ value: "" });
	}
}

export default App;
