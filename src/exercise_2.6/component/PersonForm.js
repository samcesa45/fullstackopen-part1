import React from 'react';
const PersonForm = (props) => {
	const { handleSubmit, newName, setNewName, newNumber, setNumber } = props;
	return (
		<form onSubmit={handleSubmit}>
			<div>
				name:
				<input value={newName} onChange={(e) => setNewName(e.target.value)} />
			</div>
			<div>
				Number:
				<input value={newNumber} onChange={(e) => setNumber(e.target.value)} />
			</div>
			<div>
				<button type="submit">add</button>
			</div>
		</form>
	);
};

export default PersonForm;
