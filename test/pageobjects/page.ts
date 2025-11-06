import { browser, $ } from "@wdio/globals";
import HamburgerMenu from "./page/hamburgerMenu";
import YourCart from "./page/yourCart";



/** base page */
export default class Page {
    static Hamburger = new HamburgerMenu();
    static Cart = new YourCart();
    protected get textLogo() { return $('//*[contains(@class,"logo") and contains(text(),"Swag Labs")]') }

    /** @param path https://www.saucedemo.com/{{path}} */
    async open(doAssert=false,path="") {
        await browser.url(`https://www.saucedemo.com/${path}`)
    }
}