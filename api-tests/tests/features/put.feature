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
        And The response body should contain "Book not found"

    #204202G

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

    Scenario: Update a book with an empty author name
        Given a valid book with id=3 exists in the system
        When I send a PUT request to "/api/books/3" with following details:
        """
        {
            "id": 3,
            "title": "Valid Title",
            "author": ""
        }
        """
        Then The response status code should be 400
        And The response body should contain "Invalid | Empty Input Parameters in the Request"

    Scenario: Update a book with author name containing leading and trailing whitespaces
        Given a valid book with id=4 exists in the system
        When I send a PUT request to "/api/books/4" with following details:
        """
        {
            "id": 4,
            "title": "Tom Sawyer",
            "author": "      Mark Twain       "
        }
        """
        Then The response status code should be 400
        And The response body should contain "Invalid | Empty Input Parameters in the Request"

    Scenario: Non-logged-in user access
        Given I am not logged in as an admin
        And a valid book with id=5 exists in the system
        When I send a PUT request to "/api/books/5" with following details:
        """
        {
            "id": 5,
            "title": "Another Title",
            "author": "Another Author"
        }
        """
        Then The response status code should be 403