import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

let apiResponse;
let userData;
let userId;

// Background
Given("the backend API is available", () => {
  cy.request("GET", "http://localhost:3000/users").should((response) => {
    expect(response.status).to.eq(200);
  });
});

// API Request steps
When("I make a GET request to {string}", (endpoint) => {
  cy.request({
    method: "GET",
    url: `http://localhost:3000${endpoint}`,
    failOnStatusCode: false
  }).then((response) => {
    apiResponse = response;
  });
});

When("I make a POST request to {string} with the user data", (endpoint) => {
  cy.request({
    method: "POST",
    url: `http://localhost:3000${endpoint}`,
    body: userData,
    failOnStatusCode: false
  }).then((response) => {
    apiResponse = response;
  });
});

When("I make a PUT request to {string} with the updated data", (endpoint) => {
  cy.request({
    method: "PUT",
    url: `http://localhost:3000${endpoint}`,
    body: userData,
    failOnStatusCode: false
  }).then((response) => {
    apiResponse = response;
  });
});

When("I make a DELETE request to {string}", (endpoint) => {
  cy.request({
    method: "DELETE",
    url: `http://localhost:3000${endpoint}`,
    failOnStatusCode: false
  }).then((response) => {
    apiResponse = response;
  });
});

// Data preparation steps
Given("I have user data:", (dataTable) => {
  userData = dataTable.hashes()[0];
});

Given("I have updated user data:", (dataTable) => {
  userData = dataTable.hashes()[0];
});

Given("there is a user with ID {string}", (id) => {
  userId = id;
  cy.request("GET", `http://localhost:3000/users/${id}`).should((response) => {
    expect(response.status).to.eq(200);
  });
});

// Response validation steps
Then("I should receive a {int} status code", (statusCode) => {
  expect(apiResponse.status).to.eq(statusCode);
});

Then("the response should contain a list of users", () => {
  expect(apiResponse.body).to.be.an("array");
  expect(apiResponse.body.length).to.be.greaterThan(0);
});

Then("each user should have id, name, email, and role properties", () => {
  apiResponse.body.forEach((user) => {
    expect(user).to.have.property("id");
    expect(user).to.have.property("name");
    expect(user).to.have.property("email");
    expect(user).to.have.property("role");
  });
});

Then("the response should contain the created user", () => {
  expect(apiResponse.body).to.have.property("name", userData.name);
  expect(apiResponse.body).to.have.property("email", userData.email);
  expect(apiResponse.body).to.have.property("role", userData.role);
});

Then("the user should have a generated ID", () => {
  expect(apiResponse.body).to.have.property("id");
  expect(apiResponse.body.id).to.not.be.empty;
});

Then("the response should contain the user with ID {string}", (id) => {
  expect(apiResponse.body).to.have.property("id", id);
});

Then("the response should contain the updated user information", () => {
  expect(apiResponse.body).to.have.property("name", userData.name);
  expect(apiResponse.body).to.have.property("email", userData.email);
  expect(apiResponse.body).to.have.property("role", userData.role);
});

Then("the user should be removed from the system", () => {
  cy.request({
    method: "GET",
    url: `http://localhost:3000/users/${userId}`,
    failOnStatusCode: false
  }).should((response) => {
    expect(response.status).to.eq(404);
  });
});

Then("the response should indicate the user was not found", () => {
  expect(apiResponse.status).to.eq(404);
}); 