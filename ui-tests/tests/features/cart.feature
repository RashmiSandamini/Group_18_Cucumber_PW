@ui
Feature: Add to Cart Functionality

  I want to add a product to the cart,
  Verify the product is displayed in the shopping cart,
  And navigate back to the homepage,
  So that I can confirm the cart and navigation functionality work as expected.

  @204159E
  Scenario: Add a product to the cart and verify in the shopping cart
    Given I am logged in as a valid user
    And I am on the account page
    When I navigate to the product page
    And I add the first product to the cart
    And I click the "View Cart" button
    Then I should be on the shopping cart page
    And Product should appear in cart page
    And I should be able to click the ContinueShopping button
    And I should be navigated to the home page