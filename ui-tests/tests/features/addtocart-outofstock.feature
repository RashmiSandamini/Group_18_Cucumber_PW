@ui
Feature: Add to Cart Functionality for Out of Stock Products
  As a user  
  I want to be prevented from adding out-of-stock products to the cart  
  So that I do not mistakenly purchase unavailable items  

  @205093D @failing
  Scenario: User tries to add an "Out of Stock" product to the cart from the product list page
    Given There is an out-of-stock product  
    When I try to add the product to the cart  
    Then The product should not be added to the cart  