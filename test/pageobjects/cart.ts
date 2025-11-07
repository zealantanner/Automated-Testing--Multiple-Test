import { browser, expect, $ } from "@wdio/globals";
import Page from "./page";
import Checkout from "./checkout";
import Item from "../utils/item";



export default new class Cart extends Page {
    private get btnCheckout() { return $('button#checkout') }

    public readonly cartLimit = 6
    
    public async clickCheckout(doAssert=false) { //> finish doAssert
        await this.btnCheckout.click()
        if(doAssert) {
            await expect(browser.getUrl()).toBe(Checkout.baseUrl)
        }
    }

    /** @param subUrl cart.html */
    public get subUrl() { return new URL("cart.html").toString() }
    /** @param baseUrl https://www.saucedemo.com/cart.html */
    public get baseUrl() { return new URL(this.subUrl,super.baseUrl).toString() }

    public async open(doAssert=false) {
        await super.open(doAssert,this.baseUrl);
    }
}
