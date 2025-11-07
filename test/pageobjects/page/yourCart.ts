import { $, expect } from "@wdio/globals"
import { int } from "../../utils/utils";
import Inventory from "../inventory";
import Page from "../page";


export default new class YourCart {
    private get link() { return $('a.shopping_cart_link') }
    private get cartAmountIcon() { return this.link.$('span.shopping_cart_badge') }
    public async getDisplayedCartAmount(doAssert=false) {
        let amount:int;
        if(await this.cartAmountIcon.isExisting()) {
            amount = parseInt(await this.cartAmountIcon.getText())
        } else {
            amount = 0
        }
        if(doAssert) {
            const amountToAssert = Inventory.items.filter(i => i.isInCart).length
            await expect.soft(amount).toBe(amountToAssert)
            await expect.soft(amount).toBeLessThanOrEqual(6)
            await expect.soft(amount).toBeGreaterThanOrEqual(0)
        }
        return amount
    }
    public async click(doAssert=false) {
        await this.link.click()
        if(doAssert) { await expect(browser).toHaveUrl(new Page().baseUrl) }
    }

}
