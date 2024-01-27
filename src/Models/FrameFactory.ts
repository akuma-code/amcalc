import { IBorders, IFrameOffset, OFFSET, SystemProfile, _TSideBorderState } from "../Components/Templates/Systems"
import { _CPoint, _Point, _SizeF, _TPoint, _p, _psum } from "../Helpers/HelpersFns"
import { ISizeShort, SizeShort } from "../Interfaces/CommonTypes"
import { IFrameVariants, TSide, TSidesArray } from "../Interfaces/Enums"
import { IFrameState, _OffsetCoordsRecord, _TCoords } from "../Interfaces/FrameState"

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

//TODO: FrameFactory.create(type)=>(...args)=><FrameRama />  <FrameBaseComponent/> <FrameStv /> <FrameImpost/>

export class NodeFactory implements IBorders {
    top: _TSideBorderState = 'rama'
    right: _TSideBorderState = 'rama'
    bottom: _TSideBorderState = 'rama'
    left: _TSideBorderState = 'rama'
    offset: Record<TSide, number>
    constructor(system?: SystemProfile) {
        this.offset = { top: 0, bottom: 0, left: 0, right: 0 }
        this.setSystemOffset(system)
        // if (off) this.changeOffsetRecord(off)
    }
    changeOffsetRecord(off: Partial<Record<TSide, number>> | number) {
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

    }
    get coordsOffsetPointsMap() {
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
            return { side, pcoords: [_p(off.ox1, off.oy1), _p(off.ox2, off.oy2)] satisfies [_Point, _Point] }
        })
        return cmap

    }

    newPathCoordsMap(size: _SizeF, startPos: _CPoint) {
        const { x, y } = startPos
        const { width: w, height: h } = size
        const [rx1, ry1] = [x, y]
        const [rx2, ry2] = [x + w, y + h]

        const borderCoordsMap = [
            { side: 'top', coords: [rx1, ry1, rx2, ry1] },
            { side: 'right', coords: [rx2, ry1, rx2, ry2] },
            { side: 'bottom', coords: [rx2, ry2, rx1, ry2] },
            { side: 'left', coords: [rx1, ry2, rx1, ry1] },
        ]
        const poffset = this.coordsOffsetPointsMap

        const pointsMap = [
            { side: 'top', coords: [_p(rx1, ry1), _p(rx2, ry1)] },
            { side: 'right', coords: [_p(rx2, ry1), _p(rx2, ry2)] },
            { side: 'bottom', coords: [_p(rx2, ry2), _p(rx1, ry2)] },
            { side: 'left', coords: [_p(rx1, ry2), _p(rx1, ry1)] },
        ] as {
            side: TSide;
            coords: [_Point, _Point];
        }[]

        const pathPoints = pointsMap.map((pm, i) => ({ ...pm, coords: applyOffsetPoint(pm.coords, poffset[i].pcoords) }))

        const offset = this.coordsOffsetMap
        const pathCoords = borderCoordsMap.map((b, idx) => {
            const [x1, y1, x2, y2] = b.coords
            const [ox1, oy1, ox2, oy2] = this.joinMatrixCoords(
                b.coords,
                offset[idx].coords
            )

            const path = [] as unknown as [_TPoint, _TPoint][]
            path.push(
                [[x1, y1], [ox1, oy1]],
                [[ox2, oy2], [x2, y2]]

            )
            const dataSide = { outerborder: [[x1, y1], [x2, y2]], innerborder: [[ox1, oy1], [ox2, oy2]] }
            const points = [
                _p(x1, y1),
                _p(ox1, oy1),
                _p(ox2, oy2),
                _p(x2, y2)
            ]

            return { side: b.side as TSide, path, points }
        })


        return { anchor: startPos, size, pathCoords, pathPoints: [...pathPoints] as const }
    }


    joinMatrixCoords(arr1: number[], arr2: typeof arr1) {
        const l = arr1.length
        const l1 = arr2.length
        if (l !== l1) throw new Error("Check arr length!")
        let result = []
        for (let i = 0; i < l; i++) {

            result.push(arr1[i] + arr2[i])
        }

        return result
    }


}

const applyOffsetPoint = (coords: [_Point, _Point], pcoords: typeof coords) => {

    const [start, end] = coords
    const [os, oe] = pcoords
    const result = [start, _psum(start, os), _psum(end, oe), end] as const
    return result
}

export class BaseNode {
    public size: ISizeShort = new SizeShort(250, 400)
    public bsides: IBorders = new NodeFactory()

}

export class FrameFactory {
    public name: string
    public history: IFrame[] = []
    constructor(name?: string) {
        this.name = name ? name : 'frame_factory'
    }

    createFrame(_type: IFrameVariants, size: _SizeF, startPos: _Point, system?: SystemProfile) {
        const nf = new NodeFactory(system)
        return nf.newPathCoordsMap(size, startPos)

    }

    asjson() {
        if (this.history.length === 0) return ""
        return JSON.stringify(this.history, null, 2)
    }
}


export const NodeBordersTemplate: Record<IFrameVariants, Array<Record<TSide, _TSideBorderState>>> = {
    f: [{
        top: 'rama',
        right: 'rama',
        bottom: 'rama',
        left: 'rama',
    }],
    ff: [
        {
            top: 'rama',
            right: 'imp',
            bottom: 'rama',
            left: 'rama',
        },
        {
            top: 'rama',
            right: 'rama',
            bottom: 'rama',
            left: 'imp',
        }
    ],
    fff: [
        {
            top: 'rama',
            right: 'imp',
            bottom: 'rama',
            left: 'rama',
        },
        {
            top: 'rama',
            right: 'imp',
            bottom: 'rama',
            left: 'imp',
        },
        {
            top: 'rama',
            right: 'rama',
            bottom: 'rama',
            left: 'imp',
        },
    ]
}
