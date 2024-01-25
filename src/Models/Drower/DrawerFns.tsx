import { OFFSET, SystemProfile } from "../../Components/Templates/Systems"
import { _AdvPoint, _Point, _TPoint, _isArr, _log, _p } from "../../Helpers/HelpersFns"
import { TSidesArray } from "../../Interfaces/Enums"
type _CoordsSE = _Point | _TPoint
export type DrawerPointType = 'L' | 'M' | 'l' | 'm' | 'Z'
export function _L(x: number, y: number) {
    return ` L${x} ${y}`
}

export class DrawerService {
    saved: { d: string }[] = []
    TCoords(p: _Point | _TPoint) {
        const TCoord = _isArr(p) ? p : [p.x, p.y] as const
        return TCoord.join(" ")
    }
    concatType(s: DrawerPointType, p: _CoordsSE,) {
        return ` ${s}${this.TCoords(p)}` as const
    }


    drawpath(...pts: (_Point | _TPoint)[]) {
        const max = pts.length - 1
        if (max < 3) _log("Not enought points")
        const path = pts.reduce((prev, p, idx) => {
            if (prev === "") return prev += this.concatType('M', p,)
            if (idx < max) prev += this.concatType('L', p,)
            if (idx === max) {
                prev += this.concatType('L', p,)
                prev += ` Z`
            }
            return prev
        }, "")
        this.saved.push({ d: path })
        return path
    }

    drawRelativePath(...pts: _CoordsSE[]) {
        const max = pts.length - 1
        if (max < 3) _log("Not enought points")
        const path = pts.reduce((prev, p, idx) => {
            if (prev === "") return prev += this.concatType('M', p,)
            if (idx < max) prev += this.concatType('l', p,)
            if (idx === max) {
                prev += this.concatType('l', p,)
                prev += ` Z`
            }
            return prev

        }, "")
        return path
    }

}


class PathMaker {
    d: string
    constructor() {
        this.d = ""
    }

    draw(...pts: _CoordsSE[]) {
        const max = pts.length - 1
        if (max < 3) _log("Not enought points")
        const path = pts.reduce((prev, p, idx) => {
            if (prev === "") return prev += this.concatType('M', p,)
            if (idx < max) prev += this.concatType('L', p,)
            if (idx === max) {
                prev += this.concatType('L', p,)
                prev += ` Z`
            }
            return prev

        }, "")
        return path
    }

    concatType(s: DrawerPointType, p: _CoordsSE,) {
        return ` ${s}${this.TCoords(p)}` as const
    }

    TCoords(p: _Point | _TPoint) {
        const TCoord = _isArr(p) ? p : [p.x, p.y] as const
        return TCoord.join(" ")
    }
}

export const getOffset = (system: SystemProfile = SystemProfile.Proline) => {
    const _off = OFFSET[system]
    return _off
}

