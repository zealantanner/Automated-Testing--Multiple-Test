import { $ } from "@wdio/globals";
import Page from "./page";

type str = string;

class Login extends Page {
    get inputUsername(){ return $('#user-name') }
    get inputPassword(){ return $('#password') }
    get buttonConfirm(){ return $('#login-button') }

    async login(username:str, password:str) {
        await this.inputUsername.setValue(username)
        await this.inputPassword.setValue(password)
        await this.buttonConfirm.click()
    }
}


export default new Login();