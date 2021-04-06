import React from 'react';
const Persons = (props) => {
	let filteredNames = props.persons;
	if (props.filter) {
		filteredNames = props.persons.filter((person) =>
			person.name.toLowerCase().includes(props.filter.toLowerCase())
		);
	}
	const display = filteredNames.map((person) => (
		<li key={person.id}>
			{person.name} {person.number}
		</li>
	));
	return (
		<div>
			<ul>{display}</ul>
		</div>
	);
};

export default Persons;
