import React from 'react';
import { Link }  from 'react-router';



class Welcome extends React.Component {
	render() {

	function onSignIn(googleUser) {
  		var profile = googleUser.getBasicProfile();
		console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
		console.log('Name: ' + profile.getName());
		console.log('Image URL: ' + profile.getImageUrl());
		console.log('Email: ' + profile.getEmail());
	}

	return (
		<div>
			<div className="welcome">
				<h2> REPETITION </h2>
				<img className="bird" src="./assets/bird.svg"/>
		
			</div>
			<div className="login">
				
				<Link 
				to="/auth/google"
				>
				<div className="g-signin2" data-onsuccess="onSignIn"></div>
				</Link> 
			</div>
		</div>
		)
	}
}

export default Welcome;	
