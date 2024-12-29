@ui
Feature: Add to Cart Functionality

  I want to add a product to the cart,
  Verify the product is displayed in the shopping cart,
  And navigate back to the homepage,
  So that I can confirm the cart and navigation functionality work as expected.

  Background: 
    Given I should be on the product page

  Scenario: Add a product to the cart and verify in the shopping cart
    When I add the first product to the cart
    And I click the "View Cart" button
    Then I should be on the shopping cart page
    And I click the "Continue Shopping" button
    And I should be navigated to the home page