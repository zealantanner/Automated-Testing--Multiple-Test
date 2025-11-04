import { $ } from "@wdio/globals";
import Page from "./page";
import { str, bool, randstr } from "../utils/utils"

export class User {
    constructor(
        public username:str,
        public password:str,
        public isValid:bool=false,
    ) {}
}


export const USERS = [
    new User("standard_user", "secret_sauce", true),
    new User("locked_out_user", "secret_sauce", false),
    new User("problem_user", "secret_sauce", true),
    new User("performance_glitch_user", "secret_sauce", true),
    new User("error_user", "secret_sauce", true),
    new User("visual_user", "secret_sauce", true),
    new User("standard_user", "wrong_password"),
    new User("mispelled_user", "secret_sauce"),
    new User(randstr(10), randstr(10)),
]


class Login extends Page {
    private get inputUsername() { return $('#user-name') }
    private get inputPassword() { return $('#password') }
    private get buttonConfirm() { return $('#login-button') }
    private get errorLoginMessage() { return $('//*[@data-test="error"]') }
    
    public async assertLogin(user:User) {
        await this.inputUsername.setValue(user.username);
        await this.inputPassword.setValue(user.password);
        await this.buttonConfirm.click();
        if(user.isValid) {
            await expect(browser).toHaveUrl(expect.stringContaining("inventory.html"))
        } else {
            await expect(browser).toHaveUrl(expect.not.stringContaining("inventory.html"))
            await expect(this.errorLoginMessage).toBeExisting()
        }
    }
}


export default new Login();