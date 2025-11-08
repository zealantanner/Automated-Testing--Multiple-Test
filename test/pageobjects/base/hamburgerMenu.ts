import { browser, expect, $ } from "@wdio/globals";
import { int } from "../../utils/utils.ts";
import Inventory from "../inventory.ts";
import Base, { base } from "../base.ts";
import Login from "../login.ts";


export default class HamburgerMenu {
    private get menu() { return $('.bm-menu-wrap') }
    private get btnOpen() { return $('button#react-burger-menu-btn') }
    private get btnClose() { return $('button#react-burger-cross-btn') }
    public get isOpen() { return this.menu.isDisplayed() }


    public async clickOpen() {
        await this.btnOpen.waitForDisplayed({ timeout: base.delay })
        await this.btnOpen.click()
    }
    public async assertOpen() {
        await expect(await this.isOpen)
            .toBe(false)
        await this.btnClose.waitForDisplayed({ reverse:true, timeout: base.delay })
        await this.clickOpen()
        await expect(await this.isOpen)
            .toBe(true)
    }
    public async clickClose() {
        await this.btnClose.waitForDisplayed({ timeout: base.delay })
        await this.btnClose.click()
    }
    public async assertClose() {
        await expect(await this.isOpen)
            .toBe(true)
        await this.clickClose()
        await this.btnClose.waitForDisplayed({ reverse:true, timeout: base.delay })
        await expect(await this.isOpen)
            .toBe(false)
    }

    private get btnAllItems() { return $('#inventory_sidebar_link') }
    private get btnAbout() { return $('#about_sidebar_link') }
    private get btnLogout() { return $('#logout_sidebar_link') }
    private get btnResetAppState() { return $('#reset_sidebar_link') }
    
    public async clickAllItems() {
        if(!this.isOpen) { await this.clickOpen() }
        await this.btnAllItems.waitForDisplayed({ timeout: base.delay })
        await this.btnAllItems.click()
    }
    public async assertAllItems() {
        await this.clickAllItems()
        await expect(browser)
            .toHaveUrl(Inventory.baseUrl)
    }
    public async clickAbout() {
        if(!this.isOpen) { await this.clickOpen() }
        await this.btnAbout.waitForDisplayed({ timeout: base.delay })
        await this.btnAbout.click()
    }
    public async assertAbout() {
        await expect(this.btnAbout)
            .toBeDisplayed()
        const link = await this.btnAbout.getAttribute('href')
        await expect(link)
            .toContain("https://saucelabs.com")
    }
    public async clickLogout() {
        if(!this.isOpen) { await this.clickOpen() }
        await this.btnLogout.waitForDisplayed({ timeout: base.delay })
        await this.btnLogout.click()
    }
    public async assertLogout() {
        await expect(this.btnLogout)
            .toBeDisplayed()
        await this.clickLogout()
        await expect(browser)
            .toHaveUrl(base.baseUrl)
    }
    public async clickResetAppState() {
        if(!this.isOpen) { await this.clickOpen() }
        await this.btnResetAppState.waitForDisplayed({ timeout: base.delay })
        await this.btnResetAppState.click()
    }
    public async assertResetAppState() {
        const itemAmount = 3
        const beforeAmount = await base.Cart.displayedCartAmount

        await Inventory.addRandItemsToCart(itemAmount)

        await expect(await base.Cart.displayedCartAmount)
            .toBe(itemAmount+beforeAmount)

        await this.clickResetAppState()

        await expect(base.Cart.itemsInCart.length)
            .toBe(0)
        await expect(await base.Cart.displayedCartAmount)
            .toBe(0)
    }
}

