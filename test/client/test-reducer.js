import reducer from '../../client/js/reducer'
require('isomorphic-fetch')
import chai from 'chai';
const should = chai.should();

describe('reducer', () => {
  it('should return the initial state', () => {
    var initState = reducer(undefined, {});
    initState.score.should.equal(2);
    initState.counter.should.equal(1);
    initState.language.should.equal('french');
    initState.question.english.should.equal('');
    initState.question.french.should.equal('');
    initState.question.freq.should.equal(1);
  })

  it('should handle INCREMENT', () => {
    var increment = reducer([], {
      type: 'INCREMENT',
      counter: 1
    })
    increment.counter.should.equal(2);
  })
  it('should handle DECREMENT', () => {
    var decrement = reducer([], {
      type: 'DECREMENT',
      counter: 1
    })
    decrement.counter.should.equal(0);
  })
  it('should handle GET_CARD_SUCCESS', () => {
    var question = {score: 0, question: {french: 'un', english: 'one'}}
    var state = reducer([], {
      type: 'GET_CARD_SUCCESS',
      question: question
    })
    state.question.should.equal(question.question);
  })
  it('should handle ENGAGE_TYPEWRITER', () => {
    var state = reducer([], {
      type: 'ENGAGE_TYPEWRITER',
      num: 1
    })
    state.typewriter.should.equal(1);
  })
  it('should handle NEXT_QUESTION', () => {
    var question = {score: 0, question: {french: 'un', english: 'one'}}
    var state = reducer([], {
      type: 'NEXT_QUESTION',
      question: question
    })
    state.question.should.equal(question.question);
  })
});

