import { browser, expect, $ } from "@wdio/globals";
import HamburgerMenu from "./base/hamburgerMenu.ts";
import CartMenu from "./base/cartMenu.ts";
import { int, pagesWithMenus, shuffle, str } from "../utils/utils.ts";


//> edit the jira tickets to work with this
/** base page */
export default class Base {
    public get BurgerMenu() { return new HamburgerMenu() }
    public get Cart() { return new CartMenu() }
    protected get logo() { return $('//*[contains(@class,"logo") and contains(text(),"Swag Labs")]') }
    readonly delay:int = 5000;

    /** @param baseUrl https://www.saucedemo.com */
    public get baseUrl() { return new URL("https://www.saucedemo.com").toString() }

    /** @param path the url to open */
    public async open(path?:str) {
        path = path ?? this.baseUrl
        await browser.url(path)
    }
    public async assertOpen(path?:str) {
        path = path ?? this.baseUrl
        await this.open(path)
        await expect(browser)
            .toHaveUrl(path);
    }
    
    public async openRandomPage() {
        return shuffle(pagesWithMenus())[0]()
    }
    public async quickReset() {
        await browser.deleteAllCookies()
    }
}

export const base = new Base() 