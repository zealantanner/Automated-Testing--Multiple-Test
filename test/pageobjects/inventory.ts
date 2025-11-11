import { $$ } from "@wdio/globals";
import { int, displayDelay, shuffle, range, Item } from "../utils/utils"
import Base from "./base";


class Inventory extends Base {
    public get btnsAddToCart() { return $$('.btn_inventory[id^="add-to-cart"]') }
    public get btnsRemove() { return $$('.btn_inventory[id^="remove"]') }
    public get items() {
        return $$('.inventory_list .inventory_item').map(el => new Item(el))
    }
    public async getItemsInCart() {
        const inCartItems:Item[]=[]
        for(const item of await this.items) {
            if(await item.inCart) {
                inCartItems.push(item)
            }
        }
        return inCartItems
    }
    public async getItemsNotInCart() {
        const notInCartItems:Item[]=[]
        for(const item of await this.items) {
            if(!(await item.inCart)) {
                notInCartItems.push(item)
            }
        }
        return notInCartItems
    }
    public async addItem(index?:int) {
        const total = (await this.getItemsNotInCart()).length
        if(total > 0) {
            index = index ?? shuffle(range(0,total-1))[0]
            const item =(await this.getItemsNotInCart())[index]

            await item.btnAddToCart.waitForDisplayed({ timeout: displayDelay })
            await item.clickAdd()
            await item.btnAddToCart.waitForDisplayed({ reverse:true, timeout: displayDelay })
        }
    }
    public async addItems(amount?:int) {
        const total = (await this.getItemsNotInCart()).length
        const itemsToAdd = amount ?? total
        for (let i = 0; i < itemsToAdd; i++) {
            await this.addItem()
        }
    }
    public async removeItem(index?:int) {
        const total = (await this.getItemsInCart()).length
        if(total > 0) {
            index = index ?? shuffle(range(0,total-1))[0]
            const item =(await this.getItemsInCart())[index]

            await item.btnAddToCart.waitForDisplayed({ timeout: displayDelay })
            await item.clickRemove()
            await item.btnAddToCart.waitForDisplayed({ reverse:true, timeout: displayDelay })
        }
    }
    public async removeItems(amount?:int) {
        const totalBtns = (await this.getItemsInCart()).length
        const itemsToRemove = amount ?? totalBtns
        for (let i = 0; i < itemsToRemove; i++) {
            await this.removeItem()
        }
    }
    //>assert
    // public async assertAddItem(index:int=0) {
    //     const amountBefore = await this.btnsAddToCart.length
    //     await this.addItem(index)
    //     const amountAfter = await this.btnsAddToCart.length
    //     await expect(amountBefore-1)
    //         .toBe(amountAfter)
    // }
    // public async assertRemoveItem(index:int=0) {
    //     const amountBefore = await this.btnsRemove.length
    //     await this.removeItem(index)
    //     const amountAfter = await this.btnsRemove.length
    //     await expect(amountBefore-1)
    //         .toBe(amountAfter)
    // }
    // public async assertAddAllItems() {
    //     await this.addAllItems()
    //     await expect(await this.btnsAddToCart.length)
    //         .toBe(0)
    // }
    // public async assertRemoveAllItems() {
    //     await this.removeAllItems()
    //     await expect(await this.btnsRemove.length)
    //         .toBe(0)
    // }


    /** @param subUrl inventory.html */
    public get subUrl() { return "inventory.html" }
    /** @param baseUrl https://www.saucedemo.com/inventory.html */
    public get baseUrl() { return new URL(this.subUrl,super.baseUrl).toString() }
    public async open() {
        await super.open(this.baseUrl);
    }
}


export default new Inventory();
