import { _Point } from "../../Helpers/HelpersFns";
import { DrawerPointType } from "./DrawerFns";



const concat_point = (letter: DrawerPointType, point: _Point) => {
    const { x, y } = point
    return `${letter}${x} ${y}` as const
}

const concat_numb = (l: DrawerPointType, x?: number, y?: number) => {
    if (!x && x !== 0) return `${l}` as const
    return !y && y !== 0 ? `${l}${x}` as const : `${l}${x} ${y}` as const
}
export const _DRAWPATH = {
    type_f: [
        concat_numb('m', 0, 0),
        concat_numb('h', 100),
        concat_numb('v', 100),
        concat_numb('h', -100),
        concat_numb('z'),
    ]
        .join(" "),
    type_ff: [
        concat_numb('m', 0, 0),
        concat_numb('h', 48),
        concat_numb('v', 100),
        concat_numb('h', -48),
        concat_numb('v', -100),
        concat_numb('m', 52, 0),
        concat_numb('h', 48),
        concat_numb('v', 100),
        concat_numb('h', -48),
        concat_numb('v', -100),

    ]
        .join(" "),
    type_fff: [
        concat_numb('m', 0, 0),
        concat_numb('h', 32),
        concat_numb('v', 100),
        concat_numb('h', -32),
        concat_numb('v', -100),
        concat_numb('m', 34, 0),
        concat_numb('h', 32),
        concat_numb('v', 100),
        concat_numb('h', -32),
        concat_numb('v', -100),
        concat_numb('m', 34, 0),
        concat_numb('h', 32),
        concat_numb('v', 100),
        concat_numb('h', -32),
        concat_numb('v', -100),


    ]
        .join(" "),
}