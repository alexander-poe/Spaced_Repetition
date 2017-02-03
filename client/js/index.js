import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory } from 'react-router';
import store from './store';
import Welcome from './pages/Welcome';
import SpacedRep from './pages/SpacedRep';


document.addEventListener('DOMContentLoaded', () => {
	ReactDOM.render(

		<Provider store={store}>
			<Router history={hashHistory}>
				<Route path="/" component={Welcome} />
				<Route path="/game" component={SpacedRep} />
			</Router>
		</Provider>, document.getElementById('app')

	);
});
