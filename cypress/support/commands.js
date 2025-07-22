Cypress.Commands.add('login', (user, password) => {
    cy.visit('/auth/login')
    cy.get('input[name="username"]').type(user)
    cy.get('input[name="password"]').type(password, { log: false })
    cy.get('button[type="submit"]').click()
  })
  
