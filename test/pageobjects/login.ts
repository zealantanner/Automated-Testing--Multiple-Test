import { browser, expect, $ } from "@wdio/globals";
import Inventory from "./inventory.ts";
import Base from "./base.ts";
import { str, bool, randstr } from "../utils/utils.ts"



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
    // new User(randstr(10), randstr(10)),
]

export const validUser = USERS[0];

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
    public async assertLogin(user:User) {
        this.open()
        this.login(user)
        if(user.isValid) {
            await expect(browser)
                .toHaveUrl(Inventory.baseUrl)
        } else {
            await expect(browser)
                .not.toHaveUrl(Inventory.baseUrl)
            await expect(this.errorLoginMessage)
                .toBeExisting()
        }
    }
}

export default new Login();
