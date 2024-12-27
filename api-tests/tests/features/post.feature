@api
Feature: Create a new book
  As a user
  I want to create a new book using the API
  So that the book is stored in the system

  Background:
    Given I am authorized with "Basic YWRtaW46cGFzc3dvcmQ=" as an admin

  Scenario: Successfully create a new book
    When I send a POST request to "/api/books" with the following books
      | title           | author         |
      | How Do You Live | Yoshino Uthada |
      | Inferno         | Dan Brown      |
      | Bigglesworth    | WE Johns       |
    Then The response status code should be 201

  Scenario: Create a book without a title
    When I send a POST request to "/api/books" with the following JSON body:
      """
        {
          "author": "Yoshino Uthada"
        }
      """
    Then The response status code should be 400
    And The response type should be "text/plain"
    And The text response body should contain "Invalid request format"

  Scenario: Create a book with whitespace titles
    When I send a POST request to "/api/books" with the following books
      | title     | author         |
      | ""        | Yoshino Uthada |
      | " "       | Yoshino Uthada |
    Then The response status code should be 400
    And The response type should be "text/plain"
    And The text response body should contain "Invalid request format"

  Scenario: Create a book with user level credentials
    Given I am authorized with "Basic dXNlcjpwYXNzd29yZA==" as a user
    When I send a POST request to "/api/books" with the following books
      | title           | author    |
      | Angels & Demons | Dan Brown |
    Then The response status code should be 201