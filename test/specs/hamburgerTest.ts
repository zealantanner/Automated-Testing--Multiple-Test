import Page from '../pageobjects/page';
import Login, { USERS } from '../pageobjects/login'



const validUser = USERS[0];

describe(`Hamburger`, () => {
    describe(`Opening`, () => {
        beforeEach(async () => {
            await Login.open();
            if(Login.isLoggedIn) { await Login.login(validUser) }
        })
        it(`Opens the hamburger menu`, async () => {
            for (let i = 0; i < 5; i++) {
                await Page.Hamburger.clickOpen(true)
                await Page.Hamburger.clickClose(true)
            }
        })
    })
    describe(`Menu buttons`, () => {
        beforeEach(async () => {
            await Login.open();
            if(Login.isLoggedIn) { await Login.login(validUser) }
            await Page.Hamburger.clickOpen()
        })
        describe(`All Items`, async () => {
            it(`should click "All Items" and take you to inventory`, async () => {
                await Page.Hamburger.clickAllItems(true)
            })
        })
        describe(`About`, async () => {
            it(`should open "About"`, async () => {
                await Page.Hamburger.clickAbout(true)
                await Page.Hamburger.clickAbout()
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
