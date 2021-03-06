Cypress.Commands.add('login', ({ username, password }) => {
	cy.request('POST', 'http://localhost:4001/api/login', {
		username,
		password,
	}).then(({ body }) => {
		localStorage.setItem('loggedNoteappUser', JSON.stringify(body));
		cy.visit('http://localhost:3003');
	});
});

Cypress.Commands.add('createNote', ({ content, important }) => {
	cy.request({
		url: 'http://localhost:4001/api/notes',
		method: 'POST',
		body: { content, important },
		headers: {
			Authorization: `bearer ${JSON.parse(
				localStorage.getItem('loggedNoteappUser').token
			)}`,
		},
	});
	cy.visit('http://localhost:3003');
});

Cypress.Commands.add('loginBlog', ({ username, password }) => {
	cy.request('POST', 'http://localhost:5000/api/login', {
		username,
		password,
	}).then(({ body }) => {
		localStorage.setItem('loggedBlogUser', JSON.stringify(body));
		cy.visit('http://localhost:3000');
	});
});

Cypress.Commands.add('createBlog', ({ title, author, url, likes = 0 }) => {
	cy.request({
		url: 'http://localhost:5000/api/blogs',
		method: 'POST',
		body: { title, author, url, likes },

		headers: {
			Authorization: `bearer ${
				JSON.parse(localStorage.getItem('loggedBlogUser')).token
			}`,
		},
	});
	cy.visit('http://localhost:3000');
});
