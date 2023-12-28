import { _ID } from "../Helpers/HelpersFns"
import { ANYobj } from "../Interfaces/MathActionsTypes"
export type AddTypeProp<A, T> = A & { _type: T }
interface StoreItem<T extends ANYobj> {
    group_id: string
    group_data: T[]
    _type?: string
}

export function makeStoreItem<T extends ANYobj>(data: T[]) {
    let si: StoreItem<T> = { group_id: _ID(), group_data: data }
    // if ('argType' in data!) { si._type = data.argType }
    // else { si._type = 'none' }
    return si satisfies StoreItem<T>
}
export class ArgStorage<T extends ANYobj>{
    store: StoreItem<T>[]
    constructor() {
        this.store = []
    }

    add(data: T[]) {

        const storeItem = makeStoreItem(data)
        this.store.push(storeItem)
    }

    delete(itemId: string) {
        this.store.filter(s => s.group_id !== itemId)
    }



}