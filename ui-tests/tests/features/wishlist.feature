@ui
Feature: Add Products to Wishlist
    As a user,
    I want to add products to my wishlist 
    so I can review them later.

    @204202G
    Scenario: Add a single product to the wishlist
        Given I am logged in as a valid user
        And I am on the account page
        And my wishlist is empty
        When I navigate to a Printers and Scanners category
        And I select a product and click "Add to Wishlist" icon
        Then success message should be displayed
        And the wishlist count should increase by 1
        And the product should appear in the wishlist page