import React, { useState } from 'react';
import { blogService } from '../service/blog';

const blogStyle = {
	paddingTop: 10,
	paddingLeft: 2,
	border: 'solid',
	borderWidth: 1,
	marginBottom: 5,
};

const Blog = ({ blog, setUpdate, user }) => {
	const [visible, setVisible] = useState(false);

	const hideWhenVisible = { display: visible ? '' : 'none' };
	const showWhenVisible = { display: visible ? 'none' : '' };

	const toggleVisibility = () => setVisible(!visible);

	const increaseLikes = async (event) => {
		event.preventDefault();
		const likes = blog.likes + 1;
		const newBlog = { ...blog, likes };
		await blogService.update(blog.id, newBlog);
		setUpdate(Math.floor(Math.random() * 100));
	};

	const deleteBlog = async (event) => {
		event.preventDefault();
		if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
			blogService.setToken(user.token);
			await blogService.remove(blog.id, user.token);
			setUpdate(Math.floor(Math.random() * 100));
		}
	};

	return (
		<div style={blogStyle}>
			<div style={showWhenVisible} className="blog" data-cy="blog">
				{blog.title} {blog.author}
				<button onClick={toggleVisibility} id="btn">
					view
				</button>
			</div>
			<div style={hideWhenVisible} className="titleauthor">
				<button onClick={toggleVisibility}>hide</button>
				{blog.title} {blog.author}
				<div>{blog.url}</div>
				<div onClick={increaseLikes} className="like" data-cy="likes">
					{blog.likes}
					<button type="submit" id="pressedLike">
						likes
					</button>
				</div>
				<div onClick={deleteBlog}>
					<button type="submit">delete</button>
				</div>
			</div>
		</div>
	);
};

export default Blog;
