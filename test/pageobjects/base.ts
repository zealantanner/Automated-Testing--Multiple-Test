import { browser, $ } from "@wdio/globals";
import HamburgerMenu from "./base/hamburgerMenu";
import CartMenu from "./base/cartMenu";
import { str } from "../utils/utils";


//> edit the jira tickets to work with this
/** base page */
export default class Base {
    public get HamburgerMenu() { return new HamburgerMenu() }
    public get CartMenu() { return new CartMenu() }
    public get logo() { return $('//*[contains(@class,"logo") and contains(text(),"Swag Labs")]') }

    /** @param baseUrl https://www.saucedemo.com */
    public get baseUrl() { return new URL("https://www.saucedemo.com").toString() }

    /** @param path the url to open */
    public async open(path?:str) {
        path = path ?? this.baseUrl
        await browser.url(path)
    }
    public async quickReset() {
        await browser.deleteAllCookies()
    }
}

export const base = new Base() 