import { browser, $, $$ } from "@wdio/globals";
import { displayDelay } from "../utils/utils";
import Base, { base } from "./base.ts";



class Cart extends Base {
    public readonly cartLimit = 6
    
    public get btnCheckout() { return $('button#checkout') }

    public async clickCheckout() {
        await this.btnCheckout.waitForDisplayed({ timeout: displayDelay })
        await this.btnCheckout.click()
        await this.btnCheckout.waitForDisplayed({ reverse:true, timeout: displayDelay })
    }

    public get items() { return $$('.cart_list .cart_item') }
    public get btnsRemove() { return $$('//button[contains(text(),"Remove")]') }
    public async clickBtnRemove(index=0) {
        const item = this.items[index]
        await item.waitForDisplayed({ timeout: displayDelay })
        await item.click()
        await item.waitForDisplayed({ reverse:true, timeout: displayDelay })
    }

    public get btnContinueShopping() { return $('#continue-shopping') }
    public async clickBtnContinueShopping() {
        await this.btnContinueShopping.waitForDisplayed({ timeout: displayDelay })
        await this.btnContinueShopping.click()
        await this.btnContinueShopping.waitForDisplayed({ reverse:true, timeout: displayDelay })
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
