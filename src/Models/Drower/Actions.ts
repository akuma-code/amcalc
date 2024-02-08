import { _Point, _TScaleRatio, _p, _psum } from "../../Helpers/HelpersFns";
import { _TCoords } from "../FrameComponent/StvState";

class ActionCoordService {

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
}


export function _scalePoint(p: _Point, scale: _TScaleRatio): _Point {
    const { sx = 1, sy = 1 } = scale

    return _p(p.x * sx, p.y * sy)
}

const _toMinp = (p: _Point) => _scalePoint(p, { sx: -1, sy: -1 })



export const _aspectR = (a: number, b: number) => +(a / b).toFixed(2)

export function Logger<This, Args extends number[], Return>(target: (this: This, ...args: Args) => Return,
    context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return>
) {
    return function (this: This, ...args: Args) {

        console.log("Logger: func start")
        const result = target.call(this, ...args)
        console.log("Logger: Func end")
        return result
    }
}