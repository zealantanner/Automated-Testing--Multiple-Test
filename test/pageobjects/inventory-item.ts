import { browser, expect } from "@wdio/globals";
import { int, str } from '../utils/utils';
import Inventory from './inventory'
import Page from './page'




export default new class InventoryItem extends Page {
    
    /** @param subUrl inventory-item.html */
    public get subUrl() { return new URL("inventory-item.html").toString() }
    private _itemID?:int;
    /**
     *  @param baseUrl 
     *  https://www.saucedemo.com/inventory-item.html  
     *  https://www.saucedemo.com/inventory-item.html?id={{ID}}  
     */
    public get baseUrl() {
        const url = new URL(this.subUrl,super.baseUrl)
        if(this._itemID != null) {
            url.searchParams.set("id", this._itemID.toString())
        }
        return url.toString()
    }

    public async open(doAssert=false,itemID:any) {
        this._itemID = itemID
        await super.open(doAssert,this.baseUrl);
    }
}
