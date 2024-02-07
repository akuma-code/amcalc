import { _FrameStateWithNodes } from "../../../Components/Pages/Router/DrawerPage";
import { ISideBorderState, _TSideBaseState } from "../../../Components/Templates/Systems";
import { _ID, _Point, _SizeF, _getcoords, _log, _p, _ss } from "../../../Helpers/HelpersFns";
import { IFrameVariants } from "../../../Interfaces/Enums";
import { _TCoords } from "../StvState";
import { FrameNodeWithSides, nodesPreset } from "./FrameNodeWithSides";



type IFrame = _FrameStateWithNodes
type NewFrameCreate = Pick<IFrame, 'id' | 'size' | 'pos'> & Partial<Pick<IFrame, 'type'>> & { nodes?: NewNodeCreate[] }
type NewNodeCreate = {
    id: string;
    nsize: _SizeF;
    coords?: _TCoords;
    isShow: boolean

}



export class MasterFrame {
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

        const nh = this.frame!.size.height
        const nW = Math.floor(this.frame!.size.width / len)

        const ns = _ss(nW, nh)
        // const nc = (i: number) => _getcoords(ns, { x: this.frame!.pos.x + ns.width * i, y: this.frame!.pos.y })

        let sizedNodes: Partial<FrameNodeWithSides>[] = nodes.map((n, i, arr) => ({
            ...n,
            nsize: ns,
            coords: [..._getcoords(ns, { x: this.frame!.pos.x + ns.width * i, y: this.frame!.pos.y })] as _TCoords
        }))
        this.frame = { ...this.frame, nodes: sizedNodes as Required<FrameNodeWithSides>[] }

        return this
    }

    get isready() {
        if (!this.frame) return false
        if (this.frame.size && this.frame.type) return true
        return false
    }

    resizeFrame(new_size: Partial<_SizeF>) {
        if (!this.frame) return
        this.frame = { ...this.frame, size: { ...this.frame.size, ...new_size } }
    }
}
