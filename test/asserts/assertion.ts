import { browser, expect } from "@wdio/globals";
import { shuffle, str } from "../utils/utils";
import { pagesWithMenusRandomized } from "./utils/assertutils";




export default class Assertion {
    protected async assertUrl(link:str, reverse=false) {
        if(reverse) {
            await expect(browser)
                .not.toHaveUrl(link)
        } else {
            await expect(browser)
                .toHaveUrl(link)
        }
        // if(reverse) {
        //     await browser.waitUntil(
        //         async () => (await browser.getUrl()) !== link,
        //         { timeout: displayDelay }
        //     )
        // } else {
        //     await browser.waitUntil(
        //         async () => (await browser.getUrl()) === link,
        //         { timeout: displayDelay }
        //     )
        // }
    }
    protected async openRandomPageHasMenu() {
        shuffle(pagesWithMenusRandomized)[0]()
    }
}