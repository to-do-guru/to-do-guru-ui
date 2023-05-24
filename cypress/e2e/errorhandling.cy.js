describe('Error Handling', () => {
  beforeEach('', () => {
    cy.intercept('POST', 'https://salty-tundra-49252.herokuapp.com/graphql', (req) => {
      if(req.body.query.includes('getHousehold')) {
        req.reply({
          "body": {
            "data": {
              "household": {
              "name": "Example House",
                "chores": [{
                  "choreName": "Sweeping"
                }],
                "id": 1,
                "members": [
                  {
                    "name": "Jane Doe",
                    "id": 1
                  }
                ]
              }
            }
          }
        });
      }
    })
  });

  it('should not allow the user to submit a chore with an empty field', () => {
    cy.visit('https://to-do-guru-ui.vercel.app/choreform');
    cy.get('li').should('have.length', 1);
    
    cy.get('.chore-btn').click()
      .get('li').should('have.length', 1);

    cy.get('[type="text"][required=""]').type('Mopping')
      .get('.chore-btn').click()
      .get('li').should('have.length', 1);

    cy.get('[type="text"][required=""]').clear()
      .get('.select-control').click()
      .get('#react-select-2-option-1').click()
      .get('li').should('have.length', 1);
  });

  it('should not allow the user to submit a household with an empty form', () => {
    cy.visit('https://to-do-guru-ui.vercel.app/houseform');

    cy.get('.material-symbols-outlined').click().get('input').clear().get('.submit-name').click().get('.household-input > p').should('not.exist');

    cy.get('.house-form > .house-btn').click().get('.submit-member').click().get('.house-form > .house-btn').should('not.exist').get('.member').should('have.length', 1);
  });
});