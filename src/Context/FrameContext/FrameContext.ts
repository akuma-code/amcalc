import { makeAutoObservable } from "mobx";
import { _Point, _SizeF, _log, _p } from "../../Helpers/HelpersFns";
import { ANYobj } from "../../Interfaces/MathActionsTypes";
import { ISideStateOffset, ImpostFrame, StvFrame } from "../../Models/FrameComponent/StvState";

export interface FrameStoreT {
    rama: {
        size: _SizeF
        pos: _Point
    }

    stvs?: StvFrame[]


    imps?: ImpostFrame[]

}
export interface IFrameContext {
    FrameCtx: FrameContextMobx

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

const initStvState = [
    {
        id: 's1',
        isShow: false,

    },
]