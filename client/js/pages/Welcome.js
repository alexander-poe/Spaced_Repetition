import React from 'react';
import { Link }  from 'react-router';

const Welcome = () => {
	return (
		<div className="welcome">
			<h1> Hello </h1>
			<Link 
			to="/game"
			>
			Enter
			</Link> 
		</div>
		)
}

export default Welcome;	
