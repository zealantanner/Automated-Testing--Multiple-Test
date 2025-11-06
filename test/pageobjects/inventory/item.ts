import { bool, int } from "../../utils/utils";
import Page from "../page";

export default class Item {
    constructor(
        private element:WebdriverIO.Element,
        public number:int,
        private _isInCart:bool=false,
    ) {}
    public get name() { return this.element.$('.inventory_item_name').getText() }
    private get btnAddToCart() { return this.element.$('.btn_inventory') }

    public get isInCart() {
        return this._isInCart;
    }
    public set isInCart(val:bool) {
        this._isInCart = val;
    }

    public async clickAddToCart(doAssert=false) {
        if(doAssert) {
            const text = await this.btnAddToCart.getText()
            await expect.soft(text).toMatch("Add to cart")
            await expect.soft(this.isInCart).toBe(false)
        }
        const beforeAmount = await Page.Cart.getDisplayedCartAmount()
        await this.btnAddToCart.click()
        this._isInCart = true;
        if(doAssert) {
            const text = await this.btnAddToCart.getText()
            await expect.soft(text).toMatch("Remove")
            await expect.soft(this.isInCart).toBe(true)
            await expect.soft(await Page.Cart.getDisplayedCartAmount()).toBe(beforeAmount+1)
        }
    }
    public async clickRemove(doAssert=false) {
        if(doAssert) {
            const text = await this.btnAddToCart.getText()
            await expect.soft(text).toMatch("Remove")
            await expect.soft(this.isInCart).toBe(true)
        }
        const beforeAmount = await Page.Cart.getDisplayedCartAmount()
        await this.btnAddToCart.click()
        this._isInCart = false;
        if(doAssert) {
            const text = await this.btnAddToCart.getText()
            await expect.soft(text).toMatch("Add to cart")
            await expect.soft(this.isInCart).toBe(false)
            await expect.soft(Page.Cart.getDisplayedCartAmount()).toBe(beforeAmount-1)
        }
    }
    public async toggleInCart(doAssert=false) {
        const text = await this.btnAddToCart.getText()
        if(text === "Add to cart") {
            await this.clickAddToCart(doAssert)
        } else if(text === "Remove") {
            await this.clickRemove(doAssert)
        }
        return text === "Add to cart"
    }

    public async getIsDisplayedInCart(doAssert=false) {
        if(doAssert) {
            await expect.soft(this.btnAddToCart.getText())
            .toMatch((this.isInCart) ? "Remove" : "Add to cart")
        }
        return await this.btnAddToCart.getText() === "Remove"
    }
}
