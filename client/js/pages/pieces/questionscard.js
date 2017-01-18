import React from 'react';
import TypeWriter from 'react-typewriter';
//pass in value from outside of page that hits if statements determining animation


class QuestionCard extends React.Component {
 constructor(props) {
 	super(props);
 	
 }
 render() {
	return(

		<div className="card">	
			<TypeWriter typing={1} onTypingEnd={() => this.props.dispatch()}>	
			<h1 className="centered">		
				{ this.props.word }
			</h1>		
		</TypeWriter>	
	 	</div>	
		)
	}
}
export default QuestionCard;
