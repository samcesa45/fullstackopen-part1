import { useState } from 'react';
import './App.css';

const Display = ({ value }) => {
	return <div>{value}</div>;
};
const Button = (props) => {
	return <button onClick={props.handleClick}>{props.children}</button>;
};

function App() {
	const [value, setValue] = useState(10);

	const setToValue = (newValue) => {
		setValue(newValue);
	};

	return (
		<div>
			<Display value={value} />
			<Button handleClick={() => setToValue(1000)}>thousand</Button>
			<Button handleClick={() => setToValue(0)}>reset</Button>
			<Button handleClick={() => setToValue(value + 1)}>increament</Button>
		</div>
	);
	// 	const [left, setLeft] = useState(0);
	// 	const [right, setRight] = useState(0);
	// 	const [allClicks, setAll] = useState([]);
	// 	const handleLeftClick = () => {
	// 		setAll(allClicks.concat('L'));
	// 		setLeft(left + 1);
	// 	};
	// 	const handleRightclick = () => {
	// 		setAll(allClicks.concat('R'));
	// 		setRight(right + 1);
	// 	};
	// 	return (
	// 		<div className="App">
	// 			{left}
	// 			<Button handleClick={handleLeftClick}>left</Button>
	// 			<Button handleClick={handleRightclick}>right</Button>
	// 			{right}
	// 			<History allClicks={allClicks} />
	// 		</div>
	// 	);
}

export default App;
