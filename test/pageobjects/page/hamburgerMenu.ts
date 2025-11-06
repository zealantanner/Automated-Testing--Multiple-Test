import { browser, $ } from "@wdio/globals";
import { _, int } from "../../utils/utils";
import Inventory from "../inventory";
import Page from "../page";

export default class HamburgerMenu {
    private get menu() { return $('.bm-menu-wrap') }
    private get btnOpen() { return $('button#react-burger-menu-btn') }
    private get btnClose() { return $('button#react-burger-cross-btn') }
    public get isOpen() { return this.menu.isDisplayed() }
    private timeToOpen:int = 500;

    public async clickOpen(doAssert=false) {
        if(doAssert) { await expect.soft(this.isOpen).toBe(false) }
        await this.btnOpen.click()
        await browser.pause(this.timeToOpen)
        if(doAssert) { await expect.soft(this.isOpen).toBe(true) }
    }
    public async clickClose(doAssert=false) {
        if(doAssert) { await expect.soft(this.isOpen).toBe(true) }
        await this.btnClose.click()
        await browser.pause(this.timeToOpen)
        if(doAssert) { await expect.soft(this.isOpen).toBe(false) }
    }

    private get btnAllItems() { return $('#inventory_sidebar_link') }
    private get btnAbout() { return $('#about_sidebar_link') }
    private get btnLogout() { return $('#logout_sidebar_link') }
    private get btnResetAppState() { return $('#reset_sidebar_link') }
    
    public async clickAllItems(doAssert=false) {
        if(!this.isOpen) { await this.clickOpen(doAssert) }
        if(doAssert) {
            await expect.soft(this.btnAllItems).toBeDisplayed()
        }
        await this.btnAllItems.click()
        if(doAssert) {
            await expect(browser).toHaveUrl(expect.stringContaining("inventory.html"))
        }
    }
    public async clickAbout(doAssert=false) {
        if(!this.isOpen) { await this.clickOpen(doAssert) }
        if(doAssert) {
            await expect.soft(this.btnAllItems).toBeDisplayed()
        }
        await this.btnAbout.click()
        if(doAssert) {
            await expect(browser).toHaveUrl("https://saucelabs.com")
        }
    }
    public async clickLogout(doAssert=false) {
        if(!this.isOpen) { await this.clickOpen(doAssert) }
        if(doAssert) {
            await expect.soft(this.btnAllItems).toBeDisplayed()
        }
        await this.btnLogout.click()
        if(doAssert) {
            await expect(browser).toHaveUrl("https://www.saucedemo.com")
        }
    }
    public async clickResetAppState(doAssert=false) {
        if(doAssert) {
            const itemAmount = 3
            const beforeAmount = await Page.Cart.getDisplayedCartAmount(doAssert)
            await Inventory.addRandItemsToCart(itemAmount)
            await expect.soft(Page.Cart.getDisplayedCartAmount(doAssert)).toBe(itemAmount+beforeAmount)
        }
        if(!this.isOpen) { await this.clickOpen(doAssert) }
        if(doAssert) {
            await expect.soft(this.btnAllItems).toBeDisplayed()
        }
        await this.btnResetAppState.click()
        if(doAssert) {
            for(let item of Inventory.items) {
                await expect.soft(item.isInCart).toBe(false)
                await expect.soft(item.getIsDisplayedInCart(doAssert)).toBe(false)
            }
            await expect.soft(Page.Cart.getDisplayedCartAmount(doAssert)).toBe(0)
            Page.Cart.getDisplayedCartAmount(doAssert)
            //> make sure those items get cleared
                //> the add to cart buttons get reset
                //> the cart icon on top right goes back to none
        }
    }
}
