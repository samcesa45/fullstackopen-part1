import React, { useState } from 'react';

const Statistics = (props) => {
	const { good, bad, neutral, average, all, positive } = props;
	let getFeedback =
		all === 0 ? (
			<div>No feedback given</div>
		) : (
			<table>
				<tbody>
					<tr>
						<td>good {good}</td>
					</tr>
					<tr>
						<td>neutral {neutral}</td>
					</tr>
					<tr>
						<td>bad {bad}</td>
					</tr>
					<tr>
						<td>all {all}</td>
					</tr>
					<tr>
						<td>average {average}</td>
					</tr>
					<tr>
						<td>positive {positive}</td>
					</tr>
				</tbody>
			</table>
		);
	return (
		<div>
			<h2>statistics</h2>
			{getFeedback}
		</div>
	);
};

const Button = (props) => {
	return <button onClick={props.handleClick}>{props.children}</button>;
};

const App = () => {
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	const all = good + neutral + bad;
	const average = Number((good + (bad - 1)) / all);
	const positive = Number((good / all) * 100);
	return (
		<div>
			<h1>give Feedback</h1>
			<Button handleClick={() => setGood(good + 6)}>good</Button>
			<Button handleClick={() => setNeutral(neutral + 2)}>neutral</Button>
			<Button handleClick={() => setBad(bad + 1)}>bad</Button>

			<Statistics
				good={good}
				neutral={neutral}
				bad={bad}
				average={average}
				all={all}
				positive={positive}
			/>
		</div>
	);
};

export default App;
