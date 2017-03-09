import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

const answerCheck = (guess, answer) => {
	if (guess === answer) return true;
	else return false;
}

const InputCard = (props) => {
	var textInput = '';
	const currentAnswer = props.answer
	const success = ['Good Job!', 'Bien!', 'Génial', 'Win!']
	const failure = ['Almost!', 'ça va', 'Wrong!', 'Try Again']
	return(
		<div
		className="card"
		>
			<form
			autoComplete="off"
			onSubmit={ (e) => {
				e.preventDefault();
				currentAnswer === textInput.value ?
				props.dispatch(actions.incrementCount(props.counter)) :
				props.dispatch(actions.decrementCount(props.counter));
				props.dispatch(actions.sendAnswer(answerCheck(textInput.value, currentAnswer)));
				const status = answerCheck(textInput.value, currentAnswer);
				textInput.value = ''
			}}>
				<input
				type="text"
				ref={(input) => { textInput = input; }}
				name="textInput"
				/>
			</form>
		</div>
	);
};

const mapStateToProps = (state, props) => ({
	answer: state.answer,
	question: state.question,
	word: state.question.french,
	counter: state.counter,
	language: state.language
});
export default connect(mapStateToProps)(InputCard);
