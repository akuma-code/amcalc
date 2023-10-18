import { _rad2deg } from "../../Helpers/HelpersFns";
import { DTO_StoreObj, DTO_ExportFnType } from "../../Interfaces/MathActionsTypes";
import { } from "../../mobXStore/Stores";

export type IFuncArgs = {
    W: number, H: number, h: number, da: number, db: number
}
export function CalcOffsetFn_Type5(args: IFuncArgs) {
    const { H, W, da, db, h } = args


    let x: number, y: number;
    const dh = H - h
    const tgA = +(W / dh).toFixed(2)
    const A = +_rad2deg(Math.atan(tgA)).toFixed(2)
    x = +(da / tgA).toFixed(2)
    y = +(db / Math.cos(A)).toFixed(2)

    const calc = {
        angle: A,
        sumXY: +(x + y).toFixed(2),
        deltaH: dh,
        tgA,
        x,
        y,

    }

    return { ...calc }

}


export type DTO_CalcOffset5 = DTO_ExportFnType<typeof CalcOffsetFn_Type5>
export type DTO_StoreOffset5 = DTO_StoreObj<typeof CalcOffsetFn_Type5>
