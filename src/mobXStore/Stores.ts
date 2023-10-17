import { makeAutoObservable } from "mobx"
import { _ID, _log } from "../Helpers/HelpersFns"

export interface IDTO_SimpleAction_v1 {
    initState: { [key: string]: number },
    result: { [key: string]: number },

}
export interface ImbxDataNode<D> {
    nodeId: string
    data: D
}

export class mbxDataNode<D>{
    nodeId: string

    constructor(public data: D) {
        this.nodeId = _ID()
        this.data = data
    }

    set desc(msg: string) {
        this.desc = msg
    }

}


export default class mbxActionStore<T extends { nodeId?: string, data: any }>{
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

