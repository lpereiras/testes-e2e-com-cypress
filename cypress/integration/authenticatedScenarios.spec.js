describe('cenarios where authentication is a pre-requirement', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/notes').as('getNotes')
    cy.intercept('GET', '**/notes**').as('getNote')
    cy.loginOnScratchApp()
  })

  it('CRUDs a note', () => {
    const faker = require('faker')
    const noteDescription = faker.lorem.words(4)
    const updatedDescription = faker.lorem.words(5)
    let attachFile = false

    cy.createNote(noteDescription)
    cy.wait('@getNotes')

    cy.editNote(noteDescription, updatedDescription, attachFile)
    cy.wait('@getNotes')

    cy.deleteNote(noteDescription, updatedDescription)
    cy.wait('@getNotes')
    cy.contains('.list-group-item', noteDescription).should('not.exist')
  })

  it('successfully submits the form', () => {
    cy.intercept('POST', '**/prod/billing').as('paymentRequest')

    cy.fillSettingsFormAndSubmit()

    cy.wait('@getNotes', { timeout: 8000 })
    cy.wait('@paymentRequest').then(response => {
      expect(response.state).to.equal('Complete')
    })
  })
})