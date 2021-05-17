import axios from 'axios';
import { useEffect, useState } from 'react';
const useCountry = (name) => {
	const [country, setCountry] = useState([]);
	const [loading, setLoading] = useState(false);
	const url = 'https://restcountries.eu/rest/v2/all';

	const fetchData = async () => {
		setLoading(true);
		try {
			const request = await axios.get(url);

			if (request) {
				const data = request.data;
				const found = true;
				setCountry({ data, found });
			}
		} catch (error) {
			console.log(error);
			const data = null;
			const found = false;
			setCountry({ data, found });
		}
		setLoading(false);
	};

	useEffect(() => {
		fetchData();
	}, []);
	return { country, name, loading };
};

export default useCountry;
