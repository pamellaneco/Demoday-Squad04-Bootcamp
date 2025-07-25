//modelo de teste do projeto
import '../../pages/RecruitmentPage'

describe('Cenário 5 - Adicionar candidato para recrutamento', () => {
    beforeEach(() => {
      cy.login('Admin', 'admin123')
    })
  
    it('CT009 - Campo Resume recebendo arquivo que excede o tamanho permitido', () => {
      //Navegar até a página do candidato
      cy.navegarCandidato()
      //Preencher os campos obrigatórios com os dados do candidato
      cy.preencher_campoObrigatório()

      cy.anexar_arquivoInválido()
      cy.get('.oxd-input-group > .oxd-text')
          .should('have.text', 'Attachment Size Exceeded')

      cy.get('button[type="submit"]').click()

      //Cadastro não deve ser aceito e a página é mantida
      cy.url().should('include', '/recruitment/addCandidate')
    })
  })