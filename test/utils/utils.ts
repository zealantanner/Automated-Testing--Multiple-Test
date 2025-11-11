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
        await this.btnAddToCart.click()
    }
    public get btnRemove() {
        return this.root.$('button[id^="remove"]')
    }
    public async clickRemove() {
        await this.btnRemove.click()
    }
    private get name() {
        return this.root.$('.inventory_item_name')
    }
    public get id() {
        return this.root
            .$('[id^="item_"][id$="_title_link"]')
            .getAttribute('id')
            .then(idAttr => {
                const match = idAttr.match(/item_(\d+)_title_link/)
                return match ? parseInt(match[1]) : null
            })
    }
    public get inCart() {
        return this.btnRemove.isExisting()
    }
    public async getNameText() {
        return await this.name.getText();
    }
}
