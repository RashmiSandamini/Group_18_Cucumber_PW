@api
Feature: Create a new book by user
  As a user
  I want to create a new book using the API
  So that the book is stored in the system

  @205036H
  Scenario: Create a book with user level credentials
    Given I am authorized with "Basic dXNlcjpwYXNzd29yZA==" as a user
    When I send a POST request to "/api/books" with the following books:
      | title           | author    |
      | Angels & Demons | Dan Brown |
    Then The response status code should be 201
