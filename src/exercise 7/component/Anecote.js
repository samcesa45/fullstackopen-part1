import React from 'react';

const Anecdote = ({ anecdote }) => {
	return (
		<div>
			<h2>
				{anecdote.content} by {anecdote.author}
			</h2>
			<p>has {anecdote.votes} votes</p>
			<span>for more info see</span>
			<a href={anecdote.info}>{anecdote.info}</a>
		</div>
	);
};

export default Anecdote;
