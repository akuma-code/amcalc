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


export class StoreActions {
    public _actions: v1DataNode[]
    constructor() {
        this._actions = []
        makeAutoObservable(this)
    }




}