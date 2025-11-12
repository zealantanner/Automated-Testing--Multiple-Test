import BurgerAssert from "../asserts/burgerAssert";




describe(`Opening`, () => {
    it(`Should open and close the burger menu from random pages`, async () => {
        await BurgerAssert.assertOpenAndClose(3)
    })
})

describe(`Burger menu`, () => {
    describe(`All Items button`, async () => {
        it(`should direct to inventory page`, async () => {
            await BurgerAssert.assertAllItems()
        })
    })
    describe(`About button`, async () => {
        it(`should direct to saucelabs page`, async () => {
            await BurgerAssert.assertAbout(false)
        })
    })
    describe(`Logout button`, async () => {
        it(`should log the user out`, async () => {
            await BurgerAssert.assertLogout()
        })
    })
    describe(`Reset App State button`, async () => {
        it(`should reset the status of items added to the cart`, async () => {
            await BurgerAssert.assertResetAppState()
        })
    })
})
