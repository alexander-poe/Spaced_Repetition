import React from 'react';

class Welcome extends React.Component {
	render() {
		return (

			<div>
				<div
				className="welcome"
				>
					<p
					className="headline"
					>
					instaFrench 🇫🇷
					</p>
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
			</div>
			)
	}
}

export default Welcome;
