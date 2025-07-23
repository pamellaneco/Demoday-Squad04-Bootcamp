import { faker } from '@faker-js/faker'

Cypress.Commands.add('adicionarCandidato', () => {
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()
  const email = faker.internet.email({ firstName, lastName })
  const phone = faker.phone.number('+55 (##) #####-####').replace(/[^+\d()/-]/g, '')

  cy.get('input[name="firstName"]').type(firstName)
  cy.get('input[name="middleName"]').type(faker.person.middleName())
  cy.get('input[name="lastName"]').type(lastName)
  cy.get('label').contains('Email').parents('.oxd-input-group').find('input').type(email)
  cy.get('label').contains('Contact Number').parents('.oxd-input-group').find('input').type(phone)

  cy.get('.oxd-select-text').first().click()
  cy.get('.oxd-select-dropdown > *').eq(1).click()

  cy.get('input[type="file"]').selectFile('cypress/fixtures/resume.pdf', { force: true })

  // Define data de ontem no formato yyyy-mm-dd
  const date = new Date()
  date.setDate(date.getDate() - 1)
  const formattedDate = date.toISOString().split('T')[0]

  cy.get('label')
    .contains('Date of Application')
    .parents('.oxd-input-group')
    .find('input')
    .clear()
    .type(formattedDate)

  cy.get('label').contains('Date of Application').parents('.oxd-input-group').click('topLeft')  
})
