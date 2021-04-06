import React, { useEffect, useState } from 'react';
import Filter from './component/Filter';
import PersonForm from './component/PersonForm';
import Person from './component/Person';
const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNumber] = useState('');
	const [filter, setFiler] = useState('');

	const handleFilterChange = (e) => {
		setFiler(e.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const personObject = {
			name: newName,
			number: newNumber,
			id: Math.floor(Math.random() * 20) + 1,
		};
		if (persons.find((person) => person.name === newName)) {
			alert(`${newName} is already in phonebook`);
			setNewName('');
			setNumber('');
		} else {
			setPersons(persons.concat(personObject));
			setNewName('');
			setNumber('');
		}
	};

	useEffect(() => {
		const results = persons.filter((person) =>
			person.name.toLowerCase().includes(filter.toLowerCase())
		);
		setPersons(results);
	}, [filter]);

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter filter={filter} handleFilterChange={handleFilterChange} />

			<PersonForm
				handleSubmit={handleSubmit}
				newName={newName}
				setNewName={setNewName}
				newNumber={newNumber}
				setNumber={setNumber}
			/>
			<h2>Numbers</h2>
			{persons.map((person) => (
				<Person key={person.id} name={person.name} number={person.number} />
			))}
		</div>
	);
};

export default App;
