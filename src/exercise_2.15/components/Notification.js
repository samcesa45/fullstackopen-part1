import React from 'react';
const Notification = ({ messageType }) => {
	const errorStyle = {
		color: 'red',
		borderRadius: '5px',
		border: '2px solid red',
		fontSize: '20px',
		background: '#ccc',
		padding: '10px',
		marginBottom: '10px',
	};
	const successStyle = {
		color: 'green',
		borderRadius: '5px',
		fontSize: '20px',
		border: '2px solid green',
		background: '#ccc',
		padding: '10px',
		marginBottom: '10px',
	};
	if (messageType === null) {
		return null;
	}

	if (messageType.category === 'success') {
		return <div style={successStyle}>{messageType.message}</div>;
	}
	if (messageType.category === 'error') {
		return <div style={errorStyle}>{messageType.message}</div>;
	}
	return <div></div>;
};

export default Notification;
