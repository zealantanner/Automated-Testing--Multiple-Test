import { browser, expect } from "@wdio/globals";
import { shuffle, str } from "../utils/utils";
import { pagesWithMenusRandomized, validUser } from "./utils/assertutils";
import Login from "../pageobjects/login";




export default class Assertion {
    protected async assertUrl(link:str, reverse=false) {
        if(reverse) {
            await expect(browser).not.toHaveUrl(link)
        } else {
            await expect(browser).toHaveUrl(link)
        }
    }
    protected async preAssert() {
        await Login.open()
        await Login.login(validUser)
    }
    
    protected async openRandomPageHasMenu() {
        shuffle(pagesWithMenusRandomized)[0]()
    }
}