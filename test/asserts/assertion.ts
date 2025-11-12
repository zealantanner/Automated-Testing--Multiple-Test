import { browser, expect } from "@wdio/globals";
import { randstr, range, shuffle, str, User } from "../utils/utils";
import Cart from "../pageobjects/cart";
import Checkout1 from "../pageobjects/checkout1";
import Inventory from "../pageobjects/inventory";
import InventoryItem from "../pageobjects/inventory-item";
import Login from "../pageobjects/login";




export default class Assertion {
    // All users
    readonly USERS = [
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
    // Standard user
    readonly VALID_USER = this.USERS[0];
    // Saucelabs url
    readonly SAUCE_LABS_URL = "https://saucelabs.com"

    // Assert current url is link
    protected async assertUrl(link:str, reverse=false) {
        if(reverse) {
            // Assert current url is not link
            await expect(browser).not.toHaveUrl(link)
        } else {
            // Assert current url is link
            await expect(browser).toHaveUrl(link)
        }
    }

    protected async preAssert() {
        // Open login page
        await Login.open()
        // Logs in as valid user
        await Login.login(this.VALID_USER)
    }
    
    // Go to a random page that has hamburger and cart menus
    protected async openRandomPageHasMenu() {
        // Array of pages with menus
        const pages = [
            () => Cart.open(),
            () => Checkout1.open(),
            () => Inventory.open(),
            () => InventoryItem.open(shuffle(range(0,5))[0])
        ]
        // Opens a random one
        await shuffle(pages)[0]()
    }
}