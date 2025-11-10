import Login, { validUser } from '../pageobjects/login.ts'
import Inventory from '../pageobjects/inventory.ts'
import Cart from '../pageobjects/cart.ts'
import { base } from '../pageobjects/base.ts'




describe('Your Cart', () => { //> just write all the function I need first
    beforeEach("Login", async () => {
        await Login.open();
        await Login.login(validUser)
    })
    describe("Cart icon number", () => {
        it(`should add and remove items`, async () => {
            await Inventory.open()
            await Inventory.Cart.assertDisplayedCartAmount(0)
            await Inventory.addItems(3)
            await Inventory.Cart.assertDisplayedCartAmount(3)
            await Inventory.removeItem()
            await Inventory.Cart.assertDisplayedCartAmount(2)
        })
    })
    // describe("Cart click test", () => {
    //     it(`should direct to cart.html`, async () => {
    //         await Inventory.addItemToCart(2)
    //     })
    // })
    // describe("Cart CRUD test", () => {
    //     it(`should add item number 4 to the cart`, async () => {
    //         await Inventory.addItemToCart(2)
    //     })
    // })
})

