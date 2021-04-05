import React from 'react';
const Total = (props) => {
	let parts = props.course.parts;
	let total = parts.reduce((a, c) => a + c.exercises, 0);

	return (
		<h4>
			Total of {''}
			{total} exercises
		</h4>
	);
};

export default Total;
