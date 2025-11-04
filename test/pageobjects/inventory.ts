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
class Inventory extends Page {
    private get items() {
        $$('.inventory_list .inventory_item').forEach(async (value, index) => {

        })
        return 
    }
    private get addToCartButtonOffItem() { return $('.btn_inventory') }
    open() {
        return super.open(`inventory.html`);
    }
}


export default new Inventory();