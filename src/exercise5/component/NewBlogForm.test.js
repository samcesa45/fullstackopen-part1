import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import NewBlogForm from './NewBlogForm';

test('<NewBlogForm/>', () => {
	const createBlog = jest.fn();

	const component = render(<NewBlogForm createBlog={createBlog} />);

	const input = component.container.querySelector('#author');
	const form = component.container.querySelector('form');

	fireEvent.change(input, {
		target: { value: 'testing new blog form' },
	});

	fireEvent.submit(form);
});
