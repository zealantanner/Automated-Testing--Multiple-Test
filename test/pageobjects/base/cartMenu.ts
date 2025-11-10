import { $ } from "@wdio/globals"


export default class CartMenu {
    private get link() { return $('a.shopping_cart_link') }
    private get cartAmountIcon() { return this.link.$('span.shopping_cart_badge') }

    public get displayedCartAmount() {
        return (async () => {
            const exists = await this.cartAmountIcon.isExisting()
            let amount = exists ? parseInt(await this.cartAmountIcon.getText()) : 0
            return amount
        })()
    }
    //>assert
    // public async assertDisplayedCartAmount(amount:int) {
    //     const amountToAssert = await this.displayedCartAmount
    //     await expect(amountToAssert)
    //         .toBe(amount)
    //     await expect(amountToAssert)
    //         .toBeLessThanOrEqual(Cart.cartLimit)
    //     await expect(amountToAssert)
    //         .toBeGreaterThanOrEqual(0)
    // }
    
    public async click() {
        await this.link.click()
    }
    //>assert
    // public async assertClick() {
    //     await this.click()
    //     await expect(browser)
    //         .toHaveUrl(base.baseUrl)
    // }

}


