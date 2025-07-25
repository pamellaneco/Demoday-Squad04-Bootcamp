//modelo de teste do projeto
import '../../pages/RecruitmentPage'

describe('Cenário 5 - Adicionar candidato para recrutamento', () => {
    beforeEach(() => {
      cy.login('Admin', 'admin123')
    })
  
    it('CT003 - Email recebendo dados inválidos', () => {
      //Navegar até a página do candidato
      cy.navegarCandidato()
      //Preencher os campos com os dados do candidato
      cy.preencherDados()
      //Verificar a mensagem de erro
      cy.contains('Expected format: admin@example.com').should('be.visible');
      cy.contains('button', 'Save').click()
      cy.url().should('include', '/recruitment/addCandidate')

    })
  })