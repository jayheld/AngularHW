# Testing Documentation

This document describes the testing setup for the Angular User Management Application using Cucumber BDD (Behavior-Driven Development) framework.

## Testing Framework

We are using **Cucumber** with **Cypress** for both unit and integration testing. This approach allows us to write tests in plain English (Gherkin syntax) that can be understood by both technical and non-technical stakeholders.

## Test Structure

### 1. **System/Integration Tests**
- **Location**: `cypress/integration/user-management/`
- **Purpose**: Test the complete user workflow from UI to API
- **Coverage**: 
  - Application loading and display
  - User form validation
  - Adding new users
  - Viewing user lists
  - User interaction (clicking users)
  - Form reset functionality

### 2. **Unit Tests (API)**
- **Location**: `cypress/integration/user-service/`
- **Purpose**: Test the UserService API endpoints
- **Coverage**:
  - GET /users (fetch all users)
  - POST /users (create new user)
  - GET /users/:id (fetch specific user)
  - PUT /users/:id (update user)
  - DELETE /users/:id (delete user)
  - Error handling (404, validation errors)

## Test Features

### User Management Feature
```gherkin
Feature: User Management
  As a user of the application
  I want to manage users
  So that I can add, view, and interact with user data
```

**Test Scenarios:**
- Display application title and current date
- View existing users
- Add a new user with valid data
- Handle empty form submission
- Click on users to view details
- Form validation

### User Service API Feature
```gherkin
Feature: User Service API
  As a developer
  I want to test the User Service API calls
  So that I can ensure the service communicates correctly with the backend
```

**Test Scenarios:**
- Get all users from API
- Add a new user via API
- Get a specific user by ID
- Update an existing user
- Delete a user
- Handle API errors gracefully

## Running Tests

### Prerequisites
1. **Start the Angular application**:
   ```bash
   npm start
   ```
   The app should be running on `http://localhost:59949`

2. **Start the JSON Server backend**:
   ```bash
   npm run api
   ```
   The API should be running on `http://localhost:3000`

### Running Tests

#### Option 1: Interactive Mode (Recommended for Development)
```bash
npm run test:cypress:open
```
This opens the Cypress Test Runner GUI where you can:
- Select and run individual tests
- Watch tests run in real-time
- Debug failing tests
- See detailed error messages

#### Option 2: Headless Mode (CI/CD)
```bash
npm run test:e2e
```
This runs all Cucumber tests in headless mode for continuous integration.

#### Option 3: All Cypress Tests
```bash
npm run test:cypress
```
Runs all Cypress tests (including non-Cucumber tests).

## Test Configuration

### Cypress Configuration (`cypress.config.js`)
- **Base URL**: `http://localhost:59949`
- **API URL**: `http://localhost:3000`
- **Viewport**: 1280x720
- **Timeouts**: 10 seconds for commands and requests
- **Screenshots**: Enabled on failure
- **Video**: Disabled (for faster execution)

### Cucumber Configuration (`package.json`)
```json
"cypress-cucumber-preprocessor": {
  "nonGlobalStepDefinitions": true,
  "stepDefinitions": "cypress/integration/*/step_definitions",
  "cucumberJson": {
    "generate": true,
    "outputFolder": "cypress/cucumber-json"
  }
}
```

## Custom Commands

We've created several custom Cypress commands for common operations:

- `cy.resetDatabase()` - Reset database to initial state
- `cy.createTestUser(userData)` - Create a test user via API
- `cy.fillUserForm(userData)` - Fill the user form with data
- `cy.verifyUserInList(userData)` - Verify user appears in list
- `cy.verifyFormIsEmpty()` - Check if form is reset
- `cy.handleAlert(expectedMessage)` - Handle window alerts
- `cy.verifyPageLoad()` - Verify page loads correctly
- `cy.verifyApiHealth()` - Check API availability

## Test Data

### Fixtures
Test data is stored in `cypress/fixtures/users.json`:
- Contains sample user data for testing
- Used for mocking API responses
- Provides consistent test data

### Database State
- Tests assume the JSON server is running with initial data
- Each test should be independent and not rely on previous test state
- Use `cy.resetDatabase()` if you need to reset state between tests

## Best Practices

1. **Write Descriptive Scenarios**: Use clear, business-focused language
2. **Keep Tests Independent**: Each test should run in isolation
3. **Use Page Objects**: Create reusable step definitions
4. **Mock External Dependencies**: Use fixtures for predictable test data
5. **Test Both Happy and Sad Paths**: Include error scenarios
6. **Keep Tests Fast**: Use API tests for business logic, UI tests for user workflows

## Troubleshooting

### Common Issues

1. **Tests fail with "Connection refused"**
   - Make sure both Angular app and JSON server are running
   - Check ports: Angular (59949), API (3000)

2. **Element not found errors**
   - Verify selectors match the HTML structure
   - Add wait conditions for dynamic content

3. **API timeout errors**
   - Increase timeout values in cypress.config.js
   - Check network connectivity

4. **Cucumber step definitions not found**
   - Verify step definitions are in correct directory structure
   - Check package.json cucumber configuration

### Debug Tips

1. Use `cy.debug()` to pause test execution
2. Use `cy.log()` to add debug messages
3. Take screenshots with `cy.screenshot()`
4. Use Cypress DevTools for DOM inspection

## Continuous Integration

To run tests in CI/CD pipeline:

```bash
# Install dependencies
npm install

# Start services in background
npm run api &
npm start &

# Wait for services to be ready
sleep 10

# Run tests
npm run test:e2e

# Stop services
kill %1 %2
```

## Reporting

- Test results are saved to `cypress/cucumber-json/`
- Screenshots of failures are saved to `cypress/screenshots/`
- HTML reports can be generated using cucumber-html-reporter

## Contributing

When adding new tests:
1. Write the feature file first (BDD approach)
2. Create step definitions
3. Add any necessary custom commands
4. Update this documentation
5. Ensure tests pass in both interactive and headless modes 