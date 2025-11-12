import { $$ } from "@wdio/globals";
import { int, shuffle, range, Item } from "../utils/utils"
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
            await item.clickAdd()
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
            const item = (await this.getItemsInCart())[index]
            await item.clickRemove()
        }
    }
    public async removeItems(amount?:int) {
        const totalBtns = (await this.getItemsInCart()).length
        const itemsToRemove = amount ?? totalBtns
        for (let i = 0; i < itemsToRemove; i++) {
            await this.removeItem()
        }
    }
    /** @param subUrl inventory.html */
    public get subUrl() { return "inventory.html" }
    /** @param baseUrl https://www.saucedemo.com/inventory.html */
    public get baseUrl() { return new URL(this.subUrl,super.baseUrl).toString() }
    public async open() {
        await super.open(this.baseUrl);
    }
}


export default new Inventory();
