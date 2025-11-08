import { expect, $ } from "@wdio/globals";
import { bool, int } from "./utils.ts";
import { base } from "../pageobjects/base.ts";

export default class Item {
    constructor(
        private element:WebdriverIO.Element,
        private _isInCart:bool=false,
    ) {}
    public get name() {
        return this.element.$('.inventory_item_name').getText()
    }
    public get id() {
        return (async () => {
            const idAttr = await this.element.$('[id^="item_"][id$="_title_link"]').getAttribute('id')
            const match = idAttr.match(/item_(\d+)_title_link/)
            return match ? parseInt(match[1]) : null
        })()
    }
    
    private get btnAddToCart() { return this.element.$('.btn_inventory[id^="add-to-cart"]') }
    private get btnRemove() { return this.element.$('.btn_inventory[id^="remove"]') }
    private get btnToggle() { return this.element.$('.btn_inventory') }

    public get isInCart() {
        return this._isInCart;
    }
    public set isInCart(val:bool) {
        this._isInCart = val;
    }

    public async clickAddToCart() {
        await this.btnAddToCart.waitForDisplayed({ timeout: base.delay })
        await this.btnAddToCart.click()
        this._isInCart = true;
    }
    public async clickRemove() {
        await this.btnRemove.waitForDisplayed({ timeout: base.delay })
        await this.btnRemove.click()
        this._isInCart = false;
    }
    public async toggleInCart() {
        const text = await this.btnToggle.getText()
        if(text === "Add to cart") {
            await this.clickAddToCart()
        } else if(text === "Remove") {
            await this.clickRemove()
        }
        return text === "Add to cart"
    }

    public get isDisplayedInCart() {
        return (async () => {
            return await this.btnAddToCart.getText() === "Remove"
        })()
    }
    public async assertIsDisplayedInCart() {
        await expect(await this.isDisplayedInCart)
            .toMatch((this.isInCart) ? "Remove" : "Add to cart")
    }
}
