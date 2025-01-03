@ui
Feature: Checkout functionality
  As a user
  I want to complete the checkout process
  So that I can purchase items in my cart    

  @205124C
  Scenario: Successfully checkout a cart 
    Given I am logged in as a valid user
    And I should be on the home page
    And The shopping cart is empty
    And I add an item to the cart
    When I click the cart button and proceed to checkout
    And I should be on the checkout page
    And I click on "I want to use a new address" radio button
    And I enter the following details
      | firstname | lastname  | company | address_1   | city      | postcode  | 
      | John      | Doe       | ITQA    | 123         | Moratuwa  | 10500     |
    And I click on continue button
    Then I should be on the confirm order page
    And I confirm the order
    And I should be on the order success page
    And I click on continue button in success page
    And I should be navigated to the home page