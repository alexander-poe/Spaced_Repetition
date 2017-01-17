import React from 'react';

const QuestionCard = (props) => 
	<div className="card">	
		<h1 className="centered">
			{ props.word }
		</h1>
	</div>	

export default QuestionCard;
