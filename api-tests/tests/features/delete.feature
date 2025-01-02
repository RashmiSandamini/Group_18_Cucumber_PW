@api
Feature: Delete a book
  As a user
  I want to delete a book using the API
  So that the book is removed from the system

  Background:
    Given I am authorized with "Basic YWRtaW46cGFzc3dvcmQ=" as an admin

  @204226H
  Scenario: DELETE Happy Path
    Given A book exists with ID "1"
    When I send a DELETE request to "/api/books/1"
    Then The response status code should be 200
    And The response body should include "Book deleted successfully"

  @204226H @negative
  Scenario: DELETE Non-existent Book
    When I send a DELETE request to "/api/books/9999"
    Then The response status code should be 404
    And The response body should include "Book not found"

  @204226H @negative
  Scenario: DELETE by User
    Given I am authorized with "Basic dXNlcjpwYXNzd29yZA==" as a user
    When I send a DELETE request to "/api/books/1"
    Then The response status code should be 403
    And The response body should include "Access forbidden"

  @204226H @negative
  Scenario: DELETE by Non-logged-in User
    When I send a DELETE request to "/api/books/1"
    Then The response status code should be 401
    And The response body should include "Unauthorized access"
