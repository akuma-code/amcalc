import { IC_ArgsList, Enum_NodesAction, FnKeys, Fn_Output_nets, Fn_Output_offset5, IC_FuncArgs, IC_FuncsList, IC_Functions, IC_StateSelect, TypeSelector, IC_DataList } from "../ActionComponents/ActionTypes/Types";
import FnLinkedList, { DTO_Node, IDataTransferObject } from "../Models/DTO_ChainStore";
import { DataNode } from "../Models/LinkedList";

type IState<T extends FnKeys> = IC_StateSelect<T>
type IState2<T> = T extends FnKeys ? IState<T>['payload'] : never

export class MainStore {
    state: Record<FnKeys, IState2<FnKeys>> | {} = {}
    constructor(...dto: IDataTransferObject[]) {
        this.state = dto ? this.importNodes(dto) : {}
    }

    setState<T extends { type: FnKeys, payload: IState<T['type']>['payload'] }>(s: T) {
        const { payload, type } = s
        this.state = { ...this.state, [type]: payload }
    }

    importDTO(dto: IDataTransferObject) {
        const { fn, initState, type } = dto
        this.setState({ type, payload: { fn, initState } })
        return this.state
    }
    importNodes(nodes: IDataTransferObject[]) {
        nodes.forEach(n => this.setState({ type: n.type, payload: { ...n } }))
        return this.state
    }
}



export class MainStore_ {
    public statesList: IC_DataList = {} as IC_DataList
    constructor(store: FnLinkedList<IDataTransferObject>) {
        this.statesList = store.list() ?? {} as IC_DataList
    }
    setState(new_state: IDataTransferObject) {
        const t = new_state.type
        this.statesList = { ...this.statesList, [t]: new_state }
    }

}