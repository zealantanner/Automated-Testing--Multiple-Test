import { $$ } from "@wdio/globals";
import { int, displayDelay } from "../utils/utils.ts"
import Base, { base } from "./base.ts";


class Inventory extends Base {
    public get items() {
        const elementItems = Array.from($$('.inventory_list .inventory_item'));
        return elementItems.map((value) => new Item(value))
    }
    public async getItem(id:int) {
        for (const item of this.items) {
            if(await item.id === id) {
                return item;
            }
        }
        return undefined
    }
    private get btnsAddToCart() { return $$('.btn_inventory[id^="add-to-cart"]') }
    private get btnsRemove() { return $$('.btn_inventory[id^="remove"]') }


    public async addItem(index:int=0) {
        const btn = this.btnsAddToCart[index]
        await btn.waitForDisplayed({ timeout: displayDelay })
        await btn.click()
        await btn.waitForDisplayed({ reverse:true, timeout: displayDelay })
    }
    public async addItems(amount:int=1) {
        for (let i = 0; i < amount; i++) {
            await this.addItem()
        }
    }
    public async addAllItems() {
        for(const btn of this.btnsAddToCart) {
            await btn.waitForDisplayed({ timeout: displayDelay })
            await btn.click()
            await btn.waitForDisplayed({ reverse:true, timeout: displayDelay })
        }
    }
    public async removeItem(index:int=0) {
        const btn = this.btnsRemove[index]
        await btn.waitForDisplayed({ timeout: displayDelay })
        await btn.click()
        await btn.waitForDisplayed({ reverse:true, timeout: displayDelay })
    }
    public async removeItems(amount:int=1) {
        for (let i = 0; i < amount; i++) {
            await this.removeItem()
        }
    }
    public async removeAllItems() {
        for(const btn of this.btnsRemove) {
            await btn.waitForDisplayed({ timeout: displayDelay })
            await btn.click()
            await btn.waitForDisplayed({ reverse:true, timeout: displayDelay })
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
