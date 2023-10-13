import { makeAutoObservable } from "mobx"
import { _log } from "../Helpers/HelpersFns"
import { FnStoreNode } from "../Models/ActionModel"

export default class mbxFuncNodesStore<T extends { nodeId: string, saved: any[] }>{
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
    getNode(id: string) {
        return this.store.find(n => n.nodeId === id)
    }
    list() {
        // _log("CURRENT STORE: ")
        // this.store.forEach((n, idx) => _log(`idx:`, idx, n,))
        return this.store.map(n => n)
    }
}