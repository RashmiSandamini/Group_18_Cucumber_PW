Feature: Initiate a product return
  As a user
  I want to initiate a product return using the UI
  So that the return is processed by the system

  Background:
    Given I am logged in as a valid user
    And I am on the account page

  Scenario: Successfully initiate a product return
    When I navigate to the returns page
    And I initiate a return with the following details
      | order_id | order_date | product_name | product_code | quantity | reason  | opened | other_details   |
      | O001     | 2024-12-01 | iPhone 16    |         1234 |        1 | Damaged | Yes    | Cracked Display |
    And I submit the return
    Then The return should be successful and I should be navigated to the continue page
    And I should be able to click the "Continue" button
    And I should be navigated to the home page
