import { browser } from '@wdio/globals'
import { range } from '../utils/utils';
import Page from '../pageobjects/page';
import Login, { User, USERS } from '../pageobjects/login'
import Inventory from '../pageobjects/inventory'
import Cart from '../pageobjects/cart'



const validUser = USERS[0];

describe("Hamburger", () => {
    before(async () => {
        await Login.open();
        await Login.login(validUser);
    })
    describe("Opening", () => {
        it("opens the hamburger menu", async () => {
            for (let i = 0; i < 10; i++) {
                await Page.Hamburger.open(true)
                await Page.Hamburger.close(true)
                await Page.Hamburger.clickAllItems(true)
            }
        })
    })
})
