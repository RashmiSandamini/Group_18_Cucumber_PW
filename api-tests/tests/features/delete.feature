@api
Feature: Delete a book
  As an admin or user
  I want to delete a book using the API
  So that the book is removed from the system

  @204226H @failing
  Scenario: DELETE Happy Path
    Given I am authorized as an admin with "Basic YWRtaW46cGFzc3dvcmQ="
    And An admin ensures a book exists with ID "3"
    When An admin sends a DELETE request to "/api/books/3"
    Then The response status code should be 200
    And The response body should include "Book deleted successfully"

  @204226H @failing
  Scenario: DELETE Non-existent Book
    Given I am authorized as an admin with "Basic YWRtaW46cGFzc3dvcmQ="
    When An admin sends a DELETE request to "/api/books/9999"
    Then The response status code should be 404
    And The response body should include "Book not found"

  @204226H @failing
  Scenario: DELETE by User
    Given I am authorized as a user with "Basic dXNlcjpwYXNzd29yZA=="
    When A user sends a DELETE request to "/api/books/3"
    Then The response status code should be 403
    And The response body should include "Access forbidden"

  @204226H @negative
  Scenario: DELETE by Non-logged-in User
    When A user sends a DELETE request to "/api/books/3"
    Then The response status code should be 401
    And The response body should include "Access forbidden"
