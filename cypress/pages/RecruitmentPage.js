import { faker } from '@faker-js/faker'


//Adicionar candidato com dados válidos
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

//Comando para preencher com email inválido
Cypress.Commands.add('preencherDados', () => {

      const firstName = faker.person.firstName(); 
      const lastName = faker.person.lastName(); 
         
      cy.get('input[name="firstName"').type(firstName)
      cy.get('input[name="lastName"').type(lastName)
      cy.contains('label', 'Email')
        .parents('.oxd-input-group')
        .find('input[placeholder="Type here"]')
        .type('email.com')

  })

//Comando para logar na plataforma com adm
Cypress.Commands.add('login', (user, password) => {
  cy.visit('/auth/login')
  cy.get('input[name="username"]').type(user)
  cy.get('input[name="password"]').type(password, { log: false })
  cy.get('button[type="submit"]').click()
  })
 
 
//Comando navegar até a página "Adicionar candidato" 
Cypress.Commands.add('navegarCandidato', () => {
  cy.url().should('include', '/dashboard/index')
  cy.contains('Recruitment').click()
  cy.url().should('include', '/recruitment/viewCandidates')
  cy.contains('Add').click()
  cy.url().should('include', '/recruitment/addCandidate')
  })

//Comando para preencher somente os campos obrigatórios
Cypress.Commands.add('preencher_campoObrigatório', () => {

  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()
  const email =  faker.internet.email ({
    firstName: firstName.toLowerCase(), 
    lastName: lastName.toLowerCase()
      })

  cy.get('input[name="firstName"').type(firstName)
  cy.get('input[name="lastName"').type(lastName)
  cy.contains('label', 'Email')
      .parents('.oxd-input-group')
        .find('input[placeholder="Type here"]')
         .type(email)
})

//Comando para anexar arquivo grande sendo ele inválido
Cypress.Commands.add('anexar_arquivoInválido', () => {
  cy.contains('label', 'Resume')
  cy.get('.orangehrm-file-input')
      .find('.oxd-file-div')
        .click()
  cy.get('input[type="file"]')
      .selectFile('cypress/fixtures/curriculo.pdf', {force:true})
})
