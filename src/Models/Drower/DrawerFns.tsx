import { DrawerPointType, _AdvPoint, _Point, _TPoint, _isArr, _log, _p } from "../../Helpers/HelpersFns"
type _CoordsSE = _Point | _TPoint
export function _L(x: number, y: number) {
    return ` L${x} ${y}`
}

export class DrawerService {
    saved: { d: string }[] = []
    TCoords(p: _Point | _TPoint) {
        const TCoord = _isArr(p) ? p : [p.x, p.y] as const
        return TCoord.join(" ")
    }
    concatType(p: _CoordsSE, s: DrawerPointType) {
        return ` ${s}${this.TCoords(p)}` as const
    }


    drawpath(...pts: (_Point | _TPoint)[]) {
        const max = pts.length - 1
        if (max < 3) _log("Not enought points")
        const path = pts.reduce((prev, p, idx) => {
            if (prev === "") return prev += this.concatType(p, 'M')
            if (idx < max) prev += this.concatType(p, 'L')
            if (idx === max) {
                prev += this.concatType(p, 'L')
                prev += ` Z`
            }
            return prev

        }, "")
        return path
    }

}



