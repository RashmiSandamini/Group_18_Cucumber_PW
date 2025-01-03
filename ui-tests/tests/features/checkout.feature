@ui
Feature: Checkout functionality
  As a user
  I want to complete the checkout process
  So that I can purchase items in my cart

  Background:
    Given I am logged in as a valid user
    And I should be on the home page

  @205124C
  Scenario: Successfully checkout a cart 
    And I add an item to the cart
    When I click the cart button and proceed to edit cart
    And I should be on the shopping cart page 
    And Items in the cart are not out-of-stock
    And I click the checkout button
    And I should be on the checkout page
    And I click on "I want to use a new address" radio button
    And I enter the following details
      | firstname | lastname  | company | address_1   | city      | postcode  | 
      | John      | Doe       | ITQA    | 123         | Moratuwa  | 10500     |
    And I click on continue button
    Then I should be in the confirm order page
    And I confirm the order
    And I should be on the order success page
    And I click on continue button in success page
    And I should be navigated to the home page

  @205124C
  Scenario: Checkout an item with 0 weight
    And I add a zero weight item to the cart
    When I click the cart button and proceed to edit cart
    And I should be on the shopping cart page 
    And Items in the cart are not out-of-stock
    And I click the checkout button
    And I should be on the checkout page
    And I click on "I want to use a new address" radio button
    And I enter the following details
      | firstname | lastname  | company | address_1   | city      | postcode  | 
      | John      | Doe       | ITQA    | 123         | Moratuwa  | 10500     |
    And I click on continue button
    Then I should be in the confirm order page
    And I confirm the order
    And I should be on the order success page
    And I click on continue button in success page
    And I should be navigated to the home page