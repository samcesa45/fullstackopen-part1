import React, { useEffect } from 'react';
import useField from './hooks/useField';
import { useResources } from './hooks/useResources';
const App = () => {
	const content = useField('text');
	const name = useField('text');
	const number = useField('text');

	const [notes, noteService] = useResources('http://localhost:3001/notes');
	const [persons, personService] = useResources(
		'http://localhost:3001/persons'
	);

	const handleNoteSubmit = (event) => {
		event.preventDefault();
		noteService.create({ content: content.value });
	};

	const handlePersonSubmit = (event) => {
		event.preventDefault();
		personService.create({ name: name.value, number: number.value });
	};

	const deleteHandler = (id) => {
		return noteService.remove(id);
	};

	useEffect(() => {
		noteService.getAll();
		personService.getAll();
	}, []);
	return (
		<div>
			<h2>notes</h2>
			<form onSubmit={handleNoteSubmit}>
				<input {...content} />
				<button>create</button>
			</form>
			{notes.map((note) => (
				<div key={note.id}>
					<p>{note.content}</p>
					<button onClick={() => deleteHandler(note.id)}>delete</button>
				</div>
			))}
			<h2>persons</h2>
			<form onSubmit={handlePersonSubmit}>
				name <input {...name} /> <br />
				number <input {...number} />
				<button>create</button>
			</form>
			{persons.map((person) => (
				<p key={person.id}>
					{person.name} {person.number}
				</p>
			))}
		</div>
	);
};

export default App;
