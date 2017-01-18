import React from 'react';
import * as actions from '../../actions';
import { connect } from 'react-redux';
//dispatch.senddata?
const InputCard = (props) => {
	let textInput = null;
	return(
		
		<div className="card">
			<form onSubmit={ (e) => { 
				e.preventDefault();
				props.dispatch(actions.sendAnswer(textInput.value)) 
			}}>
				<input
				type="text"
				ref={(input) => { textInput = input; }}
				/>
			</form>	
		</div>	
	
	)
}
export default connect()(InputCard);	