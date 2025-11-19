const { Given, When, Then } = require('@wdio/cucumber-framework');
const { $ } = require('@wdio/globals')
const chai = require('chai');
const { assert, should, expect } = require('chai');
chai.should(); // Enable should syntax

Given(/^I am on the registration page$/, async function () {
    await browser.url('/auth/register');
});

Given(/^an already registered user (.+) (.+)$/, async function (firstname, lastname) {
});

/***SCENARIO 1****/
When(/^I enter (.+) (.+) (.+) (.+) in the registration form$/, 
    async function (firstname, lastname, email, password) {
        await $('#first_name').setValue(firstname);
        await $('#last_name').setValue(lastname);

        await $('#dob').setValue('1999-01-02');
        await $('#street').setValue('123 Road Street');
        await $('#postal_code').setValue('12345');
        await $('#city').setValue('NYC');
        await $('#state').setValue('New York');
        await $('#country').selectByAttribute('value', 'US');
        await $('#phone').setValue('123456789');

        await $('#email').setValue(email);
        await $('#password').setValue(password);

        await $('button[type="submit"]').click();
    });

Then(/^I see a "([^"]*)" error message with text "([^"]*)"$/, async function (errorType, expectedText) {
    const selectorsError = {
        'email': '[data-test="email-error"]',
        'registration': '[data-test="register-error"]'
    }
    const error = await $(selectorsError[errorType]);

    // Using expect for visibility
    await error.waitForDisplayed({ timeout: 5000 });
    expect(await error.isDisplayed()).to.be.true;
    
    // Using assert for text content
    const actualText = await error.getText();
    assert.include(actualText, expectedText);
});

Then(/^the account is not created$/, async function () {
    const url = await browser.getUrl();
        
    // Using should for URL check
    url.should.include('auth/register');
});

/***SCENARIO 2****/
When(/^I fill out the registration form without email address$/, async function() {
    await $('#first_name').setValue('Alan');
    await $('#last_name').setValue('Smith');

    await $('#dob').setValue('1999-01-02');
    await $('#street').setValue('123 Road Street');
    await $('#postal_code').setValue('12345');
    await $('#city').setValue('NYC');
    await $('#state').setValue('New York');
    await $('#country').selectByAttribute('value', 'US');
    await $('#phone').setValue('123456789');

    await $('#email').setValue('');
    await $('#password').setValue('Welcome01.');

    await $('button[type="submit"]').click();
});

/***SCENARIO 3****/
When(/^I fill out the registration form correctly$/, async function () {
    
    await $('#first_name').setValue('Alan');
    await $('#last_name').setValue('Smith');

    await $('#dob').setValue('1999-01-02');
    await $('#street').setValue('123 Road Street');
    await $('#postal_code').setValue('12345');
    await $('#city').setValue('NYC');
    await $('#state').setValue('New York');
    await $('#country').selectByAttribute('value', 'US');
    await $('#phone').setValue('123456789');

    const timestamp = Date.now();
    uniqueEmail = `alan.smith${timestamp}@test.com`
    await $('#email').setValue(uniqueEmail);
    await $('#password').setValue('Yjkasd2oasdww.');

    await $('button[type="submit"]').click();
});

Then (/^the account is created$/, async function () {
    await browser.waitUntil(
        async () => {
            const url = await browser.getUrl();
            // Using expect in wait condition
            return expect(url).to.include('auth/login');
        },
        {
            timeout: 5000,
            timeoutMsg: 'Expected to be redirected to login page within 5s'
        }
    );
});
