import { aliasOperation } from "../utils/utilityfunctions.cy";

describe('Chore Form', () => {
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

      aliasOperation(req, 'createChore', { 
        "createChore": {
          "chores": [{"choreName": "Mopping"}],
          "errors": []
        }
      });
      
    })
    cy.visit('https://to-do-guru-ui.vercel.app/choreform');
  });

  it('should allow a user to name their chore', () => {
    cy.get('[type="text"][required=""]').type('Mopping')
      .should('have.value', 'Mopping');
  });

  it('should allow a user to select at least one day to do this chore', () => {
    cy.get('.css-13cymwt-control').click()
      .get('#react-select-2-option-1').click()
      .get('.css-1dyz3mf').contains('Tuesday');
  });

  it('should allow a user to select multiple days to do this chore', () => {
    cy.get('.css-13cymwt-control').click()
      .get('#react-select-2-option-1').click()
      .get('.css-1wy0on6 > :nth-child(3)').click()
      .get('#react-select-2-option-3').click()
      .get('.css-1dyz3mf').contains('Tuesday')
      .get('.css-1dyz3mf').contains('Thursday');
  });

  it('should allow a user to change the number of minutes a task takes', () => {
    cy.get('[type="number"]').click().type('{upArrow}')
      .get('[type="number"]').should('have.value', '30');
  });

  it('should not allow a user to choose 0 minutes', () => {
    cy.get('[type="number"]').click().type('{downArrow}')
      .get('[type="number"]').should('have.value', '15');
  });

  it('should limit the tasks to 240 minutes or less', () => {
    cy.get('[type="number"]').click()
      .type('{upArrow}').type('{upArrow}').type('{upArrow}').type('{upArrow}').type('{upArrow}').type('{upArrow}').type('{upArrow}').type('{upArrow}').type('{upArrow}').type('{upArrow}').type('{upArrow}').type('{upArrow}').type('{upArrow}').type('{upArrow}').type('{upArrow}').type('{upArrow}').type('{upArrow}').type('{upArrow}').type('{upArrow}').type('{upArrow}')
    .get('[type="number"]').should('have.value', '240');
  });

  it.only('should allow user to add chore to list', () => {

    cy.get('li').should('have.length', 0);

    cy.get('[type="text"][required=""]').type('Mopping')
      .get('.css-13cymwt-control').click()
      .get('#react-select-2-option-1').click()
      .get('.chore-btn').click();

    cy.get('li').should('have.length', 1);
  });

  it('should clear the form after the user adds their chore', () => {
    cy.get('[type="text"][required=""]').type('Mopping')
      .get('.css-13cymwt-control').click()
      .get('#react-select-2-option-1').click()
      .get('.chore-btn').click();

      cy.get('[type="text"][required=""]').should('have.value', '')
        .get('.css-19bb58m').should('have.value', '')
        .get('[type="number"]').should('have.value', '15');
  });
})