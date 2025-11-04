import { $ } from "@wdio/globals";
import Page from "./page";
import { str, bool } from "../utils/utils"

export class User {
    constructor(
        public username:str,
        public password:str,
        public isValid:bool=false,
    ) {}
}


class Login extends Page {
    private get inputUsername() { return $('#user-name') }
    private get inputPassword() { return $('#password') }
    private get buttonConfirm() { return $('#login-button') }
    
    
    public async login(user:User) {
        await this.inputUsername.setValue(user.username);
        await this.inputPassword.setValue(user.password);
        await this.buttonConfirm.click();
        if(user.isValid) {
            await expect(browser).toHaveUrl(expect.stringContaining("inventory.html"))
        } else {
            await expect(browser).toHaveUrl(expect.not.stringContaining("inventory.html"))
        }
    }
}


export default new Login();