import { _allowStateChangesInsideComputed, makeAutoObservable } from "mobx"
import { _ID } from "../Helpers/HelpersFns"
import { ANYobj } from "../Interfaces/MathActionsTypes"
import { A_Sill } from "../Interfaces/CommonTypes"
import { arrReducer } from "../ActionComponents/Calculators/SillCalculator"
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
        this.store = this.store.filter(s => s.group_id !== itemId)
    }

    getSize() {
        return this.store.length
    }

    groups() {
        const _tag_strsize = (item: T) => ({ ...item, _size: `${item.B}_${item.L}` as const })
        const addTag = (gr: T[]) => gr.map(_tag_strsize).map(s => ({ ...s }))
        const regroup = (gr: T[]) => _filterGroups(gr, '_size')
        const groups = this.store.map(s => s.group_data)
        const groupIdMap = this.store.map(s => s.group_id)
        const _tagGroups = groups.map(addTag)

        const grMap = _tagGroups.map(regroup)
        const result = {
            groups: grMap,
            idmap: groupIdMap,
            init: _tagGroups
        }


        return result
    }

}



const _itemsFieldSet = <T extends ANYobj, F extends keyof T & string>(items: T[], field: F) => {
    return Array.from(new Set(items.map(item => item[field])))
}
const _filterGroups = <T extends ANYobj, F extends keyof T & string>(items: T[], field: F) => {
    const fset = _itemsFieldSet(items, field)
    return fset.map(f => items.filter(i => i[field] === f))
}
