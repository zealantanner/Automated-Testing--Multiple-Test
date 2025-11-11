import { $ } from "@wdio/globals";
import { str } from '../utils/utils.ts';
import Base from './base.ts'




class InventoryItem extends Base {
    public get title() {
        return $('.inventory_details_name')
    }
    
    /** @param subUrl inventory-item.html */
    public get subUrl() { return "inventory-item.html" }
    /** @param baseUrl https://www.saucedemo.com/inventory-item.html */
    public get baseUrl() {
        const url = new URL(this.subUrl,super.baseUrl)
        if(this.lastItemID != null) {
            url.searchParams.set("id", this.lastItemID.toString())
        }
        return url.toString()
    }
    public lastItemID?:str;
    
    /** @param itemID https://www.saucedemo.com/inventory-item.html?id={{itemID}} */
    public baseUrlWithID(itemID:str) {
        const url = new URL(this.baseUrl)
        url.searchParams.set("id", itemID.toString())
        this.lastItemID = itemID
        return url.toString()
    }

    public async open(itemID:any) {
        this.lastItemID = itemID
        await super.open(this.baseUrlWithID(itemID));
    }
}


export default new InventoryItem();
