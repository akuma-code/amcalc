import { _rad2deg } from "../../Helpers/HelpersFns";
import { DTO_StoreObj, DTO_ExportFnType, DTO_FuncActionType, ExportFnInterface } from "../../Interfaces/MathActionsTypes";
import { } from "../../mobXStore/Stores";
import { ActionFnNode } from "../ActionModels/v1FnNode";
import { DTO_Fn_CalcNetSize } from "../Nets/CalcNetSize";
export type IOffset5Arg = {
    W: number, H: number, h: number, da: number, db: number
}
export type IOffset5_Output = {
    angle: number;
    sumXY: number;
    deltaH: number;
    tgA: number;
    x: number;
    y: number;
}
type ICalcOffset5 = (arg: IOffset5Arg) => IOffset5_Output
export const CalcOffsetFn_Type5: ICalcOffset5 = (args) => {
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

class Offset5Node extends ActionFnNode<typeof CalcOffsetFn_Type5>{

    exec(args: DTO_CalcOffset5['args'], save_args: boolean = false) {

        save_args && this.saved.push(args)

        return this.fn(args)
    }

}

export const Offset5FnNode = new Offset5Node(CalcOffsetFn_Type5)

export type DTO_CalcOffset5 = DTO_ExportFnType<typeof CalcOffsetFn_Type5>
export type DTO_StoreOffset5 = DTO_StoreObj<typeof CalcOffsetFn_Type5>

export type DTO_ActionOffset5 = ExportFnInterface<typeof CalcOffsetFn_Type5, 'offset5'>