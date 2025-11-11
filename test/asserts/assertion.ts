import { browser, expect } from "@wdio/globals";
import { displayDelay, shuffle, str } from "../utils/utils";
import { pagesWithMenusRandomized } from "./utils/assertutils";




export default class Assertion {
    protected async assertUrl(link:str, not=false) {
        if(not) {
            await browser.waitUntil(
                async () => (await browser.getUrl()) !== link,
                { timeout: displayDelay }
            )
        } else {
            await browser.waitUntil(
                async () => (await browser.getUrl()) === link,
                { timeout: displayDelay }
            )
        }
    }
    protected async openRandomPageHasMenu() {
        shuffle(pagesWithMenusRandomized)[0]()
    }
}