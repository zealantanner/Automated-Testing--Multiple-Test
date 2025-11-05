import { browser, expect, $ } from "@wdio/globals";
import { str, bool, int } from "../utils/utils"
import Login from "./login";
import Inventory from "./inventory";

class HamburgerMenu {
    private get menu() { return $('.bm-menu-wrap') }
    private get openButton() { return $('button#react-burger-menu-btn') } //> chane these to btn
    private get closeButton() { return $('button#react-burger-cross-btn') }
    public get isOpen() { return this.menu.isDisplayed() }
    private timeToOpen:int = 500;

    public async open(doAssert:bool=false) {
        if(doAssert) { await expect(this.isOpen).toBe(false) }
        await this.openButton.click()
        await browser.pause(this.timeToOpen)
        if(doAssert) { await expect(this.isOpen).toBe(true) }
    }
    public async close(doAssert:bool=false) {
        if(doAssert) { await expect(this.isOpen).toBe(true) }
        await this.closeButton.click()
        await browser.pause(this.timeToOpen)
        if(doAssert) { await expect(this.isOpen).toBe(false) }
    }

    private get allItemsButton() { return $('#inventory_sidebar_link') }
    private get aboutButton() { return $('#about_sidebar_link') }
    private get logoutButton() { return $('#logout_sidebar_link') }
    private get resetAppStateButton() { return $('#reset_sidebar_link') }
    
    public async clickAllItems(alreadyOpen=false, doAssert=false) {
        if(!alreadyOpen) { await this.open(doAssert) }
        if(doAssert) { await expect(this.allItemsButton).toBeDisplayed() }
        await this.allItemsButton.click()
        if(doAssert) { await expect(browser).toHaveUrl(expect.stringContaining("inventory.html")) }
    }
    public async clickAbout(alreadyOpen=false, doAssert=false) {
        if(!alreadyOpen) { await this.open(doAssert) }
        if(doAssert) { await expect(this.allItemsButton).toBeDisplayed() }
        await this.aboutButton.click()
        if(doAssert) { await expect(browser).toHaveUrl("https://saucelabs.com") }
    }
    public async clickLogout(alreadyOpen=false, doAssert=false) {
        if(!alreadyOpen) { await this.open(doAssert) }
        if(doAssert) { await expect(this.allItemsButton).toBeDisplayed() }
        await this.logoutButton.click()
        if(doAssert) { await expect(browser).toHaveUrl("https://www.saucedemo.com") }
    }
    public async clickResetAppState(alreadyOpen=false, doAssert=false) {
        if(!alreadyOpen) { await this.open(doAssert) }
        if(doAssert) { await expect(this.allItemsButton).toBeDisplayed() }
        if(doAssert) {

            //> add an item to the cart
        }
        await this.resetAppStateButton.click()
        if(doAssert) {
            //> make sure those items get cleared
        }
    }
}

class YourCart {
    private get link() { return $('a.shopping_cart_link') }
    private get cartAmountIcon() { return $('span.shopping_cart_badge') }
    public get cartAmount() { return this.cartAmountIcon.getText() }
}

/** base page */
export default class Page {
    static Hamburger = new HamburgerMenu();
    static Cart = new YourCart();
    protected get textLogo() { return $('//*[contains(@class,"logo") and contains(text(),"Swag Labs")]') }

    /** @param path https://www.saucedemo.com/{{path}} */
    open(path:str="") {
        return browser.url(`https://www.saucedemo.com/${path}`)
    }
}