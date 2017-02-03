import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as actions from '../actions';
import QuestionCard from './pieces/questionscard';
import InputCard from './pieces/input';
import Counter from './pieces/counter';

class SpacedRep extends React.Component {
	componentDidMount() {
		this.props.dispatch(actions.getCard());
	}

	render() {
		return (
			<div className="outerlayer">
			<div className="holder">
			<Link to="/">
			🇫🇷
			</Link>
			<p className="headline">
			instaFrench
			</p>
			<div
			className="container"
			>
			<QuestionCard
			word={this.props.question[this.props.language]}
			/>
			<InputCard />
			</div>
			<Counter
			count={this.props.counter}
			/>
			</div>
			<label
			className="switch"
			>
			<input
			onClick={() => { this.props.dispatch(actions.switchlanguage()); }}
			type="checkbox"
			/>
			<div className="slider round" />
			</label>
			</div>
		);
	}
}
const mapStateToProps = (state, props) => ({
	typewriter: state.typewriter,
	question: state.question,
	counter: state.counter,
	language: state.language,
});
export default connect(mapStateToProps)(SpacedRep);

// this.props.question[this.props.language]
