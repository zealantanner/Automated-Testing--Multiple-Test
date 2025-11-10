import { browser, expect } from "@wdio/globals";
import { displayDelay, int, range, shuffle } from "../utils/utils";
import { saucelabsUrl, validUser } from "./utils/assertutils";
import Assertion from "./assertion";
import Base, { base } from "../pageobjects/base";
import Inventory from "../pageobjects/inventory";
import Login from "../pageobjects/login";




export default new class BurgerAssert extends Assertion {
    public get isOpen() { return base.BurgerMenu.menu.isDisplayed() }
    
    public async assertOpenAndClose(pagesToTry:int) {
        await Login.open()
        await Login.login(validUser)
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

    public async assertAllItems() {
        await base.BurgerMenu.clickAllItems()
        await expect(browser)
            .toHaveUrl(Inventory.baseUrl)
    }
    public async assertAbout() {
        await expect(base.BurgerMenu.btnAbout)
            .toBeDisplayed()
        // const link = await base.BurgerMenu.btnAbout.getAttribute('href')
        await this.assertUrl(saucelabsUrl)
        // await expect(link)
        //     .toContain("https://saucelabs.com")
        //> check href and if it's clickable
    }
    public async assertLogout() {
        await expect(base.BurgerMenu.btnLogout)
            .toBeDisplayed()
        await base.BurgerMenu.clickLogout()
        await expect(browser)
            .toHaveUrl(base.baseUrl)
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



    public async assertClickAllItems() {
        await base.BurgerMenu.clickAllItems()
        await expect(browser)
            .toHaveUrl(Inventory.baseUrl)
    }
    

}