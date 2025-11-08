import { browser, expect, $ } from "@wdio/globals";
import Base from "./base.ts";
import Checkout from "./checkout.ts";
import Inventory from "../pageobjects/inventory.ts";



class Cart extends Base {
    public readonly cartLimit = 6
    
    private get btnCheckout() { return $('button#checkout') }
    
    public get itemsInCart() {
        return Inventory.items.filter(i => i.isInCart)
    }
    public get itemsNotInCart() {
        return Inventory.items.filter(i => !i.isInCart)
    }
    

    public async clickCheckout() {
        await this.btnCheckout.click()
    }
    public async assertCheckout() {
        await this.clickCheckout()
        await expect(browser.getUrl()).toBe(Checkout.baseUrl)
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
