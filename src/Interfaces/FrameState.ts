import { _CPoint, _Point, _SizeF, _TPoint } from '../Helpers/HelpersFns';
import { IFrameVariants } from './Enums';

export type _OffsetCoordsRecord = Record<'ox1' | 'oy1' | 'ox2' | 'oy2', number>

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
        }[];
        pos: _CPoint;
        _id: `s${number}`;
        isShow: boolean;
    }[];
}
