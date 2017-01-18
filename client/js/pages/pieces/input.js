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
	return(
		
		<div className="card">
			<form onSubmit={ (e) => { 
				e.preventDefault();
				props.dispatch(actions.sendAnswer(answerCheck(textInput.value, currentAnswer))) ;
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
	word: state.question.french
});
export default connect(mapStateToProps)(InputCard);	