import React from 'react';

class Welcome extends React.Component {
	render() {
		return (

			<div>
				<div className="welcome">
					<p className="headline"> instaFrench 🇫🇷 </p>
				</div>
				<div
				className="login"
				>
					<a
					href="/auth/google"
					>
					<img
					alt="login"
					className="logingoog shake"
					src='./assets/goog.png'
					/>
					</a>
				</div>
					<img
					alt="paris"
					className="paris"
					src='./assets/paris.png'
					/>
			</div>
		);
	}
}

export default Welcome;
