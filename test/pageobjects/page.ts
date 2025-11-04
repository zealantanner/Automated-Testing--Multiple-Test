import { browser, $ } from "@wdio/globals";
import { str, bool, int } from "../utils/utils"



/** base page */
export default class Page {
    protected get logo() { return $('//*[contains(@class,"logo") and contains(text(),"Swag Labs")]') }
    protected get hamburgerIcon() { return $('button#react-burger-menu-btn') }
    /** @param path https://www.saucedemo.com/${path} */
    open(path="") {
        return browser.url(`https://www.saucedemo.com/${path}`)
    }
}