import Base, { base } from "../pageobjects/base";
import Inventory from "../pageobjects/inventory";
import Login from "../pageobjects/login";
import { displayDelay } from "../utils/utils";




export default class BurgerAssert {
    public async assertClickOpen() {
        await base.BurgerMenu.menu.waitForDisplayed({ reverse:true, timeout: displayDelay })
        await expect(await base.BurgerMenu.isOpen)
            .toBe(false)
        await base.BurgerMenu.clickOpen()
        await base.BurgerMenu.menu.waitForDisplayed({ timeout: displayDelay })
        await expect(await base.BurgerMenu.isOpen)
            .toBe(true)
    }
    public async assertClickClose() {
        await base.BurgerMenu.menu.waitForDisplayed({ timeout: displayDelay })
        await base.BurgerMenu.btnClose.waitForDisplayed({ timeout: displayDelay })
        await expect(await base.BurgerMenu.isOpen)
            .toBe(true)
        await base.BurgerMenu.clickClose()
        await base.BurgerMenu.menu.waitForDisplayed({ reverse:true, timeout: displayDelay })
        await base.BurgerMenu.btnClose.waitForDisplayed({ reverse:true, timeout: displayDelay })
        await expect(await base.BurgerMenu.isOpen)
            .toBe(false)
    }

    public async assertAbout() {
        await expect(base.BurgerMenu.btnAbout)
            .toBeDisplayed()
        const link = await base.BurgerMenu.btnAbout.getAttribute('href')
        await expect(link)
            .toContain("https://saucelabs.com")
    }



    public async assertClickAllItems() {
        await base.BurgerMenu.clickAllItems()
        await expect(browser)
            .toHaveUrl(Inventory.baseUrl)
    }
    

}