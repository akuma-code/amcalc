import { _ID, _Point, _SizeF, _log, _p } from "../../Helpers/HelpersFns"
import { $DrawOffset, $DrawPosOffset } from "../../Hooks/useOffset";
import { TSide } from "../../Interfaces/Enums"
import { DrawerPointType, getSizeFromCoords } from "../Drower/DrawerFns";

export type _CType = 'rama' | 'impost'
type BorderSideCoords = {
    side: TSide;
    coords: [_Point, _Point];
}
type _TCoords = [_Point, _Point]
export type ISideStateOffset = { [Key in TSide]?: _CType }
type IPosOffsetRecord = { [Key in _CType]: number }
type ISideOffsetRecord = { [Key in TSide]: number }
type PartialOffsetValue = Partial<{ [Kei in TSide]: number }>

export class StvFrame {
    _id: string = _ID()
    public stateSide: Record<TSide, _CType>
    public drawCoords: BorderSideCoords[] = []
    public size!: _SizeF
    private _offsetSide: ISideOffsetRecord = { top: 0, bottom: 0, left: 0, right: 0 }

    private _borderCoords: BorderSideCoords[] = []
    private _nodeSize!: _SizeF
    constructor(id: string, nodeCoords: [start: _Point, end: _Point], next?: ISideStateOffset) {
        this._id = id
        this.stateSide = { bottom: 'rama', left: 'rama', right: 'rama', top: 'rama' }
        this._borderCoords = this.setBorderCoords(nodeCoords)
        this.setOffsetSide()
        if (next) this.updateOffset(next)
        this.applyOffset()
    }
    get anchor() {
        if (!this.drawCoords[0]) return { x: 0, y: 0 }
        return this.drawCoords[0]?.coords[0]
    }

    setOffsetSide() {
        let offsetSides = {}
        for (let side in this.stateSide) {
            const s = side as keyof typeof this.stateSide
            const state = this.stateSide[s]
            offsetSides = { ...offsetSides, [s]: $DrawPosOffset[state] }
        }
        this._offsetSide = { ...this._offsetSide, ...offsetSides }
    }

    setBorderCoords(nodeCoords: [_Point, _Point]) {
        const [{ x: rx1, y: ry1 }, { x: rx2, y: ry2 }] = nodeCoords
        const borderCoordPoints: BorderSideCoords[] = [
            { side: 'top', coords: [_p(rx1, ry1), _p(rx2, ry1)] },
            { side: 'right', coords: [_p(rx2, ry1), _p(rx2, ry2)] },
            { side: 'bottom', coords: [_p(rx2, ry2), _p(rx1, ry2)] },
            { side: 'left', coords: [_p(rx1, ry2), _p(rx1, ry1)] },
        ]
        const ns = getSizeFromCoords(...nodeCoords)  //! nodesize
        this._nodeSize = ns

        return borderCoordPoints
    }

    updateOffset(connection: ISideStateOffset) {
        let new_offset_values: PartialOffsetValue = {}
        for (let side in connection) {
            let sidestate = connection[side as keyof ISideStateOffset]
            if (!sidestate) sidestate = 'rama'
            new_offset_values = { ...new_offset_values, [side]: $DrawPosOffset[sidestate] }
        }
        this._offsetSide = { ...this._offsetSide, ...new_offset_values }
        this.applyOffset()
    }

    applyOffset() {
        this.drawCoords = this._borderCoords.map(b => {
            let [s, e] = b.coords
            const { top, bottom, left, right } = this._offsetSide
            switch (b.side) {
                case "top": {
                    s = { ...s, x: s.x + left, y: s.y + top }
                    e = { ...e, x: e.x - right, y: e.y + top }
                    break
                }
                case "right": {
                    s = { ...s, x: s.x - right, y: s.y + top }
                    e = { ...e, x: e.x - right, y: e.y - bottom }
                    break
                }
                case "bottom": {
                    s = { ...s, x: s.x - right, y: s.y - bottom }
                    e = { ...e, x: e.x + left, y: e.y - bottom }
                    break
                }
                case "left": {
                    s = { ...s, x: s.x + left, y: s.y - bottom }
                    e = { ...e, x: e.x + left, y: e.y + top }
                    break
                }
            }
            return ({ ...b, coords: [s, e] })
        })
        const dw = this._offsetSide.left + this._offsetSide.right
        const dh = this._offsetSide.top + this._offsetSide.bottom
        this.size = { ...this._nodeSize, width: this._nodeSize.width - dw, height: this._nodeSize.height - dh }

    }

    update(nodeCoords: [_Point, _Point]) {
        this.setBorderCoords(nodeCoords)
        this.applyOffset()
    }

    watch(nodeCoords: _TCoords) {

        this.update(nodeCoords)
        return this
    }
}

export class ImpostFrame {
    id: string
    coords: _TCoords
    dir: 'vertical' | 'horisontal' = 'vertical'
    anchor: _Point
    ih: number = $DrawOffset.imp * 2
    posOverlap: number = $DrawOffset.rama

    constructor(initCoords: [_Point, _Point]) {
        this.id = _ID()
        this.coords = initCoords
        this.anchor = this.xy

    }

    get xy() {
        const [start, end] = this.coords
        const x = Math.abs(start.x - end.x) / 2 === 0 ? start.x : Math.abs(start.x - end.x) / 2
        const y = Math.abs(start.y - end.y) / 2 === 0 ? start.y : Math.abs(start.y - end.y) / 2
        const xy = _p(x, y)

        return xy
    }


    drawPath() {
        const [start, end] = this.coords
        const L = this.dir === 'vertical'
            ? Math.abs(start.y - end.y) - this.posOverlap * 2
            : Math.abs(start.x - end.x) - this.posOverlap * 2

        const M = `M${start.x} ${start.y}`
        const m = `m${-this.ih / 2} ${this.posOverlap}`
        const l = [

            `l${0} ${L}`,
            `l${this.ih} ${0}`,
            `l${0} ${-L}`,
            `Z`
        ]
        const vpath = [M, m, ...l].join(" ")
        const hpath = [
            _strpath('M', start),
            _strpath('m', _p(this.posOverlap, this.ih / 2)),
            _strpath('l', _p(L, 0)),
            _strpath('l', _p(0, this.ih)),
            _strpath('l', _p(-L, 0)),
            'Z'
        ].join(" ")
        return this.dir === 'vertical' ? vpath : hpath
    }

    update(coords: _TCoords) {
        this.coords = coords
    }

    watch(anchorCoords: _TCoords) {
        this.update(anchorCoords)
        return this
    }

}


export const _strpath = (letter: DrawerPointType, point: _Point = { x: 0, y: 0 }) => `${letter}${point.x} ${point.y}`