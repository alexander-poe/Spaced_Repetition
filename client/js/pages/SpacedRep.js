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
		var language = this.props.question.english;
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
						word={ language }
						/>
						<InputCard />
					</div>
					<Counter 
					count={ this.props.counter }
					/>
				</div>
<<<<<<< HEAD
				
=======
					<label 
					className="switch"
					>
  						<input 
  						onClick={ (e) => {
  							alert('hey')
  							
  						} }
  						type="checkbox"
  						/>
  						<div 
  						className="slider round"
  						>
  						</div>
					</label>
>>>>>>> 7d944f3a44687bd2cd27b414b719ecad78533b8a
	    	</div>
	    
	    )
	}
}   
const mapStateToProps = (state, props) => ({
	typewriter: state.typewriter,
	question: state.question,
	counter: state.counter
});
export default connect(mapStateToProps)(SpacedRep);
