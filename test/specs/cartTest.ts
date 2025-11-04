// import { expect } from '@wdio/globals'
import Login, { User, USERS } from '../pageobjects/login'
import Inventory from '../pageobjects/inventory'
import Cart from '../pageobjects/cart'



const validUser = USERS[0];

describe('Your Cart', () => {
    before(async () => {
        await Login.open();
        await Login.assertLogin(validUser);
    })
    describe("Cart CRUD test", () => {
        
    })
})

