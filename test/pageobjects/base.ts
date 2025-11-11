import { browser, $ } from "@wdio/globals";
import BurgerMenu from "./base/burgerMenu";
import CartMenu from "./base/cartMenu";
import { str } from "../utils/utils";


//> edit the jira tickets to work with this
/** base page */
export default class Base {
    public get BurgerMenu() { return new BurgerMenu() }
    public get CartMenu() { return new CartMenu() }
    public get logo() { return $('//*[contains(@class,"logo") and contains(text(),"Swag Labs")]') }

    /** @param baseUrl https://www.saucedemo.com */
    public get baseUrl() { return new URL("https://www.saucedemo.com").toString() }

    /** @param path the url to open */
    public async open(path?:str) {
        path = path ?? this.baseUrl
        await browser.url(path)
    }
    //>assert move to assert file
    // public async openRandomPage() {
    //     return shuffle(pagesWithMenus())[0]()
    // }
    public async quickReset() {
        await browser.deleteAllCookies()
    }
}

export const base = new Base() 