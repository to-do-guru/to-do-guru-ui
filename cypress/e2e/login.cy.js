import { aliasOperation } from "../utils/utilityfunctions.cy";

describe('login page', () => {
  beforeEach('', () => {
    cy.intercept('https://to-do-guru-api.onrender.com/graphql', (req) => {
      aliasOperation(req, 'getHousehold', {
        "data": {
          "household": {
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
  })

  it('should be to visit a log in page, sign in, and be taken to see the dashboard', () => {
    cy.visit('https://to-do-guru-ui.vercel.app/')
    cy.get('input').type("travis@gmail.com")
    cy.get('input').should("have.value", "travis@gmail.com")
    cy.get('.login-btn').click()
    cy.url().should('eq', "https://to-do-guru-ui.vercel.app/dashboard")
  })
})