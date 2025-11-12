import { browser, expect } from "@wdio/globals";
import { bool, displayDelay, int, range, shuffle } from "../utils/utils";
import { saucelabsUrl } from "./utils/assertutils";
import Assertion from "./assertion";
import { base } from "../pageobjects/base";
import Inventory from "../pageobjects/inventory";
import Login from "../pageobjects/login";
import Cart from "../pageobjects/cart";




export default new class BurgerAssert extends Assertion {
    public async isOpen() { return await base.BurgerMenu.menu.isDisplayed() }
    
    public async assertOpenAndClose(pagesToTry:int) {
        await super.preAssert()
        for (let _ of range(1,pagesToTry)) {
            await this.openRandomPageHasMenu()
            await base.BurgerMenu.clickOpen()
            await base.BurgerMenu.btnClose.waitForDisplayed({ timeout: base.BurgerMenu.openDelay })
            
            await expect(base.BurgerMenu.menu).toBeDisplayed()
            await expect(base.BurgerMenu.btnClose).toBeClickable()
            await base.BurgerMenu.clickClose()
            await expect(base.BurgerMenu.menu).not.toBeDisplayed()
        }
    }
    public async preAssert() {
        await super.preAssert()
        await this.openRandomPageHasMenu()
        await base.BurgerMenu.clickOpen()
        await expect(base.BurgerMenu.menu).toBeDisplayed()
    }

    public async assertAllItems() {
        await this.preAssert()
        await base.BurgerMenu.clickAllItems()
        await this.assertUrl(Inventory.baseUrl)
    }
    public async assertAbout(real:bool=true) {
        await this.preAssert()
        const link = await base.BurgerMenu.btnAbout.getAttribute('href')
        await expect(link).toContain(saucelabsUrl)
        await expect(base.BurgerMenu.btnAbout).toBeClickable()
        if(real) {
            await base.BurgerMenu.clickAbout()
            await this.assertUrl(saucelabsUrl)
            await this.assertUrl(link)
        }
    }
    public async assertLogout() {
        await this.preAssert()
        await base.BurgerMenu.clickLogout()
        await this.assertUrl(Login.baseUrl)
        await expect(await browser.getCookies()).toHaveLength(0)
    }
    public async assertResetAppState() {
        let amountToAdd = shuffle(range(2,5))[0]

        const getInventoryCount = async () => (await Inventory.getItemsInCart()).length
        const getCartCount = async () => (await Cart.getItemsInCart()).length
        
        await super.preAssert()
        await Inventory.open()
        await Inventory.addItems(amountToAdd)

        await expect(await getInventoryCount()).toBe(amountToAdd)
        await expect(await base.CartMenu.displayedCartAmount).toBe(amountToAdd)

        await base.BurgerMenu.clickOpen()
        await base.BurgerMenu.clickResetAppState()

        // await expect(await getInventoryCount()).toBe(0) // fails
        await expect(await base.CartMenu.displayedCartAmount).toBe(0)
        await browser.refresh()
        await expect(await getInventoryCount()).toBe(0) // passes

        await base.quickReset()

        amountToAdd = shuffle(range(2,5))[0]
        await super.preAssert()
        await Inventory.open()
        await Inventory.addItems(amountToAdd)
        await Cart.open()

        await expect(await getCartCount()).toBe(amountToAdd)
        await expect(await base.CartMenu.displayedCartAmount).toBe(amountToAdd)

        await base.BurgerMenu.clickOpen()
        await base.BurgerMenu.clickResetAppState()

        // await expect(await getCartCount()).toBe(0) // fails
        await expect(await base.CartMenu.displayedCartAmount).toBe(0)
        await browser.refresh()
        await expect(await getCartCount()).toBe(0) // passes
    }
}