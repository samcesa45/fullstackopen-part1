import React, { useState } from 'react';

let anecdotes = [
	'If it hurts, do it more often',

	'Adding manpower to a late software project makes it later!',

	'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',

	'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',

	'Premature optimization is the root of all evil.',

	'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

const MaxAnectdote = ({ voteCount }) => {
	const maxVote = Math.max(...voteCount);
	const maxVoteIndex = voteCount.indexOf(maxVote);

	if (maxVote === 0) {
		return <p>no votes</p>;
	}
	return (
		<div>
			<h2>Anectdote with most votes</h2>
			{anecdotes[maxVoteIndex]} has {maxVote} votes
		</div>
	);
};

const App = () => {
	const [selected, setSelected] = useState(0);
	const [voteCount, setVote] = useState(new Array(5).fill(0));

	const handleRandomClick = () => {
		setSelected(Math.floor(Math.random() * 5));
	};

	const increaseVoteCount = (selected) => {
		const copy = [...voteCount];
		copy[selected] += 1;
		setVote(copy);
	};

	return (
		<div>
			{anecdotes[selected]}
			<p>has {voteCount[selected]} votes</p>
			<div>
				<button onClick={handleRandomClick}>next anectdotes</button>
				<button onClick={() => increaseVoteCount(selected)}>vote</button>
			</div>
			<MaxAnectdote
				voteCount={voteCount}
				selected={selected}
				increaseVoteCount={increaseVoteCount}
			/>
		</div>
	);
};

export default App;
