import { CalcNetSize } from "../Actions/CalcNetSize"
import { CalcOffsetFn_Type5 } from "../Actions/TestAction_Offset5"
import { _isArr, _log } from "../Helpers/HelpersFns"
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

type AItemOptions = {
    save: boolean
}
export class ActionItem<Fn extends (...args: any) => any, Args extends Parameters<Fn>>{
    fn: (args: Args) => any
    savedArgs: Args[] = []
    constructor(func: Fn) {
        this.fn = func
    }

    exec(args: Args, options?: AItemOptions): ReturnType<Fn> {
        options?.save && this.savedArgs.push(args)
        return this.fn(args)
    }

    addArgs(args: Args) {
        _isArr(args) ?
            this.savedArgs.push(...args)
            :
            this.savedArgs.push(args)
    }

    listArgs(asobj?: boolean) {
        const list = this.savedArgs.map((arg, idx) => ({ [idx]: arg }))

        const asObject = this.savedArgs.reduce((res, current, idx) => {
            const elem = { [idx]: current }
            res = { ...res, ...elem }
            return res
        }, {})
        return asobj ? asObject : list
    }

}

export const NetFnItem = new ActionItem(CalcNetSize)





// export class ba1d_ActionModule<F extends (args: any) => any> implements IFNModule<F> {
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


const bb = CalcNetSize({ width: 500, height: 800 })


// _log(Amodule.runFn({ da: 1, db: 1, H: 2, h: 1, W: 2 }))