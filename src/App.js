import React, { useState, useEffect } from 'react';
import './App.css';
import noteService from './services/notes';
import Note from './component/Note';
import Notification from './component/Notification';
import Footer from './component/Footer';

const App = (props) => {
	const [notes, setNotes] = useState([]);
	const [newNote, setNewNote] = useState('');
	const [showAll, setShowAll] = useState(true);
	const [errorMessage, setErrorMessage] = useState('some error message');
	const addNote = (event) => {
		event.preventDefault();
		const noteObject = {
			content: newNote,
			date: new Date().toISOString(),
			important: Math.random() < 0.5,
		};

		noteService.create(noteObject).then((returnedNote) => {
			setNotes(notes.concat(returnedNote));
			setNewNote('');
		});
	};

	const handleNoteChange = (event) => {
		event.preventDefault();
		setNewNote(event.target.value);
	};

	const notesToShow = showAll ? notes : notes.filter((note) => note.important);

	const toggleImportanceOf = (id) => {
		const note = notes.find((n) => n.id === id);
		const changedNote = { ...note, important: !note.important };

		noteService
			.update(id, changedNote)
			.then((returnedNote) => {
				setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
			})
			.catch((error) => {
				setErrorMessage(
					`Note '${note.content}' was already removed from server`
				);
				setTimeout(() => {
					setErrorMessage(null);
				}, 2000);

				setNotes(notes.filter((n) => n.id !== id));
			});
	};

	useEffect(() => {
		noteService.getAll().then((initialNote) => {
			setNotes(initialNote);
		});
	}, []);
	console.log('render', notes.length, 'notes');
	return (
		<div>
			<h1>Notes</h1>
			<Notification message={errorMessage} />
			<div>
				<button onClick={() => setShowAll(!showAll)}>
					show {showAll ? 'important' : 'all'}
				</button>
			</div>
			<ul>
				{notesToShow.map((note) => (
					<Note
						key={note.id}
						note={note}
						toggleImportance={() => toggleImportanceOf(note.id)}
					/>
				))}
			</ul>
			<form onSubmit={addNote}>
				<input value={newNote} onChange={handleNoteChange} />
				<button type="submit">save</button>
			</form>

			<Footer />
		</div>
	);
};

export default App;

// {
//   "notes": [
//     {
//       "id": 1,
//       "content": "HTML is easy",
//       "date": "2019-05-30T17:30:31.098Z",
//       "important": false
//     },
//     {
//       "id": 2,
//       "content": "Browser can execute only JavaScript",
//       "date": "2019-05-30T18:39:34.091Z",
//       "important": false
//     },
//     {
//       "id": 3,
//       "content": "GET and POST are the most important methods of HTTP protocol",
//       "date": "2019-05-30T19:20:14.298Z",
//       "important": false
//     },
//     {
//       "content": "What to do when you seem confused",
//       "date": "2021-04-08T10:30:17.925Z",
//       "important": false,
//       "id": 4
//     },
//     {
//       "content": "add this to my note platform",
//       "date": "2021-04-08T11:09:21.132Z",
//       "important": false,
//       "id": 5
//     }
//   ]
// }
