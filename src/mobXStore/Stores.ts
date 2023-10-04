import { makeAutoObservable } from "mobx"
import { _ID, _log } from "../Helpers/HelpersFns"

export interface IDTO_SimpleAction_v1 {
    callback: (...args: number[]) => number
    args_list: string[]
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
    store: T[] = []
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
        return this.store = []
    }
}
