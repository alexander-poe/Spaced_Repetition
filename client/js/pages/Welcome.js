import React from 'react';
import { Link }  from 'react-router';

const Welcome = () => {
	return (
		<div>
			<div className="welcome">
				<h1> Hello </h1>
		
			</div>
			<div className="login">
				<Link 
				to="/game"
				>
				Enter
				</Link> 
			</div>
		</div>
		)
}

export default Welcome;	
