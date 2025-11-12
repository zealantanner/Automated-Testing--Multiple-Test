import { $ } from "@wdio/globals"


export default class CartMenu {
    public get link() { return $('a.shopping_cart_link') }
    public get cartAmount() { return this.link.$('span.shopping_cart_badge') }

    public get displayedCartAmount() {
        return (async () => {
            const exists = await this.cartAmount.isExisting()
            let amount = exists ? parseInt(await this.cartAmount.getText()) : 0
            return amount
        })()
    }    
}


