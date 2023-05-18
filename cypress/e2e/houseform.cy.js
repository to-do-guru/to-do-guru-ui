describe('House Form', () => {
    beforeEach('', () => {
      cy.visit('https://to-do-guru-ui.vercel.app/houseform');
    });
  
    it.skip('should allow a user to name their household', () => {
      cy.get('[name="householdName"]').type('Cypress Family')
        .should('have.value', 'Cypress Family');
    });
});