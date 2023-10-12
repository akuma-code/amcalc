import { makeAutoObservable } from "mobx"
import { _ID, _log } from "../Helpers/HelpersFns"
import { DTO_FunctionType, DTO_TemplateObj } from "../Interfaces/MathActionsTypes"

export interface IDTO_SimpleAction_v1 {
    initState: { [key: string]: number },
    result: { [key: string]: number },

}


export class mbxDataNode<T>{
    nodeId: string | null = null

    constructor(public data: T) {
        this.nodeId = _ID()
        this.data = data
    }

    set desc(msg: string) {
        this.desc = msg
    }

}


export default class mbxActionStore<T>{
    store: T[] = [] as T[]
    constructor() {
        makeAutoObservable(this)
    }

    add(datanode: T) {
        this.store = [...this.store, datanode]
    }

    remove(node_idx: number) {
        this.store = [...this.store].filter((n, idx) => idx !== node_idx)
    }

    clear() {
        _log("Store cleared!")
        return this.store = []
    }

    list() {
        // _log("CURRENT STORE: ")
        // this.store.forEach((n, idx) => _log(`idx:`, idx, n,))
        return this.store.map(n => n)
    }
}


export class mbxFnNode<T> {
    fn!: (...args: T[]) => any
    args?: T[]
    constructor(fn: (...args: T[]) => any) {
        this.fn = fn

    }


}
export type DTO_StoreNode<T> = {
    initState?: T,
    result?: { [field: string]: number },
}
export class mbxStoreNode<T extends DTO_StoreNode<T>>{
    constructor(
        public node: DTO_StoreNode<T>
    ) {

    }
}


function multi5(a: number) { return a * 5 }
