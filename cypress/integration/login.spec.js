it('successfully logs in', () => {
  cy.intercept('GET', '**/notes').as('getNotes')

  cy.loginOnScratchApp(
    Cypress.env('USER_EMAIL'),
    Cypress.env('USER_PASSWORD'),
    { cacheSession: false }
  )
  cy.wait('@getNotes', { timeout: 8000 })
})