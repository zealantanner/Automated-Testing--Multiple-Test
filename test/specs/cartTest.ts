// import { expect } from '@wdio/globals'
import Login, { User, USERS } from '../pageobjects/login'
import Inventory from '../pageobjects/inventory'
import Cart from '../pageobjects/cart'



const validUser = USERS[0];

describe('Your Cart', () => {
    before(async () => {
        await new Login.open();
        await Login.login(validUser);
    })
    describe("Cart CRUD test", () => {
        it(`should add item number 4 to the cart`, async () => {
            await Inventory.addItemToCart(2)
        })
    })
})

