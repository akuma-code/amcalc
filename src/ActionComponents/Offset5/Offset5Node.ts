import { _rad2deg } from "../../Helpers/HelpersFns";
import { ISizeFull } from "../../Interfaces/CommonTypes";

export type Off5Args = {
    Hmin: number
    da: number
    db: number
} & ISizeFull


export class CLS_Offset5FnCalc {
    angle!: number;
    sumXY!: number;
    tgA!: number;
    x!: number;
    y!: number;

    constructor(args: Off5Args) {
        this.init(args)
    }

    private init(args: Off5Args) {
        const { width, height, Hmin, da, db } = args
        const dh = height - Hmin
        const tgA = +(width / dh).toFixed(2)
        const A = +_rad2deg(Math.atan(tgA)).toFixed(2)
        const x = +(da / tgA).toFixed(2)
        const y = +(db / Math.cos(A)).toFixed(2)

        this.angle = A
        this.sumXY = x + y
        this.tgA = tgA
        this.x = x
        this.y = y
    }
}