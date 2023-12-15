import { _isArr, _log } from "../../Helpers/HelpersFns"
import { AnyArg } from "../../Hooks/useDynamicInputs"
import { InputsTypeEnum } from "../../Hooks/useFormStateSelector"
import { Calc } from "../../Hooks/useFuncs"
import { A_InputArgs, A_Offset5, A_Size, ISizeFull, ISizeShort, SizeFull } from "../../Interfaces/CommonTypes"
import { ANYfn } from "../../Interfaces/MathActionsTypes"
import { ArgsTypes } from "../../Models/ArgsTypeModel"
import { Fn_Args_offset5 } from "../ActionTypes/Types"


interface WithTypeId<T> {
    _type?: T;
}
interface WithArgType<T> {
    argType?: T
}
export type AddTypeId<T, FlavorT> = T & WithArgType<FlavorT>;


export interface CalcFn {
    fn_id: string
    fn: ANYfn
}
type CalcFnsList = Record<ArgsTypes, readonly CalcFn['fn'][]>

class CalcSkf implements CalcFn {
    fn_id: string = 'skf'
    constructor(arg?: A_Size) {
        arg && this.fn(arg)
    }
    fn(payload: A_Size) {
        const out = Calc.skf(payload)
        return out
    }
}

class CalcSimple implements CalcFn {
    fn_id: string = 'simple'
    constructor(arg?: A_Size) {
        arg && this.fn(arg)
    }
    fn(payload: A_Size) {
        return Calc.simple(payload)
    }
}

class CalcOtkosi implements CalcFn {
    fn_id: string = 'otkosi'
    constructor(arg?: A_Size) {
        arg && this.fn(arg)
    }
    fn(payload: A_Size) {
        return Calc.otkosi(payload)
    }
}

class CalcOffset5 implements CalcFn {
    fn_id: string = 'offset5'
    constructor(arg?: A_Offset5) {
        arg && this.fn(arg)
    }
    fn(payload: A_Offset5) {
        return Calc.offset5(payload).offset5
    }
}


class CalcBoxFn {
    funcs: CalcFn[] = []
    argType: ArgsTypes
    constructor(arg_type: ArgsTypes) {
        this.argType = arg_type
    }

    addFn(fn: CalcFn) {
        this.funcs.push(fn)
    }

    calcMap({ argType, ...rest }: A_InputArgs) {
        // return this.funcs.map(c => c.fn(payload))
        switch (argType) {
            case InputsTypeEnum.size_full: { return this.funcs.map(c => c.fn(rest)) }
            case InputsTypeEnum.offset5: { return this.funcs.map(c => c.fn(rest)) }
            default: return notReachable(argType as never)
        }
        // return this.funcs.map(c => c.fn(payload))
    }


}
export function notReachable(_: never): never {
    throw new Error(`Should never be reached ${_}`);
}



const SizeCalculator = new CalcBoxFn('size_full')
const Offset5Calculator = new CalcBoxFn('offset5')

SizeCalculator.addFn(new CalcSkf())
SizeCalculator.addFn(new CalcSimple())
SizeCalculator.addFn(new CalcOtkosi())

Offset5Calculator.addFn(new CalcOffset5())

const CalcControl: Record<ArgsTypes, CalcBoxFn> = {
    size_full: SizeCalculator,
    offset5: Offset5Calculator,
} as const

export const CalcList = {
    size_full: [new CalcSkf(), new CalcSimple(), new CalcOtkosi()].map(f => f.fn),
    offset5: [new CalcOffset5()].map(f => f.fn)
} as const


export default CalcControl

type CalcBoxReturn<T extends CalcFn> = ReturnType<T['fn']>
type yy = CalcBoxReturn<CalcOtkosi>


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