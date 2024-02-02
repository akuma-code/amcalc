import { _ID, _Point, _SizeF, _log, _p } from "../../Helpers/HelpersFns"
import { $DrawPosOffset } from "../../Hooks/useOffset";
import { TSide } from "../../Interfaces/Enums"
import { DrawerPointType, getSizeFromCoords } from "../Drower/DrawerFns";

export type _CType = 'rama' | 'imp'
type BorderSideCoords = {
    side: TSide;
    coords: [_Point, _Point];
}
export type _TCoords = [_Point, _Point]
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
    public _nodeSize!: _SizeF
    constructor(nodeCoords?: _TCoords, next?: ISideStateOffset) {

        this.stateSide = { bottom: 'rama', left: 'rama', right: 'rama', top: 'rama' }
        this.setOffsetSide()
        nodeCoords && this.setBorderCoords(nodeCoords)
        if (next) this.updateOffset(next)
        nodeCoords && this.applyOffset()
        // console.log('created with id: ', this._id)
    }
    get anchor() {
        if (!this.drawCoords[0]) return { x: 0, y: 0 }
        return this.drawCoords[0]?.coords[0]
    }
    setId(id: string) {
        this._id = id
        return this
    }
    setNext(_next: ISideStateOffset) {
        this.updateOffset(_next)
        return this
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
        this._borderCoords = [...borderCoordPoints]
        return this
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
        // if (this._borderCoords.length <= 1) return _log("low coords!")
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

