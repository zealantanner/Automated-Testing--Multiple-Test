import { browser, $ } from "@wdio/globals";



/**
*  default page
*/
export default class Page {
    get logo() { return $('//*[contains(@class,"logo") and contains(text(),"Swag Labs")]') }
    /**
    /* @param path path of the https://www.saucedemo.com/${path}
    */
    open(path="") {
        return browser.url(`https://www.saucedemo.com/${path}`)
    }
}