// Import commands.js using ES2015 syntax:
import './commands'

// Add global configuration
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false
})

// Before each test
beforeEach(() => {
  // Set viewport size
  cy.viewport(1280, 720)
}) 