import { makeAutoObservable } from "mobx";
import { IActionDataNumber, v1DataNode } from "../mobXStore/ActionStore";
import { _log } from "../Helpers/HelpersFns";

export class RootStore {
    actsStore: ActionStore | null = null
    userStore: UserStore
    constructor() {
        this.actsStore = new ActionStore()
        this.userStore = new UserStore(this)
    }
}

class ActionStore {

    nodes: v1DataNode[] = []
    constructor() {
        this.nodes = []
        // makeAutoObservable(this, { rootStore: false })
    }




}

class UserStore {
    rootStore: RootStore

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
        makeAutoObservable(this, { rootStore: false })
    }
    add(data: IActionDataNumber, actionId: string) {
        const node: v1DataNode = {
            data: data,
            actionId: actionId,
            desc: 'new node'
        }
        if (!this.rootStore.actsStore) return []
        this.rootStore.actsStore.nodes.push(node)
        console.log('added node: ', data)

    }

    get info() {
        if (!this.rootStore.actsStore) return _log("Store NOT Defined!")
        return this.rootStore.actsStore.nodes.forEach(n => _log(n))
    }
}