import { browser, expect } from "@wdio/globals";
import { User } from "../utils/utils";
import Assertion from "./assertion";
import Login from "../pageobjects/login";
import Inventory from "../pageobjects/inventory";



export default new class LoginAssert extends Assertion {
    public async assertLogin(user:User) {
        await Login.open()
        await Login.login(user)
        await expect(await browser.getCookies())
            .not.toHaveLength(0)
        if(user.isValid) {
            await this.assertUrl(Inventory.baseUrl)
        } else {
            await this.assertUrl(Inventory.baseUrl, true)
            await expect(Login.errorLoginMessage)
                .toBeExisting()
        }
    }
}