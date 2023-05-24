describe('House Form', () => {
  beforeEach('', () => {
    cy.intercept('POST', 'https://salty-tundra-49252.herokuapp.com/graphql', (req) => {
      if(req.body.query.includes('getHousehold')) {
        req.reply({"body": {"data": {
          "household": {
            "id": 1,
            "name": "Example House",
            "members": [
              {"id": "10", "name": "Jerry"},
              {"id": "11", "name": "Beth"},
              {"id": "12", "name": "Morty"},
            ]
          }
        }}})
      }
      if(req.body.query.includes('updateHousehold')) {
        req.reply({"body": {"data": {
          "updateHousehold": {
            "household": {
              "name": "Cypress House"
            }
          }
        }}})
      }
      if(req.body.query.includes('memberDelete')) {
        req.reply({"body": {"data": {
          "memberDelete": {
            "member": {
              "name": "Jerry"
            }
          }
        }}})
      }
      if(req.body.query.includes('createMember')) {
        req.reply({"body": {"data": {
          "createMember": {
            "member": {
              "id": "509",
              "name": "Rick"
            }
          }
        }}})
      }
    })
 
    cy.visit('http://localhost:3000/houseform');
      // cy.visit('https://to-do-guru-ui.vercel.app/choreform');
  });
  
  it('should allow a user to re-name their household', () => {
    cy.get('.household-input')
      .get('h2').contains('Example House');

    cy.get('.material-symbols-outlined').click();
    cy.get('#householdName').clear().type('Cypress Family');
    cy.get('.submit-name').click();

    cy.get('.household-input')
      .get('h2').contains('Cypress House');
  });

  it('should allow a user to add a member to their household', () => {
    cy.get('p').should('have.length', 3);
    cy.get('p').last().contains('Morty');

    cy.get('.house-form > .house-btn').click();
    cy.get('#memberInput').type("Rick");
    cy.get('.submit-member').click();

    cy.get('p').should('have.length', 4);
    cy.get('p').last().contains('Rick');
  });

  it('should allow a user to delete a member of their household', () => {
    cy.get('p').should('have.length', 3);
    cy.get('p').first().contains('Jerry');

    cy.get('.house-form > :nth-child(2)').contains('Jerry');
    cy.get(':nth-child(2) > .delete').click();

    cy.get('p').should('have.length', 2);
    cy.get('p').first().contains('Beth');
  });
});
