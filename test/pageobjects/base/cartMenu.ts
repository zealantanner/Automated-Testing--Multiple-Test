import { browser, expect, $ } from "@wdio/globals"
import Inventory from "../inventory.ts";
import Cart from "../cart.ts";
import { base } from "../base.ts";
import { int } from "../../utils/utils.ts";


export default class CartMenu {
    private get link() { return $('a.shopping_cart_link') }
    private get cartAmountIcon() { return this.link.$('span.shopping_cart_badge') }
    // public get itemsInCart() {
    //     return Inventory.items.filter(i => i.isInCart)
    // }
    // public get itemsNotInCart() {
    //     return Inventory.items.filter(i => !i.isInCart)
    // }

    public get displayedCartAmount() {
        return (async () => {
            const exists = await this.cartAmountIcon.isExisting()
            let amount = exists ? parseInt(await this.cartAmountIcon.getText()) : 0
            return amount
        })()
    }
    public async assertDisplayedCartAmount(amount:int) {
        const amountToAssert = await this.displayedCartAmount
        await expect(amountToAssert)
            .toBe(amount)
        await expect(amountToAssert)
            .toBeLessThanOrEqual(Cart.cartLimit)
        await expect(amountToAssert)
            .toBeGreaterThanOrEqual(0)
    }
    
    public async click() {
        await this.link.click()
    }
    public async assertClick() {
        await this.click()
        await expect(browser)
            .toHaveUrl(base.baseUrl)
    }

}


