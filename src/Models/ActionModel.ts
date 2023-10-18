
import { CalcOffsetFn_Type5 } from "../ActionComponents/Offset5/Offset5";
import { _ID } from "../Helpers/HelpersFns";
import { IActionData, IActionDataNode } from "../Interfaces/MathActionsTypes";




export class FnStoreNode<A, F extends (args: A) => any> {
    nodeId: string
    fn: F
    saved: { args: A, result: ReturnType<F> }[] = []
    constructor(
        actionFn: F
    ) {
        this.nodeId = _ID()
        this.fn = actionFn
    }

    saveInstance(args: A) {
        const savenode = {
            args: args,
            result: this.fn(args)
        }
        this.saved.push(savenode)
    }

    clearSaved() {
        this.saved = []
    }
    list() {
        return this.saved
    }
}



