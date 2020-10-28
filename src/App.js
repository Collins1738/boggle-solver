import "./App.css";
import React, { Component } from "react";
import firebase from "firebase";
import ChallengesPage from "./pages/Challenges";
import ChallengePage from "./pages/Challenge";
import LoginPage from "./pages/Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends Component {
	constructor() {
		super();
		this.state = {};

		this.handleSignIn = this.handleSignIn.bind(this);
		this.handleSignOut = this.handleSignOut.bind(this);
	}

	handleSignIn() {
		window.location.href = "/login";
	}

	handleSignOut() {
		firebase.auth().signOut();
		window.location.href = "/challenges";
	}

	render() {
		return (
			<div className="App">
				<div className="page">
					<div className="navbar">
						<button onClick={this.handleSignIn}>Sign In</button>
						<button onClick={this.handleSignOut}>Sign Out</button>
					</div>
					<h2>Boggle Solver</h2>

					<Router>
						<Switch>
							<Route
								component={ChallengesPage}
								exact
								path="/challenges"
							/>
							<Route component={LoginPage} exact path="/login" />
							<Route component={ChallengesPage} exact path="/" />
							<Route
								component={ChallengePage}
								exact
								path="/challenge/:challengeId"
							/>
						</Switch>
					</Router>
				</div>
			</div>
		);
	}
}
export default App;
