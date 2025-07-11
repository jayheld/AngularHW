describe('Basic Application Test', () => {
  it('should load the application', () => {
    cy.visit('http://localhost:59949')
    cy.get('h1').should('contain.text', 'Hello World Angular App')
    cy.get('p').should('contain.text', 'Current Date:')
  })

  it('should display users from API', () => {
    cy.visit('http://localhost:59949')
    cy.get('ul li').should('have.length.greaterThan', 0)
  })

  it('should have a working form', () => {
    cy.visit('http://localhost:59949')
    cy.get('#name').should('be.visible')
    cy.get('#email').should('be.visible')
    cy.get('#role').should('be.visible')
    cy.get('button[type="submit"]').should('be.visible')
  })
}) 