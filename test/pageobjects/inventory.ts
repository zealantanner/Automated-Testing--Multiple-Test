import { $$, expect } from "@wdio/globals";
import { int, range, shuffle } from "../utils/utils"
import Page from "./page";
import Item from "../utils/item";
import Cart from "./cart";


export default new class Inventory extends Page {
    public get items() {
        const elementItems = Array.from($$('.inventory_list .inventory_item'));
        return elementItems.map((value) => new Item(value))
    }
    public async getItem(id:int) {
        for (const item of this.items) {
            if(await item.getID() === id) {
                return item;
            }
        }
        return undefined
    }

    public async addItemToCart(index?:int,doAssert=false) {
        const item = (index) ? await this.getItem(index) : Page.Cart.itemsNotInCart[0]

        if(!item) throw new Error(`Item with ID ${index} not found`);
        if(doAssert) {
            await expect.soft(item.isInCart)
                .toBe(false)
            await expect.soft(Page.Cart.getDisplayedCartAmount(doAssert))
                .toBeLessThan(Cart.cartLimit)
        }
        await item.clickAddToCart(doAssert)
        if(doAssert) {
            await expect.soft(item.isInCart)
                .toBe(true)
            await expect.soft(Page.Cart.getDisplayedCartAmount(doAssert))
                .toBeLessThan(Cart.cartLimit)
        }
        return item;
    }
    public async addRandItemsToCart(amountToAdd:int=1,doAssert=false) {
        const beforeAmount = Page.Cart.itemsInCart.length
        const toAdd:int[] = shuffle(range(0, this.items.length)).slice(0,amountToAdd)
        if(doAssert) {
            await expect.soft(beforeAmount+amountToAdd)
                .toBeLessThanOrEqual(Cart.cartLimit);
        }
        const addedItems = Array(amountToAdd)
        for(const i of toAdd) {
            addedItems[i] = (await this.addItemToCart(i,doAssert))
        }
        if(doAssert) {
            await expect.soft(Page.Cart.getDisplayedCartAmount(doAssert))
                .toBe(beforeAmount + amountToAdd)
            await expect.soft(Page.Cart.itemsInCart.length)
                .toBe(beforeAmount + amountToAdd)
        }
        return addedItems
    }
    public async removeItemFromCart(index?:int,doAssert=false) {
        if(doAssert) {
            await expect.soft(Page.Cart.getDisplayedCartAmount(doAssert))
                .toBeGreaterThan(0)
            await expect.soft(Page.Cart.itemsInCart.length)
                .toBeGreaterThan(0)
        }
        const item = (index) ? await this.getItem(index) : Page.Cart.itemsInCart[0]
        if(!item) throw new Error(`Item with ID ${index} not found`);
        item.clickRemove(doAssert)
        return item;
    }
    public async addAllItemsToCart(doAssert=false) {
        const itemsToBeAdded = Page.Cart.itemsNotInCart
        for(const item of itemsToBeAdded) {
            await item.clickAddToCart(doAssert)
        }
        if(doAssert) {
            await expect.soft(Page.Cart.getDisplayedCartAmount(doAssert))
                .toBe(0)
            for(const item of itemsToBeAdded) {
                await expect.soft(item.isInCart)
                    .toBe(true)
            }
        }
        return itemsToBeAdded
    }
    public async removeAllItemsFromCart(doAssert=false) {
        const itemsToBeRemoved = Page.Cart.itemsInCart
        for(const item of itemsToBeRemoved) {
            await item.clickRemove(doAssert)
        }
        if(doAssert) {
            await expect.soft(Page.Cart.getDisplayedCartAmount(doAssert))
                .toBe(0)
            for(const item of itemsToBeRemoved) {
                await expect.soft(item.isInCart)
                    .toBe(false)
            }
        }
        return itemsToBeRemoved
    }
    /** @param subUrl inventory.html */
    public get subUrl() { return new URL("inventory.html").toString() }
    /** @param baseUrl https://www.saucedemo.com/inventory.html */
    public get baseUrl() { return new URL(this.subUrl,super.baseUrl).toString() }
    public async open(doAssert=false) { //> finish doAssert for open
        await super.open(doAssert,this.baseUrl);
    }
}
