import { browser, expect } from "@wdio/globals";
import { shuffle, str } from "../utils/utils";
import { pagesWithMenusRandomized } from "./utils/assertutils";




export default class Assertion {
    public async assertUrl(link:str, not=false) {
        if(not) {
            await expect(browser)
                .not.toHaveUrl(link)
        } else {
            await expect(browser)
                .toHaveUrl(link)
        }
    }
    public async openRandomPageHasMenu() {
        shuffle(pagesWithMenusRandomized)[0]()
    }
}