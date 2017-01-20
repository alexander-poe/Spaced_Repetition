import React from 'react';
import * as actions from './actions';

const initState = {
	question: {
		english: "", 
		french: "", 
		freq: 1,
	}, 
	score: 2,
	counter: 1
};

const reducer = (state=initState, action) => {
	switch (action.type) {
		case 'INCREMENT' :
			console.log('Incremment', action.counter)
			return {
				...state,
				counter: action.counter +1
			}
		case 'DECREMENT' :
			return {
				...state,
				counter: action.counter -1
			}
		case 'GET_CARD_SUCCESS' :
			console.log(action.question.question)
			return {
				...state, 
				question: action.question.question
			}
		case 'ENGAGE_TYPEWRITER' :
			return {
				...state,
				typewriter: action.num
			}
		case 'NEXT_QUESTION' :
			console.log('this is in the reducer', action.question)
			return { 
				...state,
				question: action.question.question
			}
		case 'SWITCH_LANGUAGE' :
			return {
				...state, 
				language: language == "english" ? "french" : "english" 
			}		
	}
	return state;
}	

export default reducer;