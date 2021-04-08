import React, { useEffect, useState } from 'react';
import personService from './services/persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';
const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setName] = useState('');
	const [newNumber, setNumber] = useState('');
	const [filter, setFilter] = useState('');
	const [errorMessage, setErrorMessage] = useState({
		message: '',
		category: '',
	});

	const handleNameChange = (event) => setName(event.target.value);
	const handleNumberChange = (event) => setNumber(event.target.value);
	const handleFilterChange = (event) => setFilter(event.target.value);

	const addPerson = (event) => {
		event.preventDefault();
		let person = persons.find((person) => person.name === newName);
		if (person) {
			if (
				window.confirm(
					`${newName} is already added to phonebook, replace the old number with the new one`
				)
			) {
				const id = persons.find((person) => person.name === newName).id;
				const personObject = {
					name: newName,
					number: newNumber,
				};
				personService
					.update(id, personObject)
					.then((returnedObject) => {
						setPersons(
							persons.map((person) =>
								person.id !== id ? person : returnedObject
							)
						);
						const messageObject = {
							message: `Added ${returnedObject.name}`,
							category: 'success',
						};
						setErrorMessage(messageObject);
						setTimeout(() => {
							setErrorMessage({ ...errorMessage, message: null });
						}, 2000);
						setName('');
						setNumber('');
					})
					.catch((error) => {
						const messageObject = {
							message: `Information of ${personObject.name} has already been removed from server`,
							category: 'error',
						};
						setErrorMessage(messageObject);
						setTimeout(() => {
							setErrorMessage({ ...errorMessage, message: null });
						}, 2000);
					});
			}
		} else {
			const personObject = {
				name: newName,
				number: newNumber,
			};

			personService
				.create(personObject)
				.then((returnedObject) => {
					setPersons(persons.concat(returnedObject));
					const messageObject = {
						message: `Added ${newName}`,
						category: 'success',
					};
					setErrorMessage(messageObject);
					setTimeout(() => {
						setErrorMessage({ ...errorMessage, message: null });
					}, 2000);
					setName('');
					setNumber('');
				})
				.catch((err) => console.log(err));
		}
	};

	const deletePerson = (id) => {
		const p = persons.find((person) => person.id === id);
		if (window.confirm(`Delete ${p.name} ?`)) {
			personService.deleteRequest(id).then((returnedObject) => {
				setPersons(persons.filter((person) => person.id !== id));
			});
		}
	};

	const fetchedPersons = () => {
		return personService.getAll().then((initialPerson) => {
			setPersons(initialPerson);
		});
	};

	useEffect(() => {
		fetchedPersons();
	}, []);
	return (
		<div>
			<h1>Phonebook</h1>
			<Notification messageType={errorMessage} />
			<Filter
				onfilterChange={handleFilterChange}
				filter={filter}
				persons={persons}
				onDelete={deletePerson}
			/>

			<PersonForm
				newNumber={newNumber}
				newName={newName}
				handleNameChange={handleNameChange}
				handleNumberChange={handleNumberChange}
				onAddPerson={addPerson}
			/>
			<Persons persons={persons} filter={filter} onDelete={deletePerson} />
		</div>
	);
};

export default App;
