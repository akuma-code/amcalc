import { DeepPartial } from "utility-types"
import { A_Size, ISizeShort, SizeShort } from "../Interfaces/CommonTypes"
import { _log } from "../Helpers/HelpersFns"
export type ISideDirections = 'top' | 'right' | 'bottom' | 'left'
export type IBorders = Record<ISideDirections, string>

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
export class BaseBorders implements IBorders {
    top: string = 'rama'
    right: string = 'rama'
    bottom: string = 'rama'
    left: string = 'rama'
    constructor(params?: Partial<IBorders>) {
        if (params) this.initparams(params)
    }

    initparams(params: { [Key in keyof IBorders]?: string }) {
        for (const side in params) {
            _log(params[side as keyof IBorders])
        }


    }
}
export class BaseNode {
    public size: ISizeShort = new SizeShort(250, 400)
    public bsides: IBorders = new BaseBorders()

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
            bsides: {
                top: 'rama',
                right: 'rama',
                bottom: 'rama',
                left: 'rama'
            }
        }
        let rama: INode = {
            size: new SizeShort(250, 400),
            bsides: {
                top: 'rama',
                right: 'rama',
                bottom: 'rama',
                left: 'rama'
            }
        }


        if (params) {
            const { size, bsides } = params
            node = { ...node, size: { ...node.size, ...size }, bsides: { ...node.bsides, ...bsides } }
            rama = { ...rama, size: { ...rama.size, ...size }, bsides: { ...rama.bsides, ...bsides } }
        }
        let frame: IFrame = {
            nodes: [{ ...node }],
            rama: { ...rama }
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

const FF = new FrameFactory()

const fr = FF.createFrame()
const fr2 = FF.createFrame(pars)

console.log('FF', FF)