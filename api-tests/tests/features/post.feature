@api
Feature: Create a new book
  As a user
  I want to create a new book using the API
  So that the book is stored in the system

  Background:
    Given I am authorized with "Basic YWRtaW46cGFzc3dvcmQ=" as an admin

  @205036H
  Scenario: Successfully create a new book
    When I send a POST request to "/api/books" with the following books
      | title           | author         |
      | How Do You Live | Yoshino Uthada |
      | Inferno         | Dan Brown      |
      | Bigglesworth    | WE Johns       |
    Then The response status code should be 201

  @205036H @exploratory
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

  @205036H  @exploratory
  Scenario: Create a book with whitespace titles
    When I send a POST request to "/api/books" with the following books
      | title     | author         |
      | ""        | Yoshino Uthada |
      | " "       | Yoshino Uthada |
    Then The response status code should be 400
    And The response type should be "text/plain"
    And The text response body should contain "Invalid request format"

  @205036H
  Scenario: Create a book with user level credentials
    Given I am authorized with "Basic dXNlcjpwYXNzd29yZA==" as a user
    When I send a POST request to "/api/books" with the following books
      | title           | author    |
      | Angels & Demons | Dan Brown |
    Then The response status code should be 201


  @204159E  
  Scenario: Insert the same book multiple times
    When I send a POST request to "/api/books" with the following books
      | title           | author         |
      | How Do You Live | Yoshino Uthada |
      | How Do You Live | Yoshino Uthada |
    Then The response status code should be 208
    And The text response body should contain "Book Already Exists"

  @204159E @failing
  Scenario: Create a book without an author
    When I send a POST request to "/api/books" with the following JSON body:
      """
        {
          "title": "Matilda"
        }
      """
    Then The response status code should be 400
    And The response body should include "Invalid request format"

  @204159E @failing
  Scenario: Create a book with numbers in the author field
    When I send a POST request to "/api/books" with the following books
      | title           | author         |
      | Book 01        | Dan Brown123   |
      | Book 02    | 9876           |
    Then The response status code should be 400
    And The text response body should contain "Invalid request format"

  @204159E
  Scenario: Attempt to create a book without being logged in
    And I am not logged in as an admin or user
    When I send a POST request to "/api/books" with the following book details
      | title           | author         |
      | How Do You Live 3 | Yoshino Uthada |
    Then The response status code should be 401


