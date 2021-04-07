import React from 'react';
import Weather from './Weather';
const DisplayCountry = ({ filteredNames }) => {
	let capital = filteredNames[0].capital;
	return (
		<div>
			<h1>{filteredNames[0].name}</h1>
			<br />
			capital {filteredNames[0].capital}
			<br />
			population {filteredNames[0].population}
			<br />
			<div>
				<h2>languages</h2>
				{filteredNames[0].languages.map((lang) => (
					<ul key={lang.name}>
						<li>{lang.name}</li>
					</ul>
				))}
			</div>
			<div>
				<img
					src={filteredNames[0].flag}
					alt="flag"
					style={{ width: '200px', height: '150px' }}
				/>
			</div>
			<div>
				<Weather capital={capital} />
			</div>
		</div>
	);
};

export default DisplayCountry;
