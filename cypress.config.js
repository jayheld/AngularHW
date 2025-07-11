const { defineConfig } = require('cypress');
const cucumber = require('cypress-cucumber-preprocessor').default;

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('file:preprocessor', cucumber());
    },
    specPattern: [
      'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
      'cypress/integration/**/*.feature'
    ],
    baseUrl: 'http://localhost:59949',
    supportFile: 'cypress/support/e2e.js',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    experimentalStudio: true,
    chromeWebSecurity: false
  },
  component: {
    devServer: {
      framework: 'angular',
      bundler: 'webpack',
    },
  },
}); 