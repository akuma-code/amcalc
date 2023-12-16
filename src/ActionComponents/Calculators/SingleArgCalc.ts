import { OffsetResult } from "../../Context/DataOutputBlock";
import { InputsTypeEnum } from "../../Hooks/useFormStateSelector";
import { Calc, FnCalculatorList, OtkResult } from "../../Hooks/useFuncs";
import { A_InputArgs, A_Offset5, A_Size, ISizeFull, ISizeShort } from "../../Interfaces/CommonTypes";
import { ArgsTypes } from "../../Models/ArgsTypeModel";
import { Fn_Args_offset5, Fn_Output_offset5 } from "../ActionTypes/Types";
import { notReachable } from "./CalcBoxFn";

type SingleCalcFns = Pick<FnCalculatorList, 'skf' | 'simple' | 'otkosi'>

export class SizeCalc {

    Skf: ISizeShort
    Simple: ISizeShort
    Otkosi: OtkResult
    constructor(args: A_Size) {
        this.Skf = this.skf(args)
        this.Otkosi = this.otkosi(args)
        this.Simple = this.simple(args)
    }
    private otkosi(args: ISizeFull): OtkResult {
        return Calc.otkosi(args)
    }
    private simple(args: ISizeFull): ISizeShort {
        return Calc.simple(args)
    }
    private skf(args: ISizeFull): ISizeShort {
        return Calc.skf(args)
    }

}

export class OffsetCalc {
    offset5: OffsetResult
    constructor(args: A_Offset5) {
        this.offset5 = this.calcOffset(args)
    }

    private calcOffset(args: A_Offset5) {
        return Calc.offset5(args)
    }
}
type D_Size = ISizeFull & { argType: 'size_full' }
type D_Offset = Fn_Args_offset5 & { argType: 'offset5' }
export type DiscriminatedArgs = | D_Size | D_Offset


export function CalcReducer(arg: DiscriminatedArgs) {
    switch (arg.argType) {
        case "size_full": { return new SizeCalc(arg) }
        case "offset5": { return new OffsetCalc(arg) }
        default: return notReachable(arg)
    }
}

