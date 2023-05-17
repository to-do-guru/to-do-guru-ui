describe('site navigation', () => {
    beforeEach(() => {
        cy.visit('https://to-do-guru-ui.vercel.app/');
    });

    it('should allow a user to use the provided HTML buttons to navigate through the site', () => {
        cy.get('.login-btn').click()
        cy.url().should('eq', "https://to-do-guru-ui.vercel.app/dashboard")
    });

    it('should allow a user to use the browser back/forward buttons to navigate through the site', () => {
        cy.get
    });

    it('should allow a user to use the address bar to navigate through the site', () => {
        cy.get
    });
});