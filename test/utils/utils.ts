export type str = string;
export type bool = boolean;
export type int = number;


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

