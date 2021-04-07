import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
const Weather = (props) => {
	const [weather, setWeather] = useState({});
	const { capital } = props;
	const fetchWeather = useCallback(() => {
		return axios
			.get(
				`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${capital}`
			)
			.then((response) => {
				console.log(response.data);
				setWeather({
					temperature: response.data.current.temperature,
					wind: response.data.current.wind_speed,
					windDirection: response.data.current.wind_dir,
					img: response.data.current.weather_icons,
				});
			});
	}, [capital]);

	useEffect(() => {
		fetchWeather();
	}, [fetchWeather]);
	return (
		<div>
			<h2>Weather in {capital}</h2>
			<p>
				<strong>temperature: </strong>
				{weather.temperature} degree Celcius
			</p>
			<img src={weather.img} alt="img_icons" />
			<p>
				<strong>wind:</strong>
				{weather.wind} mph direction {weather.windDirection}
			</p>
		</div>
	);
};

export default Weather;
