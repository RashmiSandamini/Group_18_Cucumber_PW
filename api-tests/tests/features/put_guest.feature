@api 
Feature: Update a book by user
    As a guest user
    I should not be able to update a book using the API
    So that only authorized users can update books

    @204202G @failing
    Scenario: Non-logged-in user access
        Given I am not logged in as an admin or user
        And a valid book with id=5 exists in the system
        When I send a PUT request to "/api/books/5" with below details:
        """
        {
            "id": 5,
            "title": "Another Title",
            "author": "Another Author"
        }
        """
        Then The response status code should be 403
        And The response body should contain "Forbidden"