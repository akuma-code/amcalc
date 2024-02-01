import { useMemo } from "react";
import { IBorders, IFrameOffset, SystemProfile } from "../Components/Templates/Systems";
import { _CPoint, _Point, _SizeF, _TPoint, _p, _psum } from "../Helpers/HelpersFns";
import { FrameFactory, NodeFactory } from "../Models/FrameFactory";
import { DrawerService } from "../Models/Drower/DrawerFns";
import { TSide, TSidesArray } from "../Interfaces/Enums";
import { IFrameState, _OffsetCoordsRecord } from "../Interfaces/FrameState";

export const $DrawOffset: IFrameOffset = {
    rama: 50,
    imp: 30,
    stv: 65,
    stv_rama: 96,
    stv_imp: 74.5,
    imp_shtulp: 64,
    svet: -16,
}

export const $DrawPosOffset = {
    rama: 30,
    impost: 15,
}

type OffsetRamaParams = {
    system: SystemProfile

}
type PathCoordsProps = {
    side: TSide
    path: [_TPoint, _TPoint][];
    points: _Point[];
}
const initRamaParams: OffsetRamaParams = {
    system: SystemProfile.Proline
}


const ds = new DrawerService()
const computePath = (pc: PathCoordsProps, idx?: number) => ({ side: pc.side, path: ds.drawpathC(...pc.points) })
export const useOffsetRama = (size: _SizeF, pos: _Point, params: Partial<OffsetRamaParams> = initRamaParams) => {
    const ff = new NodeFactory(params.system)

    const offset = newSidesOffset({
        top: 'rama',
        right: 'rama',
        bottom: 'rama',
        left: 'rama'
    })
    const rama = useMemo(() => {
        const borderCoords = newBordersCoordMap(size, pos).borderCoordPoints

        const offsetCoords = coordsOffsetMap(offset)
        const _pathCoords = borderCoords.map((b, idx) =>
            ({ ...b, coords: applyOffsetPoint(b.coords as [_Point, _Point], offsetCoords[idx].pcoords) }))
        const _paths = _pathCoords.map(b => ({ ...b, path: ds.drawpath(...b.coords) }))



        return _paths
    }, [size, pos, offset])

    return rama
}


export function newBordersCoordMap(size: _SizeF, startPos: _CPoint) {
    const { x, y } = startPos
    const { width: w, height: h } = size
    const [rx1, ry1] = [x, y]
    const [rx2, ry2] = [x + w, y + h]

    const borderCoordPoints: { side: TSide, coords: [_Point, _Point] }[] = [
        { side: 'top', coords: [_p(rx1, ry1), _p(rx2, ry1)] },
        { side: 'right', coords: [_p(rx2, ry1), _p(rx2, ry2)] },
        { side: 'bottom', coords: [_p(rx2, ry2), _p(rx1, ry2)] },
        { side: 'left', coords: [_p(rx1, ry2), _p(rx1, ry1)] },
    ]

    return { anchor: startPos, size, borderCoordPoints }
}

const newSidesOffset = (sideState: IBorders) => {
    const offsetSides = {
        ...sideState,
        top: $DrawOffset[sideState.top]!,
        right: $DrawOffset[sideState.right]!,
        bottom: $DrawOffset[sideState.bottom]!,
        left: $DrawOffset[sideState.left]!,
    }
    return offsetSides
}

const applyOffsetPoint = (borderCoords: [_Point, _Point], offsetCoords: typeof borderCoords) => {

    const [start, end] = borderCoords
    const [os, oe] = offsetCoords
    const result = [start, _psum(start, os), _psum(end, oe), end] as const
    return result
}

function coordsOffsetMap(offset: Record<TSide, number>) {
    const cmap = TSidesArray.map(side => {
        const o = offset
        let off: _OffsetCoordsRecord = { ox1: -1, oy1: -1, ox2: -1, oy2: -1 }
        switch (side) {
            case "top": off = {
                ox1: o.left,
                oy1: o.top,
                ox2: -o.right,
                oy2: o.top
            }; break
            case "right": off = {
                ox1: -o.right,
                oy1: o.top,
                ox2: -o.right,
                oy2: -o.bottom
            }; break
            case "bottom": off = {
                ox1: -o.right,
                oy1: -o.bottom,
                ox2: o.left,
                oy2: -o.bottom
            }; break
            case "left": off = {
                ox1: o.left,
                oy1: -o.bottom,
                ox2: o.left,
                oy2: o.top
            }; break
        }
        return { side, pcoords: [_p(off.ox1, off.oy1), _p(off.ox2, off.oy2)] satisfies [_Point, _Point] }
    })
    return cmap

}