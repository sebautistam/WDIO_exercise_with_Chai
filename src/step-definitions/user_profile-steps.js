const { Given, When, Then } = require('@wdio/cucumber-framework');
const { $ } = require('@wdio/globals')
const chai = require('chai');
const { assert, should, expect } = require('chai');
chai.should(); // Enable should syntax

Given(/^I am logged in as a registered user$/, async function() {
    await browser.url('/auth/login');
    await $('#email').setValue('customer2@practicesoftwaretesting.com');
    await $('#password').setValue('welcome01');
    await $('[data-test="login-submit"]').click();
    
    await browser.waitUntil(
        async () => {
            const url = await browser.getUrl();
            return url.includes('account');
        },
        {
            timeout: 5000,
            timeoutMsg: 'Expected to be redirected to account page within 5s'
        }
    );

    await $('[data-test="nav-profile"]').click();

    await browser.waitUntil(
        async () => {
            const url = await browser.getUrl();
            return url.includes('profile');
        },
        {
            timeout: 10000,
            timeoutMsg: 'Expected to be redirected to profile page within 10s'
        }
    );

        
    const country = $('[data-test="country"]');
    await country.waitUntil(
        async () => {
            const value = await country.getValue();
            return value.should.not.equal('');
        },
        {
            timeout: 10000,
            timeoutMsg: 'Expected Country to be filled out within 10s'
        }
    );
});

/***SCENARIO 1****/
When(/^I update the profile information with correct information$/, async function() {7
    await $('[data-test="postal_code"]').setValue('12345');
    await $('[data-test="update-profile-submit"]').click();
});

Then(/^I see a success message with text "([^"]*)"$/, 
    async function(expectedText) {
    const success = $('.alert.alert-success');

    await success.waitForDisplayed({ timeout: 5000 });
    expect(await success.isDisplayed()).to.be.true;
    
    const actualText = await success.getText();
    assert.include(actualText, expectedText);
});

/***SCENARIO 2****/
When(/^I try to update the password to the same password currently in use$/, 
    async function() {
    await $('[data-test="current-password"]').setValue('welcome01');
    await $('[data-test="new-password"]').setValue('welcome01');
    await $('[data-test="new-password-confirm"]').setValue('welcome01');
    await $('[data-test="change-password-submit"]').click();
});

Then(/^I see a password change error message with text "([^"]*)"$/, 
    async function(expectedText) {
    
        const error = $('.alert.alert-danger');

        await error.waitForExist({ timeout: 10000 });
        await error.waitForDisplayed({ timeout: 10000 });
    
        const actualText = await error.getText();
        actualText.should.include(expectedText);
});