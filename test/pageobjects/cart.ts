import { $ } from "@wdio/globals";
import { str, int, bool } from "../utils/utils"
import Page from "./page";



class Cart extends Page {

    open() {
        return super.open(`cart.html`);
    }
}


export default new Cart();