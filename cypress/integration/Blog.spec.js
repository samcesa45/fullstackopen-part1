describe('Blog app', function () {
	beforeEach(function () {
		// cy.request('POST', 'http://localhost:5000/api/testing/reset');
		cy.visit('http://localhost:3000');
	});
	it('Login form is shown', function () {
		cy.get('#submit').click();
		cy.get('#Username').type('sam45');
		cy.get('#Password').type('password101');
		cy.get('#submit').click();

		cy.contains('alexander mcqueen has logged in');
	});

	describe('Login', function () {
		it('succeeds with correct credentials', function () {
			cy.get('#submit').click();
			cy.get('#Username').type('sam45');
			cy.get('#Password').type('password101');
			cy.get('#submit').click();
			cy.contains('alexander mcqueen has logged in');
		});
		it('fails with wrong credentials', function () {
			cy.get('#submit').click();
			cy.get('#Username').type('sam45');
			cy.get('#Password').type('wrong');

			cy.get('.error').should('contain', 'wrong username or password');
			// .and('have.class', 'color', 'rgba(255,0,0)')
			// .and('have.class', 'border-style', 'solid');

			cy.get('html').should('not.contain', 'alexander mcqueen has logged in');
		});

		describe('When logged in', function () {
			beforeEach(function () {
				cy.loginBlog({ username: 'sam45', password: 'password101' });
			});
			it('A blog can be created', function () {
				cy.contains('new note').click();
				cy.get('#title').type('new blog from cypress');
				cy.get('#author').type('alexander mcqueen');
				cy.get('#url').type('https://alex.com');
				cy.get('#likes').type('3');

				cy.get('#create').click();
			});

			describe('user can like a blog', function () {
				beforeEach(function () {
					cy.createBlog({
						title: 'Cypress is cool',
						author: 'Cypress',
						url: 'https://www.cypress.io',
					});
				});
				it('A user can like a blog', function () {
					cy.contains('view').parent().find('button').click({ force: true });
					cy.get('.like').should('contain', 0);
					cy.get('#pressedLike').click({ force: true });
					cy.get('.like').should('contain', 1);
				});
				it('A user who created the blog can delete it', function () {
					cy.contains('view').parent().find('button').click({ force: true });
					cy.contains('Cypress is cool');
					cy.contains('delete').click({ force: true });

					cy.get('html').should('not.contain', 'Cypress is cool');
					// cy.contains('Cypress is cool').should('not.exist');
				});
			});
			describe('and multiple blogs exists', function () {
				beforeEach(function () {
					cy.createBlog({
						title: 'Cypress is the best e2e tool',
						author: 'cypress doc',
						url: 'https://www.cypress.io',
						likes: 15,
					});
					cy.createBlog({
						title: 'Second blog created ',
						author: 'cypress doc',
						url: 'https://www.cypress.io',
						likes: 0,
					});
					cy.createBlog({
						title: 'Third blog created',
						author: 'cypress doc',
						url: 'https://www.cypress.io',
						likes: 2,
					});
				});
				it.only('Blog are ordered based on the number of likes, in descending order(from most likes to least likes)', function () {
					cy.get('[data-cy="blog"]').then(($blog) => {
						expect($blog).to.have.length(3);

						for (let i = 0; i < $blog.length; i++) {
							if (i < $blog.length - 1) {
								expect(
									Number($blog.find('[data-cy="likes"]')[i].innerText)
								).to.be.least(
									Number($blog.find('[data-cy="likes"]')[i + 1].innerText)
								);
							} else {
								expect(
									Number($blog.find('[data-cy="likes"]')[i].innerText)
								).to.be.most(
									Number($blog.find('[data-cy="likes"]')[0].innerText)
								);
							}
						}
					});
				});
			});
		});
	});
});
