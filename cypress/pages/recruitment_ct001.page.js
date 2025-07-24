import { faker } from '@faker-js/faker';

Cypress.Commands.add('login', (user, password) => {
      cy.visit('/auth/login')
      cy.get('input[name="username"]').type(user)
      cy.get('input[name="password"]').type(password, { log: false })
      cy.get('button[type="submit"]').click()
  })
  
Cypress.Commands.add('navegarCandidato', () => {
      cy.url().should('include', '/dashboard/index')
      cy.contains('Recruitment').click()
      cy.url().should('include', '/recruitment/viewCandidates')
      cy.contains('Add').click()
      cy.url().should('include', '/recruitment/addCandidate')
  })


Cypress.Commands.add('preencherDados', () => {

      const firstName = faker.person.firstName(); 
      const lastName = faker.person.lastName(); 
         
      cy.get('input[name="firstName"').type(firstName)
      cy.get('input[name="lastName"').type(lastName)
      cy.contains('label', 'Email').parents('.oxd-input-group').find('input[placeholder="Type here"]').type('email.com')

  })
