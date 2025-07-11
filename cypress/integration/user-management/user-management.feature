Feature: User Management
  As a user of the application
  I want to manage users
  So that I can add, view, and interact with user data

  Background:
    Given I visit the application
    And the backend API is running

  Scenario: Display application title and current date
    When I visit the home page
    Then I should see "Hello World Angular App" in the title
    And I should see the current date displayed

  Scenario: View existing users
    Given there are users in the system
    When I visit the home page
    Then I should see a list of users
    And each user should display their name, email, and role

  Scenario: Add a new user with valid data
    When I fill in the user form with valid data:
      | name     | email                | role              |
      | John Doe | john.doe@example.com | Software Engineer |
    And I click the "Add User" button
    Then the user should be added to the list
    And the form should be reset

  Scenario: Add user with empty fields
    When I click the "Add User" button without filling the form
    Then I should see an alert message "Please fill out all fields."
    And the user should not be added to the list

  Scenario: Click on a user to view details
    Given there are users in the system
    When I click on a user in the list
    Then I should see an alert with the user's name and role

  Scenario: Form validation
    When I enter invalid email format in the email field
    And I try to submit the form
    Then the form should show validation errors 