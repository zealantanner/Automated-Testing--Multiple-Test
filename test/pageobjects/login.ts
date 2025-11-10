import { browser, expect, $ } from "@wdio/globals";
import Base from "./base.ts";
import { str, bool, User } from "../utils/utils.ts"







class Login extends Base {
    private get inputUsername() { return $('#user-name') }
    private get inputPassword() { return $('#password') }
    private get btnConfirm() { return $('#login-button') }
    private get errorLoginMessage() { return $('//*[@data-test="error"]') }
    public isLoggedIn = false;
    
    public async login(user:User) {
        await this.inputUsername.waitForDisplayed({ timeout: 2000 })
        await this.inputUsername.setValue(user.username);
        await this.inputPassword.waitForDisplayed({ timeout: 2000 })
        await this.inputPassword.setValue(user.password);
        await this.btnConfirm.waitForDisplayed({ timeout: 2000 })
        await this.btnConfirm.click();
        this.isLoggedIn = user.isValid
    }
    //>assert
    // public async assertLogin(user:User) {
    //     this.open()
    //     this.login(user)
    //     if(user.isValid) {
    //         await expect(browser)
    //             .toHaveUrl(Inventory.baseUrl)
    //     } else {
    //         await expect(browser)
    //             .not.toHaveUrl(Inventory.baseUrl)
    //         await expect(this.errorLoginMessage)
    //             .toBeExisting()
    //     }
    // }
}

export default new Login();
