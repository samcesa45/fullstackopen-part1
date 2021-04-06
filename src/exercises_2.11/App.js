import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Filter from './component/Filter';
import Persons from './component/Persons';
import PersonForm from './component/PersonForm';
const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setName] = useState('');
	const [newNumber, setNumber] = useState('');
	const [filter, setFilter] = useState('');

	const handleNameChange = (event) => setName(event.target.value);
	const handleNumberChange = (event) => setNumber(event.target.value);
	const handleFilterChange = (event) => setFilter(event.target.value);

	const handleSubmit = (event) => {
		event.preventDefault();

		const personObject = {
			name: newName,
			number: newNumber,
			id: persons.length + 1,
		};

		if (persons.find((person) => person.name === newName)) {
			alert(`${newName} is already in phonebook`);
			setName('');
			setNumber('');
			return;
		}
		let person = persons.concat(personObject);
		setPersons(person);
		setName('');
		setNumber('');
	};

	const fetchPerson = () =>
		axios.get(`http://localhost:3002/persons`).then((res) => {
			console.log(res.data);
			setPersons(res.data);
		});

	useEffect(() => {
		fetchPerson();
	}, []);
	return (
		<div>
			<h2>PhoneBook</h2>
			<Filter filter={filter} onfilterChange={handleFilterChange} />
			<PersonForm
				handleSubmit={handleSubmit}
				handleNameChange={handleNameChange}
				newName={newName}
				newNumber={newNumber}
				handleNumberChange={handleNumberChange}
			/>
			<div>
				<Persons persons={persons} filter={filter} />
			</div>
		</div>
	);
};

export default App;
