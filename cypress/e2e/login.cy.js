describe('login page', () => {
  it('should be to visit a log in page, sign in, and be taken to see the dashboard', () => {
    cy.visit('https://to-do-guru-ui.vercel.app/')
    cy.get('input').type("travis@gmail.com")
    cy.get('input').should("have.value", "travis@gmail.com")
    cy.get('.login-btn').click()
    cy.url("https://to-do-guru-ui.vercel.app/dashboard")
  })
})