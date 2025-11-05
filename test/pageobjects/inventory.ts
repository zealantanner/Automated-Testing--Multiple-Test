import { browser, $, $$ } from "@wdio/globals";
import { bool, int, str } from "../utils/utils"
import Page from "./page";

class Item {
    constructor(
        protected element:WebdriverIO.Element,
        public number:int,
        public isAddedToCart:bool=false,
    ) {}
    public get name() { return this.element.$('.inventory_item_name').getText() }
    protected get addToCartButton() { return this.element.$('.btn_inventory') }
    public async clickAddToCart() { await this.addToCartButton.click() }
}

/** items to buy */
export default new class Inventory extends Page {
    //> add
    public get items() {
        const them:Item[] = []
        return $$('.inventory_list .inventory_item').map((value,i))
    }
    private get addToCartButtonOffItem() { return $('.btn_inventory') }
    open() {
        return super.open(`inventory.html`);
    }
}
