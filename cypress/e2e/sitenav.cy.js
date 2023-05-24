describe('site navigation', () => {
    beforeEach(() => {
        cy.intercept('POST', 'https://salty-tundra-49252.herokuapp.com/graphql', (req) => {
            if(req.body.query.includes('getHousehold')) {
                req.reply({"body": {"data": {
                    "household": {
                    "members": [
                        {"id": "10", "name": "Jerry"},
                        {"id": "12", "name": "Morty"},
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
                }}})
            }
        })

        cy.visit('https://to-do-guru-ui.vercel.app/');
    });

    it('should allow a user to use the provided HTML buttons to navigate through the site', () => {
        cy.get('input').type('smith@example.com');
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

    it('should allow a user to use the browser back/forward buttons to navigate through the site', () => {
        cy.get('input').type('smith@example.com');
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

    it('should allow a user to use the address bar to navigate through the site', () => {
        cy.visit('https://to-do-guru-ui.vercel.app/');
        cy.contains('Welcome to To-Do Guru!');

        cy.visit('https://to-do-guru-ui.vercel.app/dashboard');
        cy.contains("Example House Chore Schedule");

        cy.visit('https://to-do-guru-ui.vercel.app/choreform');
        cy.contains("Edit your Chores!");

        cy.visit('https://to-do-guru-ui.vercel.app/houseform');
        cy.contains("Edit your Household!");
    });

    it("should redirect a user if they attempt to navigate to a URL that doesn't exist", () => {
        cy.visit('https://to-do-guru-ui.vercel.app/');
        cy.contains('Welcome to To-Do Guru!');

        cy.visit('https://to-do-guru-ui.vercel.app/randombaloney/nonsense');
        cy.url().should('eq', "https://to-do-guru-ui.vercel.app/");
        cy.contains("Welcome to To-Do Guru!");
    });
});