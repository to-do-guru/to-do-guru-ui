describe('dashboard', () => {
  beforeEach(()=> {
    cy.visit('https://to-do-guru-ui.vercel.app/dashboard')
  })

  it('should show a header and the days of the week', () => {
    cy.get('h1').contains("Turing Fam's Chore Schedule")
    cy.get('.Monday').contains('Monday')
    cy.get('.Tuesday').contains('Tuesday')
    cy.get('.Wednesday').contains('Wednesday')
    cy.get('.Thursday').contains('Thursday')
    cy.get('.Friday').contains('Friday')
    cy.get('.Saturday').contains('Saturday')
    cy.get('.Sunday').contains('Sunday')
  })

  