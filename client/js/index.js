import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Link, hashHistory } from 'react-router';
import store from './store';

console.log(`Client running in ${process.env.NODE_ENV} mode`);


const questionCard = () => 
	<div className="card">
		<h1>
		Je suis`
		</h1>
	</div>	
const inputCard = () => 
	<div className="card">
		<h1>yada</h1>
		<form>
			<input
			type="text"
			/>
		</form>	
	</div>	
const Welcome = () =>
	<div className="welcome">
		<h1> Hello </h1>
		<Link 
		to="/game"
		>
		Enter
		</Link> 
	</div>

const SpacedRep = () => {
	return (
		<div>
			<h2> 
			Spaced 
			</h2>
			<div className="container">
				<Link to="/"> Back </Link>
				<inputCard/>
				<questionCard/>
			</div>
		</div>
    )
}    

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

