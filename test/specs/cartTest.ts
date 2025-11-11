import CartAssert from "../asserts/cartAssert";


//> do the bug in the wild
describe('Your Cart', () => { //> just write all the function I need first
    describe(`Cart icon number`, () => {
        it(`should add and remove items`, async () => {
            await CartAssert.assertCartIconNumber()
        })
    })
    describe(`Cart click test`, () => {
        it(`should direct to cart.html`, async () => {
            await CartAssert.assertCartClickDirect()
        })
    })
    describe(`Cart CRUD test`, () => {
        it(`should add item number 4 to the cart`, async () => {
            await CartAssert.assertCartCRUD()
        })
    })
    describe(`Removing items`, () => {
        it(`should remove items the cart`, async () => {
            await CartAssert.assertRemovingItems()
        })
    })
    describe(`Continue shopping button`, () => {
        it(`should direct back to inventory`, async () => {
            await CartAssert.assertBtnContinueShopping()
        })
    })
    describe(`Checkout button`, () => {
        it(`should direct to checkout page`, async () => {
            await CartAssert.assertBtnCheckout()
        })
    })
    describe(`Item links`, () => {
        it(`should direct to their respective page`, async () => {
            await CartAssert.assertItemLinks()
        })
    })
})
// describe('Your Cart', () => { //> just write all the function I need first
//     beforeEach(`Login`, async () => {
//         await Login.open();
//         await Login.login(validUser)
//     })
//     describe(`Cart icon number`, () => {
//         it(`should add and remove items`, async () => {
//             await Inventory.open()
//             await Inventory.Cart.assertDisplayedCartAmount(0)
//             await Inventory.addItems(3)
//             await Inventory.Cart.assertDisplayedCartAmount(3)
//             await Inventory.removeItem()
//             await Inventory.Cart.assertDisplayedCartAmount(2)
//         })
//     })
//     describe(`Cart click test`, () => {
//         it(`should direct to cart.html`, async () => {
//             await Inventory.addItemToCart(2)
//         })
//     })
//     describe(`Cart CRUD test`, () => {
//         it(`should add item number 4 to the cart`, async () => {
//             await Inventory.addItemToCart(2)
//         })
//     })
// })

