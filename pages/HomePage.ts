import { Page, expect, Locator } from '@playwright/test';
import { truncate } from 'node:fs';

export class HomePage{

    private readonly page: Page;

    // locators
    private readonly lnkMyAccount: Locator;
    private readonly lnkRegister: Locator;
    private readonly linkLogin: Locator;
    private readonly txtSearchbox: Locator;
    private readonly btnSearch: Locator;


    // constuctor
    constructor(page:Page){
        this.page = page;
        this.lnkMyAccount = page.locator('span:has-text("My Account")');
        this.lnkRegister = page.locator('a:has-text("Register")');
        this.linkLogin = page.locator('a:has-text("Login")');
        this.txtSearchbox = page.locator('input[placeholder="Search"]');
        this.btnSearch = page.locator('#search button[type="button"]');
    }


    // actions methods    
    // check if HomePage exists
    async isHomePageExists(){

        let title:string = await this.page.title();
        if(title) {
            return true;
        }
        return false;
    }

    // Click "My Account" link
    async clickMyAccount() {
        try{
            await this.lnkMyAccount.click();
        } catch (error) {
            console.log(`Exception occured while clicking 'My Account': ${error}`);
            throw error;
        }
    }

    // Click "Register" link
    async clickRegister() {
        try{
            await this.lnkRegister.click();
        } catch (error) {
            console.log(`Exception occured while clicking 'Register: ${error}`);
            throw error;
        }
    }

    // Click "Login" link
    async clickLogin() {
        try{
            // Ensure the Login link is visible before clicking
            await this.linkLogin.waitFor({ state: 'visible', timeout: 5000 });
            await this.linkLogin.click();
        } catch (error) {
            console.log(`Exception occured while clicking 'Login': ${error}`);
            throw error;
        }

    }

    // Enter product name at the search box
    async enterProductName(pName: string){
        try {
            await this.txtSearchbox.fill(pName);
        } catch (error) {
            console.log(`Exception occured while entering product name: ${error}`);
            throw error;
        }
    }

    // Click the Search button
    async clickSearch() {
        try{
            await this.btnSearch.click();
        } catch (error) {
            console.log(`Exception occured while clicking 'Search': ${error}`);
            throw error;
        }
    }



}