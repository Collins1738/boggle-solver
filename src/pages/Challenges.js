import React, { Component } from "react";
import "../boggle-solver-code";
import firebase from "firebase";
import Grid from "../components/grid";
import "../App.css";

class Challenges extends Component {
	constructor() {
		super();
		this.state = {
			challenges: [],
		};
		this.handlePlay = this.handlePlay.bind(this);
	}

	render() {
		const { challenges } = this.state;
		return (
			<div align="center">
				<h1>
					Welcome {firebase.auth().currentUser?.displayName || ""}
				</h1>
				<button onClick={this.loadChallenges}>Load Challenges</button>
				<hr />
				{challenges.map((challenge) =>
					this.renderChallenges(challenge)
				)}
			</div>
		);
	}

	renderChallenges = (challenge) => {
		return (
			<div key={challenge.id} className="grid-wrapper">
				<Grid grid={challenge.grid} />
				<button id={challenge.id} onClick={this.handlePlay}>
					Play
				</button>
			</div>
		);
	};

	handlePlay(event) {
		this.props.history.push(`/challenge/${event.target.id}`);
	}

	loadChallenges = async () => {
		const db = firebase.firestore();
		let challenges = [];
		let newChallenges = [];
		let challenge = {};
		await db
			.collection("boggles")
			.get()
			.then((snapShot) => {
				snapShot.forEach((doc) => {
					challenge = doc.data();
					const { boggle, dictionary, size } = challenge;
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
					newChallenges.push({
						dictionary,
						grid: matrix,
						id: doc.id,
					});
				});
			});
		challenges.forEach((challenge) => {
			this.state.challenges.push(challenge);
		});
		this.setState({ challenges: newChallenges });
	};
}

export default Challenges;
