import { browser, expect, $ } from "@wdio/globals";
import { range, shuffle } from "../../utils/utils.ts";
import Inventory from "../inventory.ts";
import { base } from "../base.ts";


export default class HamburgerMenu {
    private get menu() { return $('.bm-menu-wrap') }
    private get btnOpen() { return $('button#react-burger-menu-btn') }
    private get btnClose() { return $('button#react-burger-cross-btn') }
    public get isOpen() { return this.menu.isDisplayed() }


    public async clickOpen() {
        await this.btnOpen.waitForDisplayed({ timeout: base.delay })
        await this.btnOpen.click()
        await this.menu.waitForDisplayed({ timeout: base.delay })
    }
    public async assertOpen() {
        await this.menu.waitForDisplayed({ reverse:true, timeout: base.delay })
        await expect(await this.isOpen)
            .toBe(false)
        await this.clickOpen()
        await this.menu.waitForDisplayed({ timeout: base.delay })
        await expect(await this.isOpen)
            .toBe(true)
    }
    public async clickClose() {
        await this.menu.waitForDisplayed({ timeout: base.delay })
        await this.btnClose.waitForDisplayed({ timeout: base.delay })
        await this.btnClose.click()
        await this.menu.waitForDisplayed({ reverse:true, timeout: base.delay })
    }
    public async assertClose() {
        await this.menu.waitForDisplayed({ timeout: base.delay })
        await this.btnClose.waitForDisplayed({ timeout: base.delay })
        await expect(await this.isOpen)
            .toBe(true)
        await this.clickClose()
        await this.menu.waitForDisplayed({ reverse:true, timeout: base.delay })
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
        await this.menu.waitForDisplayed({ timeout: base.delay })
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
        await this.menu.waitForDisplayed({ timeout: base.delay })
        await this.btnAbout.waitForDisplayed({ timeout: base.delay })
        await this.btnAbout.click()
        //> check if it's clickable
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
        await this.menu.waitForDisplayed({ timeout: base.delay })
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
        await this.menu.waitForDisplayed({ timeout: base.delay })
        await this.btnResetAppState.waitForDisplayed({ timeout: base.delay })
        await this.btnResetAppState.click()
    }
    public async assertResetAppState() {
        const itemAmount = 3
        const beforeAmount = await base.Cart.displayedCartAmount
        for(const one of shuffle(range(1,itemAmount))) {
            await Inventory.assertAddItem(one)
        }
        await expect(await base.Cart.displayedCartAmount)
            .toBe(itemAmount+beforeAmount)

        await this.clickResetAppState()

        await expect(await base.Cart.displayedCartAmount)
            .toBe(0)
    }
}

