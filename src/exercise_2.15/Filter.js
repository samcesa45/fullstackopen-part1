import React from 'react';

const Filter = (props) => {
	const { filter, onfilterChange } = props;
	return (
		<div>
			filter show with <input value={filter} onChange={onfilterChange} />
		</div>
	);
};

export default Filter;
