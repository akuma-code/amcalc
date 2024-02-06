import { _FrameStateWithNodes } from "../../../Components/Pages/Router/DrawerPage";
import { ISideBorderState, _TSideBaseState } from "../../../Components/Templates/Systems";
import { _ID, _Point, _SizeF, _getcoords, _log, _p } from "../../../Helpers/HelpersFns";
import { $DrawPosOffset } from "../../../Hooks/useOffset";
import { IFrameVariants, TSide } from "../../../Interfaces/Enums";
import { ISideStateOffset, _CType, _TCoords } from "../StvState";



type IFrame = _FrameStateWithNodes
type NewFrameCreate = Pick<IFrame, 'id' | 'size' | 'pos'> & Partial<Pick<IFrame, 'type'>> & { nodes?: NewNodeCreate[] }
type NewNodeCreate = {
    id: string;
    nsize: _SizeF;
    coords?: _TCoords;
    isShow: boolean

}



export class FrameCreator {
    frame: NewFrameCreate | null = null


    create(size: _SizeF, pos = { x: 0, y: 0 }) {
        const new_frame: NewFrameCreate = {
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
        this.setNodes()
        return this
    }

    setNodes() {
        if (!this.frame || !this.frame.size) throw new Error("Frame not exist! You have to create frame first!")
        if (!this.frame.type) throw new Error("Frame type UNKNOWN! You have to set frame type first!")
        const nodes = nodesPreset[this.frame.type]
        const len = nodes.length
        const restNum = this.frame!.size.width % len



        const nh = this.frame!.size.height
        const nW = Math.floor(this.frame!.size.width / len)
        const nw1 = +(this.frame!.size.width / len).toFixed(2)
        const ns = {
            width: nW,
            height: nh
        }
        const nc = (i: number) => _getcoords(ns, { x: this.frame!.pos.x + ns.width * i, y: this.frame!.pos.y })

        let sizedNodes: NewNodeCreate[] = nodes.map((n, i, arr) => ({
            ...n,
            nsize: ns,
            coords: _getcoords(ns, { x: this.frame!.pos.x + ns.width * i, y: this.frame!.pos.y }) as _TCoords
        }))
        this.frame = { ...this.frame, nodes: sizedNodes }
        // _log("node ready state: ", this.isready)
        return this
    }

    get isready() {
        if (!this.frame) return false
        if (this.frame.size && this.frame.type) return true
        return false
    }

}
function size_mistake(initNum: number, devider: number) {
    const n = initNum
    const d = devider
    const rest = n % d
    return rest
}

export class FrameNodeWithSides {
    id: string = _ID()
    isShow: boolean = false
    sides: Record<TSide, _CType>
    offset: Record<TSide, number> = {
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
    }
    nsize?: _SizeF
    coords?: _TCoords
    constructor(next?: ISideStateOffset) {
        this.sides = {
            bottom: "rama" as const,
            left: "rama" as const,
            right: "rama" as const,
            top: "rama" as const
        }

        if (next) this.setSides(next)

    }
    setSides(next: ISideStateOffset) {
        this.sides = { ...this.sides, ...next }

        return this.setOffset()
    }

    setOffset() {

        for (let side in this.sides) {
            let s = side as TSide
            const sideState = this.sides[s]

            this.offset = { ...this.offset, [s]: $DrawPosOffset[sideState] }
        }
        return this
    }
    setNodeSize(nodesize: _SizeF) {
        this.nsize = nodesize
        return this
    }

    setNodeCoords(coords: _TCoords) {
        this.coords = coords
        return this
    }



}

export const nodesPreset = {
    f: [new FrameNodeWithSides()],
    ff: [
        new FrameNodeWithSides({ right: 'imp' }),
        new FrameNodeWithSides({ left: 'imp' })
    ],
    fff: [
        new FrameNodeWithSides({ right: 'imp' }),
        new FrameNodeWithSides({ left: 'imp', right: 'imp' }),
        new FrameNodeWithSides({ left: 'imp' })
    ],
}