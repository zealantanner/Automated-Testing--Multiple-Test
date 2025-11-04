// import { expect } from '@wdio/globals'
import Login, { User, USERS } from '../pageobjects/login'
import Inventory from '../pageobjects/inventory'
import Cart from '../pageobjects/cart'



describe("Login", () => {
    USERS.forEach(user => {
        describe(`as ${user.username}`, () => {
            it(`should ${user.isValid ? "allow":"deny"} login`, async () => {
                await Login.open()
                await Login.assertLogin(user)
            })
        })
    });
})
