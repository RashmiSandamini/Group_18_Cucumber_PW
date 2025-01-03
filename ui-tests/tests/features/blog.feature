@ui
Feature: Interact with the Blog functionality
  As a user
  I want to view, comment, and reply on a blog post
  So that I can engage with the content and community

  Background:
    Given I am logged in as a valid user

  @204226H
    Scenario: User comments on a blog post and replies to their comment
      Given I navigate to the "Blog" section 
      When I click on an article
      And I comment on the comments section and click on submit button
      And I click the reply button for comment

