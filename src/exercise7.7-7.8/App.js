import React, { useState } from 'react';
import useField from './hooks/useField';
import useCountry from './hooks/useCountry';
import FilterCountry from './FilterCountry';
const App = () => {
	const username = useField('text');
	// const [country, setCountry] = useState([]);
	const [search, setSearch] = useState('');
	const { country, loading } = useCountry(search);

	// const fetchAllCountries = async () => {
	// 	try {
	// 		const request = await axios.get('https://restcountries.eu/rest/v2/all');
	// 		console.log(request.data[0]);
	// 		return setCountry(request.data);
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };
	// useEffect(() => {
	// 	fetchAllCountries();
	// }, []);

	// const handleSearchChange = (event) => setSearch(event.target.value);

	const showOnClick = (event) => {
		event.preventDefault();
		setSearch(username.value);
		// setSearch(username.attributes.data.value);
	};
	return (
		<div>
			<form onSubmit={showOnClick}>
				search countries: <input {...username} />
				<button>find</button>
			</form>
			<FilterCountry
				country={country}
				loading={loading}
				search={search}
				showOnClick={showOnClick}
			/>
		</div>
	);
};

export default App;
