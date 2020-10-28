import "../App.css";
import React, { Component } from "react";
import "../boggle-solver-code";
import { findAllSolutions } from "../boggle-solver-code";
import firebase from "firebase";
import Grid from "../components/grid";

function uppercaseStringArray(stringArray) {
	for (let i = 0; i < stringArray.length; i++) {
		stringArray[i] = stringArray[i].toUpperCase();
	}
}
class Challenge extends Component {
	constructor(props) {
		super(props);
		this.state = {
			challengeId: this.props.match.params.challengeId,
			grid: [],
			dictionary: [],
			solutions: [],
			value: "",
			found: [],
			prompt: "",
			gameStarted: false,
			gameEnded: false,
			loading: true,
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.startGame = this.startGame.bind(this);
		this.stopGame = this.stopGame.bind(this);
	}

	async componentDidMount() {
		const { challengeId } = this.state;
		const db = firebase.firestore();
		const data = await (
			await db.collection("boggles").doc(challengeId).get()
		).data();
		if (data) {
			const { boggle, dictionary, size } = data;
			var i, j;
			var currIndex = 0;
			let matrix = [];
			for (i = 0; i < size; i++) {
				let mini = [];
				for (j = 0; j < size; j++) {
					mini.push(boggle[currIndex]);
					currIndex++;
				}
				matrix.push(mini);
			}
			this.setState({
				grid: matrix,
				dictionary: dictionary,
				loading: false,
			});
		}
	}

	render() {
		const { value, prompt, grid, loading, gameStarted } = this.state;
		return (
			<div align="center">
				{loading ? (
					<div>Loading...</div>
				) : (
					<div>
						{this.startStopButtons()}
						{gameStarted ? <Grid grid={grid} /> : <div></div>}
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
						{this.remainingWords()}
					</div>
				)}
			</div>
		);
	}

	startStopButtons = () => {
		return (
			<div>
				<button onClick={this.startGame}>Start</button>
				<button onClick={this.stopGame}>Stop</button>
			</div>
		);
	};

	foundWords = () => {
		const { found } = this.state;
		var foundWords = found.map((word) => {
			return <div key={word}>{word}</div>;
		});
		return <div>Found Words: {foundWords}</div>;
	};

	remainingWords = () => {
		const { gameEnded, solutions, found } = this.state;
		var remainingWords = solutions.map((word) => {
			if (!found.includes(word)) {
				return <div key={word}>{word}</div>;
			}
			return;
		});
		return gameEnded ? (
			<div>Remaining Words: {remainingWords}</div>
		) : (
			<div></div>
		);
	};

	handleChange(event) {
		this.setState({ [event.target.id]: event.target.value.toUpperCase() });
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

	startGame() {
		const { grid, dictionary } = this.state;
		const solutions = findAllSolutions(grid, dictionary);
		uppercaseStringArray(solutions);
		this.setState({ solutions, gameStarted: true });
	}

	stopGame() {
		this.setState({ gameEnded: true });
	}
}

export default Challenge;
