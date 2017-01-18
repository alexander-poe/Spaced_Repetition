const game_url = "/game/";
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const ENGAGE_TYPEWRITER = 'ENGAGE_TYPEWRITER';
export const engageTypeWriter = num => ({
	type: ENGAGE_TYPEWRITER,
	num
});
export const NEXT_QUESTION = 'NEXT_QUESTION';
export const nextQuestion = question => ({
	type: NEXT_QUESTION,
	question
});


export const sendAnswer = answer => dispatch => {
	console.log('action recieved data:' , answer)
	return fetch(game_url, {
		method : "PUT",
		body : JSON.stringify({ answer }),
		headers : { "Content-Type" : "application/json" }
	}).then(res => {
		if (res.status >= 300) throw new Error(res.statusText);
		return res;
	}).then(res => res.json())
	.then(res => {
		console.log('next question:', res);
		dispatch(nextQuestion(res));
	}).catch(er => {
		console.error('reducer: ', er)
	});
};
export const GET_CARD_SUCCESS = "GET_CARD_SUCCESS";
export const getCardSuccess = question => ({
	type: GET_CARD_SUCCESS,
	question
});
export const getCard = data => dispatch => {
	return fetch(game_url)
		.then(res => {
			return res.json()
		}).then(res => {
			console.log('from here', res)
			dispatch(getCardSuccess(res));
		}).catch(err => {
			console.error('error: ', err)
		});
}; 