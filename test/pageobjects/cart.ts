import { browser, expect, $, $$ } from "@wdio/globals";
import Base, { base } from "./base.ts";
import Checkout from "./checkout.ts";
import Inventory from "./inventory.ts";



class Cart extends Base {
    public readonly cartLimit = 6
    
    private get btnCheckout() { return $('button#checkout') }

    public async clickCheckout() {
        await this.btnCheckout.waitForDisplayed({ timeout: base.delay })
        await this.btnCheckout.click()
        await this.btnCheckout.waitForDisplayed({ reverse:true, timeout: base.delay })
    }
    public async assertCheckout() {
        await this.clickCheckout()
        await expect(browser)
            .toHaveUrl(Checkout.baseUrl)
    }

    private get items() { return $$('.cart_list .cart_item') }
    private get btnsRemove() { return $$('//button[contains(text(),"Remove")]') }
    public async clickBtnRemove(index=0) {
        const item = this.items[index]
        await item.waitForDisplayed({ timeout: base.delay })
        await item.click()
        await item.waitForDisplayed({ reverse:true, timeout: base.delay })
    }
    public async assertClickBtnRemove(index=0) {
        const amountBefore = await this.btnsRemove.length
        const btnToClick = this.btnsRemove[index]
        await this.clickBtnRemove(index)
        await btnToClick.waitForDisplayed({ reverse:true, timeout: base.delay })
        const amountAfter = await this.btnsRemove.length
        await expect(btnToClick)
            .not.toBeExisting()
        await expect(amountBefore-1)
            .toBe(amountAfter)
    }

    private get btnContinueShopping() { return $('#continue-shopping') }
    public async clickBtnContinueShopping() {
        await this.btnContinueShopping.waitForDisplayed({ timeout: base.delay })
        await this.btnContinueShopping.click()
        await this.btnContinueShopping.waitForDisplayed({ reverse:true, timeout: base.delay })
    }
    public async assertClickBtnContinueShopping() {
        await this.btnContinueShopping.waitForDisplayed({ timeout: base.delay })
        await expect(this.btnContinueShopping)
            .toBeExisting()
        await this.clickBtnContinueShopping()
        await this.btnContinueShopping.waitForDisplayed({ reverse:true, timeout: base.delay })
        await expect(this.btnContinueShopping)
            .not.toBeExisting()
        await expect(browser)
            .toHaveUrl(Inventory.baseUrl)
    }



    /** @param subUrl cart.html */
    public get subUrl() { return "cart.html" }
    /** @param baseUrl https://www.saucedemo.com/cart.html */
    public get baseUrl() { return new URL(this.subUrl,super.baseUrl).toString() }

    public async open() {
        await super.open(this.baseUrl);
    }
}


export default new Cart();
