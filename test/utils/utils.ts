export type str = string;
export type bool = boolean;
export type int = number;

export class User {
    constructor(
        public username:str,
        public password:str,
        public isValid:bool=false,
    ) {}
}

export const randstr = (length = 5) => Math.random().toString(36).slice(2, 2+length)

export function range(start:int, stop:int) {
    const result:int[] = [];
    for(let i = start; i < stop; i++) {
        result.push(i)
    }
}

export function shuffle(array:Array<any>) {
    return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
}

