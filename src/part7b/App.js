import React from 'react';
import useField from './customHooks/useField';
// import useCounter from './customHooks/useCounter';
// const App = () => {
// 	const left = useCounter();
// 	const right = useCounter();
// 	return (
// 		<div>
// 			<div>{left.value}</div>
// 			<button onClick={left.increase}>left</button>
// 			<button onClick={right.increase}>right</button>
// 			{right.value}
// 			{/* <button onClick={counter.zero}>zero</button> */}
// 		</div>
// 	);
// };

const App = () => {
	// const [name, setName] = useState('');
	// const [born, setBorn] = useState('');
	// const [height, setHeight] = useState('');
	const name = useField('text');
	const born = useField('date');
	const height = useField('number');

	return (
		<div>
			<form>
				name:
				<input
					{...name}
					// type="text"
					// value={name}
					// onChange={(event) => setName(event.target.value)}
				/>
				<br />
				birthdate:
				<input
					{...born}
					// type="date"
					// value={born}
					// onChange={(event) => setBorn(event.target.value)}
				/>
				<br />
				height:
				<input
					{...height}
					// type="number"
					// value={height}
					// onChange={(event) => setHeight(event.target.value)}
				/>
			</form>
			<div>
				{name.value} {born.value} {height.value}
			</div>
		</div>
	);
};

export default App;
