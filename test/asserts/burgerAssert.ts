import { browser, expect } from "@wdio/globals";
import { bool, displayDelay, int, range } from "../utils/utils";
import { saucelabsUrl } from "./utils/assertutils";
import Assertion from "./assertion";
import { base } from "../pageobjects/base";
import Inventory from "../pageobjects/inventory";
import Login from "../pageobjects/login";




export default new class BurgerAssert extends Assertion {
    private get isOpen() { return base.BurgerMenu.menu.isDisplayed() }
    
    public async assertOpenAndClose(pagesToTry:int) {
        await this.preAssert()
        await this.assertUrl(Inventory.baseUrl)
        for (let _ of range(1,pagesToTry)) {
            await this.openRandomPageHasMenu()
            await base.BurgerMenu.clickOpen()
            await base.BurgerMenu.menu.waitForDisplayed({ timeout: displayDelay })
            await expect(await this.isOpen)
                .toBe(true)
            await base.BurgerMenu.clickClose()
            await base.BurgerMenu.menu.waitForDisplayed({ reverse:true, timeout: displayDelay })
            await expect(await this.isOpen)
                .toBe(false)
        }
    }
    public async preAssert() {
        await super.preAssert()
        await this.openRandomPageHasMenu()
        await base.BurgerMenu.clickOpen()
        await expect(base.BurgerMenu.menu)
            .toBeDisplayed()
    }

    public async assertAllItems() {
        await this.preAssert()
        await base.BurgerMenu.clickAllItems()
        await this.assertUrl(Inventory.baseUrl)
    }
    public async assertAbout(real:bool=true) {
        await this.preAssert()
        const link = await base.BurgerMenu.btnAbout.getAttribute('href')
        await expect(link)
            .toContain(saucelabsUrl)
        await expect(base.BurgerMenu.btnAbout)
            .toBeClickable()
        if(real) {
            await base.BurgerMenu.clickAbout()
            await this.assertUrl(saucelabsUrl)
            await this.assertUrl(link)
        }
    }
    public async assertLogout() {
        await this.preAssert()
        await base.BurgerMenu.clickLogout()
        await base.BurgerMenu.btnOpen.waitForDisplayed({ reverse:true, timeout: displayDelay })
        await this.assertUrl(Login.baseUrl)
        await expect(await browser.getCookies())
            .toHaveLength(0)
    }
    public async assertResetAppState(itemAmount:int=3) {
        await super.preAssert()
        const beforeAmount = await base.CartMenu.displayedCartAmount
        console.log(beforeAmount)
        await Inventory.addItems(3)

        await expect(await base.CartMenu.displayedCartAmount)
            .toBe(itemAmount+beforeAmount)
        await base.BurgerMenu.clickOpen()
        await base.BurgerMenu.clickResetAppState()
        await expect(await base.CartMenu.displayedCartAmount)
            .toBe(0)
        browser.refresh()
        await Inventory.open() // need to refresh in order to pass
        //> fails here, ON PURPOSE (if you don't refresh)
        //> also fails on the cart page
        await expect(await Inventory.btnsRemove.length)
            .toBe(0)
    }
}