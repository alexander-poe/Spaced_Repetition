import React from 'react';
import TestUtils from 'react-addons-test-utils';
import chai from 'chai';
import Input from '../../client/js/pages/pieces/input'
import {createStore} from 'redux';
import { Provider } from 'react-redux';
import * as actions from '../../client/js/actions';
import reducer from '../../client/js/reducer';
const testStore = createStore(reducer);
const should = chai.should();

describe('Input component', function() {
	it('should be an element', function() {

	})
})
