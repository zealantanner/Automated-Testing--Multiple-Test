import { $, $$ } from "@wdio/globals";
import { displayDelay, int, Item, range, shuffle } from "../utils/utils";
import Base from "./base";



class Cart extends Base {
    public readonly cartLimit = 6
    
    public get items() {
        return $$('.cart_list .cart_item').map(el => new Item(el))
    }

    public async removeItem(index?:int) {
        const total = (await this.items).length
        if(total > 0) {
            index = index ?? shuffle(range(0,total-1))[0]
            const item = (await this.items)[index]
            await item.btnRemove.waitForDisplayed({ timeout: displayDelay })
            await item.clickRemove()
            await item.btnRemove.waitForDisplayed({ reverse:true, timeout: displayDelay })
        }
    }
    public async removeItems(amount?:int) {
        const total = (await this.items).length
        const itemsToRemove = amount ?? total
        for (let i = 0; i < itemsToRemove; i++) {
            await this.removeItem()
        }
    }

    public get btnCheckout() { return $('button#checkout') }
    
    public async clickCheckout() {
        await this.btnCheckout.waitForDisplayed({ timeout: displayDelay })
        await this.btnCheckout.click()
        await this.btnCheckout.waitForDisplayed({ reverse:true, timeout: displayDelay })
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
