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


