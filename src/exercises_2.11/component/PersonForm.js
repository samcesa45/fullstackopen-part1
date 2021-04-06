import React from 'react';
const PersonForm = (props) => {
	const {
		handleSubmit,
		handleNameChange,
		newName,
		newNumber,
		handleNumberChange,
	} = props;
	return (
		<form onSubmit={handleSubmit}>
			<div>
				Name: <input value={newName} onChange={handleNameChange} />
			</div>
			<div>
				Number: <input value={newNumber} onChange={handleNumberChange} />
			</div>
			<button type="submit">save</button>
		</form>
	);
};

export default PersonForm;
