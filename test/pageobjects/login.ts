import { $ } from "@wdio/globals";
import Base from "./base.ts";
import { User, displayDelay } from "../utils/utils.ts"







class Login extends Base {
    public get inputUsername() { return $('#user-name') }
    public get inputPassword() { return $('#password') }
    public get btnConfirm() { return $('#login-button') }
    public get errorLoginMessage() { return $('//*[@data-test="error"]') }
    public isLoggedIn = false;
    
    public async login(user:User) {
        await this.inputUsername.waitForDisplayed({ timeout: displayDelay })
        await this.inputUsername.setValue(user.username);
        await this.inputPassword.waitForDisplayed({ timeout: displayDelay })
        await this.inputPassword.setValue(user.password);
        await this.btnConfirm.waitForDisplayed({ timeout: displayDelay })
        await this.btnConfirm.click();
        this.isLoggedIn = user.isValid
    }
}

export default new Login();
