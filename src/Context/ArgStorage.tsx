import { _ID } from "../Helpers/HelpersFns"
export type AddTypeProp<A, T> = A & { _type: T }
interface StoreItem<T> {
    _id: string
    _type?: unknown
    data: T
}

export function makeStoreItem<T>(data: T) {
    let si: StoreItem<T> = { _id: _ID(), data }
    if (typeof data === 'object' && 'argType' in data!) { si._type = data.argType }
    else { si._type = 'none' }
    return si satisfies StoreItem<T>
}
export class ArgStorage<T>{
    store: StoreItem<T>[]
    constructor() {
        this.store = []
    }

    add(data: T) {

        const storeItem = makeStoreItem(data)
        this.store.push(storeItem)
    }

    delete(itemId: string) {
        this.store.filter(s => s._id !== itemId)
    }



}