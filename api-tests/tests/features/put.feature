@api
Feature: Update a Book
As a user 
I want to update a book using API
So that the updated book is stored in the system

    Background:
        Given I am authorized with "Basic YWRtaW46cGFzc3dvcmQ=" as an admin

    Scenario: Update a non-existing book ID
        Given A book with ID 13 does not exist
        When I send a PUT request to "/api/books/13" with following details:
         """
        {
            "id":13,
            "title":"Apate Habitss",
            "author": "James Clear"
        }
        """
        Then The response status code should be 404
        And The response body should contain "Book not found"


    Scenario: Update the book with existing book title
        Given A book with title "Wabi Sabi" already exists
        When I send a PUT request to "/api/books/2" with following details:
         """
        {
            "id":2,
            "title":"Wabi Sabi",
            "author": "James Clear"
        }
        """
        Then The response status code should be 208
        And The response body should contain "Book Already Exists"


    Scenario: Update the book with user level credentials
        Given I am authorized with "Basic dXNlcjpwYXNzd29yZA==" as a user
        When I send a PUT request to "/api/books/2" with following details:
         """
        {
            "id":2,
            "title":"Make it a habit",
            "author": "James Clear"
        }
        """
        Then The response status code should be 403

    Scenario: Update a non-existing book ID with a duplicate book title
        Given A book with ID 15 does not exist
        And A book with title "Atomic Habits" already exists
        When I send a PUT request to "/api/books/15" with following details:
         """
        {
            "id":15,
            "title":"Atomic Habits",
            "author": "James Clear"
        }
        """
        Then The response status code should be 404
        And The response body should contain "Book not found"
