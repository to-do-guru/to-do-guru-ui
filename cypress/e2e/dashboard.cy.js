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

  it('should show the chores for the day that is clicked. Each chore should have the chore doer, name of chore and duration for chore', () => {
    cy.get('.Wednesday').click()
    cy.get(".chore-card").should("have.length", "1")
    cy.get('.chore-container > :nth-child(1)').contains("Steve's Chore")
    cy.get('.chore-container > :nth-child(1)').contains("Wash Dishes")
    cy.get('.chore-container > :nth-child(1)').contains("30 minutes")
    cy.get('.Saturday').click()
    cy.get(".chore-card").should("have.length", "2")
    cy.get('.chore-container > :nth-child(1)').contains("Jenny's Chore")
    cy.get('.chore-container > :nth-child(1)').contains("Take Out Trash")
    cy.get('.chore-container > :nth-child(1)').contains("15 minutes")
    cy.get('.chore-container > :nth-child(2)').contains("Steve's Chore")
    cy.get('.chore-container > :nth-child(2)').contains("Mow Lawn")
    cy.get('.chore-container > :nth-child(2)').contains("120 minutes")
  })

  
})