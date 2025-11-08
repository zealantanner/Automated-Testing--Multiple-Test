import Cart from "../pageobjects/cart.ts";
import Checkout from "../pageobjects/checkout.ts";
import Inventory from "../pageobjects/inventory.ts";
import InventoryItem from "../pageobjects/inventory-item.ts";

export const _ = undefined;
export type bool = boolean;
export type int = number;
export type str = string;


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


export function pagesWithMenus() {
    return [
        () => Cart.open(),
        () => Inventory.open(),
        () => Checkout.open(),
        ...range(0,5).map(i =>
            () => InventoryItem.open(i),
        )
    ]
    
    // ...range(1,5).flatMap(() => [Cart, Inventory, Checkout].map(p => 
    //     () => p.open(doAssert),
    // )),
    // ...range(0,5).map(i =>
    //     () => InventoryItem.open(doAssert,i),
    // )
    // return [
        //     ...Array(3).flatMap(() => [Cart, Inventory, Checkout].map(p => () => p.open(doAssert))),
    //     ...(range(0,5)).map(i => () => InventoryItem.open(doAssert,i))
    // ]
}




// export function randIntFrom(...args) {
    
// }

