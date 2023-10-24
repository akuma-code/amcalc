import { _ID, _log } from "../../Helpers/HelpersFns";
import { ANYfn } from "../../Interfaces/MathActionsTypes";
import { DTO_CLS_NodesList, Enum_NodesAction } from "../ActionTypes/Types";
import { CalcNetSize } from "../Nets/CalcNetSize";
import { DTO_Nodes_list } from "../ActionTypes/Types";
import { CalcOffsetFn_Type5 } from "../Offset5/Offset5";
import { CLS_NetFnCalc } from "../Nets/CalcNetNode";
import { ISize, ISizeFull } from "../../Interfaces/CommonTypes";



export class DTO_NodeFn<F extends DTO_Nodes_list['fn'], T extends DTO_Nodes_list['type'] & string> {
    public fn: F
    public node_id: string
    public type: T
    constructor(
        fn: F,
        type: T
    ) {
        this.fn = fn
        this.node_id = _ID()
        this.type = type
    }
}

export abstract class AbstractNode {

    node_id: string
    constructor() {
        this.node_id = _ID()
    }

}

const nodeMaker = (args: ISizeFull) => new CLS_NetFnCalc(args)
class dtoNode<T extends DTO_CLS_NodesList['type']> extends AbstractNode {
    type: T
    fn: DTO_CLS_NodesList['fn']
    constructor(fnNode: DTO_CLS_NodesList['fn'], type: T) {
        super()
        this.node_id = _ID()
        this.type = type
        this.fn = fnNode

    }
}


// const dto = new dtoNode()s
