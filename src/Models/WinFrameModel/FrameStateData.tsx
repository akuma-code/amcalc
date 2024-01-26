import { IFrameOffset, OFFSET, SystemProfile } from '../../Components/Templates/Systems';
import { _CPoint, _ID, _SizeF, _TPoint, _p, _ss } from '../../Helpers/HelpersFns';
import { IFrameState } from '../../Interfaces/FrameState';
import { FrameService } from './FrameService';


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


export const S = (x: number, y: number): _TPoint => [x, y];
export const E = (x: number, y: number): _TPoint => [x, y];