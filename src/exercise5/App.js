/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import Blog from './component/Blog';
import { blogService } from './service/blog';
import { loginService } from './service/login';
import Notification from './component/Notification';
import Togglable from './component/Togglable';
import NewBlogForm from './component/NewBlogForm';
import LoginForm from './component/LoginForm';

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [update, setUpdate] = useState(null);

	const [errorMessage, setErrorMessage] = useState({
		category: '',
		message: '',
	});

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [user, setUser] = useState(null);

	useEffect(() => {
		blogService.getAll().then((initialBlog) => {
			setBlogs(initialBlog);
		});
	}, [update]);

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogUser');
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			setUser(user);
			blogService.setToken(user.token);
		}
	}, []);
	const handleLogin = async (event) => {
		event.preventDefault();
		try {
			const user = await loginService.login({ username, password });
			window.localStorage.setItem('loggedBlogUser', JSON.stringify(user));
			blogService.setToken(user.token);
			setUser(user);
			setUsername('');
			setPassword('');
		} catch (error) {
			const messageObject = {
				...errorMessage,
				message: 'wrong username or password',
				category: 'error',
			};
			setErrorMessage(messageObject);
			setTimeout(() => {
				setErrorMessage(null);
			}, 5000);
		}
	};

	const handleLogout = () => {
		try {
			window.localStorage.removeItem('loggedBlogUser');
		} catch (error) {
			setErrorMessage('user has been logged out');
			setTimeout(() => {
				setErrorMessage(null);
			}, 5000);
		}
	};

	const addBlog = async (newBlog) => {
		try {
			const blog = await blogService.create(newBlog);
			setBlogs(blogs.concat(blog));
			const messageObject = {
				...errorMessage,
				message: `a new blog ${newBlog.title} by ${newBlog.author} added`,
				category: 'success',
			};
			setErrorMessage(messageObject);
			setTimeout(() => {
				setErrorMessage(null);
			}, 5000);
		} catch (error) {
			const messageObject = {
				...errorMessage,
				message: 'oops something went wrong',
				category: 'error',
			};
			setErrorMessage(messageObject);
			setTimeout(() => {
				setErrorMessage(null);
			}, 5000);
		}
	};

	const blogForm = () => (
		<div>
			{blogs
				.sort((a, b) => b.likes - a.likes)
				.map((blog) => (
					<Blog key={blog.id} blog={blog} setUpdate={setUpdate} user={user} />
				))}
		</div>
	);

	return (
		<div>
			{errorMessage && <Notification messageType={errorMessage} />}
			{user === null ? (
				<div>
					<h2>Login To Application</h2>
					<LoginForm
						handleSubmit={handleLogin}
						username={username}
						password={password}
						handleUsername={({ target }) => setUsername(target.value)}
						handlePassword={({ target }) => setPassword(target.value)}
					/>
				</div>
			) : (
				<div>
					<h2>Blogs</h2>
					<p>
						{user.name} has logged in{' '}
						<button onClick={handleLogout}>logout</button>
					</p>

					<Togglable buttonLabel="new note">{blogForm()}</Togglable>
					<br />

					<NewBlogForm createBlog={addBlog} />
				</div>
			)}
		</div>
	);
};

export default App;
