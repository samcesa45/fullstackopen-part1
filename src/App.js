import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { noteService } from './services/notes';
import { loginService } from './services/login';
import Note from './component/Note';
import Notification from './component/Notification';
import Footer from './component/Footer';
import LoginForm from './component/LoginForm';
import Togglable from './component/Togglable';
import NoteForm from './component/NoteForm';

const App = () => {
	const [notes, setNotes] = useState([]);
	const [showAll, setShowAll] = useState(true);
	const [errorMessage, setErrorMessage] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [user, setUser] = useState(null);
	const noteFormRef = useRef();

	useEffect(() => {
		noteService.getAll().then((initialNote) => {
			setNotes(initialNote);
		});
	}, []);

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser');
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			setUser(user);
			noteService.setToken(user.token);
		}
	}, []);

	const handleLogin = async (event) => {
		event.preventDefault();
		// console.log('logging in with', username, password);

		try {
			const user = await loginService.login({
				username,
				password,
			});
			window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user));
			noteService.setToken(user.token);
			setUser(user);
			setUsername('');
			setPassword('');
		} catch (exception) {
			setErrorMessage('Wrong credentials');
			setTimeout(() => {
				setErrorMessage(null);
			}, 5000);
		}
	};

	const handleLogout = () => {
		try {
			window.localStorage.removeItem('loggedNoteappUser');
		} catch (error) {
			setErrorMessage('user is already logged out');
			setTimeout(() => {
				setErrorMessage(null);
			}, 5000);
		}
	};

	const addNote = (noteObject) => {
		noteFormRef.current.toggleVisibility();
		noteService.create(noteObject).then((returnedNote) => {
			setNotes(notes.concat(returnedNote));
		});
	};

	const noteForm = () => (
		<Togglable buttonLabel="switch-note" ref={noteFormRef}>
			<NoteForm createNote={addNote} />
		</Togglable>
	);

	const notesToShow = showAll ? notes : notes.filter((note) => note.important);

	const toggleImportanceOf = (id) => {
		const note = notes.find((n) => n.id === id);
		const changedNote = { ...note, important: !note.important };

		noteService
			.update(id, changedNote)
			.then((returnedNote) => {
				setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
			})
			.catch(() => {
				setErrorMessage(
					`Note '${note.content}' was already removed from server`
				);
				setTimeout(() => {
					setErrorMessage(null);
				}, 2000);

				setNotes(notes.filter((n) => n.id !== id));
			});
	};

	return (
		<>
			{errorMessage && <Notification message={errorMessage} />}
			<h1>Notes</h1>
			{user === null ? (
				<Togglable buttonLabel="login">
					<LoginForm
						handleSubmit={handleLogin}
						username={username}
						password={password}
						setUsername={setUsername}
						setPassword={setPassword}
					/>
				</Togglable>
			) : (
				<div>
					<p>{user.name} logged-in</p>
					<button onClick={handleLogout}>logout</button>
					{noteForm()}

					<button onClick={() => setShowAll(!showAll)}>
						show {showAll ? 'important' : 'all'}
					</button>

					<ul>
						{notesToShow.map((note) => (
							<Note
								key={note.id}
								note={note}
								toggleImportance={() => toggleImportanceOf(note.id)}
							/>
						))}
					</ul>

					<Footer />
				</div>
			)}
		</>
	);
};

export default App;
