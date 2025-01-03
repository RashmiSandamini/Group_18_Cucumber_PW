@ui
Feature: User Registration
  As a new user
  I want to register an account
  So that I can log in and use the platform

  @205093D
  Scenario: Successful registration with dynamic email
    Given I am on the register page
    When I fill in the registration form with valid details
      | first_name | last_name | email                  | phone       | password       | confirm_password |
      | John       | Doe       | dynamic_email  | 1234567890  | Password123!   | Password123!      |
    And I submit the registration form
    Then I should be navigated to the account success page
    And The register should be successful
    And I should be able to click the "Continue" button