import React from 'react';
import { Link }  from 'react-router';

class Welcome extends React.Component {
	render() {
		return (
			
			<div>
				<div className="welcome">
					<h2> instaFrench 🇫🇷 </h2>
				</div>
				<div 
				className="login"
				>
					<a 
					href="/auth/google"
					>
					<img 
					className="logingoog" 
					src='./assets/goog.png'
					/>
					</a>
				</div>	
					<img 
					className="paris" 
					src='./assets/paris.png'
					/>
			</div>
			)
	}
}

export default Welcome;	
