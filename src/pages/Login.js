import React, { Component } from "react";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import "../App.css";

// Configure FirebaseUI.
const uiConfig = {
	signInFlow: "popup",
	signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
	callbacks: {
		signInSuccessWithAuthResult: () => false,
	},
};

export default class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	componentDidMount() {
		this.unregisterAuthObserver = firebase
			.auth()
			.onAuthStateChanged((user) => {
				if (user) {
					this.props.history.push("/");
				}
			});
	}

	componentWillUnmount() {
		this.unregisterAuthObserver();
	}

	render() {
		return (
			<div className="page">
				<h2>Sign In</h2>
				<StyledFirebaseAuth
					uiConfig={uiConfig}
					firebaseAuth={firebase.auth()}
				/>
			</div>
		);
	}
}
