import { $, expect } from "@wdio/globals"
import { int } from "../../utils/utils";
import Inventory from "../inventory";
import Page from "../page";
import Cart from "../cart";


export default class YourCart {
    private get link() { return $('a.shopping_cart_link') }
    private get cartAmountIcon() { return this.link.$('span.shopping_cart_badge') }
    public get itemsInCart() {
        return Inventory.items.filter(i => i.isInCart)
    }
    public get itemsNotInCart() {
        return Inventory.items.filter(i => !i.isInCart)
    }

    public async getDisplayedCartAmount(doAssert=false) {
        let amount:int;
        if(await this.cartAmountIcon.isExisting()) {
            amount = parseInt(await this.cartAmountIcon.getText())
        } else {
            amount = 0
        }
        if(doAssert) {
            const amountToAssert = this.itemsInCart.length
            await expect.soft(amount)
                .toBe(amountToAssert)
            await expect.soft(amount)
                .toBeLessThanOrEqual(Cart.cartLimit)
            await expect.soft(amount)
                .toBeGreaterThanOrEqual(0)
        }
        return amount
    }
    public async click(doAssert=false) {
        await this.link.click()
        if(doAssert) {
            await expect(browser)
                .toHaveUrl(new Page().baseUrl)
        }
    }

}
