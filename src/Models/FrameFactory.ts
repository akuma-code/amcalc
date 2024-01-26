import { IBorders, IFrameOffset, OFFSET, SystemProfile, _TSideBorderState } from "../Components/Templates/Systems"
import { _Point, _SizeF, _p } from "../Helpers/HelpersFns"
import { ISizeShort, SizeShort } from "../Interfaces/CommonTypes"
import { TSide, TSidesArray } from "../Interfaces/Enums"
import { _OffsetCoordsRecord, _TCoords } from "../Interfaces/FrameState"

export const OffsetBorder: Record<_TSideBorderState, number> = {
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
    top: _TSideBorderState = 'rama'
    right: _TSideBorderState = 'rama'
    bottom: _TSideBorderState = 'rama'
    left: _TSideBorderState = 'rama'
    offset: Record<TSide, number>
    constructor(off?: Partial<Record<TSide, number>> | number, system?: SystemProfile) {
        this.offset = { top: 0, bottom: 0, left: 0, right: 0 }
        this.setSystemOffset(system)
        if (off) this.init(off)
    }
    init(off: Partial<Record<TSide, number>> | number) {
        if (typeof off === 'number') this.offset = { top: off, bottom: off, left: off, right: off }
        else this.offset = { ...this.offset, ...off }
    }

    setSystemOffset(system: SystemProfile = SystemProfile.Proline) {
        const OffsetRecord = OFFSET[system]
        TSidesArray.forEach(s => this.setOffset(s, OffsetRecord))
    }

    setOffset(side: TSide, SystemOffset: IFrameOffset) {
        this.offset = { ...this.offset, [side]: SystemOffset[this[side]] }
    }

    get coordsOffsetMap() {
        const cmap = TSidesArray.map(side => {
            const o = this.offset
            let off: _OffsetCoordsRecord = { ox1: -1, oy1: -1, ox2: -1, oy2: -1 }
            switch (side) {
                case "top": off = {
                    ox1: o.left,
                    oy1: o.top,
                    ox2: -o.right,
                    oy2: o.top
                }; break
                case "right": off = {
                    ox1: -o.right,
                    oy1: o.top,
                    ox2: -o.right,
                    oy2: -o.bottom
                }; break
                case "bottom": off = {
                    ox1: -o.right,
                    oy1: -o.bottom,
                    ox2: o.left,
                    oy2: -o.bottom
                }; break
                case "left": off = {
                    ox1: o.left,
                    oy1: -o.bottom,
                    ox2: o.left,
                    oy2: o.top
                }; break
            }
            return { side, coords: [off.ox1, off.oy1, off.ox2, off.oy2] }
        })
        return cmap
        //         return cmap.reduce((record, current)=>{
        // current
        //         }, {} as Record<TSide, _OffsetCoordsRecord>)
    }

    newNodeData(size: _SizeF, startPos: _Point) {
        const { x, y } = startPos
        const { width: w, height: h } = size
        const [rx1, ry1] = [x, y]
        const [rx2, ry2] = [x + w, y + h]
        const corners: _TCoords = [
            [rx1, ry1],
            [rx2, ry1],
            [rx2, ry2],
            [rx1, ry2],
        ]
        const borderCoordsMap = [
            { side: 'top', coords: [rx1, ry1, rx2, ry1] },
            { side: 'right', coords: [rx2, ry1, rx2, ry2] },
            { side: 'bottom', coords: [rx2, ry2, rx1, ry2] },
            { side: 'left', coords: [rx1, ry2, rx1, ry1] },
        ]

        const offset = this.coordsOffsetMap
        const pathCoords = borderCoordsMap.map((b, idx) => {
            const [x1, y1, x2, y2] = b.coords
            const [ox1, oy1, ox2, oy2] = this.joinMatrixCoords(
                b.coords as unknown as [number, number, number, number],
                offset[idx].coords as unknown as [number, number, number, number]
            )

            const offsetcoords = []
            offsetcoords.push(
                [
                    [x1, y1],
                    [ox1, oy1],
                    [ox2, oy2],
                    [x2, y2]
                ],
            )
            // .splice(0, 0, ...this.joinMatrixCoords(coords, of))
            return { side: b.side, coords: offsetcoords }
        })
        // .map(a => (
        //     {
        //         ...a, coords: [
        //             [a.coords[0], a.coords[1]],
        //             [a.coords[2], a.coords[3]]
        //         ]
        //     }
        // ))

        return { corners, anchor: startPos, size, pathCoords }
    }


    joinMatrixCoords(arr1: [x1: number, y1: number, x2: number, y2: number], arr2: typeof arr1) {
        const l = arr1.length
        let result = []
        for (let i = 0; i < l; i++) {

            result.push(arr1[i] + arr2[i])
        }
        result = [
            result[0], result[1],
            result[2], result[3]
        ]
        return result
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


