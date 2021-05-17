import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Weather = ({ capital }) => {
	const [weather, setWeather] = useState({});

	const fetchWeather = async () => {
		try {
			const response = await axios.get(
				`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${capital}`
			);

			setWeather({
				temperature: response.data.current.temperature,
				wind: response.data.current.wind_speed,
				windDirection: response.data.current.wind_dir,
				weatherIcon: response.data.current.weather_icons,
			});
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchWeather();
	}, []);

	return (
		<div>
			<h2>Weather in {capital}</h2>
			<div>temperature: {weather.temperature} deg Celcius</div>

			<img src={weather.weatherIcon} alt="weather_icon" />
			<div>
				wind: {weather.wind} mph in {weather.windDirection}
			</div>
		</div>
	);
};

export default Weather;
