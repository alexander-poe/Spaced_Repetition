import reducer from '../../client/js/reducer'

describe('reducer', () => {
  it('should return the initial state', () => {
    reducer(undefined, {}).should.equal(
      {
	question: {
		english: "", 
		french: "", 
		freq: 1,
	}, 
	score: 2,
	counter: 1,
	language: 'french'
	})
  })
});