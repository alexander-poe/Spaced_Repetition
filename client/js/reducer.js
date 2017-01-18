import React from 'react';
import * as actions from './actions';

const initState = {
	typewriter: -1,
	question: {
		score: 0, 
		question: 'jesuix'
	}
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
						return {
				...state, 
				question: action.question
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