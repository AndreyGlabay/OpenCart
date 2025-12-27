// Test Case - Add product to cart
//
// Tags: @master, @regression
//
// Steps:
// 1. Navigate to application URL 
// 2. Enter an existing product name in the search box 
// 3. Click the search button 
// 4. Verify the product appears in the search results 
// 5. Select the product 
// 6. Set quantity
// 7. Add the product to the cart
// 8. Verify the success message

import { test, expect } from "@playwright/test"
import { TestConfig } from "../test.config";
import { HomePage } from "../pages/HomePage";
import { SearchResultsPage } from "../pages/SearchResultsPage"; 
import { ProductPage } from "../pages/ProductPage"; 


// Define global vars
let config: TestConfig;
let homePage: HomePage;
let searchResultsPage: SearchResultsPage;
let productPage: ProductPage;

// This hook runs before each test
test.beforeEach(async({page}) => {
    config = new TestConfig(); // Load congig (URL, creds)

    // 1. Navigate to application URL 
    await page.goto(config.appUrl); // Navigate to base URL

    // Initialize page objects
    homePage = new HomePage(page);
    searchResultsPage = new SearchResultsPage(page);
    productPage = new ProductPage(page);
});

// Optional clean up after each test
test.afterEach(async({page}) => {
    await page.close(); // Close browser tab (good practise in local/dev run)
});

test("Add product to the cart test @master, @regression", async ({page}) => {

    // 2. Enter an existing product name in the search box 
    await homePage.enterProductName(config.productName);
    
    // 3. Click the search button 
    await homePage.clickSearch();
    
    // 4. Verify the product appears in the search results 
    expect(await searchResultsPage.isSearchResultsPageExists()).toBeTruthy();
    
    // 5. Select the product 
    const productName = config.productName;
    expect(await searchResultsPage.isProductExist(productName)).toBeTruthy();
    
    // 6-7-8 - Select product -> Set quantity -> Add to cart -> Verify confirmation 
    if (await searchResultsPage.selectProduct(productName)) {
        // productPage = await searchResultsPage.selectProduct(productName);
        await searchResultsPage.selectProduct(productName);
        await productPage.setQuantity(config.productQuantity); // Set quantity 
        await productPage.addToCart();

        // 8. Assert success message is visible
         expect(await productPage.isConfirmationMessageVisible()).toBeTruthy();
    }
    
});

