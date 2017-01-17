import React from 'react';
import * as actions from './actions';

const initState = {
	data: []
};

const reducer = (state, action) => {
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
	}
}	

export default reducer;