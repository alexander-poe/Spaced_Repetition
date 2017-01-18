import React from 'react';
import * as actions from '../../actions';
import { connect } from 'react-redux';

const InputCard = (props) => {
	let textInput = null;
	return(
		<div className="card">
			<form onSubmit={ () => {props.dispatch(actions.engageTypeWriter(textInput.value)) }}>
				<input
				type="text"
				ref={(input) => { textInput = input; }}
				/>
			</form>	
		</div>	
	)
}
export default connect()(InputCard);	