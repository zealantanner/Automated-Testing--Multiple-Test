import CartAssert from "../asserts/cartAssert";


//> do the bug in the wild
describe('Your Cart', () => {
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
