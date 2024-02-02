import { action, makeAutoObservable } from "mobx";
import { _Point, _SizeF, _isArr, _log, _p } from "../../Helpers/HelpersFns";
import { ANYobj } from "../../Interfaces/MathActionsTypes";
import { ISideStateOffset, StvFrame } from "../../Models/FrameComponent/StvState";
import { ImpostFrame } from "../../Models/FrameComponent/ImpostFrame";
import { _TCoords } from "../../Interfaces/FrameState";

export interface FrameStoreT {
    rama: {
        size: _SizeF
        pos: _Point
    }

    stvs?: StvFrame[]


    imps?: ImpostFrame[]

}

export type _TNode = {
    id: string
    size?: _SizeF
    coords?: _TCoords
    next?: ISideStateOffset

}
export interface IFrameContext {
    FrameCtx: FrameContextMobx
    NodeStore: NodeStore<_TNode>

}
export class FrameContextMobx {
    rama: { size: _SizeF, pos: _Point }
    stvs: { id: string, isShow: boolean, coords?: [], next?: ISideStateOffset }[] = []
    imps: ImpostFrame[] = []
    selected: { id: string } | null = null
    constructor(size: _SizeF, pos = _p(0, 0)) {
        this.rama = { size: size, pos: pos }
        this.initStvs()
        makeAutoObservable(this)
    }

    initStvs() {
        this.stvs = [...this.stvs, { id: 's1', isShow: false }, { id: 's2', isShow: false }, { id: 's3', isShow: false }]
    }

    toggleStv(stv_id: string) {

        this.stvs = this.stvs.map(s => s.id === stv_id ? { ...s, isShow: !s.isShow } : s)
    }

    resizeRama(new_size: { width?: number, height?: number }) {
        this.rama = { ...this.rama, size: { ...this.rama.size, ...new_size } }
    }

    selectItem(item: { id: string }) {

        this.selected = item
    }
    clearSelected() {
        if (this.selected) this.selected = null
    }


}


export class NodeStore<T extends { id: string }>{
    nodes: T[]
    constructor() {
        this.nodes = []
        makeAutoObservable(this)
    }

    addNode(node: T | T[]) {
        if (!_isArr(node)) {
            if (this.checkId(node.id)) this.nodes = [...this.nodes, node]
        } else {
            const ff = node.filter(n => this.checkId(n.id))
            this.nodes.push(...ff)
        }

        // console.log('nodes', this.nodes)
    }

    checkId(id: string) {
        if (this.nodes.map(n => n.id).includes(id)) return false
        else return true
    }

}