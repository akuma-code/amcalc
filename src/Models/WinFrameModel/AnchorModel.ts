import { IFrameOffset, OFFSET, SystemProfile } from "../../Components/Templates/Systems";
import { _Point, _SizeF } from "../../Helpers/HelpersFns";
import { TSide } from "../../Interfaces/Enums";


export const AFrameCoords = (size: _SizeF, startPos: _Point) => {
    const { x, y } = startPos
    const { width: w, height: h } = size
    const [rx1, ry1] = [x, y]
    const [rx2, ry2] = [x + w, y + h]
    const corners = [
        [rx1, ry1],
        [rx2, ry1],
        [rx2, ry2],
        [rx1, ry2],
    ]
    const borderCoordsMap = [
        { side: 'top', coords: [rx1, ry1, rx2, ry1] },
        { side: 'right', coords: [rx2, ry1, rx2, ry2] },
        { side: 'bottom', coords: [rx2, ry2, rx1, ry2] },
        { side: 'left', coords: [rx1, ry2, rx1, ry1] },
    ]
    return { coords: corners, anchor: startPos, size, borderCoordsMap }
}
export type _ExtendBorderTypeState = {
    side: TSide,
    _type: keyof IFrameOffset
}
export const getOffset = (border: _ExtendBorderTypeState, system: SystemProfile = SystemProfile.Proline) => {

    const { _type, side } = border
    const currentOffset = OFFSET[system]
    const offsetValue = currentOffset[_type]
    if (!offsetValue) {
        console.warn("OFFSET VALUE UNDEFINED!")
        throw new Error("Offset Error!")
    }
    switch (side) {
        case "top": return { oy1: offsetValue }
        case "right": return { ox2: -offsetValue }
        case "bottom": return { oy2: -offsetValue }
        case "left": return { ox1: offsetValue }
    }


}

export const joinCoordsMatrix = (arr1: [x1: number, y1: number, x2: number, y2: number], arr2: typeof arr1) => {
    const l = arr1.length
    let result = []
    for (let i = 0; i < l; i++) {

        result.push(arr1[i] + arr2[i])
    }
    return result as [ox1: number, oy1: number, ox2: number, oy2: number]
}