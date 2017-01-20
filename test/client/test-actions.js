import * as actions from '../../client/js/actions';
require('isomorphic-fetch')
import chai from 'chai';
const should = chai.should();

describe('actions', () => {
  it('should create an action to increment count', () => {
    const counter = '1'
    const expectedAction = {
      type: 'INCREMENT',
      counter
    }
    actions.incrementCount(counter).type.should.equal(expectedAction.type);
        actions.incrementCount(counter).counter.should.equal(expectedAction.counter)
  });
  it('should create an action to decrement count', () => {
    const counter = '1'
    const expectedAction = {
      type: 'DECREMENT',
      counter
    }
    actions.decrementCount(counter).type.should.equal(expectedAction.type);
        actions.decrementCount(counter).counter.should.equal(expectedAction.counter)
  });
  it('should create an action to engage TypeWriter', () => {
    const num = '1'
    const expectedAction = {
      type: 'ENGAGE_TYPEWRITER',
      num
    }
    actions.engageTypeWriter(num).type.should.equal(expectedAction.type);
        actions.engageTypeWriter(num).num.should.equal(expectedAction.num)
  });
  it('should create an action to get next Question', () => {
    const question = {answer: true}
    const expectedAction = {
      type: 'NEXT_QUESTION',
      question
    }
    actions.nextQuestion(question).type.should.equal(expectedAction.type);
        actions.nextQuestion(question).question.should.equal(expectedAction.question)
  });
  it('should create an action to get Card Success', () => {
    const question = {french: 'un', english: 'one'}
    const expectedAction = {
      type: 'GET_CARD_SUCCESS',
      question
    }
    actions.getCardSuccess(question).type.should.equal(expectedAction.type);
        actions.getCardSuccess(question).question.should.equal(expectedAction.question)
  });


});

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('async actions', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('creates GET_CARD_SUCCESS when fetching cards has been done', () => {
    nock('http://localhost:3000/')
      .get('/games')
      .reply(200, { body: { score: 1, question: {english: 'one', french: 'un' }}})

    const expectedAction = { 
    	type: 'GET_CARD_SUCCESS', 
    	body: { score: 1, question: {english: 'one', french: 'un' }} }
    const store = mockStore({score: 1})

    return store.dispatch(actions.getCard('x'))
      .then(() => { // return of async actions
        (store.getActions()).should.equal(expectedAction)
      })
  })
})


