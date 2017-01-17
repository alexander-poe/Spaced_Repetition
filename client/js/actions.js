const game_url = "/game";

export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';


export const GET_CARDS_SUCCESS = "GET_CARDS_SUCCESS";
export const getCardsSuccess = data => ({
	type: GET_CARDS_SUCCESS,
	data
});
export const getCards = cards => dispatch => {
	return fetch(game_url)
		.then(res => {
			return res.status(200).json({})
		}).then(res => {
			dispatch(getCardsSuccess(res.data));
		}).catch(err => {
			console.error('error: ', err)
		});
}; 