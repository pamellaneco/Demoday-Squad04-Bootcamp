import "../../pages/TimePage";
import dayjs from "dayjs";

describe("CENÁRIO 8 - CONFIRMAR PRESENÇA DIÁRIA (“BATER PONTO”)", () => {
  beforeEach(() => {
    cy.login("Admin", "admin123");
    cy.navigateToPunch();
  });

  after(() => {
    cy.removePunch(currentDate, currentTime);
  });

  const currentDate = dayjs().format("YYYY-DD-MM");
  const currentTime = dayjs().format("hh:mm A");
  const pastTime = dayjs().subtract(2, "hour").format("hh:mm A");

  it("CT003 - Bater ponto com horário de “Punch out” anterior a “Punch in”", () => {
    cy.typePunchIn(currentDate, currentTime, "Ponto de entrada válido");
    cy.clickConfirmPunchIn();

    cy.typePunchOut(
      currentDate,
      pastTime,
      "Ponto de saída inválido (horário anterior a entrada)"
    );
    cy.clickConfirmPunchOut();

    cy.get(".oxd-input-group")
      .filter((index, el) => {
        return Cypress.$(el).find("label").text().includes("Time");
      })
      .should(
        "contain.text",
        "Punch out Time Should Be Later Than Punch in Time"
      );
  });
});
