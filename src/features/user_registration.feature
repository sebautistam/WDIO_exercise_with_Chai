@registration
Feature: User registration

    Background:
        Given I am on the registration page

    Scenario: Registration with incorrect information
        Given an already registered user <firstname> <lastname>
        When I enter <firstname> <lastname> <email> <password> in the registration form
        Then I see a "registration" error message with text "A customer with this email address already exists."
        And the account is not created

    Examples:
    | firstname | lastname | email                                 | password   |
    | John      | Doe      | admin@practicesoftwaretesting.com     | Welcome01. |
    | Jane      | Doe      | customer@practicesoftwaretesting.com  | Welcome01. |
    | Jack      | Howe     | customer2@practicesoftwaretesting.com | Welcome01. |
    | Bob       | Smith    | customer3@practicesoftwaretesting.com | Pass123.   |

    Scenario: Registration with incorrect information
        When I fill out the registration form without email address
        Then I see a "email" error message with text "Email is required"
        And the account is not created

    Scenario: Successful registration on the website
		    When I fill out the registration form correctly
		    Then the account is created

