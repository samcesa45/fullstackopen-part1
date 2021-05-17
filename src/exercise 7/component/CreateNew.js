import React from 'react';
import { useHistory } from 'react-router';
import useField from '../customHooks/useField';
const CreateNew = (props) => {
	// const [content, setContent] = useState('');
	// const [author, setAuthor] = useState('');
	// const [info, setInfo] = useState('');
	const { reset: resetContent, ...content } = useField('text');
	const { reset: resetAuthor, ...author } = useField('text');
	const { reset: resetInfo, ...info } = useField('text');

	const history = useHistory();
	const handleSubmit = (e) => {
		e.preventDefault();
		props.addNew({
			content: content.value,
			author: author.value,
			info: info.value,
			votes: 0,
		});
		history.push('/');
	};

	const resetInputField = () => {
		resetContent();
		resetAuthor();
		resetInfo();
	};

	return (
		<div>
			<h2>create a new anecdote</h2>
			<form onSubmit={handleSubmit}>
				<div>
					content
					<input
						{...content}
						// name="content"
						// value={content}
						// onChange={(e) => setContent(e.target.value)}
					/>
				</div>
				<div>
					setAuthor
					<input
						{...author}
						// name="author"
						// value={author}
						// onChange={(e) => setAuthor(e.target.value)}
					/>
				</div>
				<div>
					url for more infor
					<input
						{...info}
						// name="info"
						// value={info}
						// onChange={(e) => setInfo(e.target.value)}
					/>
				</div>
				<button type="submit">create</button>
				<button type="button" onClick={resetInputField}>
					reset
				</button>
			</form>
		</div>
	);
};

export default CreateNew;
