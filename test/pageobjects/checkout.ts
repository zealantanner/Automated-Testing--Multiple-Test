import Page from "./page";



export default new class Checkout extends Page {
    /** @param subUrl checkout-step-one.html */
    public get subUrl() { return new URL("checkout-step-one.html").toString() }
    /** @param baseUrl https://www.saucedemo.com/checkout-step-one.html */
    public get baseUrl() { return new URL(this.subUrl,super.baseUrl).toString() }
    public async open(doAssert=false) { //> finish doAssert for open
        await super.open(doAssert,this.baseUrl);
    }
}
