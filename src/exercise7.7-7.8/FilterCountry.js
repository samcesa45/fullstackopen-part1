import React from 'react';
import DisplayCountry from './DisplayCountry';
const FilterCountry = ({ country, search, loading }) => {
	let filteredNames = country.data;
	let foundCountry = country.found;

	if (search) {
		filteredNames = filteredNames.filter((country) =>
			country.name.toLowerCase().includes(search.toLowerCase())
		);
	}

	if (!filteredNames) {
		return null;
	}

	if (loading) {
		return <div>...loading</div>;
	}

	if (!foundCountry) {
		return <div>not found...</div>;
	}

	const displayCountry = () => {
		filteredNames = filteredNames.map((country) => {
			<li key={country.name}>{country.name}</li>;
		});
	};

	if (filteredNames.length > 10) {
		return <p>Too many matches...specify another filter</p>;
	}

	if (filteredNames.length === 1) {
		return <DisplayCountry filteredNames={filteredNames} />;
	}
	return (
		<div>
			<ul>{displayCountry()}</ul>
		</div>
	);
};

export default FilterCountry;
