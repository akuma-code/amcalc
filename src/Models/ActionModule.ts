import { CalcNetSize } from "../Actions/CalcNetSize"
import { CalcOffsetFn_Type5 } from "../Actions/TestAction_Offset5"
import { _isArr, _log } from "../Helpers/HelpersFns"
import { DTO_FnArgs, DTO_StoreObj } from "../Interfaces/MathActionsTypes"



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

type AItemOptions = {
    save: boolean
}
export class ActionItem<Fn extends (...args: any) => any, Args extends Parameters<Fn>>{
    fn: (args: Args) => any
    savedArgs: Args[] = []
    constructor(func: Fn) {
        this.fn = func
    }

    runFn(args: any): DTO_StoreObj<Fn>['result'] {
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


// _log(Amodule.runFn({ da: 1, db: 1, H: 2, h: 1, W: 2 }))