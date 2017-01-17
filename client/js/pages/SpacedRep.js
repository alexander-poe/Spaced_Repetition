import React from 'react';
import { Link } from 'react-router';
import QuestionCard from './pieces/questionscard';
import InputCard from './pieces/input';
import Counter from './pieces/counter';




class SpacedRep extends React.Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleSubmit () {
		alert('hey')
	}

	render() {
		return (
			<div>
				<h2> 
				Spaced 
				</h2>
				<Link to="/"> Back </Link>
				<div className="container">	
					<QuestionCard word={'Je suis'}/>
					<InputCard funct={this.handleSubmit}/>
				</div>
				<Counter count={23}/>
			</div>
	    )
	}
}   

export default SpacedRep;