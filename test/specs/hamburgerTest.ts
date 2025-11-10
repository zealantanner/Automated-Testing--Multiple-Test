



describe(`Opening`, () => {
    beforeEach("Login", async () => {
        await Login.open();
        await Login.login(validUser)
    })
    it(`Should open hamburger menu from random page`, async () => {
        await base.openRandomPage()
        await base.BurgerMenu.assertOpen()
        await base.BurgerMenu.assertClose()
    })
})

describe(`Hamburger menu`, () => {
    beforeEach("Login", async () => {
        await Login.open();
        await Login.login(validUser)
    })
    describe(`All Items button`, async () => {
        it(`should assert "All Items" button`, async () => {
            await base.openRandomPage()
            await base.BurgerMenu.clickOpen()
            await base.BurgerMenu.assertAllItems()
        })
    })
    describe(`About button`, async () => {
        it(`should assert "About" button`, async () => {
            await base.openRandomPage()
            await base.BurgerMenu.clickOpen()
            await base.BurgerMenu.assertAbout()
        })
    })
    describe(`Logout button`, async () => {
        it(`should assert "Logout" button`, async () => {
            await base.openRandomPage()
            await base.BurgerMenu.clickOpen()
            await base.BurgerMenu.assertLogout()
        })
    })
    describe(`Reset App State button`, async () => {
        it(`should assert "Reset App State" button`, async () => {
            await base.BurgerMenu.clickOpen()
            await base.BurgerMenu.assertResetAppState()
        })
    })
})
