import BurgerAssert from "../asserts/burgerAssert";




describe(`Opening`, () => {
    it(`Should open and close the burger menu from random page`, async () => {
        await BurgerAssert.assertOpenAndClose(3)
    })
})

describe(`Burger menu`, () => {
    describe(`All Items button`, async () => {
        it(`should assert "All Items" button`, async () => {
            await BurgerAssert.assertAllItems()
        })
    })
    describe(`About button`, async () => {
        it(`should assert "About" button`, async () => {
            // await BurgerAssert.assertAbout()
            await BurgerAssert.assertAbout(false)
        })
    })
    describe(`Logout button`, async () => {
        it(`should assert "Logout" button`, async () => {
            await BurgerAssert.assertLogout()
        })
    })
    describe(`Reset App State button`, async () => {
        it(`should assert "Reset App State" button`, async () => {
            await BurgerAssert.assertResetAppState()
        })
    })
})


// describe(`Opening`, () => {
//     beforeEach(`Login`, async () => {
//         await Login.open();
//         await Login.login(validUser)
//     })
//     it(`Should open burger menu from random page`, async () => {
//         await 
//         await base.openRandomPage()
//         await base.BurgerMenu.assertOpen()
//         await base.BurgerMenu.assertClose()
//     })
// })

// describe(`Burger menu`, () => {
//     beforeEach(`Login`, async () => {
//         await Login.open();
//         await Login.login(validUser)
//     })
//     describe(`All Items button`, async () => {
//         it(`should assert "All Items" button`, async () => {
//             await base.openRandomPage()
//             await base.BurgerMenu.clickOpen()
//             await base.BurgerMenu.assertAllItems()
//         })
//     })
//     describe(`About button`, async () => {
//         it(`should assert "About" button`, async () => {
//             await base.openRandomPage()
//             await base.BurgerMenu.clickOpen()
//             await base.BurgerMenu.assertAbout()
//         })
//     })
//     describe(`Logout button`, async () => {
//         it(`should assert "Logout" button`, async () => {
//             await base.openRandomPage()
//             await base.BurgerMenu.clickOpen()
//             await base.BurgerMenu.assertLogout()
//         })
//     })
//     describe(`Reset App State button`, async () => {
//         it(`should assert "Reset App State" button`, async () => {
//             await base.BurgerMenu.clickOpen()
//             await base.BurgerMenu.assertResetAppState()
//         })
//     })
// })
