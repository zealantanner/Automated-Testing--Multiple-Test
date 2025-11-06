import { $ } from "@wdio/globals";
import Page from "./page";



export default new class Cart extends Page {
    private get btnCheckout() { return $('button#checkout') }
    public async click(doAssert=false) { //> finish doAssert
        await this.btnCheckout
    }
    async open(doAssert=false) { //> finish doAssert for open
        await super.open(doAssert,`cart.html`);
    }
}
