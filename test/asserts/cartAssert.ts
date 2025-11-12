import { expect } from "@wdio/globals";
import { range, shuffle } from "../utils/utils";
import Assertion from "./assertion";
import { base } from "../pageobjects/base";
import Cart from "../pageobjects/cart";
import Checkout1 from "../pageobjects/checkout1";
import Inventory from "../pageobjects/inventory";
import InventoryItem from "../pageobjects/inventory-item";



export default new class CartAssert extends Assertion {
    public async assertCartIconNumber() {
        // Open and login
        await this.preAssert()
        // Function for getting the current value displayed on the cart icon
        const getCartAmount = async () => await base.CartMenu.displayedCartAmount

        // Saves displayed amount
        const beforeAmount = await getCartAmount()
        // Saves random int from 1 to cart amount
        const amountToAdd = shuffle(range(1,6-beforeAmount))[0]

        // Adds some items to the cart
        await Inventory.addItems(amountToAdd)

        // Saves new displayed amount
        const afterAmount = await getCartAmount()

        // Assert before+added is correct amount
        await expect(beforeAmount+amountToAdd).toBe(afterAmount)
        
        // Removes all items from cart
        await Inventory.removeItems()

        // Assert amount is 0
        await expect(await getCartAmount()).toBe(0)
    }
    public async assertCartClickDirect() {
        // Open and login
        await this.preAssert()
        // Open random page with menu
        await this.openRandomPageHasMenu()

        // Clicks cart menu
        await base.CartMenu.link.click()

        // Assert current url is cart
        await this.assertUrl(Cart.baseUrl)
    }
    public async assertCartCRUD() {
        // Open and login
        await this.preAssert()
        // Open cart page
        await Cart.open()

        // Removes all items from cart
        await Cart.removeItems()
        
        // Assert no items in the cart
        await expect((await Cart.items).length).toBe(0)

        // Open inventory page
        await Inventory.open()

        // Adds 1-6 items to the cart
        await Inventory.addItems(shuffle(range(1,6))[0])

        // Save each item in cart from inventory page
        const inventoryAddedItems = await Inventory.getItemsInCart()
        // Save the id of each item in cart from inventory page
        const inventoryAddedItemIds = []
        for(const item of inventoryAddedItems) {
            inventoryAddedItemIds.push(await item.getId())
        }

        // Open cart page
        await Cart.open()

        // Save each item in cart from cart page
        const cartAddedItems = await Cart.getItemsInCart()
        // Save the id of each item in cart from cart page
        const cartAddedItemIds = []
        for(const item of cartAddedItems) {
            cartAddedItemIds.push(await item.getId())
        }

        // Asserts the in cart items are the same on cart and inventory
        await expect(cartAddedItemIds.length).toBe(inventoryAddedItemIds.length)
        await expect(new Set(cartAddedItemIds)).toEqual(new Set(inventoryAddedItemIds))
        
        // Removes 1 item from cart
        await Cart.removeItem()
        
        // Asserts the amount of items in the cart
        await expect(cartAddedItems.length-1).toBe((await Cart.items).length)
        
        // Removes all items from cart
        await Cart.removeItems()
        
        // Asserts the amount of items in the cart is 0
        await expect((await Cart.items).length).toBe(0)
    }
    public async assertBtnContinueShopping() {
        // Open and login
        await this.preAssert()
        // Open cart page
        await Cart.open()

        // Clicks continue shopping
        await Cart.btnContinueShopping.click()
        
        // Assert current url is inventory and not cart
        await this.assertUrl(Cart.baseUrl, true)
        await this.assertUrl(Inventory.baseUrl)
    }
    public async assertBtnCheckout() {
        // Open and login
        await this.preAssert()
        // Open cart page
        await Cart.open()
        
        // Clicks checkout
        await Cart.btnCheckout.click()

        // Assert current url is checkout 1 and not cart
        await this.assertUrl(Cart.baseUrl, true)
        await this.assertUrl(Checkout1.baseUrl)
    }
    public async assertItemLinks() {
        // Open and login
        await this.preAssert()
        // Open inventory page
        await Inventory.open()

        // Adds all items to the cart
        await Inventory.addItems()

        // Open cart page
        await Cart.open()

        const items = shuffle(await Cart.getItemsInCart())
        for(const item of items) {
            // Open cart page
            await Cart.open()

            // Makes an object with the item and its given id and name
            const chosen = {
                item: item,
                id: await item.getId(),
                title: await item.getTitle(),
            }
            
            // Clicks the item's link
            await chosen.item.clickLink()

            // Assert current url is checkout 1 and not cart
            await this.assertUrl(InventoryItem.baseUrlWithID(chosen.id))

            // Assert the id is correct
            await expect(InventoryItem.lastItemID).toBe(chosen.id)
            // Assert the title is correct
            await expect(await InventoryItem.title.getText()).toBe(chosen.title)
        }
    }
}