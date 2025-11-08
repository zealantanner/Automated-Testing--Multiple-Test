import Base from "./base.ts";



class Checkout extends Base {
    /** @param subUrl checkout-step-one.html */
    public get subUrl() { return "checkout-step-one.html" }
    /** @param baseUrl https://www.saucedemo.com/checkout-step-one.html */
    public get baseUrl() { return new URL(this.subUrl,super.baseUrl).toString() }
    public async open() {
        await super.open(this.baseUrl);
    }
}


export default new Checkout();
