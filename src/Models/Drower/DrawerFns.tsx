import { DrawerPointType, _AdvPoint, _Point, _TPoint, _isArr, _p } from "../../Helpers/HelpersFns"

export function _L(x: number, y: number) {
    return ` L${x} ${y}`
}

export class DrawerService {
    saved: { d: string }[] = []


    TCoords(p: _Point | _TPoint) {

        const TCoord = _isArr(p) ? p : [p.x, p.y] as const
        return TCoord.join(" ")
    }
    concatType(p: _Point | _TPoint, s: DrawerPointType) {
        return ` ${s}${this.TCoords(p)}` as const
    }


    drawpath(...pts: (_Point | _TPoint)[]) {
        const max = pts.length - 1
        const path = pts.reduce((prev, p, idx) => {
            if (idx === 0) prev += this.concatType(p, 'M')
            if (idx < max && idx > 0) prev += this.concatType(p, 'L')
            if (idx === max) {
                prev += this.concatType(p, 'L')
                prev += ` Z`
            }
            return prev

        }, "")
        return path
    }
    path(...pts: (_Point | _TPoint)[]) {
        const _p = <path d={ this.drawpath(...pts) } stroke='black' fill="#00ffff" />

        return _p
    }
}



