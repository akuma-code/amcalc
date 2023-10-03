import { makeAutoObservable } from "mobx"
import { observer } from "mobx-react-lite"
import { IActionCore, ISimpleMathFunc } from "../Interfaces/MathActionsTypes"
import { _log } from "../Helpers/HelpersFns"
export type IActionDataNumber = IActionCore<number>
export type v1DataNode = {
    data: IActionDataNumber
    desc?: string
    actionId?: string
}



export type Iv2DataNode = {
    data: {
        action: (...args: number[]) => number
        variables: string[]
    }
    actionId?: string
    desc?: string

}
type Iv2Data = Iv2DataNode['data']
export class ActionsStore {
    nodes: v1DataNode[] = []
    constructor() {
        makeAutoObservable(this)
    }

    add(data: IActionDataNumber, actionId: string) {
        const node: v1DataNode = {
            data: data,
            actionId: actionId,
            desc: 'new node'
        }
        const checkId = (id: string) => this.nodes.map(n => n.actionId).includes(id)

        !checkId(actionId) ? this.nodes.push(node) : _log("ID already exist!")
        console.log('added node: ', data)

    }

    get info() {
        return this.nodes.forEach(n => _log(n))
    }
}

export class v2DataNode implements Iv2DataNode {
    actionId?: string | undefined = "unnamed_action"
    desc?: string | undefined = ""
    constructor(public data: Iv2Data) {
        this.data = data
    }
    setID(id: string) {
        this.actionId = id
    }
    setDesc(desc: string) {
        this.desc = desc
    }
    use(...args: number[]) {
        const res = this.data.action(...args)
        console.log('action result: ', res)
        return res
    }

}

export class StoreV2DataNodes {
    store: v2DataNode[] = []
    constructor() {
        this.store = []
    }

    add(node: v2DataNode) {
        const idCheck = (id: string) => this.store.map(n => n.actionId).includes(id)
        if (!node.actionId) node.actionId = 'unnamed_action'

        if (idCheck(node.actionId)) {
            _log("Action with same id exist!")
            return
        }
        this.store = [...this.store, node]
        return
    }
    deleteNode(nodeId: string) {
        this.store = [...this.store].filter(n => n.actionId !== nodeId)
    }


    list() {
        _log("CURRENT STORE: ")
        return this.store.forEach(_log)
    }
}