import CartAssert from "../asserts/cartAssert";


describe(`Cart icon number [MTQA-3937]`, () => {
    it(`should add and remove items`, async () => {
        await CartAssert.assertCartIconNumber()
    })
})
describe(`Cart click test [MTQA-3843]`, () => {
    it(`should direct to cart.html`, async () => {
        await CartAssert.assertCartClickDirect()
    })
})
describe(`Cart CRUD test [MTQA-3841]`, () => {
    it(`should add item number 4 to the cart`, async () => {
        await CartAssert.assertCartCRUD()
    })
})
describe(`Continue shopping button [MTQA-3942]`, () => {
    it(`should direct back to inventory`, async () => {
        await CartAssert.assertBtnContinueShopping()
    })
})
describe(`Checkout button [MTQA-3943]`, () => {
    it(`should direct to checkout page`, async () => {
        await CartAssert.assertBtnCheckout()
    })
})
describe(`Item link [MTQA-3944]`, () => {
    it(`should direct to that item's page`, async () => {
        await CartAssert.assertItemLinks()
    })
})
