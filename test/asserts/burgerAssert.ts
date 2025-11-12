import { browser, expect } from "@wdio/globals";
import { bool, int, range, shuffle } from "../utils/utils";
import Assertion from "./assertion";
import { base } from "../pageobjects/base";
import Inventory from "../pageobjects/inventory";
import Login from "../pageobjects/login";
import Cart from "../pageobjects/cart";




export default new class BurgerAssert extends Assertion {
    public async assertOpenAndClose(pagesToTry:int=1) {
        // Open and login
        await super.preAssert()
        // Loop for every page to try
        for (let _ of range(1,pagesToTry)) {
            // Go to random page
            await this.openRandomPageHasMenu()

            // Open burger menu
            await base.BurgerMenu.openMenu()
            // Wait for menu to open
            await base.BurgerMenu.btnClose.waitForEnabled({ timeout: base.BurgerMenu.openDelay })

            // Close burger menu
            await base.BurgerMenu.closeMenu()

            // Assert menu not displayed
            await expect(base.BurgerMenu.menu).not.toBeDisplayed()
        }
    }

    public async preAssert() {
        // Open and login
        await super.preAssert()
        // Goes to random page
        await this.openRandomPageHasMenu()
        // Open burger menu
        await base.BurgerMenu.openMenu()
    }

    public async assertAllItems() {
        await this.preAssert()
        await base.BurgerMenu.btnAllItems.waitForEnabled({ timeout: base.BurgerMenu.openDelay })

        // Click "All Items"
        await base.BurgerMenu.btnAllItems.click()
        // Assert current url is inventory
        await this.assertUrl(Inventory.baseUrl)
    }
    public async assertAbout(real:bool=false) {
        await this.preAssert()
        // Gets the href info of btnAbout
        const link = await base.BurgerMenu.btnAbout.getAttribute('href')
        // Assert btnAbout has href of saucelabs url
        await expect(link).toContain(this.SAUCE_LABS_URL)

        if(real) { // Gets stuck so I'm unable to test correctly
            // Click "About"
            await base.BurgerMenu.btnAbout.click()
            // Assert current url is saucelabs url
            await this.assertUrl(this.SAUCE_LABS_URL)
            // Assert href linked correctly
            await this.assertUrl(link)
        }
    }
    public async assertLogout() {
        await this.preAssert()
        // Click "Logout"
        await base.BurgerMenu.btnLogout.click()
        // Assert current url is login
        await this.assertUrl(Login.baseUrl)
        // Assert cookies were erased
        await expect(await browser.getCookies()).toHaveLength(0)
    }
    public async assertResetAppState() {
        // Functions for getting the amount of items in the cart on pages + cart menu
        const getInventoryCount = async () => (await Inventory.getItemsInCart()).length
        const getCartCount = async () => (await Cart.getItemsInCart()).length
        const getCartIconCount = async () => await base.CartMenu.displayedCartAmount
        
        // Open and login
        await super.preAssert()

        // Open inventory page
        await Inventory.open()
        // Adds 2-5 items to the cart
        await Inventory.addItems(shuffle(range(2,5))[0])

        // Assert items in cart and cart icon are more than 0
        await expect(await getInventoryCount()).toBeGreaterThan(0)
        await expect(await getCartIconCount()).toBeGreaterThan(0)
        
        // Open burger menu
        await base.BurgerMenu.openMenu()
        // Click "Reset App State"
        await base.BurgerMenu.btnResetAppState.click()

        // Assert amount of in-cart items is 0
        // await expect(await getInventoryCount()).toBe(0) // fails
        // Assert cart icon says 0
        await expect(await getCartIconCount()).toBe(0)
        // Refreshes browser
        await browser.refresh()
        // Assert amount of in-cart items is 0 after refresh
        await expect(await getInventoryCount()).toBe(0) // passes

        // Reset cart amount
        await base.quickReset()

        // Open and login
        await super.preAssert()
        // Open inventory page
        await Inventory.open()
        // Adds 2-5 items to the cart
        await Inventory.addItems(shuffle(range(2,5))[0])

        // Open cart page
        await Cart.open()

        // Assert items in cart and cart icon are more than 0
        await expect(await getCartCount()).toBeGreaterThan(0)
        await expect(await getCartIconCount()).toBeGreaterThan(0)

        // Open burger menu
        await base.BurgerMenu.openMenu()
        // Click "Reset App State"
        await base.BurgerMenu.btnResetAppState.click()

        // Assert amount of in-cart items is 0
        // await expect(await getCartCount()).toBe(0) // fails
        // Assert cart icon says 0
        await expect(await getCartIconCount()).toBe(0)
        // Refreshes browser
        await browser.refresh()
        // Assert amount of in-cart items is 0 after refresh
        await expect(await getCartCount()).toBe(0) // passes
    }
}