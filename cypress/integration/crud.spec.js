it('CRUDs a note', () => {
  // const faker = require('faker')
  // const noteDescription = faker.lorem.words(4)

  cy.intercept('GET', '**/notes').as('getNotes')
  cy.intercept('GET', '**/notes**').as('getNote')
  cy.loginOnScratchApp()

  cy.visit('/notes/new')

})