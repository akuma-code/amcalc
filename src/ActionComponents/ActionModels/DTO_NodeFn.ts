import { _ID, _log } from "../../Helpers/HelpersFns";
import { ANYfn } from "../../Interfaces/MathActionsTypes";
import { Enum_NodesAction } from "../ActionTypes/Types";
import { CalcNetSize, DTO_CalcFnExport } from "../Nets/CalcNetSize";
import { DTO_Nodes_list } from "../ActionTypes/Types";
import { CalcOffsetFn_Type5 } from "../Offset5/Offset5";



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

