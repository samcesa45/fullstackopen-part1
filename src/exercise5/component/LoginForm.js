import React from 'react';
const LoginForm = ({
	handleSubmit,
	handleUsername,
	handlePassword,
	username,
	password,
}) => (
	<form onSubmit={handleSubmit}>
		<div>
			username
			<input
				type="text"
				value={username}
				name="Username"
				id="Username"
				onChange={handleUsername}
			/>
		</div>
		<div>
			password
			<input
				type="password"
				value={password}
				name="Password"
				id="Password"
				onChange={handlePassword}
			/>
		</div>
		<button type="submit" id="submit">
			login
		</button>
	</form>
);

export default LoginForm;
