import { IFrameOffset, ISideDirections } from "../../Components/Templates/Systems";
import { _Point, _SizeF, _TPoint } from "../../Helpers/HelpersFns";
import { TSide, TSidesArray } from "../../Interfaces/Enums";
import { DrawerService } from "../Drower/DrawerFns";


export type CoordsRecord = Record<ISideDirections, [_TPoint, _TPoint]>

export const RamaBordersCoords = (size: _SizeF, startPos: _Point) => {

    const { width, height } = size;
    const { x, y } = startPos;

    const [x1, y1, x2, y2] = [
        x,
        y,
        x + width,
        y + height
    ];
    const S = (x: number, y: number): _TPoint => [x, y];
    const E = (x: number, y: number): _TPoint => [x, y];

    const borders: CoordsRecord = {
        top: [
            S(x1, y1),
            E(x2, y1)
        ] as const,
        right: [
            S(x2, y1),
            E(x2, y2)
        ] as const,
        bottom: [
            S(x2, y2),
            E(x1, y2)
        ] as const,
        left: [
            S(x1, y2),
            E(x1, y1)
        ] as const,
    };

    const offsetBorder = getRamaOffsetCoords(x1, y1, x2, y2);


    return (offsetValue: number) => generatePathSteps(borders, offsetBorder(offsetValue));


};
const borderOffsetCoords = (border: { side: TSide, coords: [_TPoint, _TPoint], _state?: keyof IFrameOffset }, off: number) => {
    const S = (x: number, y: number): _TPoint => [x, y];
    const E = (x: number, y: number): _TPoint => [x, y];
    const [start, end] = border.coords
    const [x1, y1, x2, y2] = [...start, ...end]
    switch (border.side) {
        case "top": {
            const topOff = {

            }
            return [
                S(x1 + off, y1 + off),
                E(x2 - off, y1 + off)
            ] as const
        }
        case "right": {
            return [
                S(x2 - off, y1 + off),
                E(x2 - off, y2 - off)
            ] as const
        }
        case "bottom": {
            return [
                S(x2 - off, y2 - off),
                E(x1 + off, y2 - off)
            ] as const
        }
        case "left": {
            return [
                S(x1 + off, y2 - off),
                E(x1 + off, y1 + off)
            ] as const
        }
    }
}

export function getRamaOffsetCoords(x1: number, y1: number, x2: number, y2: number): (off: number) => CoordsRecord {
    const S = (x: number, y: number): _TPoint => [x, y];
    const E = (x: number, y: number): _TPoint => [x, y];
    return (off: number) => ({
        top: [
            S(x1 + off, y1 + off),
            E(x2 - off, y1 + off)
        ] as const,
        right: [
            S(x2 - off, y1 + off),
            E(x2 - off, y2 - off)
        ] as const,
        bottom: [
            S(x2 - off, y2 - off),
            E(x1 + off, y2 - off)
        ] as const,
        left: [
            S(x1 + off, y2 - off),
            E(x1 + off, y1 + off)
        ] as const,
    });
}


export const generatePathSteps = (
    borderCoords: CoordsRecord,
    offsetCoords: CoordsRecord
) => {
    const res = TSidesArray.map(s => {
        let s1: _TPoint, s2: _TPoint, s3: _TPoint, s4: _TPoint;
        const _b = borderCoords[s];
        const _o = offsetCoords[s];

        switch (s) {
            case "top": {
                s1 = _b[0];
                s2 = _o[0];
                s3 = _o[1];
                s4 = _b[1];
                break;
            }
            case "right": {
                s1 = _b[0];
                s2 = _o[0];
                s3 = _o[1];
                s4 = _b[1];
                break;
            }
            case "bottom": {
                s1 = _b[1];
                s2 = _o[1];
                s3 = _o[0];
                s4 = _b[0];
                break;
            }
            case "left": {
                s1 = _b[1];
                s2 = _o[1];
                s3 = _o[0];
                s4 = _b[0];
                break;
            }
        }
        return { side: s, coords: [s1, s2, s3, s4] as const };
    });
    return res;
};
