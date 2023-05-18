describe('Error Handling', () => {
  it.skip('should not allow the user to submit a chore with an empty field', () => {
    cy.visit('https://to-do-guru-ui.vercel.app/choreform');
    cy.get('li').should('have.length', 3);
    
    cy.get('.chore-btn').click()
      .get('li').should('have.length', 3);

    cy.get('[type="text"][required=""]').type('Mopping')
      .get('.chore-btn').click()
      .get('li').should('have.length', 3);

    cy.get('[type="text"][required=""]').clear()
      .get('.css-13cymwt-control').click()
      .get('#react-select-2-option-1').click()
      .get('li').should('have.length', 3);
  });

  it.skip('should not allow the user to submit a household with an empty form', () => {
    cy.visit('https://to-do-guru-ui.vercel.app/houseform');

    cy.get('.house-form > .house-btn').click()
    // test the feedback once we get it set up

    cy.get('[name="householdName"]').type('Household Name')
      .get('.house-form > .house-btn').click()
    // test the feedback once we get it set up

    cy.get('[name="householdName"]').clear()
      .get('.mem-input').type('Kara')
      .get('.house-form > .house-btn').click()
    // test the feedback once we get it set up
  })
});