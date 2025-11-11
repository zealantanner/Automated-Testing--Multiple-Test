export const _ = undefined;
export type bool = boolean;
export type int = number;
export type str = string;


export const displayDelay = 5000;

export const randstr = (length = 5):str => Math.random().toString(36).slice(2, 2+length)

export function range(start:int, stop:int):int[] {
    const result:int[] = [];
    for(let i = start; i <= stop; i++) {
        result.push(i)
    }
    return result;
}

export function shuffle<T>(array:T[]):T[] {
    return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
}

export async function myWaitForDisplayed(element:ChainablePromiseElement,isReverse=false) {
    await element.waitForDisplayed({reverse:isReverse, timeout: 5000, })
}

export class User {
    constructor(
        public username:str,
        public password:str,
        public isValid:bool=false,
    ) {}
}

export class Item {
    constructor(private root: WebdriverIO.Element) {}
    public get btnAddToCart() {
        return this.root.$('button[id^="add-to-cart"]')
    }
    public async clickAdd() {
        await this.btnAddToCart.waitForDisplayed({ timeout: displayDelay })
        await this.btnAddToCart.click()
    }
    public get btnRemove() {
        return this.root.$('button[id^="remove"]')
    }
    public async clickRemove() {
        await this.btnRemove.waitForDisplayed({ timeout: displayDelay })
        await this.btnRemove.click()
    }
    public get link() {
        return this.root.$('a[id^="item_"][id$="_title_link"]')
    }
    public async clickLink() {
        await this.link.waitForDisplayed({ timeout: displayDelay })
        await this.link.click()
    }
    public async getId() {
        await this.link.waitForDisplayed({ timeout: displayDelay })
        const idAttr = await this.link.getAttribute('id')
        const match = idAttr.match(/item_(\d+)_title_link/)
        return match ? match[1] : "-1"
    }
    public get inCart() {
        return this.btnRemove.isExisting()
    }
    public async getTitle() {
        await this.link.waitForDisplayed({ timeout: displayDelay })
        return await this.link.$('.inventory_item_name').getText();
    }
}
