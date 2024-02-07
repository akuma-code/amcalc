import { makeAutoObservable } from "mobx"
import { _isArr, _log } from "../Helpers/HelpersFns"

export class mbxNodesStore<T extends { id: string }>{
    nodes: T[] = []
    constructor() {
        makeAutoObservable(this)
    }

    add(datanode: T | T[] | null) {
        if (datanode === null) return
        if (_isArr(datanode)) { this.nodes = [...this.nodes, ...datanode]; return }
        this.nodes = [...this.nodes, datanode]
    }

    remove(node_id: string) {
        this.nodes = [...this.nodes].filter((n, idx) => n.id !== node_id)
    }

    clear() {
        _log("Store cleared!")
        return this.nodes = []
    }
    getNode(id: string) {
        return this.nodes.find(n => n.id === id)
    }
    list() {

        return this.nodes.map(n => n)
    }
    edit(id: string, new_data: Partial<T>) {
        let current = this.getNode(id)
        if (!current) return
        current = { ...current, ...new_data }
        this.remove(id)
        this.add(current)

    }

}