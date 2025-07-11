// Custom commands for testing the User Management application

// Command to reset the database to initial state
Cypress.Commands.add('resetDatabase', () => {
  cy.request('POST', 'http://localhost:3000/reset').then(() => {
    // Wait for reset to complete
    cy.wait(500);
  });
});

// Command to create a test user
Cypress.Commands.add('createTestUser', (userData) => {
  cy.request('POST', 'http://localhost:3000/users', userData);
});

// Command to fill user form
Cypress.Commands.add('fillUserForm', (userData) => {
  cy.get('#name').clear().type(userData.name);
  cy.get('#email').clear().type(userData.email);
  cy.get('#role').clear().type(userData.role);
});

// Command to verify user in list
Cypress.Commands.add('verifyUserInList', (userData) => {
  cy.get('ul li').should('contain.text', userData.name);
  cy.get('ul li').should('contain.text', userData.email);
  cy.get('ul li').should('contain.text', userData.role);
});

// Command to check if form is empty
Cypress.Commands.add('verifyFormIsEmpty', () => {
  cy.get('#name').should('have.value', '');
  cy.get('#email').should('have.value', '');
  cy.get('#role').should('have.value', '');
});

// Command to wait for API response
Cypress.Commands.add('waitForApiResponse', (timeout = 5000) => {
  cy.wait(timeout);
});

// Command to intercept API calls
Cypress.Commands.add('interceptUserApi', () => {
  cy.intercept('GET', '/users', { fixture: 'users.json' }).as('getUsers');
  cy.intercept('POST', '/users', { statusCode: 201 }).as('createUser');
  cy.intercept('PUT', '/users/*', { statusCode: 200 }).as('updateUser');
  cy.intercept('DELETE', '/users/*', { statusCode: 200 }).as('deleteUser');
});

// Command to handle window alerts
Cypress.Commands.add('handleAlert', (expectedMessage) => {
  cy.window().then((win) => {
    cy.stub(win, 'alert').as('windowAlert');
  });
  
  if (expectedMessage) {
    cy.get('@windowAlert').should('have.been.calledWith', expectedMessage);
  }
});

// Command to verify page load
Cypress.Commands.add('verifyPageLoad', () => {
  cy.get('h1').should('be.visible');
  cy.get('p').contains('Current Date:').should('be.visible');
});

// Command to verify API health
Cypress.Commands.add('verifyApiHealth', () => {
  cy.request('GET', 'http://localhost:3000/users').should((response) => {
    expect(response.status).to.eq(200);
  });
}); 