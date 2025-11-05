import { browser, $ } from "@wdio/globals";
import { str } from "../utils/utils"
import Page from "./page";



export default new class Cart extends Page {
    private get cartIcon() { return $('a.shopping_cart_link') }
    open() {
        return super.open(`cart.html`);
    }
}
