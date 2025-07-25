import "../../pages/RecruitmentPage";

describe("CENÁRIO 5 - Adicionar candidato para recrutamento", () => {
  beforeEach(() => {
    cy.login("Admin", "admin123");
  });

  it("CT002 - Campos obrigatórios vazios", () => {
    cy.navegarCandidato();
    cy.get("button").contains("Save").click();

    // Lista de labels esperados para campos obrigatórios
    const requiredFieldLabels = ["Full Name", "Email"];

    // Para cada label, verificar se existe mensagem 'Required' associada
    requiredFieldLabels.forEach((labelText) => {
      cy.contains("label", labelText)
        .parents(".oxd-input-group")
        .within(() => {
          cy.get(".oxd-text").contains("Required").should("be.visible");
        });
    });
  });
});
