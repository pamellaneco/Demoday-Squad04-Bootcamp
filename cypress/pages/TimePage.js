Cypress.Commands.add("navigateToPunch", () => {
  cy.visit("/time/viewEmployeeTimesheet");
  cy.get("li").contains("Attendance").click();
  cy.get("li").contains("Punch In/Out").click();
  cy.contains("h6", "Punch").should("be.visible");
  
});

Cypress.Commands.add("typePunch", (date, time, note = "") => {
  cy.get(".oxd-date-input input").as("dateInput").should("exist");

  cy.wait(500); // aguarda renderização, se necessário

  cy.get("@dateInput").clear().type(date);

  cy.get(".oxd-time-input input").as("timeInput").should("exist");

  cy.wait(200); // pequeno buffer para estabilidade

  cy.get("@timeInput").clear().type(time);

  if (note) {
    // aguarda o seletor AM/PM desaparecer para garantir que o textarea esteja livre
    cy.get('h6').contains("Punch").click()  
    // só então escreve no campo de nota
    cy.get('.oxd-textarea').should('exist').type(note);
  }
  
});

Cypress.Commands.add("typePunchIn", (date, time, note) => {
  cy.get("h6").should("contain.text", "Punch In");
  cy.typePunch(date, time, note);
});

Cypress.Commands.add("typePunchOut", (date, time, note) => {
  cy.get("h6").should("contain.text", "Punch Out");
  cy.typePunch(date, time, note);
});

Cypress.Commands.add("clickConfirmPunchIn", () => {
  cy.get(".oxd-form-actions button").contains("In").click();
});

Cypress.Commands.add("clickConfirmPunchOut", () => {
  cy.get(".oxd-form-actions button").contains("Out").click();
});

Cypress.Commands.add('navigateToMyRecords', () => {
  cy.visit('/attendance/viewMyAttendanceRecord')
  cy.get('nav').contains('Time').click()
  cy.get('li').contains('Attendance').click()
  cy.get('a').contains('My Records').click()
});

Cypress.Commands.add("removePunch", (punchDate, punchTime) => {
  cy.navigateToMyRecords()

  cy.get(".oxd-table-body .oxd-table-row").each(($row, index, $rows) => {
    const rowText = $row.text();

    cy.log(`Verificando linha ${index}:`, rowText);

    if (rowText.includes(punchDate) && rowText.includes(punchTime)) {
      cy.log("🔍 Linha correspondente encontrada!");

      cy.wrap($row)
        .find("button i.bi-trash")
        .should("exist")
        .click({ force: true });

      cy.get("button").contains("Yes, Delete").click({ force: true });

      // Interrompe o loop
      return false;
    }
  });
});