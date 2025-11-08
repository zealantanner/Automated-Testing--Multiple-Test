import Login, { validUser } from '../pageobjects/login.ts'
import Inventory from '../pageobjects/inventory.ts'
import Cart from '../pageobjects/cart.ts'
import { base } from '../pageobjects/base.ts'




describe('Your Cart', () => { //> just write all the function I need first
    beforeEach("Login", async () => {
        await Login.open();
        await Login.login(validUser)
    })
    describe("Cart number test", () => {
        it(`should add item number 4 to the cart`, async () => {
            await base.Cart.assertDisplayedCartAmount
        })
    })
    describe("Cart click test", () => {
        it(`should direct to cart.html`, async () => {
            await Inventory.addItemToCart(2)
        })
    })
    describe("Cart CRUD test", () => {
        it(`should add item number 4 to the cart`, async () => {
            await Inventory.addItemToCart(2)
        })
    })
})

