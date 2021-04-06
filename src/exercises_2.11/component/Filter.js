import React from 'react';
const Filter = (props) => {
	const { filter, onfilterChange } = props;
	return (
		<div>
			show person: <input value={filter} onChange={onfilterChange} />
		</div>
	);
};

export default Filter;
