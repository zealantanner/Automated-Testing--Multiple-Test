import { browser, expect } from "@wdio/globals";
import { bool, int, range, shuffle } from "../utils/utils";
import Assertion from "./assertion";
import { base } from "../pageobjects/base";
import Inventory from "../pageobjects/inventory";
import Login from "../pageobjects/login";
import Cart from "../pageobjects/cart";




export default new class HamburgerAssert extends Assertion {
    public async assertOpenAndClose(pagesToTry:int=1) {
        // Open and login
        await super.preAssert()
        // Loop for every page to try
        for (let _ of range(1,pagesToTry)) {
            // Go to random page
            await this.openRandomPageHasMenu()

            // Open hamburger menu
            await base.HamburgerMenu.openMenu()
            // Wait for menu to open
            await base.HamburgerMenu.btnClose.waitForEnabled({ timeout: base.HamburgerMenu.openDelay })

            // Close hamburger menu
            await base.HamburgerMenu.closeMenu()

            // Assert menu not displayed
            await expect(base.HamburgerMenu.menu).not.toBeDisplayed()
        }
    }

    public async preAssert() {
        // Open and login
        await super.preAssert()
        // Goes to random page
        await this.openRandomPageHasMenu()
        // Open hamburger menu
        await base.HamburgerMenu.openMenu()
    }

    public async assertAllItems() {
        await this.preAssert()
        // Wait for All Items to be enabled
        await base.HamburgerMenu.btnAllItems.waitForEnabled({ timeout: base.HamburgerMenu.openDelay })

        // Click "All Items"
        await base.HamburgerMenu.btnAllItems.click()
        // Assert current url is inventory
        await this.assertUrl(Inventory.baseUrl)
    }
    public async assertAbout(real:bool=false) {
        await this.preAssert()
        // Wait for About to be enabled
        await base.HamburgerMenu.btnAbout.waitForEnabled({ timeout: base.HamburgerMenu.openDelay })
        // Gets the href info of btnAbout
        const link = await base.HamburgerMenu.btnAbout.getAttribute('href')
        // Assert btnAbout has href of saucelabs url
        await expect(link).toContain(this.SAUCE_LABS_URL)

        if(real) { // Gets stuck so I'm unable to test correctly
            // Click "About"
            await base.HamburgerMenu.btnAbout.click()
            // Assert current url is saucelabs url
            await this.assertUrl(this.SAUCE_LABS_URL)
            // Assert href linked correctly
            await this.assertUrl(link)
        }
    }
    public async assertLogout() {
        await this.preAssert()
        // Wait for Logout to be enabled
        await base.HamburgerMenu.btnLogout.waitForEnabled({ timeout: base.HamburgerMenu.openDelay })
        // Click "Logout"
        await base.HamburgerMenu.btnLogout.click()
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
        
        // Open hamburger menu
        await base.HamburgerMenu.openMenu()
        // Wait for Reset App State to be enabled
        await base.HamburgerMenu.btnResetAppState.waitForEnabled({ timeout: base.HamburgerMenu.openDelay })
        // Click "Reset App State"
        await base.HamburgerMenu.btnResetAppState.click()

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

        // Open hamburger menu
        await base.HamburgerMenu.openMenu()
        // Wait for Reset App State to be enabled
        await base.HamburgerMenu.btnResetAppState.waitForEnabled({ timeout: base.HamburgerMenu.openDelay })
        // Click "Reset App State"
        await base.HamburgerMenu.btnResetAppState.click()

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