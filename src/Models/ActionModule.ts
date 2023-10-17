import { CalcNetSize } from "../Actions/CalcNetSize"
import { CalcOffsetType5 } from "../Actions/TestAction_Offset5"
import { _log, isArray } from "../Helpers/HelpersFns"
import { save2 } from "../Helpers/saveWrapper"
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

export class ActionNode<Fn extends (...args: any) => any>{
    private fn: Fn
    calls: { args: DTO_FnArgs<Fn>, output: ReturnType<Fn> }[] = []

    constructor(func: Fn) {
        this.fn = func
    }

    execFn(args: DTO_FnArgs<Fn>) {
        const output = this.fn(args)
        const save_node = {
            args, output
        }
        this.calls.push(save_node)

        return this.fn(args)
    }



}
export const Amodule = new ActionNode(CalcOffsetType5)
// AA.execFn({ height: 500, width: 800 })
// AA.execFn({ height: 100, width: 100 })

// // const l = AA.dto_list


// Amodule.execFn({ da: 1, db: 1, H: 2, h: 1, W: 2 })
// Amodule.execFn({ da: 2, db: 2, H: 4, h: 2, W: 3 })

// _log(Amodule.calls)



// export class bad_ActionModule<F extends (args: any) => any> implements IFNModule<F> {
//     fn: F
//     fields?: (keyof DTO_StoreObj<F>["args"])[] | undefined
//     module_name?: string | undefined
//     output?: { args: [], result: {} }
//     saved_data?: DTO_StoreObj<F>[] | undefined
//     dto?: DTO_StoreObj<F> | undefined

//     constructor(func: F) {
//         this.fn = func
//     }

//     runFn(args: DTO_StoreObj<F>['args']): DTO_StoreObj<F>['result'] {
//         const res = this.fn(args)
//         return res
//     }

//     get args() {
//         const args = this.fn.arguments
//         return args
//     }
// }

