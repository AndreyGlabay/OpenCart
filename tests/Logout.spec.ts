// Test Case - Logout
//
// Tags: @master, @regression
//
// Steps:
// 1. Navigate to application URL 
// 2. Navigate to the Login page from Home page
// 3. Login with valid creds
// 4. Verify 'My Account' page 
// 5. Click on Logout link
// 6. Click on continue button
// 7. Verify user is redirected to Home page

import { test, expect } from "@playwright/test"
import { TestConfig } from "../test.config";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { MyAccountPage } from "../pages/MyAccountPage";
import { LogoutPage } from "../pages/LogoutPage";

// Declare shared vars 
let config: TestConfig;
let homePage: HomePage;
let loginPage: LoginPage;
let myAccountPage: MyAccountPage;
let logoutPage: LogoutPage;

// Setup before each test
test.beforeEach(async({page}) => {
    // Load test config
    config = new TestConfig(); 

    // 1. Navigate to application URL 
    await page.goto(config.appUrl);  

    // Initialize page objects
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    myAccountPage = new MyAccountPage(page);
    // logoutPage = new LogoutPage(page); // redudant at a logout test
});

// Optional clean up after each test
test.afterEach(async({page}) => {
    await page.close(); // Close browser tab (good practise in local/dev run)
});

test("User logout test @master, @regression", async() => {
    
    // 2. Navigate to the Login page from Home page
    await homePage.clickMyAccount();
    await homePage.clickLogin();

    // 3. Perform login with valid creds
    await loginPage.login(config.email, config.password);

    // 4. Verify 'My Account' page 
    expect(await myAccountPage.isMyAccountPageExists()).toBeTruthy();

    // 5. Click 'Logout', which returns LogoutPage instance
    logoutPage = await myAccountPage.clickLogout();

    // 6. Verify 'Continue' button is visible before clicking
    expect(await logoutPage.isContinueButtonVisible()).toBe(true);

    // 7. Click 'Continue' and verify redirection to Home page
    homePage = await logoutPage.clickContinue();
    expect(await homePage.isHomePageExists()).toBe(true);

});

