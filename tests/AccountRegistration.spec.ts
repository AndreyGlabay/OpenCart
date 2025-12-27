// Test Case - Account RegistrationPage
//
// Tags: @master, @sanity, @regression
//
// Steps:
// 1. Navigate to application URL 
// 2. Go to 'My Account' and click 'Register'
// 3. Fill in registration details with random data 
// 4. Agree to Privacy Policy and submit the form 
// 5. Validate the confirmation message

import { test, expect } from '@playwright/test'
import { HomePage } from '../pages/HomePage'
import { RegistrationPage } from '../pages/RegistrationPage'
import { RandomDataUtil } from '../utils/randomDataGenerator'
import { TestConfig } from '../test.config'

// Define global vars
let config: TestConfig;
let homePage: HomePage;
let registrationPage: RegistrationPage;

test.beforeEach(async({page}) => {

    // 1. Navigate to application URL 
    const config = new TestConfig();
    await page.goto(config.appUrl); 

    // 2. Create an object of 'HomePage' class
    homePage = new HomePage(page);

    // 3. Create an object of 'RegistrationPage' class
    registrationPage = new RegistrationPage(page);
})

test.afterEach(async({page}) => {
    await page.waitForTimeout(3000);
    await page.close();
})

test("User registrationm test  @master, @sanity, @regression", async() => {

    // 2. Go to 'My Account' and click 'Register'
    await homePage.clickMyAccount();
    await homePage.clickRegister();

    // 3. Fill in registration details with random data 
    await registrationPage.setFirstName(RandomDataUtil.getFirstName());
    await registrationPage.setLastName(RandomDataUtil.getlastName());
    await registrationPage.setEmail(RandomDataUtil.getEmail());
    await registrationPage.setTelephone(RandomDataUtil.getPhoneNumber());
    const password = RandomDataUtil.getPassword(); // save passw into var, to use the SAME passw for confirmation
    await registrationPage.setPassword(password);
    await registrationPage.setConfirmPassword(password);

    // 4. Agree to Privacy Policy and submit the form 
    await registrationPage.setPrivacyPolicy();
    await registrationPage.clickContinue();

    // 5. Validate the confirmation message
    const confirmationMsg = await registrationPage.getConfirmationMsg();
    expect(confirmationMsg).toContain("Your Account Has Been Created");

})

