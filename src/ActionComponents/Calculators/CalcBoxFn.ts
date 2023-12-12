import { _isArr, _log } from "../../Helpers/HelpersFns"
import { InputsTypeEnum } from "../../Hooks/useFormStateSelector"
import { Calc } from "../../Hooks/useFuncs"
import { A_InputArgs, A_Offset5, A_Size, ISizeFull, ISizeShort, SizeFull } from "../../Interfaces/CommonTypes"
import { Fn_Args_offset5 } from "../ActionTypes/Types"

interface CalcFn {
    fn_id: string
    fn(payload: any): any
}

class CalcSkf implements CalcFn {
    fn_id: string = 'skf'
    fn(payload: A_Size) {
        const out = Calc.skf(payload).skf
        return out
    }

}

class CalcSimple implements CalcFn {
    fn_id: string = 'simple'
    fn(payload: A_Size) {
        return Calc.simple(payload).simple
    }
}

class CalcOtkosi implements CalcFn {
    fn_id: string = 'otkosi'
    fn(payload: A_Size) {
        return Calc.otkosi(payload)
    }
}

class CalcOffset5 implements CalcFn {
    fn_id: string = 'offset5'
    fn(payload: A_Offset5) {
        return Calc.offset5(payload).offset5
    }
}


class CalcBoxFn<A extends A_InputArgs>{
    funcs: CalcFn[] = []
    use(fn: CalcFn) {
        this.funcs.push(fn)
    }

    calcMap({ argType, ...rest }: A) {
        // return this.funcs.map(c => c.fn(payload))
        switch (argType) {
            case InputsTypeEnum.size_full: { return this.funcs.map(c => c.fn(rest)) }
            case InputsTypeEnum.offset5: { return this.funcs.map(c => c.fn(rest)) }
            default: return notReachable(rest as never)
        }
        // return this.funcs.map(c => c.fn(payload))
    }
}
export function notReachable(_: never): never {
    throw new Error(`Should never be reached ${_}`);
}
const SizeCalculator = new CalcBoxFn<A_Size>()
const Offset5Calculator = new CalcBoxFn<A_Offset5>()
SizeCalculator.use(new CalcSkf())
SizeCalculator.use(new CalcSimple())
SizeCalculator.use(new CalcOtkosi())

Offset5Calculator.use(new CalcOffset5())

const CalcControl = {
    size_full: SizeCalculator,
    offset5: Offset5Calculator,
}

export default CalcControl




// class CalcBox<A> {
//     fns: Record<string, CalcFn> = {}
//     use(name: string, fn: CalcFn) {
//         this.fns[name] = fn
//     }

//     run(name: string, payload: A | A[]) {
//         if (!this.fns[name]) {
//             _log("No such function: ", name)
//             return false
//         }
//         if (Array.isArray(payload)) { return payload.map(p => this.fns[name].fn(p)) }
//         return this.fns[name].fn(payload)
//     }

//     runALL(payload: A) {
//         const out = []
//         for (let fnKey in this.fns) {
//             out.push(this.fns[fnKey].fn(payload))
//         }
//         return out
//     }
// }