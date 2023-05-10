describe('template spec', () => {
  it('submits a name for the household', () => {
    cy.visit('http://localhost:3000')
    cy.get("input").type("Baum Household").should("have.value", "Baum Household")
  })
})