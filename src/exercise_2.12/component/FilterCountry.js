import React from 'react';
import DisplayCountry from './DisplayCountry';
const FilterCountry = (props) => {
	let filteredNames = props.allCountry;

	if (props.search) {
		filteredNames = filteredNames.filter((country) =>
			country.name.toLowerCase().includes(props.search.toLowerCase())
		);
	}
	const displayCountry = () => {
		return filteredNames.map((country) => (
			<li key={country.name}>
				{country.name}
				<br />
				<button onClick={props.showOnClick} data={country.name}>
					show
				</button>
			</li>
		));
	};

	if (filteredNames.length > 10) {
		return <p>Too many matches, specify another filter</p>;
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
