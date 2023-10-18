import { _log } from "../../Helpers/HelpersFns"
import { DTO_ExportFnType } from "../../Interfaces/MathActionsTypes"
import { DTO_Fn_CalcNetSize } from "../Nets/CalcNetSize"

export class ActionFnNode<Fn extends (...args: any) => any>  {
    public fn: Fn
    public saved: DTO_ExportFnType<Fn>['args'][] = []
    constructor(func: Fn) {
        this.fn = func
    }
    validate(...args: unknown[]) {
        try {
            const res = !!this.fn(...args)

            res && _log("args valid! ", ...args)
        } catch (error) {
            _log(`Invalid Args!!`, ...args)
        }

    }

    clear() {
        const size = this.saved.length
        _log(`Removed ${size} elements`)
        return this.saved = []
    }

    list(asObj = false) {
        _log("saved args: ", this.saved.length)
        const list = this.saved.reduce((res, arg, idx) => {
            res[idx.toString()] = arg
            return res
        }, {} as { [number: string]: unknown })
        return asObj ? list : this.saved
    }

}