import { _FrameStateWithNodes } from "../../../Components/Pages/Router/DrawerPage";
import { ISideBorderState, _TSideBaseState } from "../../../Components/Templates/Systems";
import { _ID, _Point, _SizeF, _getcoords } from "../../../Helpers/HelpersFns";
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
        return this
    }

    setNodes() {
        if (!this.frame || !this.frame.size) throw new Error("Frame not exist! You have to create frame first!")
        if (!this.frame.type) throw new Error("Frame type UNKNOWN! You have to set frame type first!")
        const nodes = nodesPreset[this.frame.type]
        const ns = {
            width: +(this.frame!.size.width / nodes.length).toFixed(1),
            height: this.frame!.size.height
        }
        const nc = (i: number) => _getcoords(ns, { x: this.frame!.pos.x + ns.width * i, y: this.frame!.pos.y })
        const sizedNodes = nodes.map((n, i, arr) => ({
            ...n,
            nsize: ns,
            coords: nc(i) as _TCoords
        }))

        this.frame = { ...this.frame, nodes: sizedNodes }
        return this
    }

}


export class FrameNodeWithSides {
    id: string = _ID()
    isShow: boolean = false
    sides: Record<TSide, _CType>
    offset: Record<TSide, number>
    nsize?: _SizeF
    coords?: _TCoords
    constructor(next?: ISideStateOffset) {
        this.sides = {
            bottom: "rama" as const,
            left: "rama" as const,
            right: "rama" as const,
            top: "rama" as const
        }
        this.offset = {
            bottom: 0,
            left: 0,
            right: 0,
            top: 0,
        }
        if (next) this.setSides(next)
        this.setOffset()
    }
    setSides(next: ISideStateOffset) {
        this.sides = { ...this.sides, ...next }
        return this
    }
    setOffset() {

        for (let side in this.sides) {
            let s = side as TSide
            const value = $DrawPosOffset[this.sides[s]]
            this.offset[s] = value
        }
        return this
    }
    setNodeSize(nodesize: _SizeF) {
        this.nsize = nodesize
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