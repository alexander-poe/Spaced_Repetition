import React from 'react';
import * as actions from './actions';

const initState = {
	question: {
		english: "", 
		french: "", 
		freq: 1,
	}, 
	answer: "",
	score: 2,
	counter: 1,
	language: 'french'
};

const reducer = (state=initState, action) => {
	switch (action.type) {
		case 'INCREMENT' :
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
			var answer;
			if(state.language === "french") {
				answer = action.question.question.english
			} else {
				answer = action.question.question.french
			}
			return {
				...state, 
				question: action.question.question,
				answer: answer
			}
		case 'ENGAGE_TYPEWRITER' :
			return {
				...state,
				typewriter: action.num
			}
		case 'NEXT_QUESTION' :
			var answer;
			if(state.language === "french") {
				answer = action.question.question.english
			} else {
				answer = action.question.question.french
			}
			return { 
				...state,
				question: action.question.question,
				answer: answer
			}
		case 'SWITCH_LANGUAGE' :
			const language = state.language;
			let answer = (language == "english") ? state.question.english : state.question.french
			return {
				...state, 
				language: language == "english" ? "french" : "english",
				answer: answer 
			}		
	}
	return state;
}	

export default reducer;