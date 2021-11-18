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
  const loginOnScratchApp = () => {
    cy.visit('/login')
    cy.get('#email').type(validEmailAddress)
    cy.get('#password').type(password, { log: false })
    cy.contains('button', 'Login').click()
    cy.contains('h1', 'Your Notes', { timeout: 8000 }).should('be.visible')
  }

  if (cacheSession) {
    cy.session([validEmailAddress, password], loginOnScratchApp)
  } else {
    loginOnScratchApp()
  }
})

Cypress.Commands.add('createNote', (noteDescription, attachFile = false) => {
  cy.visit('/notes/new')
  cy.get('#content').type(noteDescription)

  if (attachFile) {
    cy.get('#file').attachFile('example.json')
  }
  cy.contains('button', 'Create').click()
})

Cypress.Commands.add('editNote', (noteDescription, updatedDescription, attachFile ) => {
  cy.contains('.list-group-item', noteDescription)
    .should('be.visible')
    .click()
  cy.wait('@getNote')

  cy.get('#content')
    .clear()
    .type(updatedDescription)

  attachFile = true

  if (attachFile) {
    cy.get('#file').attachFile('example.json')
  }
  cy.contains('button', 'Save').click()
})

Cypress.Commands.add('deleteNote', (noteDescription, updatedDescription) => {
  cy.contains('.list-group-item', noteDescription).should('not.exist')
  cy.contains('.list-group-item', updatedDescription)
    .should('be.visible')
    .click()
  cy.wait('@getNote')
  cy.contains('button', 'Delete').click()
})