//modelo de teste do projeto
describe('Dashboard', () => {
    beforeEach(() => {
      cy.login('Admin', 'admin123')
    })
  
    it('deve exibir o dashboard após login', () => {
      cy.url().should('include', '/dashboard/index')
      cy.get('h6').should('contain.text', 'Dashboard')
    })
  })
  