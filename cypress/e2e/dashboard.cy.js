import { aliasOperation } from "../utils/utilityfunctions.cy";

describe('dashboard', () => {
  beforeEach('', () => {
    cy.intercept('https://salty-tundra-49252.herokuapp.com/graphql', (req) => {
      aliasOperation(req, 'getHousehold', {
        "data": {
          "household": {
            "members": [{
              "name": "Jane Doe",
              "id": 1
            }],
            "chores": [{
              "choreName": "Sweeping"
            }],
            "id": 1,
            "name": "Example House",
            "sunday": null,
            "monday": [
              {
                "choreName": "Sweeping",
                "assignedMember": "Jane Doe",
                "duration": 30
              }
            ],
            "tuesday": null,
            "wednesday": null,
            "thursday": null,
            "friday": null,
            "saturday": null
          }
        }
      });
    })
    cy.visit('https://to-do-guru-ui.vercel.app/dashboard') 
  })

  it('should show a header and the days of the week', () => {
    cy.get('h1').contains("Example House Chore Schedule")
    cy.get('.monday').contains('monday')
    cy.get('.tuesday').contains('tuesday')
    cy.get('.wednesday').contains('wednesday')
    cy.get('.thursday').contains('thursday')
    cy.get('.friday').contains('friday')
    cy.get('.saturday').contains('saturday')
    cy.get('.sunday').contains('sunday')
  })

  it('should show the chores for the day that is clicked. Each chore should have the chore doer, name of chore and duration for chore', () => {
    cy.get('.monday').click()
    cy.get(".chore-card").should("have.length", "1")
    cy.get('.chore-container > :nth-child(1)').contains("Jane Doe")
    cy.get('.chore-container > :nth-child(1)').contains("Sweeping")
    cy.get('.chore-container > :nth-child(1)').contains("30 minutes")
    
  })
  
  it('should show a message if no chores are given for the day', () => {
    cy.get('.tuesday').click()
    cy.get('.day-off').contains("You have the day off, no chores today!")
  })

  it('should have a button for a user to log out', () => {
    cy.get('.active > .nav-btn').contains("Log Out")
  })

  it('should have a button for a user to edit their household', () => {
    cy.get('[href="/houseform"] > .nav-btn').contains("Edit Household")
  })

  it('should have a button for a user to edit their household chores', () => {
    cy.get('[href="/choreform"] > .nav-btn').contains("Edit Chore List")
  })

  it('should allow a user to randomize the chore schedule', () => {
    cy.get('nav > :nth-child(2)').contains("Get me a new schedule")
  }) 
})