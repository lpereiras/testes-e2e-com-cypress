Cypress.Commands.add('fillSignupFormAndSubmit', (emailAddress, password) => {
  cy.visit('/signup')
  cy.get('#email').type(emailAddress)
  cy.get('#password').type(password, { log: false })
  cy.get('#confirmPassword').type(password, { log: false })
  cy.contains('button', 'Signup').click()
  cy.get('#confirmationCode').should('be.visible')

})