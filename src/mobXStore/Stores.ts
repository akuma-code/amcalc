import { makeAutoObservable } from "mobx"
import { _ID, _log } from "../Helpers/HelpersFns"
import { DTO_FunctionType, DTO_TemplateObj } from "../Interfaces/MathActionsTypes"

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
        _log("Store cleared!")
        return this.store = []
    }

    list() {
        // _log("CURRENT STORE: ")
        // this.store.forEach((n, idx) => _log(`idx:`, idx, n,))
        return this.store.map(n => n)
    }
}


export class mbxFnNode<T extends (...args: any[]) => {}> {
    fn: T
    args?: Parameters<T>
    constructor(public func: T, args?: Parameters<T>) {
        this.fn = func
        this.args = args
    }

    getDTO_Template(...args: typeof this.args[]) {

        if (!args) return {
            fn: this.fn
        } as DTO_FunctionType<T>
        const output = this.fn(...args)
        return {
            args, fn: this.fn, output
        } as DTO_TemplateObj<T>
    }
}

export class mbxFnStore<T>{

}


function multi5(a: number) { return a * 5 }
const node = new mbxFnNode(multi5, [4])

const t = node.getDTO_Template()