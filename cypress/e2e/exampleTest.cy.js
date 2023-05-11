describe('template spec', () => {
  it('submits a name for the household', () => {
    cy.visit('https://to-do-guru-ui.vercel.app/')
    cy.get("input").type("Baum Household").should("have.value", "Baum Household")
  })
})