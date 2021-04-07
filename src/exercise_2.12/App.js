import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FilterCountry from './component/FilterCountry';
const App = () => {
	const [allCountry, setAllCountry] = useState([]);
	const [search, setSearch] = useState('');

	const handleSearchChange = (event) => setSearch(event.target.value);
	const fetchCountry = () => {
		axios.get('https://restcountries.eu/rest/v2/all').then((res) => {
			console.log(res.data[0]);
			setAllCountry(res.data);
		});
	};

	const showOnClick = (event) => {
		console.log(event.target.attributes.data.value);
		setSearch(event.target.attributes.data.value);
	};

	useEffect(() => {
		fetchCountry();
	}, []);
	return (
		<>
			<div>
				find countries: <input value={search} onChange={handleSearchChange} />
			</div>
			<div>
				<FilterCountry
					allCountry={allCountry}
					search={search}
					showOnClick={showOnClick}
				/>
			</div>
		</>
	);
};

export default App;
