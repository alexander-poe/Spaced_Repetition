import React from 'react';
import * as actions from './actions';

const initState = {
	typewriter: -1
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
		case 'GET_CARDS_SUCCESS' :
			return {
				...state, 
				cards: data
			} 
		case actions.ENGAGE_TYPEWRITER :
			return {
				...state,
				typewriter: action.num
			}	
	}
	return state;
}	

export default reducer;