import React from 'react';
import { connect } from 'react-redux'
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
		//on submit, answer will be dispatched to server
		//current text will 'unwrite itself using typewriter'
		//then rewrite the answer in english
		//if the answer it english matches the answer given
		//do css highlight green, or animate 
		//if not shake and highlight red. 
		console.log(this.props.store)
		alert('hey')
	}

	render() {
		return (
			<div>
				<h2> 
				Spaced 
				</h2>
				<Link to="/"><img className="home" src="./assets/home.png"/></Link>
				<div className="container">	
					<QuestionCard word={'Je suis'}/>
					<InputCard funct={this.handleSubmit}/>
				</div>
				<Counter count={23}/>
			</div>
	    )
	}
}   

const mapStateToProps = (state, props) => ({
	store: state
});

export default connect(mapStateToProps)(SpacedRep);