import { _deg2rad, _rad2deg } from "../Helpers/HelpersFns";
import { DTO_FunctionType, GetCallBackType } from "../Interfaces/MathActionsTypes";


export function CalcOffsetType5(W: number, H: number, h: number, da: number, db: number) {

    if (!W || !H || !h || !da || !db) return

    let x: number, y: number;
    const dh = H - h
    const tgA = +(W / dh).toFixed(2)
    const A = +_rad2deg(Math.atan(tgA)).toFixed(2)
    x = +(da / tgA).toFixed(2)
    y = +(db / Math.cos(A)).toFixed(2)
    const inputs = {
        Width: W,
        MaxHeight: H,
        MinHeight: h,
        da,
        db,
    }
    const calc = {
        deltaH: dh,
        tgA,
        angle: A,
        x,
        y,
        sumXY: x + y

    }

    return { inputs, calc }

}

export type DTO_CalcOffset5 = GetCallBackType<typeof CalcOffsetType5>