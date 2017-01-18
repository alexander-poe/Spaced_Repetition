import React from 'react';
import { Link }  from 'react-router';

const Welcome = () => {
	return (
		<div>
			<div className="welcome">
				<h1> Hello </h1>		
			</div>
			<div className="login">
				<a 
				href="/auth/google"
				>
				Sign in with Google
				</a> 
			</div>
		</div>
		)
}

export default Welcome;	
