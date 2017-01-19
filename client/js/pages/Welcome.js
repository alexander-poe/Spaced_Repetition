import React from 'react';
import { Link }  from 'react-router';



class Welcome extends React.Component {
	render() {

	return (
		<div>
			<div className="welcome">
				<h2> instaFrench 🇫🇷 </h2>
			</div>
			<div className="login">
				<a href="/auth/google">Sign In with Google</a>
			</div>
		</div>
		)
	}
}

export default Welcome;	
