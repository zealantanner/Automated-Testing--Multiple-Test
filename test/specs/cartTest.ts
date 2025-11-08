// import { expect } from '@wdio/globals'
import Login, { validUser } from '../pageobjects/login.ts'
import Inventory from '../pageobjects/inventory.ts'
import Cart from '../pageobjects/cart.ts'




describe('Your Cart', () => {
    before(async () => {
        await Login.open();
        await Login.login(validUser);
    })
    describe("Cart CRUD test", () => {
        it(`should add item number 4 to the cart`, async () => {
            await Inventory.addItemToCart(2)
        })
    })
})

