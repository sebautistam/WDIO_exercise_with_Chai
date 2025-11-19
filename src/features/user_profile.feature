@profile
Feature: User profile
	Background:
		Given I am logged in as a registered user

	Scenario: Successful update of profile information
	    When I update the profile information with correct information
		Then I see a success message with text "Your profile is successfully updated!"


	Scenario: Update the password to the current one
		When I try to update the password to the same password currently in use
	    Then I see a password change error message with text "New Password cannot be same as your current password."
