@ui
Feature: Add to Cart Functionality for Out of Stock Products

  @205093D
  Scenario: User tries to add an "Out of Stock" product to the cart from the product list page
    Given There is an out-of-stock product  
    When The user tries to add the product to the cart  
    Then The product should not be added to the cart  