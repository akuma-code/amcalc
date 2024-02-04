import { OFFSET, SystemProfile } from "../../Components/Templates/Systems"
import { _AdvPoint, _CPoint, _Point, _SizeF, _TPoint, _isArr, _log, _p, _ss } from "../../Helpers/HelpersFns"
import { TSidesArray } from "../../Interfaces/Enums"
type _CoordsSE = _Point | _TPoint
export type DrawerPointType = 'L' | 'M' | 'l' | 'm' | 'Z' | 'z' | 'h' | 'H' | 'v' | 'V'
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


    drawpath(...pts: _CoordsSE[]) {
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

    drawpathC(...pts: _CPoint[]) {
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

export const getSizeFromCoords = (start: _Point, end: _Point) => {
    return _ss(Math.abs(start.x - end.x), Math.abs(start.y - end.y))
}


function _sumSize<T extends _SizeF>(sizes: T[]) {
    const W = sizes.reduce((prev, c) => ({ ...prev, width: prev.width += c.width })).width
    const H = sizes.reduce((prev, c) => ({ ...prev, height: prev.height += c.height })).height
    return { W, H }
}