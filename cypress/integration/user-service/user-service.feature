Feature: User Service API
  As a developer
  I want to test the User Service API calls
  So that I can ensure the service communicates correctly with the backend

  Background:
    Given the backend API is available

  Scenario: Get all users from API
    When I make a GET request to "/users"
    Then I should receive a 200 status code
    And the response should contain a list of users
    And each user should have id, name, email, and role properties

  Scenario: Add a new user via API
    Given I have user data:
      | name        | email                  | role     |
      | Test User   | test.user@example.com  | Tester   |
    When I make a POST request to "/users" with the user data
    Then I should receive a 201 status code
    And the response should contain the created user
    And the user should have a generated ID

  Scenario: Get a specific user by ID
    Given there is a user with ID "1"
    When I make a GET request to "/users/1"
    Then I should receive a 200 status code
    And the response should contain the user with ID "1"

  Scenario: Update an existing user
    Given there is a user with ID "1"
    And I have updated user data:
      | name           | email                     | role       |
      | Updated User   | updated.user@example.com  | Admin      |
    When I make a PUT request to "/users/1" with the updated data
    Then I should receive a 200 status code
    And the response should contain the updated user information

  Scenario: Delete a user
    Given there is a user with ID "2"
    When I make a DELETE request to "/users/2"
    Then I should receive a 200 status code
    And the user should be removed from the system

  Scenario: Handle API errors gracefully
    When I make a GET request to "/users/999"
    Then I should receive a 404 status code
    And the response should indicate the user was not found 