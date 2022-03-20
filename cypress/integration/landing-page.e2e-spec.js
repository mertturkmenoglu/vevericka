describe('Landing Page E2E Tests', () => {
  it('Can visit landing page', () => {
    cy.visit('/');
  });

  it('Assert login anchor link exists', () => {
    cy.visit('/');
    cy.get('a[href*="/login"]');
  });

  it('Assert register anchor link exists', () => {
    cy.visit('/');
    cy.get('a[href*="/register"');
  });

  it('Assert Vevericka logo exists', () => {
    cy.visit('/');
    cy.get('img[alt*="Application icon"');
  });

  it('Assert clicking login link redirects to login page', () => {
    cy.visit('/');
    cy.get('nav a[href*="/login"]').click();
    cy.url().should('include', '/login');
  });

  it('Assert clicking register link redirects to register page', () => {
    cy.visit('/');
    cy.get('nav a[href*="/register"]').click();
    cy.url().should('include', '/register');
  });

  it('Assert change language button exists', () => {
    const selector = 'button[data-testid="change-language-button"]';
    const expectedValue = 'Change language';

    cy.visit('/');
    cy.get(selector).contains(expectedValue);
  });

  it('Assert clicking change language button and selecting Turkish changes page language', () => {
    const selector = 'button[data-testid="change-language-button"]';

    cy.visit('/');
    cy.get(selector).click();
    cy.get('nav button[data-testid="language-button-tr').click();
    cy.url().should('match', /\/tr$/);
  });

  it('Assert change theme button exists', () => {
    const selector = 'button[data-testid="change-theme-button"]';
    const expectedValue = 'Switch to dark theme';

    cy.visit('/');
    cy.get(selector).contains(expectedValue);
  });
});
