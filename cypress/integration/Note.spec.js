describe('Note app', function () {
	beforeEach(function () {
		cy.request('POST', 'http://localhost:3000/api/testing/reset');
		const user = {
			name: 'James Milner',
			username: 'james45',
			password: 'ruth101',
		};
		cy.request('POST', '/api/users', user);
		cy.visit('/');
	});
	it('front page can be opened', function () {
		cy.contains('Notes');
		cy.contains(
			'Note app, Department of Computer Science, University o Helsinki 2021'
		);
	});
	it('user can login with good credentials', function () {
		cy.contains('login').click();
		cy.get('#Username').type('james45');
		cy.get('#Password').type('ruth101');
		cy.get('#login-button').click();

		cy.contains('James Milner logged-in');
	});
	it('login fails with wrong password', function () {
		cy.contains('login').click();
		cy.get('#Username').type('james45');
		cy.get('#Password').type('wrong');
		cy.get('#login-button').click();

		cy.get('.error')
			.should('contain', 'wrong credentials')
			.and('have.class', 'color', 'rgb(255,0,0)')
			.and('have.class', 'border-style', 'solid');

		cy.get('html').should('not.contain', 'James Milner logged-in');
	});

	describe('when logged in', function () {
		beforeEach(function () {
			cy.login({ username: 'james45', password: 'ruth101' });
		});
		it('a new note can be created', function () {
			cy.contains('new note').click();
			cy.get('input').type('a note created by cypress');
			cy.contains('save').click();
			cy.contains('a note created by cypress');
		});
		describe('and a note exists', function () {
			describe('and several notes exists', function () {
				beforeEach(function () {
					cy.createNote({
						content: 'first note',
						important: false,
					});
					cy.createNote({
						content: 'second note',
						important: false,
					});
					cy.createNote({
						content: 'third note',
						important: false,
					});

					it('one of those can be made important', function () {
						cy.contains('second note').parent().find('button').as('theButton');
						cy.get('@theButton').click();
						cy.get('@theButton').should('contain', 'make not important');
					});
				});
			});
		});
	});
});
