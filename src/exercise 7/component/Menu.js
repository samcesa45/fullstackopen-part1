import React from 'react';
import { Link } from 'react-router-dom';
const Menu = () => {
	const padding = {
		paddingLeft: 5,
	};
	return (
		<div>
			<Link to="/" style={padding}>
				anecdotes
			</Link>
			<Link to="/createnew" style={padding}>
				create new
			</Link>
			<Link to="/about" style={padding}>
				about
			</Link>
		</div>
	);
};

export default Menu;
