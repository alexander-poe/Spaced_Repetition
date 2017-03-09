import React from 'react';

const Counter = (props) =>
	(
		<div className="counter-box">
			<span className="counter-box">
				<h2>
				{props.count}
				</h2>
			</span>
		</div>
	);

export default Counter;
