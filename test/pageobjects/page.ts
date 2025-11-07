import { browser, expect, $ } from "@wdio/globals";
import HamburgerMenu from "./page/hamburgerMenu";
import YourCart from "./page/yourCart";
import { int, str } from "../utils/utils";



/** base page */
export default class Page {
    static Hamburger = new HamburgerMenu();
    static Cart = new YourCart();
    protected get logo() { return $('//*[contains(@class,"logo") and contains(text(),"Swag Labs")]') }
    /** @param baseUrl https://www.saucedemo.com */
    public get baseUrl() { return new URL("https://www.saucedemo.com").toString() }

    /** @param path the url to open */
    public async open(doAssert=false,path?:str) { //> finish doAssert for open
        path = path ?? this.baseUrl

        await browser.url(path)
        if(doAssert) {
            let currentUrl;
            await browser.waitUntil(
                async () => {
                    currentUrl = await browser.getUrl()
                    return currentUrl === path
                },
                {
                    timeout: 3000,
                    timeoutMsg: `Expected URL to be ${path} but it changed to ${currentUrl || "unknown"}`,
                }
            )
            await expect(browser).toHaveUrl(path);
        }
    }
}

