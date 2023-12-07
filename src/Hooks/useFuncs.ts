import { FnProperties, FnPropertyNames, NonFnPropertyNames } from "../ActionComponents/ActionTypes/FnProperties"
import { Fn_Args_offset5, Fn_Output_offset5, Fn_nets, Fn_offset5 } from "../ActionComponents/ActionTypes/Types"
import { _rad2deg } from "../Helpers/HelpersFns"
import { ISizeFull, ISizeShort, ISizeTuple, SizeShort } from "../Interfaces/CommonTypes"
import { ANYfn, ANYobj } from "../Interfaces/MathActionsTypes"
import { ArgsTypes, ArgsTypesList } from "../Models/ArgsTypeModel"
import { AnyArg } from "./useDynamicInputs"
import { InputsTypeEnum } from "./useFormStateSelector"

export interface FnCalculatorList {
    skf(args: ISizeFull): ISizeShort
    simple: (args: ISizeFull) => ISizeShort
    otkosi: (args: ISizeFull) => { pm: number }
    offset5: (args: Fn_Args_offset5) => Fn_Output_offset5
}

export const useFuncs = () => {
    const nets: Fn_nets = ({ width, height }: ISizeFull) => {
        // if (!width || !height) throw new Error("ARGS ERROR!")
        const simple = {
            w: +width + 24,
            h: +height + 45
        }

        const skf = {
            w: +width - 45,
            h: +height - 47
        }

        return { simple, skf }
    }
    const offset5: Fn_offset5 = (args: Fn_Args_offset5) => {
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

    return { nets, offset5 }
}
export class Calc {
    static offset5 = (payload: Fn_Args_offset5) => {
        const { H, W, da, db, h } = payload


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
    static skf(payload: ISizeFull) {
        const { width, height } = payload
        const skf = {
            w: +width - 45,
            h: +height - 47
        }
        return skf
    }
    static simple(payload: ISizeFull) {
        const { width, height } = payload
        const simple = {
            w: +width + 24,
            h: +height + 45
        }
        return simple
    }
    static otkosi(payload: ISizeFull) {
        const pm = +(payload.width / 1000 + 2 * payload.height / 1000 + 0.3).toFixed(4)
        return { pm }
    }
}


export type CalcType = typeof Calc
type CalcFuncs<A extends ANYobj> = { [Key in keyof CalcType]: CalcType[Key] extends (args: A) => any ?
    CalcType[Key]
    : never
}[keyof ff]
export type Fn_CalcList<A extends AnyArg> = CalcFuncs<A>
type ff = FnProperties<typeof Calc>
type ss = { [A in InputsTypeEnum]: Fn_CalcList<ArgsTypesList[A]> }
type fs = {
    type: InputsTypeEnum
    payload: Fn_CalcList<ISizeFull>
}
type ARGS<K extends InputsTypeEnum> = {
    type: K
    payload: ArgsTypesList[K]
}

type CalcPropNames = FnPropertyNames<FnProperties<typeof Calc>>


export class Calc_ {

    static nets: Fn_nets = ({ width, height }: ISizeFull) => {
        // if (!width || !height) throw new Error("ARGS ERROR!")
        const simple = {
            w: +width + 24,
            h: +height + 45
        }

        const skf = {
            w: +width - 45,
            h: +height - 47
        }

        return { simple, skf }
    }
    static offset5: Fn_offset5 = (args: Fn_Args_offset5) => {
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
    static skf(size: ISizeFull) {
        const { width, height } = size
        const skf = {
            w: +width - 45,
            h: +height - 47
        }
        return skf
    }
    static simple(size: ISizeFull) {
        const { width, height } = size
        const simple = {
            w: +width + 24,
            h: +height + 45
        }
        return simple
    }
    static otkosi(size: ISizeFull) {
        const pm = +(size.width / 1000 + 2 * size.height / 1000 + 0.3).toFixed(4)
        return { pm }
    }



}
