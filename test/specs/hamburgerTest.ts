import { browser, expect } from '@wdio/globals'
import { range } from '../utils/utils';
import Page from '../pageobjects/page';
import Login, { User, USERS } from '../pageobjects/login'
import Inventory from '../pageobjects/inventory'
import Cart from '../pageobjects/cart'



const validUser = USERS[0];

describe("Hamburger", () => {
    before(async () => {
        await Login.open();
        await Login.assertLogin(validUser);
    })
    describe("Opening", () => {
        it("opens the hamburger menu", async () => {
            for (let i = 0; i < 10; i++) {
                await Page.burgerMenu.open()
                await Page.burgerMenu.close()
            }
        })
    })
})
