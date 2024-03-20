describe('Check Website Availability', () => {
  it('Should be up and running', () => {
    // Visit the website
    cy.visit('http://localhost:5080');

    // Check if the page is loaded successfully
    cy.url().should('eq', 'http://localhost:5080/');
  });
});
