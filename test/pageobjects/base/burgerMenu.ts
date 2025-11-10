import { browser, $ } from "@wdio/globals";
import { range, shuffle, displayDelay } from "../../utils/utils.ts";
import { base } from "../base.ts";


export default class BurgerMenu {
    public get menu() { return $('.bm-menu-wrap') }
    public get btnOpen() { return $('button#react-burger-menu-btn') }
    public get btnClose() { return $('button#react-burger-cross-btn') }
    public get isOpen() { return this.menu.isDisplayed() }


    public async clickOpen() {
        await this.btnOpen.waitForDisplayed({ timeout: displayDelay })
        await this.btnOpen.click()
        await this.menu.waitForDisplayed({ timeout: displayDelay })
    }
    public async clickClose() {
        await this.menu.waitForDisplayed({ timeout: displayDelay })
        await this.btnClose.waitForDisplayed({ timeout: displayDelay })
        await this.btnClose.click()
        await this.menu.waitForDisplayed({ reverse:true, timeout: displayDelay })
    }

    public get btnAllItems() { return $('#inventory_sidebar_link') }
    public get btnAbout() { return $('#about_sidebar_link') }
    public get btnLogout() { return $('#logout_sidebar_link') }
    public get btnResetAppState() { return $('#reset_sidebar_link') }
    
    public async clickAllItems() {
        if(!this.isOpen) { await this.clickOpen() }
        await this.menu.waitForDisplayed({ timeout: displayDelay })
        await this.btnAllItems.waitForDisplayed({ timeout: displayDelay })
        await this.btnAllItems.click()
    }
    public async clickAbout() {
        if(!this.isOpen) { await this.clickOpen() }
        await this.menu.waitForDisplayed({ timeout: displayDelay })
        await this.btnAbout.waitForDisplayed({ timeout: displayDelay })
        await this.btnAbout.click()
        //> check if it's clickable
    }
    public async clickLogout() {
        if(!this.isOpen) { await this.clickOpen() }
        await this.menu.waitForDisplayed({ timeout: displayDelay })
        await this.btnLogout.waitForDisplayed({ timeout: displayDelay })
        await this.btnLogout.click()
    }
    //>assert
    // public async assertLogout() {
    //     await expect(this.btnLogout)
    //         .toBeDisplayed()
    //     await this.clickLogout()
    //     await expect(browser)
    //         .toHaveUrl(base.baseUrl)
    // }
    public async clickResetAppState() {
        if(!this.isOpen) { await this.clickOpen() }
        await this.menu.waitForDisplayed({ timeout: displayDelay })
        await this.btnResetAppState.waitForDisplayed({ timeout: displayDelay })
        await this.btnResetAppState.click()
    }
    //>assert
    // public async assertResetAppState() {
    //     const itemAmount = 3
    //     const beforeAmount = await base.Cart.displayedCartAmount
    //     for(const one of shuffle(range(1,itemAmount))) {
    //         await Inventory.assertAddItem(one)
    //     }
    //     await expect(await base.Cart.displayedCartAmount)
    //         .toBe(itemAmount+beforeAmount)

    //     await this.clickResetAppState()

    //     await expect(await base.Cart.displayedCartAmount)
    //         .toBe(0)
    // }
}

