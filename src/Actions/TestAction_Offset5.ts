import { DTO_FunctionType, GetCallBackType } from "../Interfaces/MathActionsTypes";


export function CalcOffsetType5(W: number, H: number, h: number, da: number, db: number) {

    if (!W || !H || !h || !da || !db) return

    let x: number, y: number;
    const dh = H - h
    const tgA = W / dh
    const A = Math.atan(tgA)
    x = da / tgA
    y = db / Math.cos(A)
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