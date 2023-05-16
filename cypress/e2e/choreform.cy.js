describe('template spec', () => {
  beforeEach('', () => {
    cy.visit('https://to-do-guru-ui.vercel.app/choreform');
  });

  it('should allow a user to name their chore', () => {
    cy.get('[type="text"][required=""]').type('Mopping')
      .should('have.value', 'Mopping')
  });

  it('should allow a user to select at least one day to do this chore', () => {
    cy.get('.css-13cymwt-control').click()
      .get('#react-select-2-option-1').click()
      .get('.css-1dyz3mf').contains('Tuesday')
  });

  it('should allow a user to select multiple days to do this chore', () => {
    cy.get('.css-13cymwt-control').click()
      .get('#react-select-2-option-1').click()
      .get('.css-1dyz3mf').contains('Tuesday')
  });
})