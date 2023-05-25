import { aliasOperation } from "../utils/utilityfunctions.cy";

describe('login page', () => {
  beforeEach('', () => {
    cy.intercept('https://salty-tundra-49252.herokuapp.com/graphql', (req) => {
      aliasOperation(req, 'getHousehold', {
        "data": {
          "household": {
            "members": [
              {"id": "10", "name": "Jane Doe"},
            ],
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
    cy.visit('https://to-do-guru-ui.vercel.app/')
  })

  it('should show a message to the user if the email is entered incorrectly', () => {
    cy.get('input').type("travis@example.com")
    cy.get('input').should("have.value", "travis@example.com")
    cy.get('.login-btn').click()
    cy.get('.error').contains("Login info is incorrect")
  })

  it("should help the user login with a given email to use", () => {
    cy.get('p').contains("Try logging in with smith@example.com")
  })

  it('should be to visit a log in page, sign in, and be taken to see the dashboard', () => {
    cy.get('input').type("smith@example.com")
    cy.get('input').should("have.value", "smith@example.com")
    cy.get('.login-btn').click()
    cy.url().should('eq', "https://to-do-guru-ui.vercel.app/dashboard")
  })
})