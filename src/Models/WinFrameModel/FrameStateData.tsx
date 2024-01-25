import { IFrameOffset, OFFSET, SystemProfile } from '../../Components/Templates/Systems';
import { _CPoint, _ID, _SizeF, _TPoint, _p, _ss } from '../../Helpers/HelpersFns';
import { IFrameVariants, TSidesArray } from '../../Interfaces/Enums';
import { CoordsRecord } from './RamaBordersCoords';


export interface IFrameState<T extends IFrameVariants> {
    _type: T;
    rama: {
        size: _SizeF;
        pos: _TPoint;
        params?: {
            system: string;
        };
    };
    imposts: {
        axisCoords: [_TPoint, _TPoint];
        params?: {
            _impType: 'standart' | 'fram';
            delta: number;
        };
    }[];
    stvs: {
        stvBorders: {
            side: "top" | "right" | "bottom" | "left";
            coords: readonly [_TPoint, _TPoint, _TPoint, _TPoint];
        }[]
        pos: _CPoint;
        _id: `s${number}`;
        isShow: boolean;
    }[];
}
export class FrameState implements IFrameState<'ff'> {
    _type: 'ff' = 'ff';
    _id: string = `frame_${_ID()}`;
    _system: SystemProfile = SystemProfile.Proline
    _offsetDelta!: IFrameOffset
    rama: {
        size: _SizeF;
        pos: _TPoint;
        params?: { system: SystemProfile } | undefined;
    };
    imposts: {
        axisCoords: [_TPoint, _TPoint];
        params?: { _impType: 'standart' | 'fram'; delta: number; } | undefined;
    }[];
    stvs: {
        stvBorders: {
            side: "top" | "right" | "bottom" | "left";
            coords: readonly [_TPoint, _TPoint, _TPoint, _TPoint];
        }[]
        pos: _CPoint;
        _id: `s${number}`;
        isShow: boolean;
    }[];
    constructor(size: _SizeF, pos: _TPoint = [0, 0], params?: any) {
        this.rama = {
            size: size,
            pos: pos,
        };
        this.imposts = [];
        this.stvs = [];
        this._offsetDelta = OFFSET[this._system]
        this.init()
    }

    init() {
        const [x, y] = this.rama.pos
        const { borders, offsetBorder } = FrameService.getBorderCoordsFromSize(
            this.rama.size,
            this._offsetDelta.rama,
            _p(...this.rama.pos),
        )
        const initImpost = (direction: 'hor' | 'ver' = 'ver') => {
            const start = direction === 'ver' ? this.rama.size.width / 2 : this.rama.size.height / 2
            const end = direction === 'ver' ? this.rama.size.width / 2 : this.rama.size.height / 2

            return [
                S(x + start, y + this._offsetDelta.rama),
                E(x + end, y + this.rama.size.height - this._offsetDelta.rama)
            ] as [_TPoint, _TPoint]
        }

        const initStv = () => {
            const halfW = this.rama.size.width / 2
            const halfH = this.rama.size.height / 2
            const overlap = {
                stv_rama: 30,
                stv_impost: 20
            }

            const s1 = {
                width: halfW - overlap.stv_rama - overlap.stv_impost,
                height: this.rama.size.height - 2 * overlap.stv_rama,
                startPos: _p(x + overlap.stv_rama, y + overlap.stv_rama),
                isShow: true
            }
            const s2 = {
                width: halfW - overlap.stv_rama - overlap.stv_impost,
                height: this.rama.size.height - 2 * overlap.stv_rama,
                startPos: _p(x + halfW + overlap.stv_impost, y + overlap.stv_rama),
                isShow: true
            }
            const Stv_Borders = ({ width, height, isShow, startPos }: typeof s1) => FrameService
                .getBorderCoordsFromSize(_ss(width, height), this._offsetDelta.rama, startPos)
            const Stv1 = FrameService.generatePathSteps(Stv_Borders(s1).borders, Stv_Borders(s1).offsetBorder)
            const Stv2 = FrameService.generatePathSteps(Stv_Borders(s2).borders, Stv_Borders(s2).offsetBorder)
            // const Stv2 = Stv_Borders(STV.s2)(45).map(b => ({ side: b.side, path: ds.drawpath(...b.coords) }))

            return [
                {
                    _id: 's1' as const,
                    pos: s1.startPos,
                    isShow: true,
                    stvBorders: Stv1
                },
                {
                    _id: 's2' as const,
                    pos: s2.startPos,
                    isShow: true,
                    stvBorders: Stv2
                },
            ]
        }

        this.stvs = initStv()
        const axisCoords = initImpost('ver')
        this.imposts = [
            { axisCoords }]

    }
    unpdatePosition(pos: _TPoint) {
        this.rama = { ...this.rama, pos: pos }
    }
    updateSize(new_size: Partial<_SizeF>) {
        this.rama = { ...this.rama, size: { ...this.rama.size, ...new_size } }
    }

}


class FrameService {
    static getBorderCoordsFromSize(size: _SizeF, offset: number, startPos: _CPoint = { x: 0, y: 0 },) {
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
        }

        const offsetBorder = FrameService.getBordersOffsetCoords([[x1, y1], [x2, y2]])(offset)

        return {
            borders, offsetBorder
        }
    }
    static getBordersOffsetCoords(borderCoords: [_TPoint, _TPoint]): (off: number) => CoordsRecord {
        const S = (x: number, y: number): _TPoint => [x, y];
        const E = (x: number, y: number): _TPoint => [x, y];
        const [[x1, y1], [x2, y2]] = borderCoords
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
        })
        return PathSteps;
    };
}


const S = (x: number, y: number): _TPoint => [x, y];
const E = (x: number, y: number): _TPoint => [x, y];