describe('dashboard', () => {
  beforeEach(()=> {
    cy.visit('https://to-do-guru-ui.vercel.app/dashboard')
  })

  it.skip('should show a header and the days of the week', () => {
    cy.get('h1').contains("Turing Fam's Chore Schedule")
    cy.get('.Monday').contains('Monday')
    cy.get('.Tuesday').contains('Tuesday')
    cy.get('.Wednesday').contains('Wednesday')
    cy.get('.Thursday').contains('Thursday')
    cy.get('.Friday').contains('Friday')
    cy.get('.Saturday').contains('Saturday')
    cy.get('.Sunday').contains('Sunday')
  })

  it.skip('should show the chores for the day that is clicked. Each chore should have the chore doer, name of chore and duration for chore', () => {
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
  it.skip('should show a message if no chores are given for the day', () => {
    cy.get('.Tuesday').click()
    cy.get('.day-off').contains("You have the day off, no chores today!")
  })

  it.skip('should allow a user to log out and go back to the login page', () => {
    cy.get('.active > .nav-btn').click()
    cy.url().should('eq', "https://to-do-guru-ui.vercel.app/")
  })

  it.skip('should show allow a user to edit the household by bringing them back the household form page', () => {
    cy.get('[href="/houseform"] > .nav-btn').click()
    cy.url().should('eq', "https://to-do-guru-ui.vercel.app/houseform")
  })

  it.skip('should show allow a user to edit the chores by bringing them back the chore form page', () => {
    cy.get('[href="/choreform"] > .nav-btn').click()
    cy.url().should('eq', "https://to-do-guru-ui.vercel.app/choreform")
  })

  it.skip('should allow a user to randomize the chore schedule', () => {
    cy.get('nav > :nth-child(2)').click()
    //add to this when we hook up the functionality to randomize the schedule
  })
  
})