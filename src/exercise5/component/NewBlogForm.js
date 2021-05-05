import React, { useState } from 'react';
const NewBlogForm = ({ createBlog }) => {
	const [newBlog, setNewBlog] = useState({
		title: '',
		author: '',
		url: '',
		likes: '',
	});
	const handleChange = (event) => {
		const { value, name } = event.target;
		setNewBlog({
			...newBlog,
			[name]: value,
		});
	};
	const addBlog = (event) => {
		event.preventDefault();
		createBlog({
			title: newBlog.title,
			author: newBlog.author,
			url: newBlog.url,
			likes: newBlog.likes,
		});
		setNewBlog({
			title: '',
			author: '',
			url: '',
			likes: '',
		});
	};

	return (
		<div className="formDiv">
			<form onSubmit={addBlog}>
				<h2>create new blog</h2>
				<div>
					<div>
						title:
						<input
							name="title"
							id="title"
							value={newBlog.title}
							onChange={handleChange}
						/>
					</div>
					author:
					<input
						name="author"
						id="author"
						value={newBlog.author}
						onChange={handleChange}
					/>
					<div>
						url:
						<input
							name="url"
							id="url"
							value={newBlog.url}
							onChange={handleChange}
						/>
					</div>
					<div>
						likes:
						<input
							name="likes"
							id="likes"
							value={newBlog.likes}
							onChange={handleChange}
						/>
					</div>
				</div>
				<button type="submit" id="create">
					create
				</button>
			</form>
		</div>
	);
};

export default NewBlogForm;
