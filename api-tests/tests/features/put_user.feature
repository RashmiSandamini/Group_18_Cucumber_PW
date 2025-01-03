@api 
Feature: Update a book by user
    As a user
    I should not be able to update a book using the API
    So that only authorized users can update books

    @205124C
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