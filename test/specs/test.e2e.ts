// import { expect } from '@wdio/globals'
import { User } from '../utils/utils';
import Login from '../pageobjects/login'
import Inventory from '../pageobjects/inventory'
import Cart from '../pageobjects/cart'



const validUser = new User("standard_user","secret_sauce", true);

describe('Your Cart', () => {
    before(async () => {
        await Login.open();
        await Login.login(validUser);
    })
    describe("Cart CRUD test", () => {
        
    })
})

