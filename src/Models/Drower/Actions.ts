import { _Point, _SizeF, _TScaleRatio, _getcoords, _p, _psum } from "../../Helpers/HelpersFns";
import { _TCoords } from "../FrameComponent/StvState";

export class ActionCoordService {

    static sumCoords(coords1: _TCoords, coords2: _TCoords): _TCoords {
        const [s1, e1] = coords1
        const [s2, e2] = coords2
        return [_psum(s1, s2), _psum(e1, e2)] satisfies _TCoords
    }
    static minusCoords(coords1: _TCoords, coords2: _TCoords): _TCoords {
        const [s1, e1] = coords1
        const [s2, e2] = coords2
        return [_psum(s1, _toMinp(s2)), _psum(e1, _toMinp(e2))] satisfies _TCoords
    }

    static scaleCoords(coords: _TCoords, scale: _TScaleRatio): _TCoords {
        const [s, e] = coords
        return [_scalePoint(s, scale), _scalePoint(e, scale)] as _TCoords
    }

    static getXY(size: _SizeF, pos = _p(0, 0)) {
        const { x, y } = pos
        const { width, height } = size
        const xy = _p(width / 2 + x, height / 2 + y)
        return xy
    }


    static distance(p1: _Point, p2: _Point): number {
        const { x: x1, y: y1 } = p1
        const { x: x2, y: y2 } = p2
        const len = Math.sqrt(
            Math.pow(Math.abs(x2 - x1), 2)
            + Math.pow(Math.abs(y2 - y1), 2))
        return +len.toExponential(4)
    }
}


export function _scalePoint(p: _Point, scale: _TScaleRatio): _Point {
    const { sx = 1, sy = 1 } = scale

    return _p(p.x * sx, p.y * sy)
}

const _toMinp = (p: _Point) => _scalePoint(p, { sx: -1, sy: -1 })



export const _aspectR = (a: number, b: number) => +(a / b).toFixed(2)



