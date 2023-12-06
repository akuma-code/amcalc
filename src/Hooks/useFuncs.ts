import { Fn_Args_offset5, Fn_nets, Fn_offset5 } from "../ActionComponents/ActionTypes/Types"
import { _rad2deg } from "../Helpers/HelpersFns"
import { ISizeFull } from "../Interfaces/CommonTypes"

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
    static netSkf(size: ISizeFull) {
        const { width, height } = size
        const skf = {
            w: +width - 45,
            h: +height - 47
        }
        return skf
    }
    static netSimple(size: ISizeFull) {
        const { width, height } = size
        const simple = {
            w: +width + 24,
            h: +height + 45
        }
        return simple
    }

}

