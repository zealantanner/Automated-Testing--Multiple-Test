import { browser } from '@wdio/globals'
import { range } from '../utils/utils';
import Page from '../pageobjects/page';
import Login, { User, USERS } from '../pageobjects/login'
import Inventory from '../pageobjects/inventory'
import Cart from '../pageobjects/cart'



const validUser = USERS[0];

describe(`Hamburger`, () => {
    beforeEach(async () => {
        await Login.open();
        if(Login.isLoggedIn) { await Login.login(validUser) }
    })
    describe(`Opening`, () => {
        it(`Opens the hamburger menu`, async () => {
            for (let i = 0; i < 5; i++) {
                await Page.Hamburger.clickOpen(true)
                await Page.Hamburger.clickClose(true)
            }
        })
    })
    describe(`Menu buttons`)
        beforeEach(async () => {
            await Login.open();
            if(Login.isLoggedIn) { await Login.login(validUser) }
            await Page.Hamburger.clickOpen(true)
        })
        describe(`All Items`, async () => {
            await Page.Hamburger.clickAllItems(true)
        })
        describe(`About`, async () => {
            await Page.Hamburger.clickAbout(true)
        })
        describe(`Logout`, async () => {
            await Page.Hamburger.clickLogout(true)
        })
        describe(`Reset App State`, async () => {
            await Page.Hamburger.clickResetAppState(true)
        })
})
