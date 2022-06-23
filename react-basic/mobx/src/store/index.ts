import { makeAutoObservable } from "mobx"
import { createContext } from "react"

export type emptyFunc =  (...args: unknown[]) => unknown
export interface CountType {
    number: number,
    add: emptyFunc,
    minus: emptyFunc
}
export class CountStore implements CountType {
    number: number = 0
    constructor() {
        makeAutoObservable(this)
    }
    add() {
        this.number += 1
    }
    minus() {
        this.number -= 1
    }
}
export const stores = {
    count: new CountStore()
}

export const useStore = createContext(stores)