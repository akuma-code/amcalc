import { _ID, _Point, _p, _strpath } from "../../Helpers/HelpersFns";
import { $DrawOffset } from "../../Hooks/useOffset";
import { _TCoords, } from "./StvState";


export class ImpostFrame {
    id: string;
    coords: _TCoords;
    dir: 'vertical' | 'horisontal' = 'vertical';
    anchor: _Point;
    ih: number = $DrawOffset.imp * 2;
    posOverlap: number = $DrawOffset.rama;

    constructor(initCoords: [_Point, _Point]) {
        this.id = _ID();
        this.coords = initCoords;
        this.anchor = this.xy;

    }

    get xy() {
        const [start, end] = this.coords;
        const x = Math.abs(start.x - end.x) / 2 === 0 ? start.x : Math.abs(start.x - end.x) / 2;
        const y = Math.abs(start.y - end.y) / 2 === 0 ? start.y : Math.abs(start.y - end.y) / 2;
        const xy = _p(x, y);

        return xy;
    }


    drawPath() {
        const [start, end] = this.coords;
        const L = this.dir === 'vertical'
            ? Math.abs(start.y - end.y) - this.posOverlap * 2
            : Math.abs(start.x - end.x) - this.posOverlap * 2;

        const M = `M${start.x} ${start.y}`;
        const m = `m${-this.ih / 2} ${this.posOverlap}`;
        const l = [
            `l${0} ${L}`,
            `l${this.ih} ${0}`,
            `l${0} ${-L}`,
            `Z`
        ];
        const vpath = [M, m, ...l].join(" ");
        const hpath = [
            _strpath('M', start),
            _strpath('m', _p(this.posOverlap, this.ih / 2)),
            _strpath('l', _p(L, 0)),
            _strpath('l', _p(0, this.ih)),
            _strpath('l', _p(-L, 0)),
            'Z'
        ].join(" ");
        return this.dir === 'vertical' ? vpath : hpath;
    }

    update(coords: _TCoords) {
        this.coords = coords;
    }

    watch(anchorCoords: _TCoords) {
        this.update(anchorCoords);
        return this;
    }

}
