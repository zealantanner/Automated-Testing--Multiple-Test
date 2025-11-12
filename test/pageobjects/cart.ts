import { $, $$ } from "@wdio/globals";
import { displayDelay, int, Item, range, shuffle } from "../utils/utils";
import Base from "./base";



class Cart extends Base {
    public readonly cartLimit = 6
    
    public get items() {
        return $$('.cart_list .cart_item').map(el => new Item(el))
    }
    public async getItemsInCart() {
        return this.items
    }

    public async removeItem(index?:int) {
        const total = (await this.items).length
        if(total > 0) {
            index = index ?? shuffle(range(0,total-1))[0]
            const item = (await this.items)[index]
            await item.clickRemove()
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
    
    public async clickBtnCheckout() {
        await this.btnCheckout.click()
    }

    public get btnContinueShopping() { return $('#continue-shopping') }
    public async clickBtnContinueShopping() {
        await this.btnContinueShopping.click()
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
