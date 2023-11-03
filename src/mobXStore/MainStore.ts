import { makeAutoObservable } from "mobx";
import { IC_ArgsList, Enum_NodesAction, FnKeys, Fn_Output_nets, Fn_Output_offset5, IC_FuncArgs, IC_FuncsList, IC_Functions, IC_StateSelect, TypeSelector, IC_DataList } from "../ActionComponents/ActionTypes/Types";
import FnLinkedList, { DTO_Node, IDataTransferObject } from "../Models/DTO_ChainStore";
import { DataNode } from "../Models/LinkedList";
import { InitStateRedux, ReduxState } from "../Redux/ReduxTypes";

type IState<T extends FnKeys> = IC_StateSelect<T>
type IState2<T> = T extends FnKeys ? IState<T>['payload'] : never

export class MainStore {
    store: ReduxState = InitStateRedux
    constructor() {
        makeAutoObservable(this)
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