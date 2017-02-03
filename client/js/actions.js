import cookie from 'react-cookie';

require('es6-promise').polyfill();
require('isomorphic-fetch');

const game_url = '/game/';


export const incrementCount = counter => ({
	type: 'INCREMENT',
	counter
});

export const decrementCount = counter => ({
	type: 'DECREMENT',
	counter
});

export const engageTypeWriter = num => ({
	type: 'ENGAGE_TYPEWRITER',
	num
});

export const nextQuestion = question => ({
	type: 'NEXT_QUESTION',
	question
});

export const switchlanguage = language => ({
	type: 'SWITCH_LANGUAGE',
	language
});

export const sendAnswer = answer => dispatch => {
	return fetch(game_url, {
		method: "PUT",
		body: JSON.stringify({ answer }),
		headers: { "Content-Type": "application/json",
		"Authorization": `Bearer ${cookie.load('accessToken')}` }
	}).then(res => {
		if (res.status >= 300) throw new Error(res.statusText);
		return res;
	}).then(res => res.json())
	.then(res => {
		dispatch(nextQuestion(res));
	})
	.catch(er => {
		console.error('reducer: ', er);
	});
};
export const getCardSuccess = question => ({
	type: 'GET_CARD_SUCCESS',
	question
});
export const getCard = () => dispatch => {
	return fetch(game_url, {
		headers: { "Authorization": `Bearer ${cookie.load('accessToken')}`
		}
	})
		.then(res => res.json())
		.then(res => {
			dispatch(getCardSuccess(res));
		}).catch(err => {
			console.error('error: ', err);
		});
};
