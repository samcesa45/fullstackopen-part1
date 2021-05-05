import React from 'react';
const Notification = ({ messageType }) => {
	const error = {
		color: 'red',
		borderRadius: '5px',
		border: '2px solid red',
		fontSize: '20px',
		background: '#ccc',
		padding: '10px',
		marginBottom: '10px',
	};
	const success = {
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
	if (messageType.category === 'error') {
		return (
			<div style={error} className="error">
				{messageType.message}
			</div>
		);
	}
	if (messageType.category === 'success') {
		return (
			<div style={success} className="success">
				{messageType.message}
			</div>
		);
	}
	return <div>{messageType.message}</div>;
};

export default Notification;
