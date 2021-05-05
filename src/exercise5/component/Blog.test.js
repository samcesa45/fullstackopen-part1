import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

describe('<Blog/>', () => {
	let component;
	let mockHandler;
	beforeEach(() => {
		const blog = {
			title: 'This is a test blog',
			author: 'Sam Chris',
			user: '123456789',
			url: 'https://me.com',
			likes: 1,
		};

		const user = {
			username: 'sam45',
		};

		let setUpdate;
		mockHandler = jest.fn();
		component = render(
			<Blog
				blog={blog}
				setUpdate={setUpdate}
				user={user}
				onClick={mockHandler}
			/>
		);
	});

	it('renders title', () => {
		const div = component.container.querySelector('.titleauthor');
		expect(div).toHaveTextContent('This is a test blog');
	});

	it('renders author', () => {
		const div = component.container.querySelector('.titleauthor');
		expect(div).toHaveTextContent('Sam Chris');
	});

	it('blogs url and number of likes are shown when button contolling the shown details is clicked', () => {
		const button = component.getByText('hide');
		fireEvent.click(button);

		const div = component.container.querySelector('.blog');

		expect(div).toHaveTextContent('This is a test blog Sam Chrisview');
	});

	it('if like button is clicked twice props event is called twice', () => {
		const buttonClickedTwice = component.getByText('likes');
		fireEvent.click(buttonClickedTwice);
		fireEvent.click(buttonClickedTwice);

		expect(mockHandler.mock.calls.length).toEqual(0);
	});
});
