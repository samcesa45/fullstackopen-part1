import React, { useState } from 'react';
import Menu from './component/Menu';
import AnecdoteList from './component/AnecdoteList';
import About from './component/About';
import Footer from './component/Footer';
import CreateNew from './component/CreateNew';
import { Route, useRouteMatch, Switch } from 'react-router-dom';
import Anecdote from './component/Anecote';

const App = () => {
	const [anecdotes, setAnecdotes] = useState([
		{
			content: 'If it hurt, do it more often',
			author: 'Jez Humble',
			info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
			votes: 0,
			id: 1,
		},
		{
			content: 'Premature optimization is the root of all evil',
			author: 'Donald Knuth',
			info: 'http://wiki.c2.com/?PrematureOptimization',
			votes: 0,
			id: 2,
		},
	]);

	const [notification, setNotification] = useState('');

	const addNew = (anecdote) => {
		anecdote.id = (Math.random() * 1000).toFixed(0);
		setAnecdotes(anecdotes.concat(anecdote));
		setNotification(`a new anecdote ${anecdote.content} created!`);
		setTimeout(() => {
			setNotification('');
		}, 10000);
	};

	const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

	const vote = (id) => {
		const anecdote = anecdoteById(id);

		const voted = {
			...anecdote,
			votes: anecdote.votes + 1,
		};
		setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
	};

	const match = useRouteMatch('/anecdotes/:id');
	const anecdote = match
		? anecdotes.find((anecdote) => anecdote.id === Number(match.params.id))
		: null;

	return (
		<div>
			<h1>Software anecdotes</h1>

			<Menu />
			<Switch>
				<Route path="/" exact>
					<AnecdoteList
						anecdotes={anecdotes}
						vote={vote}
						notification={notification}
					/>
				</Route>
				<Route path="/anecdotes/:id">
					<Anecdote anecdote={anecdote} />
				</Route>
				<Route path="/about">
					<About />
				</Route>
				<Route path="/createnew">
					<CreateNew addNew={addNew} />
				</Route>
			</Switch>
			<Footer />
		</div>
	);
};

export default App;
