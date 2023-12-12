import { FnProperties, FnPropertyNames } from "../ActionComponents/ActionTypes/FnProperties"
import { Fn_Args_offset5, Fn_Output_offset5, Fn_nets, Fn_offset5 } from "../ActionComponents/ActionTypes/Types"
import { _log, _rad2deg } from "../Helpers/HelpersFns"
import { ISizeFull, ISizeShort } from "../Interfaces/CommonTypes"

export interface FnCalculatorList {
    skf(args: ISizeFull): { skf: ISizeShort }
    simple(args: ISizeFull): { simple: ISizeShort }
    otkosi(args: ISizeFull): { pm: number }
    offset5(args: Fn_Args_offset5): { offset5: Fn_Output_offset5 }
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
interface ResultOffset5 {
    offset5: {
        angle: number
        sumXY: number
        deltaH: number
        tgA: number
        x: number
        y: number
    }
}

export class Calc {
    static offset5(payload: Fn_Args_offset5) {
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
        const result: ResultOffset5 = { offset5: calc }

        return result
    }
    static skf(payload: ISizeFull) {
        const { width, height } = payload
        const skf = {
            w: +width - 45,
            h: +height - 47
        }
        return { skf }
    }
    static simple(payload: ISizeFull) {
        const { width, height } = payload
        const simple = {
            w: +width + 24,
            h: +height + 45
        }
        return { simple }
    }
    static otkosi(payload: ISizeFull) {
        const pm = +(payload.width / 1000 + 2 * payload.height / 1000 + 0.3).toFixed(4)
        return { pm }
    }
}


export type ICalcType = typeof Calc

export type Fn_Calc = FnProperties<typeof Calc>


export type ICalcPropNames = FnPropertyNames<Fn_Calc>
export type ICalcHandler = { [Key in ICalcPropNames]: typeof Calc[Key] }[ICalcPropNames]

