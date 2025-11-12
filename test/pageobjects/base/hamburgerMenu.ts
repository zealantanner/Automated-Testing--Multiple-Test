import { $ } from "@wdio/globals";


export default class HamburgerMenu {
    public get menu() { return $('.bm-menu-wrap') }
    public get btnOpen() { return $('button#react-burger-menu-btn') }
    public get btnClose() { return $('button#react-burger-cross-btn') }

    public readonly openDelay = 5000

    public async openMenu() {
        await this.btnOpen.click()
    }
    public async closeMenu() {
        await this.btnClose.waitForDisplayed({ timeout: this.openDelay })
        await this.btnClose.click()
    }

    public get btnAllItems() { return $('#inventory_sidebar_link') }
    public get btnAbout() { return $('#about_sidebar_link') }
    public get btnLogout() { return $('#logout_sidebar_link') }
    public get btnResetAppState() { return $('#reset_sidebar_link') }
}

