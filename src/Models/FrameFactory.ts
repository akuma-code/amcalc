import { DeepPartial } from "utility-types"
import { A_Size, ISizeShort, SizeShort } from "../Interfaces/CommonTypes"
import { _log } from "../Helpers/HelpersFns"
import { TSide, TSides } from "../Interfaces/Enums"
export type ISideDirections = 'top' | 'right' | 'bottom' | 'left'
export enum ISideBorderState {
    imp = 'imp',
    stv = 'stv',
    rama = 'rama',
    porog = 'porog',
    stv_imp = 'stv_imp',
    stv_rama = 'stv_rama',
}
export type TSideBorderState = keyof typeof ISideBorderState
export type IBorders = Record<ISideDirections, TSideBorderState>
export const OffsetBorder: Record<TSideBorderState, number> = {
    rama: 20,
    imp: 15,
    porog: 8,
    stv: 20,
    stv_imp: 30,
    stv_rama: 35
}
type INode = {
    size: ISizeShort
    bsides: IBorders
}
type IFrame = {
    rama: INode
    nodes: INode[]
}

type IParams = {
    size?: Partial<ISizeShort>
    bsides?: Partial<IBorders>
}
export class BorderStateOffset implements IBorders {
    top: TSideBorderState = 'rama'
    right: TSideBorderState = 'rama'
    bottom: TSideBorderState = 'rama'
    left: TSideBorderState = 'rama'
    offset: Record<TSide, number>
    constructor(off?: Partial<Record<TSide, number>> | number) {
        this.offset = { top: 0, bottom: 0, left: 0, right: 0 }
        if (off) this.init(off)
    }
    init(off: Partial<Record<TSide, number>> | number) {
        if (typeof off === 'number') this.offset = { top: off, bottom: off, left: off, right: off }
        else this.offset = { ...this.offset, ...off }
    }
}
export class BaseNode {
    public size: ISizeShort = new SizeShort(250, 400)
    public bsides: IBorders = new BorderStateOffset()

}

export class FrameFactory {
    public name: string
    public history: IFrame[] = []
    constructor(name?: string) {
        this.name = name ? name : 'frame_factory'
    }

    createFrame(params?: IParams) {
        let node: INode = {
            size: new SizeShort(250, 400),
            bsides: new BorderStateOffset()
        }
        let rama: INode = {
            size: new SizeShort(250, 400),
            bsides: new BorderStateOffset(20)
        }


        if (params) {
            const { size, bsides } = params
            node = { ...node, size: { ...node.size, ...size }, bsides: { ...node.bsides, ...bsides } }
            rama = { ...rama, size: { ...rama.size, ...size }, bsides: { ...rama.bsides, ...bsides } }
        }
        let frame: IFrame = {
            nodes: [node],
            rama
        } satisfies IFrame
        this.history.push(frame)
        return frame

    }

    asjson() {
        if (this.history.length === 0) return ""
        return JSON.stringify(this.history, null, 2)
    }
}

const pars = {
    size: new SizeShort(300, 300),
    bsides: { top: 'impost' }
}


