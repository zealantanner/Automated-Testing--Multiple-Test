import { browser, expect } from "@wdio/globals";
import { displayDelay } from "../utils/utils";
import Assertion from "./assertion";
import { base } from "../pageobjects/base";
import Cart from "../pageobjects/cart";
import Checkout from "../pageobjects/checkout";
import Login from "../pageobjects/login";
import Inventory from "../pageobjects/inventory";



export default new class CartAssert extends Assertion {
    public async clickCheckout() {
        await Cart.clickCheckout()
        await this.assertUrl(Checkout.baseUrl)
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
        await this.assertUrl(Inventory.baseUrl)
    }
    public async assertCartIconNumber() {

    }
    public async assertCartClickDirect() {

    }
    public async assertCartCRUD() {

    }
    public async assertRemovingItems() {

    }
    public async assertBtnContinueShopping() {

    }
    public async assertBtnCheckout() {

    }
    public async assertItemLinks() {

    }
}