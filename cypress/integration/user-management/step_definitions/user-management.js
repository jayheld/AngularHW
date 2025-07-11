import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

// Background steps
Given("I visit the application", () => {
  cy.visit("/");
});

Given("the backend API is running", () => {
  cy.request("GET", "http://localhost:3000/users").should((response) => {
    expect(response.status).to.eq(200);
  });
});

// Common steps
When("I visit the home page", () => {
  cy.visit("/");
});

// Title and date tests
Then("I should see {string} in the title", (title) => {
  cy.get("h1").should("contain.text", title);
});

Then("I should see the current date displayed", () => {
  cy.get("p").should("contain.text", "Current Date:");
});

// User list tests
Given("there are users in the system", () => {
  cy.request("GET", "http://localhost:3000/users").then((response) => {
    expect(response.body).to.have.length.greaterThan(0);
  });
});

Then("I should see a list of users", () => {
  cy.get("ul li").should("have.length.greaterThan", 0);
});

Then("each user should display their name, email, and role", () => {
  cy.get("ul li").each(($li) => {
    cy.wrap($li).should("contain.text", "@"); // Email contains @
    cy.wrap($li).should("contain.text", "-"); // Role separator
  });
});

// Add user tests
When("I fill in the user form with valid data:", (dataTable) => {
  const userData = dataTable.hashes()[0];
  cy.get("#name").type(userData.name);
  cy.get("#email").type(userData.email);
  cy.get("#role").type(userData.role);
});

When("I click the {string} button", (buttonText) => {
  cy.get("button").contains(buttonText).click();
});

Then("the user should be added to the list", () => {
  cy.get("ul li").should("contain.text", "John Doe");
});

Then("the form should be reset", () => {
  cy.get("#name").should("have.value", "");
  cy.get("#email").should("have.value", "");
  cy.get("#role").should("have.value", "");
});

// Empty fields test
When("I click the {string} button without filling the form", (buttonText) => {
  cy.get("button").contains(buttonText).click();
});

Then("I should see an alert message {string}", (alertMessage) => {
  cy.window().then((win) => {
    cy.stub(win, "alert").as("windowAlert");
  });
  cy.get("@windowAlert").should("have.been.calledWith", alertMessage);
});

Then("the user should not be added to the list", () => {
  cy.get("ul li").should("not.contain.text", "undefined");
});

// User click test
When("I click on a user in the list", () => {
  cy.window().then((win) => {
    cy.stub(win, "alert").as("windowAlert");
  });
  cy.get("ul li").first().click();
});

Then("I should see an alert with the user's name and role", () => {
  cy.get("@windowAlert").should("have.been.called");
});

// Form validation test
When("I enter invalid email format in the email field", () => {
  cy.get("#email").type("invalid-email");
});

When("I try to submit the form", () => {
  cy.get("button[type='submit']").click();
});

Then("the form should show validation errors", () => {
  cy.get("#email:invalid").should("exist");
}); 