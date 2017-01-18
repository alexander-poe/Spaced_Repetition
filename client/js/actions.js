const game_url = "/game";

export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';

export const ENGAGE_TYPEWRITER = 'ENGAGE_TYPEWRITER';
export const engageTypeWriter = num => ({
	type: ENGAGE_TYPEWRITER,
	num
})

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