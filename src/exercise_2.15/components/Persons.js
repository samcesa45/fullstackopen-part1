import React from 'react';
const Persons = (props) => {
	let filteredNames = props.persons;
	if (props.filter) {
		filteredNames = props.persons.filter((person) =>
			person.name.toLowerCase().includes(props.filter.toLowerCase())
		);
	}
	const displayPersons = filteredNames.map((person) => (
		<li key={person.name}>
			{person.name} {person.number}{' '}
			<button onClick={() => props.onDelete(person.id)}>deleted</button>
		</li>
	));

	return (
		<div>
			<h2>Numbers</h2>
			<ul>{displayPersons}</ul>
		</div>
	);
};

export default Persons;
