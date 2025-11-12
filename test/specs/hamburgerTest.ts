import HamburgerAssert from "../asserts/hamburgerAssert";





describe(`Opening [MTQA-3846]`, () => {
    it(`Should open and close the hamburger menu from random pages`, async () => {
        await HamburgerAssert.assertOpenAndClose()
    })
})
describe(`All Items button [MTQA-3847]`, () => {
    it(`should direct to inventory page`, async () => {
        await HamburgerAssert.assertAllItems()
    })
})
describe(`About button [MTQA-3849]`, () => {
    it(`should direct to saucelabs page`, async () => {
        await HamburgerAssert.assertAbout(false)
    })
})
describe(`Logout button [MTQA-3850]`, () => {
    it(`should log the user out`, async () => {
        await HamburgerAssert.assertLogout()
    })
})
describe(`Reset App State button [MTQA-3851]`, () => {
    it(`should reset the status of items added to the cart`, async () => {
        await HamburgerAssert.assertResetAppState()
    })
})
