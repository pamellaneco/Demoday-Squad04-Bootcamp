import "../../pages/TimePage";
import dayjs from "dayjs";

describe("CENÁRIO 8 - CONFIRMAR PRESENÇA DIÁRIA (“BATER PONTO”)", () => {
  beforeEach(() => {
    cy.login("Admin", "admin123");
    cy.navigateToPunch();
  });

  after(() => {
    cy.removePunch(currentDate, timePunchIn1);
  });

  const currentDate = dayjs().format("YYYY-DD-MM");
  const currentTime = dayjs().format("hh:mm A");
  const timePunchIn1 = dayjs().subtract(6, "hour").format("hh:mm A");
  const timePunchIn2 = dayjs().subtract(4, "hour").format("hh:mm A");

  it("CT005 - Bater ponto mais de uma vez no mesmo dia com horários conflitantes", () => {
    // Entrada 1
    cy.typePunchIn(currentDate, timePunchIn1);
    cy.clickConfirmPunchIn();

    cy.typePunchOut(currentDate, currentTime);
    cy.clickConfirmPunchOut();

    cy.wait(200)

    // Entrada 2
    cy.typePunchIn(currentDate, timePunchIn2);
    cy.clickConfirmPunchIn();

    // Validação da mensagem de erro no Punch In da entrada 2
    cy.get(".oxd-input-group")
      .filter((index, el) => {
        return Cypress.$(el).find("label").text().includes("Time");
      })
      .should("contain.text", "Overlapping Records Found");
  });
});
