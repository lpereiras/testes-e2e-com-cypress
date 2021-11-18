//const { update } = require('cypress/types/lodash')

it('CRUDs a note', () => {
  const faker = require('faker')
  const noteDescription = faker.lorem.words(4)
  const updatedDescription = faker.lorem.words(5)
  let attachFile = false

  cy.intercept('GET', '**/notes').as('getNotes')
  cy.intercept('GET', '**/notes**').as('getNote')
  cy.loginOnScratchApp()

  cy.createNote(noteDescription)
  cy.wait('@getNotes')

  cy.editNote(noteDescription, updatedDescription, attachFile)
  cy.wait('@getNotes')

  cy.deleteNote(noteDescription, updatedDescription)
  cy.wait('@getNotes')
  cy.contains('.list-group-item', noteDescription).should('not.exist')
})