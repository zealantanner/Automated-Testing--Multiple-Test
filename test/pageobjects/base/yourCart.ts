import { browser, expect, $ } from "@wdio/globals"
import Inventory from "../inventory.ts";
import Cart from "../cart.ts";
import { base } from "../base.ts";


export default class YourCart {
    private get link() { return $('a.shopping_cart_link') }
    private get cartAmountIcon() { return this.link.$('span.shopping_cart_badge') }
    public get itemsInCart() {
        return Inventory.items.filter(i => i.isInCart)
    }
    public get itemsNotInCart() {
        return Inventory.items.filter(i => !i.isInCart)
    }

    public get displayedCartAmount() {
        return (async () => {
            const exists = await this.cartAmountIcon.isExisting()
            let amount = exists ? parseInt(await this.cartAmountIcon.getText()) : 0
            return amount
        })()
    }
    public async assertDisplayedCartAmount() {
        const amountToAssert = await this.displayedCartAmount
        await expect(displayedAmount)
            .toBe(amountToAssert)
        await expect(displayedAmount)
            .toBeLessThanOrEqual(Cart.cartLimit)
        await expect(displayedAmount)
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


