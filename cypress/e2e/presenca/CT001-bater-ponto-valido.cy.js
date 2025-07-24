import "../../pages/TimePage"
import dayjs from 'dayjs'

describe('CENÁRIO 8 - CONFIRMAR PRESENÇA DIÁRIA (“BATER PONTO”)', () => {
  beforeEach(() => {
    cy.login('Admin', 'admin123')
    cy.navigateToPunch()
  })

  after(()=>{
    cy.removePunch(dataAtual, horaEntrada)
  })

  const dataAtual = dayjs().format('YYYY-DD-MM')
  const horaAtual = dayjs()
  const horaEntrada = horaAtual.clone().subtract(2, 'hour').format('hh:mm A')
  const horaSaida = horaAtual.format('hh:mm A')

  it('CT001 - Bater ponto com datas válidas', () => {
    // Punch In
    cy.typePunchIn(dataAtual, horaEntrada, '')
    cy.clickConfirmPunchIn()
  
    cy.wait(1000)
  
    // Punch Out
    cy.typePunchOut(dataAtual, horaSaida, 'Ponto de saída válido')
    cy.clickConfirmPunchOut()
  
    cy.wait(1000)

    cy.navigateToMyRecords()
  
    cy.reload()
  
    cy.get('p').contains(dataAtual, { timeout: 10000 }).should('exist')
    cy.url().should('include', '/attendance/viewMyAttendanceRecord')

    cy.contains(dataAtual).should('exist')
    cy.contains(horaEntrada).should('exist')
    cy.contains(horaSaida).should('exist')
  })
  
})
