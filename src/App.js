import React from 'react';
import './App.css';
import Note from './component/Note';

const App = ({ notes }) => {
	return (
		<div>
			<h1>Notes</h1>
			<ul>
				{notes.map((note) => (
					<Note key={note.id} note={note} />
				))}
			</ul>
		</div>
	);
};

export default App;
