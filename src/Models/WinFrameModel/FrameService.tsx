import { _CPoint, _Point, _SizeF, _TPoint } from '../../Helpers/HelpersFns';
import { TSidesArray } from '../../Interfaces/Enums';
import { CoordsRecord } from './RamaBordersCoords';
import { S, E } from './FrameStateData';



export class FrameService {
    static getBorderCoordsFromSize(size: _SizeF, offset: number, startPos: _CPoint = { x: 0, y: 0 }) {
        const { width, height } = size;
        const { x, y } = startPos;

        const [x1, y1, x2, y2] = [
            x,
            y,
            x + width,
            y + height
        ];


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

        const offsetBorder = FrameService.getBordersOffsetCoords([[x1, y1], [x2, y2]])(offset);

        return {
            borders, offsetBorder
        };
    }
    static getBordersOffsetCoords(borderCoords: [_TPoint, _TPoint]): (off: number) => CoordsRecord {
        const S = (x: number, y: number): _TPoint => [x, y];
        const E = (x: number, y: number): _TPoint => [x, y];
        const [[x1, y1], [x2, y2]] = borderCoords;
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

    static generatePathSteps(
        borderCoords: CoordsRecord,
        offsetCoords: CoordsRecord
    ) {
        const PathSteps = TSidesArray.map(s => {
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
        return PathSteps;
    };
    static coordsMatrix(size: _SizeF, startPos: _Point = { x: 0, y: 0 }) {
        const { width, height } = size;
        const { x, y } = startPos;

        const [x1, y1, x2, y2] = [
            x,
            y,
            x + width,
            y + height
        ];


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
        return borders
    }

}
