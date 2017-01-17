import React from 'react';

const InputCard = (props) => 
	<div className="card">
		<form onSubmit={props.funct}>
			<input
			type="text"
			/>
		</form>	
	</div>	

export default InputCard;	