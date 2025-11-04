import { browser, $ } from "@wdio/globals";
import { str } from "../utils/utils"
import Page from "./page";


/** items to buy */
class Inventory extends Page {
    open() {
        return super.open(`inventory.html`);
    }
}


export default new Inventory();