import { browser, expect } from "@wdio/globals";
import { displayDelay } from "../utils/utils";
import Base from "../pageobjects/base";
import Cart from "../pageobjects/cart";
import Checkout from "../pageobjects/checkout";
import Login from "../pageobjects/login";
import Inventory from "../pageobjects/inventory";



export default class CartAssert {
    public async clickCheckout() {
        await Cart.clickCheckout() 
        await expect(browser)
            .toHaveUrl(Checkout.baseUrl)
    }

    public async clickBtnRemove(index=0) {
        const amountBefore = await Cart.btnsRemove.length
        const btnToClick = Cart.btnsRemove[index]
        await Cart.clickBtnRemove(index)
        await btnToClick.waitForDisplayed({ reverse:true, timeout: displayDelay })
        const amountAfter = await Cart.btnsRemove.length
        await expect(btnToClick)
            .not.toBeExisting()
        await expect(amountBefore-1)
            .toBe(amountAfter)
    }

    public async clickBtnContinueShopping() {
        await Cart.btnContinueShopping.waitForDisplayed({ timeout: displayDelay })
        await expect(Cart.btnContinueShopping)
            .toBeExisting()
        await Cart.clickBtnContinueShopping()
        await Cart.btnContinueShopping.waitForDisplayed({ reverse:true, timeout: displayDelay })
        await expect(Cart.btnContinueShopping)
            .not.toBeExisting()
        await expect(browser)
            .toHaveUrl(Inventory.baseUrl)
    }

}