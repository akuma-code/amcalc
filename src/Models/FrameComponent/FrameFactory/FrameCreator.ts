import { _FrameStateWithNodes } from "../../../Components/Pages/Router/DrawerPage";
import { ISideBorderState, _TSideBaseState } from "../../../Components/Templates/Systems";
import { _ID, _Point, _SizeF, _getcoords, _log, _p, _ss } from "../../../Helpers/HelpersFns";
import { IFrameVariants, TSide } from "../../../Interfaces/Enums";
import { _CType, _TCoords } from "../StvState";
import { FrameNodeWithSides, nodesPreset } from "./FrameNodeWithSides";



type IFrame = _FrameStateWithNodes
type NewFrameCreate = Pick<IFrame, 'id' | 'size' | 'pos'> & Partial<Pick<IFrame, 'type'>> & {
    nodes?: {
        _id: string;
        isShow: boolean
        nsize: _SizeF;
        coords: _TCoords;
        sides: Record<TSide, _CType>
    }[]
}
type NewNodeCreate = {
    id: string;
    isShow: boolean
    nsize: _SizeF;
    coords: _TCoords;
    sides?: Record<TSide, _CType>

}
interface FrameActions {
    syncSize(): void
    init(mf: MasterFrame): void
    resizeFrame(new_size: Partial<_SizeF>): void


}


export class MasterFrame {
    frame: NewFrameCreate | null = null


    create(size: _SizeF, pos = { x: 0, y: 0 }) {
        const new_frame = {
            id: _ID(),
            size,
            pos
        }
        this.frame = new_frame

        return this
    }
    setType(type: IFrameVariants) {
        if (!this.frame) throw new Error("You have to create frame first!")
        this.frame = { ...this.frame, type: type }
        // this.setNodes()
        return this
    }

    setNodes() {
        // if (!this.frame || !this.frame.size) throw new Error("Frame not exist! You have to create frame first!")
        // if (!this.frame.type) throw new Error("Frame type UNKNOWN! You have to set frame type first!")
        // if (this.isready() === false) return _log("Frame type UNKNOWN! You have to set frame type first!")
        const T = this.frame?.type ? this.frame.type : 'f'
        const LEFT = new FrameNodeWithSides({ right: 'imp' })
        const RIGHT = new FrameNodeWithSides({ left: 'imp' })
        const MID = new FrameNodeWithSides({ right: 'imp', left: 'imp' })
        const ntypes = {
            f: [new FrameNodeWithSides()],
            ff: [LEFT, RIGHT],
            fff: [LEFT, MID, RIGHT]
        }
        const nodes = ntypes[T]

        const len = nodes.length

        const nh = this.frame!.size.height
        const nW = Math.floor(this.frame!.size.width / len)

        const ns = _ss(nW, nh)
        // const nc = (i: number) => _getcoords(ns, { x: this.frame!.pos.x + ns.width * i, y: this.frame!.pos.y })

        let sizedNodes = nodes.map((n, i, arr) => ({
            ...n,
            id: _ID(),
            nsize: ns,
            coords: [..._getcoords(ns, { x: this.frame!.pos.x + ns.width * i, y: this.frame!.pos.y })] as _TCoords
        }))


        if (this.hasFrame()) this.frame = { ...this.frame, nodes: [...sizedNodes], id: _ID(), size: this.frame!.size }

        return this
    }
    hasFrame(): this is { frame: NewFrameCreate } {
        return this.frame !== null
    }
    isready(): this is { frame: { nodes: FrameNodeWithSides[], nsize: _SizeF, type: IFrameVariants, } } {
        const cond = this.frame !== null
            && this.frame.nodes !== undefined
            && this.frame.type !== undefined
            && this.frame.nodes.every(n => n.coords !== undefined && n.sides !== undefined && n._id !== undefined)
        return cond

    }

    resizeFrame(new_size: Partial<_SizeF>) {
        // if () return
        if (this.isready()) this.frame = { ...this.frame, size: { ...this.frame.size, ...new_size } }
    }


}




export class ActionFrame implements FrameActions {
    frame!: IFrame


    constructor(master_frame: MasterFrame) {
        this.init(master_frame)
    }
    init<T extends MasterFrame>(mf: T) {
        if (mf.isready()) {
            const { frame } = mf;

            const iframe = { ...frame }
            this.frame = iframe
            return this.frame
        }

        else {
            _log("Master Frame is not ready!")
        }

    }
    resizeFrame(new_size: Partial<_SizeF>) {
        if (!this.frame) return
        this.frame = { ...this.frame, size: { ...this.frame.size, ...new_size } }
    }

    syncSize() {
        const { size, pos } = this.frame
    }

    hasValue<T>(): this is { frame: T } {
        return this.frame !== undefined;
    }
}



