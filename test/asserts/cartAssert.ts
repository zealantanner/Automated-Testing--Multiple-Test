import { expect } from "@wdio/globals";
import { displayDelay, range, shuffle } from "../utils/utils";
import Assertion from "./assertion";
import { base } from "../pageobjects/base";
import Cart from "../pageobjects/cart";
import Checkout1 from "../pageobjects/checkout1";
import Inventory from "../pageobjects/inventory";
import InventoryItem from "../pageobjects/inventory-item";



export default new class CartAssert extends Assertion {
    public async assertCartIconNumber() {
        await this.preAssert()
        const beforeAmount = await base.CartMenu.displayedCartAmount
        await expect(beforeAmount).toBeLessThanOrEqual(Cart.cartLimit)
        const amountToAdd = shuffle(range(1,6-beforeAmount))[0]
        await Inventory.addItems(amountToAdd)
        const afterAmount = await base.CartMenu.displayedCartAmount
        await expect(beforeAmount+amountToAdd).toBe(afterAmount)
        await Inventory.removeItems()
    }
    public async assertCartClickDirect() {
        await this.preAssert()
        await this.openRandomPageHasMenu()
        await base.CartMenu.clickIcon()
        await this.assertUrl(Cart.baseUrl)
    }
    public async assertCartCRUD() {
        await this.preAssert()
        await Cart.open()
        await Cart.removeItems()
        await expect((await Cart.items).length).toBe(0)
        await Inventory.open()
        const amountToAdd = shuffle(range(1,6))[0]
        await Inventory.addItems(amountToAdd)
        const inventoryAddedItems = await Inventory.getItemsInCart()
        const inventoryAddedItemIds = []
        for(const item of inventoryAddedItems) {
            inventoryAddedItemIds.push(await item.getId())
        }
        await Cart.open()
        const cartAddedItems = await Cart.getItemsInCart()
        const cartAddedItemIds = []
        for(const item of cartAddedItems) {
            cartAddedItemIds.push(await item.getId())
        }
        await expect(cartAddedItemIds.length).toBe(inventoryAddedItemIds.length)
        await expect(new Set(cartAddedItemIds)).toEqual(new Set(inventoryAddedItemIds))
        await Cart.removeItem()
        await expect(cartAddedItems.length-1).toBe((await Cart.items).length)
        await Cart.removeItems()
        await expect((await Cart.items).length).toBe(0)
    }
    public async assertRemovingItems() {
        await this.preAssert()
        await Cart.open()
        await Cart.removeItems()
        await Inventory.open()
        const amountToAdd = shuffle(range(2,4))[0]
        await Inventory.addItems(amountToAdd)
        await Cart.open()
        await Cart.removeItem()
        const newAmount1 = (await Cart.getItemsInCart()).length
        await expect(amountToAdd-1).toBe(newAmount1)
        await Cart.removeItems()
        const newAmount2 = (await Cart.getItemsInCart()).length
        await expect(newAmount2).toBe(0)
    }
    public async assertBtnContinueShopping() {
        await this.preAssert()
        await Cart.open()
        await Cart.clickBtnContinueShopping()
        await this.assertUrl(Cart.baseUrl, true)
        await this.assertUrl(Inventory.baseUrl)
    }
    public async assertBtnCheckout() {
        await this.preAssert()
        await Cart.open()
        await Cart.clickBtnCheckout()
        await this.assertUrl(Cart.baseUrl, true)
        await this.assertUrl(Checkout1.baseUrl)
    }
    public async assertItemLinks() {
        await this.preAssert()
        await Inventory.open()
        await Inventory.addItems()
        await Cart.open()
        const items = shuffle(await Cart.getItemsInCart())
        for(const item of items) {
            await Cart.open()
            const chosen = {
                item: item,
                id: await item.getId(),
                title: await item.getTitle(),
            }
            await chosen.item.clickLink()
            await this.assertUrl(InventoryItem.baseUrlWithID(chosen.id))
            await expect(InventoryItem.lastItemID).toBe(chosen.id)
            await expect(await InventoryItem.title.getText()).toBe(chosen.title)
        }
    }
    //>just add these and then I'm done
}