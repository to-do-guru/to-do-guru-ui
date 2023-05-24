describe('House Form', () => {
  beforeEach('', () => {
    cy.intercept('POST', 'https://salty-tundra-49252.herokuapp.com/graphql', (req) => {
      if(req.body.query.includes('getHousehold')) {
        req.reply({"body": {"data": {
          "household": {
            "id": 1,
            "name": "Example House",
            "members": [
              {"id": "10", "name": "Beth"},
              {"id": "11", "name": "Jerry"},
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
  

});
