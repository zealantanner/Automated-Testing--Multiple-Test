import { $ } from "@wdio/globals";
import { displayDelay } from "../../utils/utils";


export default class BurgerMenu {
    public get menu() { return $('.bm-menu-wrap') }
    public get btnOpen() { return $('button#react-burger-menu-btn') }
    public get btnClose() { return $('button#react-burger-cross-btn') }
    public readonly openDelay = 5000
    public async clickOpen() {
        await this.btnOpen.click()
    }
    public async clickClose() {
        await this.btnClose.waitForDisplayed({ timeout: this.openDelay })
        await this.btnClose.click()
    }

    public get btnAllItems() { return $('#inventory_sidebar_link') }
    public get btnAbout() { return $('#about_sidebar_link') }
    public get btnLogout() { return $('#logout_sidebar_link') }
    public get btnResetAppState() { return $('#reset_sidebar_link') }
    
    public async clickAllItems() {
        await this.btnAllItems.click()
    }
    public async clickAbout() {
        await this.btnAbout.click()
    }
    public async clickLogout() {
        await this.btnLogout.click()
    }
    public async clickResetAppState() {
        await this.btnResetAppState.click()
    }
}

