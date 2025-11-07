import { expect, $ } from "@wdio/globals";
import Page from "./page";
import { str, bool, randstr } from "../utils/utils"
import Inventory from "./inventory";



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


export default new class Login extends Page {
    private get inputUsername() { return $('#user-name') }
    private get inputPassword() { return $('#password') }
    private get btnConfirm() { return $('#login-button') }
    private get errorLoginMessage() { return $('//*[@data-test="error"]') }
    public isLoggedIn = false;
    
    public async login(user:User, doAssert:bool=false) {
        if(!this.isLoggedIn) {
            await this.inputUsername.setValue(user.username);
            await this.inputPassword.setValue(user.password);
            await this.btnConfirm.click();
            if(doAssert) {
                if(user.isValid) {
                    await expect(browser).toHaveUrl(Inventory.baseUrl.toString())
                } else {
                    await expect(browser).not.toHaveUrl(Inventory.baseUrl.toString())
                    await expect.soft(this.errorLoginMessage).toBeExisting()
                }
            }
            if(user.isValid) {
                this.isLoggedIn = true
            }
        }
    }
}

