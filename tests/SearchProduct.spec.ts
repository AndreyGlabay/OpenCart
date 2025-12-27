// Test Case - Product Search
//
// Tags: @master, @regression
//
// Steps:
// 1. Navigate to application URL 
// 2. Enter the product name in the search field 
// 3. Click the 'Search' button
// 4. Verify is the product is displayed in the search results

import { test, expect } from "@playwright/test";
import { TestConfig } from "../test.config";
import { HomePage } from "../pages/HomePage";
import { SearchResultsPage } from "../pages/SearchResultsPage";

// Declare shared vars 
let config: TestConfig;
let homePage: HomePage;
let searchResultsPage: SearchResultsPage;

// PW hook - runs before each test
test.beforeEach(async({page}) => {
    config = new TestConfig(); // Load congig (URL, creds)

    // 1. Navigate to application URL 
    await page.goto(config.appUrl); // Navigate to base URL

    // Initialize page objects
    homePage = new HomePage(page);
    searchResultsPage = new SearchResultsPage(page);
});

// PW hook - runs after each test
test.afterEach(async({page}) => {
    await page.close(); // Close browser tab (good practise in local/dev run)
});

test("Product search test @master, @regression", async() => {
    const productName = config.productName;

    // 2 & 3 - Enter product name and click 'Search'
    await homePage.enterProductName(productName);
    await homePage.clickSearch();

    // 4. Verify that the search results page is displayed 
    expect(await searchResultsPage.isSearchResultsPageExists()).toBeTruthy();

    // 5. Validate is the searched product appears in results
    const isProductFound = await searchResultsPage.isProductExist(productName);
    expect(isProductFound).toBeTruthy();

});

