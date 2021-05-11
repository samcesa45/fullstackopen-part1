import React from 'react';
import { Link } from 'react-router-dom';
import Notification from './Notification';
// import { useParams } from 'react-router-dom';
const AnectdoteList = ({ anecdotes, notification }) => {
	return (
		<div>
			<Notification notification={notification} />
			<h2>Anectdotes</h2>
			<ul>
				{anecdotes.map((anecdote) => (
					<li key={anecdote.id}>
						<Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default AnectdoteList;
