import { expect, $$ } from "@wdio/globals";
import { int, range, shuffle } from "../utils/utils.ts"
import Base from "./base.ts";
import Item from "../utils/item.ts";
import Cart from "./cart.ts";


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


    public async addItemToCart(index?:int) {
        const item = (index) ? await this.getItem(index) : this.Cart.itemsNotInCart[0]
        if(!item) throw new Error(`Item with ID ${index} not found`);

        await item.clickAddToCart()
        return item;
    }
    public async assertAddItemToCart(index?:int) {
        const item = (index) ? await this.getItem(index) : this.Cart.itemsNotInCart[0]
        if(!item) throw new Error(`Item with ID ${index} not found`);
        await expect(index)
            .toBeLessThanOrEqual(6)
        await expect(item.isInCart)
            .toBe(false)
        await expect(await this.Cart.displayedCartAmount)
            .toBeLessThan(Cart.cartLimit)

        await this.addItemToCart(index)

        await expect(item.isInCart)
            .toBe(true)
        await expect(await this.Cart.displayedCartAmount)
            .toBeLessThanOrEqual(Cart.cartLimit)
    }
    public async addRandItemsToCart(amountToAdd:int=1) {
        const toAdd:int[] = shuffle(range(0, this.items.length)).slice(0,amountToAdd)
        const addedItems = []
        for(const i of toAdd) {
            addedItems[i] = await this.addItemToCart(i)
        }
        return addedItems
    }
    public async assertAddRandItemsToCart(amountToAdd:int=1) {
        const beforeAmount = this.Cart.itemsInCart.length
        await expect(beforeAmount+amountToAdd)
            .toBeLessThanOrEqual(Cart.cartLimit);
        const addedItems = await this.addRandItemsToCart(amountToAdd)
        for(const item of addedItems) {
            await expect(item.isInCart)
                .toBe(true);
        }
        await expect(await this.Cart.displayedCartAmount)
            .toBe(beforeAmount + amountToAdd)
        await expect(this.Cart.itemsInCart.length)
            .toBe(beforeAmount + amountToAdd)
    }
    public async removeItemFromCart(index?:int) {
        const item = (index) ? await this.getItem(index) : this.Cart.itemsInCart[0]
        if(!item) throw new Error(`Item with ID ${index} not found`);
        await item.clickRemove()
        return item;
    }
    public async assertRemoveItemFromCart(index?:int) {
        await expect(await this.Cart.displayedCartAmount)
            .toBeGreaterThan(0)
        await expect(this.Cart.itemsInCart.length)
            .toBeGreaterThan(0)
        const item = (index) ? await this.getItem(index) : this.Cart.itemsInCart[0]
        if(!item) throw new Error(`Item with ID ${index} not found`);
        await this.removeItemFromCart(index)
        await expect(item.isInCart)
            .toBe(false)
    }
    public async addAllItemsToCart() {
        for(const item of this.Cart.itemsNotInCart) {
            await item.clickAddToCart()
        }
    }
    public async assertAddAllItemsToCart() {
        await this.addAllItemsToCart()
        await expect(await this.Cart.displayedCartAmount)
            .toBe(Cart.cartLimit)
        await expect(this.Cart.itemsInCart)
            .toBe(Cart.cartLimit)
    }
    public async removeAllItemsFromCart() {
        for(const item of this.Cart.itemsInCart) {
            await item.clickRemove()
        }
    }
    public async assertRemoveAllItemsFromCart() {
        await this.removeAllItemsFromCart()
        await expect(await this.Cart.displayedCartAmount)
            .toBe(0)
        await expect(this.Cart.itemsInCart)
            .toBe(0)
    }

    public async whateverAddAnItem(index:int=0) {
        await this.btnsAddToCart[index].click()
    }
    public async whateverRemoveAnItem(index:int=0) {
        await this.btnsRemove[index].click()
    }
    public async assertWhateverAddAnItem(index:int=0) {
        const beforeAmount = await this.Cart.displayedCartAmount
        await this.whateverAddAnItem(index)
        const afterAmount = await this.Cart.displayedCartAmount
        await expect(beforeAmount+1)
            .toBe(afterAmount)
    }
    public async assertWhateverRemoveAnItem(index:int=0) {
        const beforeAmount = await this.Cart.displayedCartAmount
        await this.whateverAddAnItem(index)
        const afterAmount = await this.Cart.displayedCartAmount
        await expect(beforeAmount-1)
            .toBe(afterAmount)
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
