import React from 'react';
const Notification = ({ notification }) => {
	const style = {
		border: '1px solid green',
		marginBottom: '5px',
	};
	if (notification === '') return null;
	return <div style={style}>{notification}</div>;
};

export default Notification;
