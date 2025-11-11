import Cart from "../../pageobjects/cart";
import Checkout from "../../pageobjects/checkout";
import Inventory from "../../pageobjects/inventory";
import InventoryItem from "../../pageobjects/inventory-item";
import { range, shuffle, str, User } from "../../utils/utils";



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

export const saucelabsUrl = "https://saucelabs.com"

export const pagesWithMenusRandomized = shuffle([
    () => Cart.open(),
    () => Checkout.open(),
    () => Inventory.open(),
    () => InventoryItem.open(shuffle(range(0,5))[0])
])
