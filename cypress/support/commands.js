Cypress.Commands.add('fillSignupFormAndSubmit', (
  emailAddress,
  password = Cypress.env('USER_PASSWORD')
) => {

  cy.visit('/signup')
  cy.get('#email').type(emailAddress)
  cy.get('#password').type(password, { log: false })
  cy.get('#confirmPassword').type(password, { log: false })
  cy.contains('button', 'Signup').click()
  cy.get('#confirmationCode').should('be.visible')
})

Cypress.Commands.add('loginOnScratchApp', (
  validEmailAddress = Cypress.env('USER_EMAIL'),
  password = Cypress.env('USER_PASSWORD'),
  { cacheSession = true } = {}
) => {

  const login = () => {
    cy.visit('/login')
    cy.get('#email').type(validEmailAddress, { log: false })
    cy.get('#password').type(password, { log: false })
    cy.contains('button', 'Login').click()
    cy.contains('h1', 'Your Notes', { timeout: 6000 }).should('be.visible')
  }
  if (cacheSession) {
    cy.session([validEmailAddress, password], login)
  } else {
    login()
  }
})
