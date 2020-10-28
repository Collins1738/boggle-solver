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
			highscore: null,
			currentScore: 0,
			guessesLeft: 0,
			username: "Anonymous",
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleGameOver = this.handleGameOver.bind(this);
		this.startGame = this.startGame.bind(this);
	}

	render() {
		const {
			value,
			prompt,
			grid,
			loading,
			gameStarted,
			highscore,
			username,
			currentScore,
			guessesLeft,
		} = this.state;
		return (
			<div align="center">
				{loading ? (
					<div>Loading...</div>
				) : (
					<div>
						{this.startStopButtons()}
						{gameStarted ? (
							<div>
								<Grid grid={grid} />
								<h4>
									Current score: {username} - {currentScore}
								</h4>
								<h5>Guesses left: {guessesLeft}</h5>
							</div>
						) : (
							<div></div>
						)}
						<div>
							<h4>
								Highscore:{" "}
								{highscore.score >= currentScore
									? highscore.username || "No highscore"
									: username}{" "}
								-{" "}
								{highscore.score >= currentScore
									? highscore.score
									: currentScore}
							</h4>
						</div>
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
	async componentDidMount() {
		const { challengeId } = this.state;
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				this.setState({ username: user.displayName });
			}
		});
		const db = firebase.firestore();
		const data = await (
			await db.collection("boggles").doc(challengeId).get()
		).data();
		if (data) {
			const { boggle, dictionary, size, highscore } = data;
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
				highscore: highscore,
				loading: false,
				guessesLeft: dictionary.length,
			});
		}
	}

	startStopButtons = () => {
		return (
			<div>
				<button onClick={this.startGame}>Start</button>
				<button onClick={this.handleGameOver}>Stop</button>
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
		var remainingWords = [];
		solutions.forEach((word) => {
			if (!found.includes(word)) {
				remainingWords.push(<div key={word}>{word}</div>);
			}
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

	async handleSubmit(event) {
		event.preventDefault();
		const { value, found, solutions } = this.state;
		await this.setState({ guessesLeft: this.state.guessesLeft - 1 });
		if (found.includes(value)) {
			this.setState({ prompt: `${value} already found` });
		} else if (solutions.includes(value)) {
			this.setState({
				prompt: `${value} is CORRECT!`,
				currentScore: this.state.currentScore + 1,
			});
			if (found.length + 1 === solutions.length) {
				this.setState({ prompt: `All words have been found!!` });
			}
			this.state.found.push(value);
		} else {
			this.setState({ prompt: `${value} is wrong` });
		}
		if (this.state.guessesLeft == 0) {
			this.handleGameOver();
		}
		this.setState({ value: "" });
	}

	async handleGameOver() {
		const { currentScore, highscore, username, challengeId } = this.state;
		this.setState({ gameEnded: true });
		if (currentScore > highscore.score) {
			const db = firebase.firestore();
			const newHighscore = { username, score: currentScore };
			await db
				.collection("boggles")
				.doc(challengeId)
				.update({ highscore: newHighscore });
		}
	}

	startGame() {
		const { grid, dictionary } = this.state;
		const solutions = findAllSolutions(grid, dictionary);
		uppercaseStringArray(solutions);
		this.setState({ solutions, gameStarted: true });
	}
}

export default Challenge;
