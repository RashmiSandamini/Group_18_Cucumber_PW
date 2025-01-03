@api
Feature: Delete a book as User
  As a user
  I want to delete a book using the API
  So that I can test access control for deletion

  @204226H @failing
  Scenario: DELETE by User
    Given I am authorized as "user" in DELETE tests with "Basic dXNlcjpwYXNzd29yZA=="
    When I send a DELETE request to "/api/books/3"
    Then The response status code should be 403

  @204226H
  Scenario: DELETE by Non-logged-in User
    When I send a DELETE request to "/api/books/3"
    Then The response status code should be 401
