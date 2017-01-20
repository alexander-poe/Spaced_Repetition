import React from 'react';
import * as actions from '../../actions';
import { connect } from 'react-redux';

const answerCheck = (guess, answer) => {
	if (guess === answer) return true;
	else return false; 
}

const InputCard = (props) => {
	var textInput = '';
	const currentAnswer = props.question.english ? props.question.french: props.question.english;
	console.log(currentAnswer)
	const success = ['Good Job!', 'Bien!', 'Génial', 'Win!']
	const failure = ['Almost!', 'ça va', 'Wrong!', 'Try Again']
	return(
		
		<div className="card">
			<form onSubmit={ (e) => { 
				e.preventDefault();
				currentAnswer === textInput.value ? 
				props.dispatch(actions.incrementCount(props.counter)) :
				props.dispatch(actions.decrementCount(props.counter));
				props.dispatch(actions.sendAnswer(answerCheck(textInput.value, currentAnswer)));
				const status = answerCheck(textInput.value, currentAnswer);
				const randomizer = Math.floor(Math.random() * 3);
				if (status) {
					textInput.value = success[randomizer];
					console.log(textInput.value)
				}
				if (!status) {
					textInput.value = failure[randomizer];
				}
				
				
				
			}}>
				<input
				type="text"
				ref={(input) => { textInput = input; }}
				name="textInput"
				/>
			</form>	
		</div>	
	
	)
}
const mapStateToProps = (state, props) => ({
	question: state.question,
	word: state.question.french,
	counter: state.counter,
	language: state.language
});
export default connect(mapStateToProps)(InputCard);	