import Page from '../pageobjects/page';
import Login, { USERS } from '../pageobjects/login'
import { range } from '../utils/utils';



const validUser = USERS[0];

describe(`Hamburger`, () => {
    describe(`Opening`, () => {
        beforeEach(async () => {
            await Login.open();
            if(!Login.isLoggedIn) { await Login.login(validUser) }
        })
        range(0,5).forEach(i => {
            it(`Should open the hamburger menu on different page #${i+1}`, async () => {
                await new Page().openRandomPage(true)
                await Page.Hamburger.clickOpen(true)
                await Page.Hamburger.clickClose(true)
            })
        })
    })
    describe(`Menu buttons`, () => {
        beforeEach(async () => {
            if(!Login.isLoggedIn) {
                await Login.open();
                await Login.login(validUser)
            }
            await new Page().openRandomPage(true)
            await Page.Hamburger.clickOpen(true)
        })
        describe(`All Items`, async () => {
            it(`should click "All Items" and take you to inventory`, async () => {
                await Page.Hamburger.clickAllItems(true)
            })
        })
        describe(`About`, async () => {
            it(`should open "About"`, async () => {
                await Page.Hamburger.clickAbout(true)
            })
        })
        describe(`Logout`, async () => {
            it(`should open "Logout"`, async () => {
                await Page.Hamburger.clickLogout(true)
            })
        })
        describe(`Reset App State`, async () => {
            it(`should open "Reset App State"`, async () => {
                await Page.Hamburger.clickResetAppState(true)
            })
        })
    })
})
