
it('successfully signs up using confirmation code sent via email', () => {
  const faker = require('faker')
  const emailAddress = `${faker.datatype.uuid()}@${Cypress.env('MAILOSAUR_SERVER_ID')}.mailosaur.net`

  cy.intercept('GET', '**/notes').as('getNotes')

  cy.fillSignupFormAndSubmit(emailAddress)

  cy.mailosaurGetMessage(Cypress.env('MAILOSAUR_SERVER_ID'), {
    sentTo: emailAddress
  }).then(message => {
    const confirmationCode = message.html.body.match(/\d{6}/)[0] //esse comando, sendo uma regexp pega somente os 6 digitos do codigo enviados ao email, e nao todo o corpo
    cy.get('#confirmationCode').type(`${confirmationCode}{enter}`)

    cy.wait('@getNotes', { timeout: 8000 })
    cy.contains('h1', 'Your Notes').should('be.visible')
  })
})