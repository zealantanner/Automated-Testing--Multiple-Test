import { int } from '../utils/utils.ts';
import Base from './base.ts'




class InventoryItem extends Base {
    
    /** @param subUrl inventory-item.html */
    public get subUrl() { return "inventory-item.html" }
    private _itemID?:int;
    /** @param baseUrl https://www.saucedemo.com/inventory-item.html */
    public get baseUrl() {
        const url = new URL(this.subUrl,super.baseUrl)
        if(this._itemID != null) {
            url.searchParams.set("id", this._itemID.toString())
        }
        return url.toString()
    }
    
    /** @param baseUrlWithID https://www.saucedemo.com/inventory-item.html?id={{ID}} */
    public baseUrlWithID(itemID:int) {
        const url = new URL(this.baseUrl)
        url.searchParams.set("id", itemID.toString())
        this._itemID = itemID
        return url.toString()
    }

    public async open(itemID:any) {
        this._itemID = itemID
        await super.open(this.baseUrlWithID(itemID));
    }
}


export default new InventoryItem();
