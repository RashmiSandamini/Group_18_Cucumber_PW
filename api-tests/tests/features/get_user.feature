@api
Feature: Retrieve Books as User
  As a user
  I want to retrieve books using the API
  So that I can view details of a specific book

  Background:
    Given I am authorized with "Basic dXNlcjpwYXNzd29yZA==" as a user

  @205093D @failing
  Scenario: Retrieve a book by ID
    When I send a GET request to "/api/books/1"
    Then The response status code should be 200
    And The response body should contain
      """
      {
        "id": 1,
        "title": "To Kill A Mocking Bird",
        "author": "Harper Lee"
      }
      """
