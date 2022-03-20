describe('Landing Page E2E Tests', () => {
  const selectors = {
    loginLink: 'nav a[href*="/login"]',
    registerLink: 'nav a[href*="/register"',
    veverickaLogo: 'img[alt*="Application icon"',
    changeLanguageButton: 'button[data-testid="change-language-button"]',
    languageButtonTr: 'nav button[data-testid="language-button-tr',
    changeThemeButton: 'button[data-testid="change-theme-button"]',
  };

  beforeEach(() => {
    cy.visit('/');
  });

  it('Can visit landing page', () => {});

  it('Assert login anchor link exists', () => {
    cy.get(selectors.loginLink);
  });

  it('Assert register anchor link exists', () => {
    cy.get(selectors.registerLink);
  });

  it('Assert Vevericka logo exists', () => {
    cy.get(selectors.veverickaLogo);
  });

  it('Assert clicking login link redirects to login page', () => {
    cy.get(selectors.loginLink).click();
    cy.url().should('include', '/login');
  });

  it('Assert clicking register link redirects to register page', () => {
    cy.get(selectors.registerLink).click();
    cy.url().should('include', '/register');
  });

  it('Assert change language button exists', () => {
    const expectedValue = 'Change language';

    cy.get(selectors.changeLanguageButton).contains(expectedValue);
  });

  it('Assert clicking change language button and selecting Turkish changes page language', () => {
    cy.get(selectors.changeLanguageButton).click();
    cy.get(selectors.languageButtonTr).click();
    cy.url().should('match', /\/tr$/);
  });

  it('Assert change theme button exists', () => {
    const expectedValue = 'Switch to dark theme';

    cy.get(selectors.changeThemeButton).contains(expectedValue);
  });

  it('Assert clicking change theme button changes theme', () => {
    cy.get(selectors.changeThemeButton).click();
    cy.get('html').should('have.class', 'dark');
    cy.get('html')
      .invoke('attr', 'style')
      .should('equal', 'color-scheme: dark;');
  });

  it('Assert on dark theme register button background is primary color', () => {
    const primaryColor = 'rgb(190, 24, 93)';

    cy.get(selectors.changeThemeButton).click();
    cy.get(selectors.registerLink)
      .should('have.css', 'background-color')
      .and('eq', primaryColor);
  });

  it('Assert clicking twice to change theme button makes theme light again', () => {
    cy.get(selectors.changeThemeButton).click();
    cy.get(selectors.changeThemeButton).click();

    cy.get('html').should('have.class', 'light');
    cy.get('html')
      .invoke('attr', 'style')
      .should('equal', 'color-scheme: light;');
  });
});
