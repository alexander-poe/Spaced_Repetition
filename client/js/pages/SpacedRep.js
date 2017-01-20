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
		 	 
	}
	switch() {
	    var language = this.props.question.french ? 
			this.props.question.enlgish :
				this.props.question.french;
	}
	render() {
		

		return (
			<div className="outerlayer">
				<div className="holder">
					<Link to="/">
						🇫🇷
					</Link>
					<h2> 
						instaFrench 
					</h2>
					<div 
					className="container"
					>	
						<QuestionCard 
						word={ this.props.question.french } 
						/>
						<InputCard />
					</div>
					<Counter 
					count={ this.props.counter }
					/>
				</div>
					<label 
					className="switch"
					>
  						<input 
  						onClick={ (e) => {
  							this.props.dispatch(actions.switchlanguage());
  						} }
  						type="checkbox"
  						/>
  						<div 
  						className="slider round"
  						>
  						</div>
					</label>
	    	</div>
	    
	    )
	}
}   
const mapStateToProps = (state, props) => ({
	typewriter: state.typewriter,
	question: state.question,
	counter: state.counter,
	language: state.language,
});
export default connect(mapStateToProps)(SpacedRep);

// this.props.question[this.props.language] 
