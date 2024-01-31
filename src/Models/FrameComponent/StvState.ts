import { _Point, _SizeF, _p } from "../../Helpers/HelpersFns"
import { TSide } from "../../Interfaces/Enums"
import { getSizeFromCoords } from "../Drower/DrawerFns";

export type _CType = 'rama' | 'impost'
type BorderSideCoords = {
    side: TSide;
    coords: [_Point, _Point];
}
export type ISideStateOffset = { [Key in TSide]?: _CType }
type IPosOffsetRecord = { [Key in _CType]: number }
type PartialOffsetValue = Partial<{ [Kei in TSide]: number }>

export class StvFrame {
    _id: string
    private _defaultOffset: IPosOffsetRecord = { 'rama': 30, 'impost': 15 }
    public connections: Record<TSide, _CType> = { bottom: 'rama', left: 'rama', right: 'rama', top: 'rama' }
    _offsetSide: Record<TSide, number> = { top: 0, bottom: 0, left: 0, right: 0 }
    private _borderCoords: BorderSideCoords[] = []
    public drawCoords: BorderSideCoords[] = []
    public size!: _SizeF
    private _nodeSize!: _SizeF
    constructor(id: string, nodeCoords: [start: _Point, end: _Point], connections?: ISideStateOffset) {
        this._id = id
        this.setOffsetSide()
        this._borderCoords = this.setBorderCoords(nodeCoords)
        if (connections) this.updateOffset(connections)
        this.applyOffset()
    }
    get anchor() {
        if (!this.drawCoords[0]) return { x: 0, y: 0 }
        return this.drawCoords[0]?.coords[0]
    }

    setOffsetSide() {
        let offsetSides = {}
        for (let side in this.connections) {
            const s = side as keyof typeof this.connections
            const state = this.connections[s]
            offsetSides = { ...offsetSides, [s]: this._defaultOffset[state] }
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
        let new_offset_values: { [Key in TSide]?: number } = {}
        for (let side in connection) {
            let sidestate = connection[side as keyof ISideStateOffset]
            if (!sidestate) sidestate = 'rama'
            new_offset_values = { ...new_offset_values, [side]: this._defaultOffset[sidestate] }
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
}

