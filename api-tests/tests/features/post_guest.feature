@api
Feature: Create a new book by a guest user
  As a guest user
  I should not be able to create a new book using the API
  So that only authorized users can create books

  @204159E
  Scenario: Attempt to create a book without being logged in
    Given I am not logged in as an admin or user
    When I send a POST request to "/api/books" with the following book details:
      | title             | author         |
      | How Do You Live 3 | Yoshino Uthada |
    Then The response status code should be 401
