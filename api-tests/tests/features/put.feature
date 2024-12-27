@api
Feature: Update a Book
As a user 
I want to update a book using API
So that the updated book is stored in the system

    Background:
        Given I am authorized with "Basic YWRtaW46cGFzc3dvcmQ=" as an admin

    Scenario: Update a non-existing book ID
        Given A book with ID 13 does not exist
        Then The response status code should be 404
        When I send a PUT request to "/api/books/13" with following details:
         """
        {
            "id":13,
            "title":"Apate Habitss",
            "author": "James Clear"
        }
        """
        Then The response status code should be 404
        And The text response body should contain "Book not found"


    Scenario: Update a book with existing book title
        Given I send a POST request to "/api/books" with the following books
            | title         | author    |
            | Wabi Sabi     | Beth Kempton |
        Then The response status code should be 201
        When I send a PUT request to "/api/books/1" with following details:
         """
        {
            "id":1,
            "title":"Wabi Sabi",
            "author": "Ruth Kempton"
        }
        """
        Then The response status code should be 208
        And The text response body should contain "Book Already Exists"


    Scenario: Update the book with user level credentials
        Given I am authorized with "Basic dXNlcjpwYXNzd29yZA==" as a user
        When I send a PUT request to "/api/books/1" with following details:
         """
        {
            "id":1,
            "title":"Make it a habit",
            "author": "James Clear"
        }
        """
        Then The response status code should be 403

    Scenario: Update a non-existing book ID with a duplicate book title
        Given I send a POST request to "/api/books" with the following books
            | title          | author  |
            | Forest Bathing | Qing Li |
        Then The response status code should be 201
        And A book with ID 15 does not exist
        And The response status code should be 404
        When I send a PUT request to "/api/books/15" with following details:
            """
            {
                "id": 15,
                "title": "Forest Bathing",
                "author": "James Clear"
            }
            """
        Then The response status code should be 404
        And The text response body should contain "Book not found"
