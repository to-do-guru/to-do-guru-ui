describe('site navigation', () => {
    beforeEach(() => {
        cy.visit('https://to-do-guru-ui.vercel.app/');
    });

    it.skip('should allow a user to use the provided HTML buttons to navigate through the site', () => {
        cy.get('.login-btn').click();
        cy.url().should('eq', "https://to-do-guru-ui.vercel.app/dashboard");

        cy.get('[href="/houseform"] > .nav-btn').click();
        cy.url().should('eq', "https://to-do-guru-ui.vercel.app/houseform");
        cy.get('a > .house-btn').click();
        cy.url().should('eq', "https://to-do-guru-ui.vercel.app/dashboard");

        cy.get('[href="/choreform"] > .nav-btn').click();
        cy.url().should('eq', "https://to-do-guru-ui.vercel.app/choreform");
        cy.get('.house-btn').click();
        cy.url().should('eq', "https://to-do-guru-ui.vercel.app/dashboard");

        cy.get('.active > .nav-btn').click();
        cy.url().should('eq', "https://to-do-guru-ui.vercel.app/");
    });

    it.skip('should allow a user to use the browser back/forward buttons to navigate through the site', () => {
        cy.get('.login-btn').click();
        cy.url().should('eq', "https://to-do-guru-ui.vercel.app/dashboard");

        cy.go('back')
        cy.url().should('eq', "https://to-do-guru-ui.vercel.app/");

        cy.go('forward')
        cy.url().should('eq', "https://to-do-guru-ui.vercel.app/dashboard");

        cy.get('[href="/houseform"] > .nav-btn').click();
        cy.url().should('eq', "https://to-do-guru-ui.vercel.app/houseform");
        cy.go('back')
        cy.url().should('eq', "https://to-do-guru-ui.vercel.app/dashboard");
        cy.go('forward')
        cy.url().should('eq', "https://to-do-guru-ui.vercel.app/houseform");
        cy.get('a > .house-btn').click();

        cy.get('[href="/choreform"] > .nav-btn').click();
        cy.url().should('eq', "https://to-do-guru-ui.vercel.app/choreform");
        cy.go('back')
        cy.url().should('eq', "https://to-do-guru-ui.vercel.app/dashboard");
        cy.go('forward')
        cy.url().should('eq', "https://to-do-guru-ui.vercel.app/choreform");
    });

    it.skip('should allow a user to use the address bar to navigate through the site', () => {
        cy.visit('https://to-do-guru-ui.vercel.app/');
        cy.contains('Welcome to To-Do Guru!');

        cy.visit('https://to-do-guru-ui.vercel.app/dashboard');
        cy.contains("Turing Fam's Chore Schedule");

        cy.visit('https://to-do-guru-ui.vercel.app/choreform');
        cy.contains("Edit your Chores!");

        cy.visit('https://to-do-guru-ui.vercel.app/houseform');
        cy.contains("Edit your Household!");
    });
});