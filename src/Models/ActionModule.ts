import { CalcNetSize } from "../Actions/CalcNetSize"
import { CalcOffsetType5 } from "../Actions/TestAction_Offset5"
import { _log } from "../Helpers/HelpersFns"
import { DTO_StoreObj } from "../Interfaces/MathActionsTypes"



interface IFNModule<IFunc extends Function> {
    fn: IFunc
    module_name?: string
    saved_data?: DTO_StoreObj<IFunc>[]
    fields?: (keyof DTO_StoreObj<IFunc>['args'])[]
    output?: {
        args: []
        result: {}
    }
    dto?: DTO_StoreObj<IFunc>
}

type DTO_createModule<Args> = Args extends (args: Args) => infer R ? {
    fn: (args: Args) => R
    fields?: keyof Args
    output?: R
    dto?: {
        args: Args
        result: R
    }
} : never

export class bad_ActionModule<F extends (args: any) => any> implements IFNModule<F> {
    fn: F
    fields?: (keyof DTO_StoreObj<F>["args"])[] | undefined
    module_name?: string | undefined
    output?: { args: [], result: {} }
    saved_data?: DTO_StoreObj<F>[] | undefined
    dto?: DTO_StoreObj<F> | undefined

    constructor(func: F) {
        this.fn = func
    }

    runFn(args: DTO_StoreObj<F>['args']): DTO_StoreObj<F>['result'] {
        const res = this.fn(args)
        return res
    }

    get args() {
        const args = this.fn.arguments
        return args
    }
}


export class ActionArgs<A extends {}>{
    fn: (args: A) => unknown

    constructor(func: (args: A) => any) {
        this.fn = func
    }
}
const bb = CalcNetSize({ width: 500, height: 800 })
const aa = new ActionArgs<number>((b) => b * 5)
_log(aa)
export const Amodule = new bad_ActionModule(CalcOffsetType5)

// _log(Amodule.runFn({ da: 1, db: 1, H: 2, h: 1, W: 2 }))