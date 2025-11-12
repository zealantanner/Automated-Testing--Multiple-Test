import { browser, expect } from "@wdio/globals";
import Assertion from "./assertion";
import Login from "../pageobjects/login";
import Inventory from "../pageobjects/inventory";
import { User } from "../utils/utils";




export default new class LoginAssert extends Assertion {
    public async assertLogin(user:User) {
        // Open login page
        await Login.open()
        // Attempts login with user info
        await Login.login(user)

        if(user.isValid) {
            // Assert current url is inventory
            await this.assertUrl(Inventory.baseUrl)
            
            // Assert user is logged in via cookies
            await expect(await browser.getCookies()).toHaveLength(1)
        } else {
            // Assert current url is not inventory
            await this.assertUrl(Inventory.baseUrl, true)
            // Assert error message exists
            await expect(Login.errorLoginMessage).toBeExisting()
        }
    }
}