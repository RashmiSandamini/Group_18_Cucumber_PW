@ui
Feature: Checkout functionality
  As a user
  I want to complete the checkout process
  So that I can purchase items in my cart

  Background:
    Given I am logged in as a valid user
    And I am on the account page
    And I have items in the cart

  Scenario: Successfully checkout a cart 
    When I click the cart button
    And proceed to checkout
    And I should be in the checkout page
    And I click on "I want to use a new address" radio button
    And I enter the following details
      | firstname | lastname  | company | address_1   | city      | postcode  | 
      | John      | Doe       | ITQA    | 123         | Moratuwa  | 10500     |
    And I click on continue button
    Then I should be in the confirm order page
    And I confirm the order
    Then I should be in the order success page
    And I click on continue button in success page
    Then I should be redirected to the home page