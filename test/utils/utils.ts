import Cart from "../pageobjects/cart";
import Checkout from "../pageobjects/checkout";
import Inventory from "../pageobjects/inventory";
import InventoryItem from "../pageobjects/inventory-item";

export const _ = undefined;
export type bool = boolean;
export type int = number;
export type str = string;


export const randstr = (length = 5):str => Math.random().toString(36).slice(2, 2+length)

export function range(start:int, stop:int):int[] {
    const result:int[] = [];
    for(let i = start; i < stop; i++) {
        result.push(i)
    }
    return result;
}

export function shuffle(array:any[]):any[] {
    return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
}


export function urlsWithMenus(doAssert=false) {
    return [
        ...Array(3).flatMap(() => [Cart, Inventory, Checkout].map(p => () => p.open(doAssert))),
        ...(range(0,5)).map(i => () => InventoryItem.open(doAssert,i))
    ]
}




// export function randIntFrom(...args) {
    
// }

