import "../../pages/RecruitmentPage"

describe('CENÁRIO 5 - Adicionar candidato para recrutamento', () => {
    beforeEach(() => {
      cy.login('Admin', 'admin123')
    })
  
    it('CT001 - Adicionar candidato com dados válidos', () => {
      cy.visit('/recruitment/viewCandidates')
      cy.url().should('include', 'recruitment/viewCandidates')
      cy.get('h5').should('contain.text', 'Candidates')
  
      cy.get('button').contains('Add').click()
      cy.url().should('include', '/recruitment/addCandidate')
      cy.adicionarCandidato()
      cy.get('button').contains('Save').click()
      //alternativa à mensagem de sucesso pois ela fica pouco tempo na tela para validar:
      cy.get('p').contains('Status: Application Initiated')
    })
  })
  