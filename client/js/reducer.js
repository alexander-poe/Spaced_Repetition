import React from 'react';
import * as actions from './actions';

const initState = {
	question: {
		english: "one", 
		french: "un", 
		freq: 1,
	}, 
	score: 2,
};

const reducer = (state=initState, action) => {
	switch (action.type) {
		case 'INCREMENT' :
			return {
				...state,
				counter: data
			}
		case 'DECREMENT' :
			return {
				...state,
				counter: data
			}
		case 'GET_CARD_SUCCESS' :
				console.log('reducer', action.question.question)
						return {
				...state, 
				question: action.question.question
			}; 
		case actions.ENGAGE_TYPEWRITER :
			console.log("this is the reducer!" + action.num)
			return {
				...state,
				typewriter: action.num
			}	
	}
	return state;
}	

export default reducer;