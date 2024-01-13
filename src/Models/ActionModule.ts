import { _isArr, _log } from "../Helpers/HelpersFns"
import { DTO_StoreObj } from "../Interfaces/MathActionsTypes"



interface IFnModule<IFunc extends Function>
{
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

type DTO_createModule<Fn> = Fn extends (args: infer Args) => infer R ? {
    fn: Fn
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
    fn: (...args: Args[]) => any
    savedArgs: Args[] = []
    constructor (func: Fn)
    {
        this.fn = func
    }

    run(args: Args, options?: AItemOptions)
    {
        if (options?.save) this.savedArgs = [...this.savedArgs, ...args]
        const res = this.fn
        return res
    }

    get args()
    {
        const args = this.fn.arguments
        return args
    }
}
