import { browser, $ } from "@wdio/globals";
import { str, bool, int } from "../utils/utils"

class Hamburger {
    private get openButton() { return $('button#react-burger-menu-btn') }
    private get closeButton() { return $('button#react-burger-cross-btn') }
    public async open() {
        await this.openButton.click()
        await browser.pause(500)
    }
    public async close() {
        await this.closeButton.click() 
        await browser.pause(500)
    }
    public async isOpen() { return await this.closeButton.isDisplayed() }

    static Option = class {
        private get allItemsButton() { return $('#inventory_sidebar_link') }
        private get aboutButton() { return $('#about_sidebar_link') }
        private get logoutButton() { return $('#logout_sidebar_link') }
        private get resetAppStateButton() { return $('#reset_sidebar_link') }
        
        public async clickAllItems() { await this.allItemsButton.click() }
        public async clickAbout() { await this.aboutButton.click() }
        public async clickLogout() { await this.logoutButton.click() }
        public async clickResetAppState() { await this.resetAppStateButton.click() }
    }
}


/** base page */
export default class Page {
    protected get textLogo() { return $('//*[contains(@class,"logo") and contains(text(),"Swag Labs")]') }
    static burgerMenu = new class {
        protected get openButton() { return $('button#react-burger-menu-btn') }
        public async open() {
            await this.openButton.click()
            await browser.pause(500)
        }

        protected get closeButton() { return $('button#react-burger-cross-btn') }
        public async close() {
            await this.closeButton.click() 
            await browser.pause(500)
        }

        public async isOpen() { return await this.closeButton.isDisplayed() }

        protected get allItemsButton() { return $('#inventory_sidebar_link') }
        public async clickAllItems() { await this.allItemsButton.click()}

        protected get aboutButton() { return $('#about_sidebar_link') }
        public async clickAbout() { await this.aboutButton.click()}
        
        protected get logoutButton() { return $('#logout_sidebar_link') }
        public async clickLogout() { await this.logoutButton.click()}
        
        protected get resetAppStateButton() { return $('#reset_sidebar_link') }
        public async clickResetAppState() { await this.resetAppStateButton.click() }
    }

    /** @param path https://www.saucedemo.com/{{path}} */
    open(path:str="") {
        return browser.url(`https://www.saucedemo.com/${path}`)
    }
}