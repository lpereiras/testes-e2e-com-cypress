it('successfully logs in', () => {
  const validEmailAddress = Cypress.env('USER_EMAIL')
  const password = Cypress.env('USER_PASSWORD')

  cy.intercept('GET', '**/notes').as('getNotes')

  cy.loginOnScratchApp(validEmailAddress, password)

  cy.wait('@getNotes', { timeout: 8000 })
  cy.contains('h1', 'Your Notes').should('be.visible')
})