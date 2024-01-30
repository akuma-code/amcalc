import { _Point } from "../../Helpers/HelpersFns"
import { TSide } from "../../Interfaces/Enums"

type _CType = 'rama' | 'impost'
type ISideStateOffset = { [Key in TSide]?: _CType }
type IPosOffsetRecord = { [Key in _CType]: number }
type PartOffset = Partial<{ [Kei in TSide]: number }>

class StvFrame {
    _id: string
    private _defaultOffset: IPosOffsetRecord = { 'rama': 30, 'impost': 15 }
    public connections: Record<TSide, _CType> = { bottom: 'rama', left: 'rama', right: 'rama', top: 'rama' }
    _offsetSide: Record<TSide, number> = { top: 0, bottom: 0, left: 0, right: 0 }
    constructor(id: string, nodeCoords: [start: _Point, end: _Point], connections?: ISideStateOffset) {
        this._id = id
        this.setOffsetSide()
    }


    setOffsetSide(offsetSides: PartOffset = { bottom: 0, left: 0, right: 0, top: 0 }) {

        for (let side in this.connections) {
            const s = side as keyof typeof this.connections
            const state = this.connections[s]
            offsetSides = { ...offsetSides, [s]: this._defaultOffset[state] }
        }
        this._offsetSide = { ...this._offsetSide, ...offsetSides }
    }

    setOffsetCoords() {

    }
}