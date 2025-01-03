@api
Feature: Delete a book as Admin
  As an admin
  I want to delete a book using the API
  So that the book is removed from the system

  @204226H @failing
  Scenario: DELETE Happy Path
    Given I am authorized as "admin" in DELETE tests with "Basic YWRtaW46cGFzc3dvcmQ="
    And A book exists with ID "3"
    When I send a DELETE request to "/api/books/3"
    Then The response status code should be 200
    And The response body should include "Book deleted successfully"

  @204226H @failing
  Scenario: DELETE Non-existent Book
    Given I am authorized as "admin" in DELETE tests with "Basic YWRtaW46cGFzc3dvcmQ="
    When I send a DELETE request to "/api/books/9999"
    Then The response status code should be 404
    And The response body should include "Book not found"
