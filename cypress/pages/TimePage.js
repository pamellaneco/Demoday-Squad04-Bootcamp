Cypress.Commands.add("navigateToPunch", () => {
  cy.visit("/time/viewEmployeeTimesheet");
  cy.get("li").contains("Attendance").click();
  cy.get("li").contains("Punch In/Out").click();
  cy.contains("h6", "Punch In").should("be.visible");
});

Cypress.Commands.add("typePunch", (date, time, note = "") => {
  cy.get(".oxd-date-input input").as("dateInput").should("exist");

  cy.wait(500); // aguarda renderização, se necessário

  cy.get("@dateInput").clear().type(date);

  cy.get(".oxd-time-input input").as("timeInput").should("exist");

  cy.wait(200); // pequeno buffer para estabilidade

  cy.get("@timeInput").clear().type(time);

  if (note) {
    cy.get(".oxd-textarea").should("exist").type(note);
  }
});

Cypress.Commands.add("clickConfirmPunchIn", () => {
  cy.get(".oxd-form-actions button").contains("In").click();
});

Cypress.Commands.add("clickConfirmPunchOut", () => {
  cy.get(".oxd-form-actions button").contains("Out").click();
});
