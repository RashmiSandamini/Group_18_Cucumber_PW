@api
Feature: Retrieve Books
  As a user
  I want to retrieve books using the API
  So that I can view details of all books or a specific book

  Background:
    Given I am authorized with "Basic YWRtaW46cGFzc3dvcmQ=" as an admin
    
  @205093D
  Scenario: Retrieve all books
    Given I have created a book with title "To Kill A Mocking Bird" and author "Harper Lee"
    And I have created a book with title "Winged Dreams" and author "Saarah"
    When I send a GET request to "/api/books"
    Then The response status code should be 200
    And The response body should contain
      """
      [
        {
          "id": 1,
          "title": "To Kill A Mocking Bird",
          "author": "Harper Lee"
        },
        {
          "id": 2,
          "title": "Winged Dreams",
          "author": "Saarah"
        }
      ]
      """
  
  @205093D
  Scenario: Retrieve a specific book by ID
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
  
  @205093D
  Scenario: Retrieve a non-existent book by ID
    When I send a GET request to "/api/books/9999"
    Then The response status code should be 404
    And The text response body should contain "Book not found"

  @205093D @failing
  Scenario: Retrieve a book by ID as a user
    Given I am authorized with "Basic dXNlcjpwYXNzd29yZA==" as a user
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