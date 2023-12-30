import { makeAutoObservable } from "mobx"
import { _ID } from "../Helpers/HelpersFns"
import { ANYobj } from "../Interfaces/MathActionsTypes"
export type AddTypeProp<A, T> = A & { _type: T }
export interface StoreGroupData<T extends ANYobj> {
    group_id: string
    group_data: T[]
    _type?: string
}

export function makeStoreItem<T extends ANYobj>(data: T[]) {
    let si: StoreGroupData<T> = { group_id: _ID(), group_data: data }

    return si satisfies StoreGroupData<T>
}
export class ArgStorage<T extends ANYobj>{
    store: StoreGroupData<T>[]
    constructor() {
        this.store = []
        makeAutoObservable(this)
    }

    add(data: T[]) {

        const storeItem = makeStoreItem(data)
        this.store.push(storeItem)
    }

    delete(itemId: string) {
        this.store.filter(s => s.group_id !== itemId)
    }



}