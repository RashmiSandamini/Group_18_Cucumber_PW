@api
Feature: Update a Book
    As a user 
    I want to update a book using API
    So that the updated book is stored in the system

    Background:
        Given I am authorized with "Basic YWRtaW46cGFzc3dvcmQ=" as an admin
        And I send a POST request to "/api/books" with the following details
            | title                 | author            |
            | Tom Sawyer            | Mark Twain        |
            | Pride and Prejudice   | Jane Austin       |
            | Moby Dick             | Herman Maveill    |
            | War and Peace         | Leo Tolstoy       |
            | A tale of two cities  | Charles Dickens   |
            | Wabi Sabi             | Beth Kempton      |

    @205124C
    Scenario: Update a non-existing book ID
        Given A book with ID 100 does not exist
        And The response status code should be 404
        When I send a PUT request to "/api/books/100" with following details:
         """
        {
            "id":100,
            "title":"Apate Habitss",
            "author": "James Clear"
        }
        """
        Then The response status code should be 404
        And The text response body should contain "Book not found"

    @205124C
    Scenario: Update a book with existing book title
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

    @205124C @failing
    Scenario: Update a non-existing book ID with a duplicate book title
        Given A book with ID 100 does not exist
        And The response status code should be 404
        When I send a PUT request to "/api/books/100" with following details:
            """
            {
                "id": 100,
                "title": "Wabi Sabi",
                "author": "Ruth Kempton"
            }
            """
        Then The response status code should be 404
        And The response body should contain "Book not found"

    @204202G
    Scenario: Successfully update an existing book
        Given a valid book with id=1 exists in the system
        When I send a PUT request to "/api/books/1" with following details:
        """
        {
            "id": 1,
            "title": "New Book Title",
            "author": "New Author"
        }
        """
        Then The response status code should be 200

    @204202G @failing
    Scenario: Update a book with an author name containing not only letters(when numbers and symbols are also there)
        Given a valid book with id=2 exists in the system
        When I send a PUT request to "/api/books/2" with following details:
        """
        {
            "id": 2,
            "title": "Valid Title",
            "author": "John123*&"
        }
        """
        Then The response status code should be 400
        And The response body should contain "Invalid request format"

    @204202G @failing
    Scenario: Update a book with an empty author name
        Given a valid book with id=3 exists in the system
        When I send a PUT request to "/api/books/3" with following details:
        """
        {
            "id": 3,
            "title": "The War",
            "author": ""
        }
        """
        Then The response status code should be 400
        And The response body should contain "Invalid | Empty Input Parameters in the Request"

    @204202G @failing
    Scenario: Update a book with book title containing leading and trailing whitespaces but an existing book title
        Given a valid book with id=4 exists in the system
        When I send a PUT request to "/api/books/4" with following details:
        """
        {
            "id": 4,
            "title": "   Tom Sawyer   ",
            "author": "Mark Twain"
        }
        """
        Then The response status code should be 400
        And The response body should contain "Invalid | Empty Input Parameters in the Request"