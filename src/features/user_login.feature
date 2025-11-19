@login
Feature: User Login

	Background:
		Given I am on the login page with an existing account

	Scenario: Login with incorrect information
		When I fill out the login form with incorrect <email> or <password> 
		Then I see an error message with text "Invalid email or password"
		And I cannot access the account

	Examples:
	| email                                 | password          |
	#| customer@practicesoftwaretesting.com  | IncorrectPassword |
	| customer@practicesoftwaretesting.co   | welcome01         |

	Scenario: Successful user login
		When I fill out the login form with correct <email> and <password> 
		Then I can access the account

	Examples:
	| email                                  | password  |
	| customer2@practicesoftwaretesting.com  | welcome01 |


	Scenario: Account locked after several attempts to access with incorrect password
		When I try to access an existing account several times with correct <email> and incorrect <password>
		Then I see an error message with text "Account locked, too many failed attempts. Please contact the administrator."
		And I cannot access the account

	Examples:
	| email                                  | password  |
	| customer3@practicesoftwaretesting.com  | Pass123 |
