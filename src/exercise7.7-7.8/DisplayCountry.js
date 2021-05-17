import React from 'react';
import Weather from './Weather';
const DisplayCountry = ({ filteredNames }) => {
	let capital = filteredNames[0].capital;

	return (
		<div>
			<h3>{filteredNames[0].name}</h3>
			<div>capital {filteredNames[0].capital}</div>
			<div>population {filteredNames[0].population}</div>
			<img
				src={filteredNames[0].flag}
				style={{ width: '150px', height: '150px' }}
				alt={`flag of ${filteredNames[0].name}`}
			/>
			<div>
				<Weather capital={capital} />
			</div>
		</div>
	);
};

export default DisplayCountry;
