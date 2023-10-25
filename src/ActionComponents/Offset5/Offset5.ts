import { _log, _rad2deg, dto_Export } from "../../Helpers/HelpersFns";
import { DTO_StoreObj, DTO_ExportFnType, ExportFnInterface } from "../../Interfaces/MathActionsTypes";
import { } from "../../mobXStore/Stores";
import { DTO_EXPORT, Fn_Args_offset5, Fn_offset5 } from "../ActionTypes/Types";

const CalcOffsetFn_Type5: Fn_offset5 = (args) => {
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
const initOffset5State: Fn_Args_offset5 = {
    W: 0,
    H: 0,
    h: 0,
    da: 0,
    db: 0,
}
const Offset5: DTO_EXPORT = dto_Export(CalcOffsetFn_Type5, initOffset5State)

export default Offset5
// class Offset5Node extends ActionFnNode<typeof CalcOffsetFn_Type5>{

//     exec(args: DTO_CalcOffset5['args'], save_args: boolean = false) {

//         save_args && this.saved.push(args)

//         return this.fn(args)
//     }

// }

// export const Offset5FnNode = new Offset5Node(CalcOffsetFn_Type5)

export type DTO_CalcOffset5 = DTO_ExportFnType<typeof CalcOffsetFn_Type5>
export type DTO_StoreOffset5 = DTO_StoreObj<typeof CalcOffsetFn_Type5>

export type DTO_ActionOffset5 = ExportFnInterface<typeof CalcOffsetFn_Type5, 'offset5'>