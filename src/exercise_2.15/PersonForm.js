import React from 'react';
const PersonForm = (props) => {
	const {
		newNumber,
		newName,
		handleNameChange,
		handleNumberChange,
		onAddPerson,
	} = props;
	return (
		<form onSubmit={onAddPerson}>
			<div>
				<h2>add a new</h2>
				name:
				<input value={newName} onChange={handleNameChange} />
				<br />
				number:
				<input value={newNumber} onChange={handleNumberChange} />
			</div>
			<button type="submit">add</button>
		</form>
	);
};

export default PersonForm;
