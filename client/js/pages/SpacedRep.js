import React from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import QuestionCard from './pieces/questionscard';
import InputCard from './pieces/input';
import Counter from './pieces/counter';

class SpacedRep extends React.Component {
	constructor(props) {
		super(props);
	}	
	componentDidMount() {
		 this.props.dispatch(actions.getCard());
		 console.log('from spaced rep', this.props.question)
		 
	}
	render() {
		const count = 0;
		return (
			
			<div>
				<Link to="/">
					🇫🇷
				</Link>
				<h2> 
				instaFrench 
				</h2>
				{this.props.typewriter}
				<div className="container">	
					<QuestionCard word={ this.props.question.french }/>
					<InputCard />
				</div>
				<Counter count={count}/>
			</div>
	    
	    )
	}
}   

const mapStateToProps = (state, props) => ({
	typewriter: state.typewriter,
	question: state.question
});

export default connect(mapStateToProps)(SpacedRep);
