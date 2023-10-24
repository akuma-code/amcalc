import { makeAutoObservable } from "mobx";
import { DTO_Nodes_list } from "../ActionComponents/ActionTypes/Types";
import FnLinkedList, { DTO_Node, ListDataNode } from "../Models/LinkedList";
import { ANYfn } from "../Interfaces/MathActionsTypes";

class mbxStoreLL {
    public store: FnLinkedList<DTO_Node<DTO_Nodes_list['fn']>> | null = null
    constructor() {
        this.init()
        makeAutoObservable(this)
    }

    init() {
        return this.store = new FnLinkedList<DTO_Node<DTO_Nodes_list['fn']>>()
    }




}

export default mbxStoreLL