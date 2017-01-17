import React from 'react';
import { Link } from 'react-router';
import QuestionCard from './pieces/questionscard';
import InputCard from './pieces/input'

const SpacedRep = () => {
	return (
		<div>
			<h2> 
			Spaced 
			</h2>
			<Link to="/"> Back </Link>
			<div className="container">	
				<QuestionCard/>
				<InputCard/>
			</div>
		</div>
    )
}   

export default SpacedRep;