/* eslint-disable indent */
/* eslint-disable linebreak-style */
import React from 'react';
import PropTypes from 'prop-types';
const LoginForm = ({
	handleSubmit,
	username,
	password,
	setUsername,
	setPassword,
}) => {
	return (
		<form onSubmit={handleSubmit}>
			<div>
				username
				<input
					type="text"
					value={username}
					name="Username"
					id="Username"
					onChange={({ target }) => setUsername(target.value)}
				/>
			</div>
			<div>
				password
				<input
					type="password"
					value={password}
					name="Password"
					id="Password"
					onChange={({ target }) => setPassword(target.value)}
				/>
			</div>
			<button type="submit" id="login-button">
				login
			</button>
		</form>
	);
};

LoginForm.propTypes = {
	handleSubmit: PropTypes.func.isRequired,
	username: PropTypes.string.isRequired,
	password: PropTypes.string.isRequired,
	setPassword: PropTypes.func.isRequired,
	setUsername: PropTypes.func.isRequired,
};

export default LoginForm;
