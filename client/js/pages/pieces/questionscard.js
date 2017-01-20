import React from 'react';
import Typist from 'react-typist';
import { connect } from 'react-redux'
//pass in value from outside of page that hits if statements determining animation

class QuestionCard extends React.Component {
 constructor(props) {
 	super(props);	
 }
 render() {
	return(

		<div 
		className="card">	
					<p 
					className="centered cardText">		
						{ this.props.word }
					</p>			
		</div>	
		
		)
	}
}

const mapStateToProps = (state, props) => ({
	typewriter: state.typewriter,
	question: state.question
});

export default connect()(QuestionCard);

	// <TypeWriter 
	// 		typing={1} 
	// 		onTypingEnd={() => 
	// 			this.props.dispatch
	// 		}>	
 //       {stuff}
	// 		<TypeWriter/>
 //       }
