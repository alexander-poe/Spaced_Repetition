import React from 'react';
import * as actions from '../../actions';
import { connect } from 'react-redux';

const answerCheck = (guess, answer) => {
	if (guess === answer) return true;
	else return false; 
}

const InputCard = (props) => {
	let textInput = null;
	const currentAnswer = props.question.english;
	console.log('IC:', props.counter)
	return(
		
		<div className="card">
			<form onSubmit={ (e) => { 
				e.preventDefault();
				currentAnswer === textInput.value ? 
				props.dispatch(actions.incrementCount(props.counter)) :
				props.dispatch(actions.decrementCount(props.counter));
				props.dispatch(actions.sendAnswer(answerCheck(textInput.value, currentAnswer)));
			}}>
				<input
				type="text"
				ref={(input) => { textInput = input; }}
				/>
			</form>	
		</div>	
	
	)
}
const mapStateToProps = (state, props) => ({
	question: state.question,
	word: state.question.french,
	counter: state.counter
});
export default connect(mapStateToProps)(InputCard);	