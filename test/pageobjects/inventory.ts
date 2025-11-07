import { $$, expect } from "@wdio/globals";
import { int, range, shuffle } from "../utils/utils"
import Page from "./page";
import Item from "../utils/item";


export default new class Inventory extends Page {
    public get items() {
        const elementItems = Array.from($$('.inventory_list .inventory_item'));
        return elementItems.map((value) => new Item(value))
    }
    public async getItem(id:int) {
        return this.items.find(async (item) => await item.getID() == id)
    }

    /** @param index default of 0 adds the first */
    public async addItemToCart(index:int=0,doAssert=false) {
        if(doAssert) {
            await expect.soft(Page.Cart.getDisplayedCartAmount(doAssert)).toBeLessThan(6)
        }
        await this.items[index].clickAddToCart(doAssert)
        return this.items[index];
    }
    public async addRandItemsToCart(amount:int=1,doAssert=false) {
        const beforeAmount = await Page.Cart.getDisplayedCartAmount(doAssert)
        const order = shuffle(range(0, this.items.length))
        const addedItems = []
        for (let i = 0; i < amount; i++) {
            await this.addItemToCart(order[i],doAssert)
            addedItems.push(this.items[order[i]])
        }
        if(doAssert) {
            await expect.soft(Page.Cart.getDisplayedCartAmount(doAssert)).toBe(beforeAmount + amount)
        }
        return addedItems
    }
    /** @param index default of 0 removes the first */
    public async removeItemFromCart(index:int=0,doAssert=false) {
        if(doAssert) {
            await expect.soft(Page.Cart.getDisplayedCartAmount(doAssert)).toBeGreaterThan(0)
        }
        if(index===0) {
            this.items.find((item,i) => {
                index = i;
                return item.isInCart;
            })
        } else {
            await this.items[index].clickRemove(doAssert)
        }
        return this.items[index];
    }
    public async removeAllItemsFromCart(doAssert=false) {
        const removedItems = []
        for(const item of this.items) {
            if(item.isInCart) {
                await item.clickRemove(doAssert)
                removedItems.push(item)
            }
        }
        if(doAssert) {
            await expect.soft(Page.Cart.getDisplayedCartAmount()).toBe(0)
        }
        return removedItems
    }
    /** @param subUrl inventory.html */
    public get subUrl() { return new URL("inventory.html").toString() }
    /** @param baseUrl https://www.saucedemo.com/inventory.html */
    public get baseUrl() { return new URL(this.subUrl,super.baseUrl).toString() }
    public async open(doAssert=false) { //> finish doAssert for open
        await super.open(doAssert,this.baseUrl);
    }
}
