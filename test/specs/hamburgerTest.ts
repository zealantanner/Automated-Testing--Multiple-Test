import Inventory from '../pageobjects/inventory.ts';
import Login, { validUser } from '../pageobjects/login.ts'
import { base } from '../pageobjects/base.ts';




describe(`Opening`, () => {
    it(`Should open hamburger menu from random page`, async () => {
        await Login.open()
        await Login.login(validUser)
        await base.openRandomPage()
        await base.Hamburger.assertOpen()
        await base.Hamburger.assertClose()
    })
})

describe(`Hamburger menu`, () => {
    // beforeEach(async () => {
    //     await Login.open();
    //     await Login.login(validUser)
    //     await page.Hamburger.clickOpen()
    // })
    describe(`All Items button`, async () => {
        it(`should assert "All Items" button`, async () => {
            await Login.open();
            await Login.login(validUser)
            await base.Hamburger.clickOpen()
            await base.Hamburger.assertAllItems()
        })
    })
    describe(`About button`, async () => {
        it(`should assert "About" button`, async () => {
            await Login.open();
            await Login.login(validUser)
            await base.Hamburger.clickOpen()
            await base.Hamburger.assertAbout()

        })
    })
    describe(`Logout button`, async () => {
        it(`should assert "Logout" button`, async () => {
            await Login.open();
            await Login.login(validUser)
            await base.Hamburger.clickOpen()
            await base.Hamburger.assertLogout()
        })
    })
    describe(`Reset App State button`, async () => {
        it(`should assert "Reset App State" button`, async () => {
            await Login.open();
            await Login.login(validUser)
            await base.Hamburger.clickOpen()
            // await Inventory.addRandItemsToCart(3)
            
            await base.Hamburger.assertResetAppState()
        })
    })
})
