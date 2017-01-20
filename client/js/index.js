import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Link, hashHistory } from 'react-router';
import store from './store';
import Welcome from './pages/Welcome';
import SpacedRep from './pages/SpacedRep';


document.addEventListener('DOMContentLoaded', () => {
	ReactDOM.render(
		
		<Provider store={ store }>
			<Router history={ hashHistory }>
				<Route path="/" component={ Welcome }></Route>
				<Route path="/game" component={ SpacedRep }></Route>
			</Router>
		</Provider>, document.getElementById('app')	
	
	)
});

