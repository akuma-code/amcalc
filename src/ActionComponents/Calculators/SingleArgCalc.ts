import { Args_Sill } from "../../Components/FlexForm/MultiForms/MultiFieldsForm";
import { OffsetResult } from "../../Context/DataOutputBlock";
import { InputsTypeEnum } from "../../Hooks/useFormStateSelector";
import { Calc, FnCalculatorList, OtkResult } from "../../Hooks/useFuncs";
import { A_InputArgs, A_Offset5, A_Sill, A_Size, ISizeFull, ISizeShort } from "../../Interfaces/CommonTypes";
import { ArgsTypes } from "../../Models/ArgsTypeModel";
import { Fn_Args_offset5, Fn_Output_offset5 } from "../ActionTypes/Types";
import { notReachable } from "./CalcBoxFn";

type SingleCalcFns = Pick<FnCalculatorList, 'skf' | 'simple' | 'otkosi'>

export class SizeCalc {

    skf: ISizeShort
    simple: ISizeShort
    otkosi: OtkResult
    constructor(args: A_Size) {
        this.skf = this.calcSkf(args)
        this.otkosi = this.calcOtkosi(args)
        this.simple = this.calcSimple(args)
    }
    private calcOtkosi(args: ISizeFull): OtkResult {
        return Calc.otkosi(args)
    }
    private calcSimple(args: ISizeFull): ISizeShort {
        return Calc.simple(args)
    }
    private calcSkf(args: ISizeFull): ISizeShort {
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

export class SillCalc {
    row: A_Sill
    asOtkos: A_Sill
    asUstan: A_Sill
    constructor(args: A_Sill) {
        this.row = this.calcAsRow(args)
        this.asOtkos = this.calcAsOtkos(args)
        this.asUstan = this.calcAsUstan(args)
    }

    private calcAsRow(arg: A_Sill) {
        const { L, B, count } = arg
        return arg
    }
    private calcAsOtkos(arg: A_Sill) {
        const { L, B, count } = arg
        return { ...arg, B: B + 60 }
    }
    private calcAsUstan(arg: A_Sill) {
        return { ...arg, B: arg.B + 35 }
    }
}
type D_Size = ISizeFull & { argType: 'size_full' } & A_Size
type D_Offset = Fn_Args_offset5 & { argType: 'offset5' } & A_Offset5
type D_Sill = A_Sill & { argType: 'sill' } & Args_Sill
export type DiscriminatedArgs = | D_Size | D_Offset | D_Sill


export function SingleCalcReducer(arg: DiscriminatedArgs) {
    switch (arg.argType) {
        case "size_full": { return new SizeCalc(arg) }
        case "offset5": { return new OffsetCalc(arg) }
        case "sill": { return new SillCalc(arg) }
        default: return notReachable(arg)
    }
}

