import React from 'react';
import { connect } from 'react-redux';

const QuestionCard = (props) =>
	(
    <div className="card" >
			<p className="centered cardText" >
				{ props.word }
			</p>
		</div>
	);

export default connect()(QuestionCard);
