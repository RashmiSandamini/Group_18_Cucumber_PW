Feature: Create a new book
  As a user
  I want to create a new book using the API
  So that the book is stored in the system

  Background:
    Given I am authorized with "Basic dXNlcjpwYXNzd29yZA=="

  Scenario: Successfully create a new book
    When I send a POST request to "/api/books" with the following JSON body:
      """
      {
        "title": "How Do You Live",
        "author": "Yoshino Uthada"
      }
      """
    Then The response status code should be 201
    And The response body should contain:
      """
      {
        "title": "How Do You Live",
        "author": "Yoshino Uthada"
      }
      """