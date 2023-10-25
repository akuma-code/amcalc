import { CLS_NetFnCalc } from "../Nets/CalcNetNode"

import { CLS_Offset5FnCalc } from "../Offset5/Offset5Node"
import { Enum_NodesAction, Fn_Args_nets, Fn_Args_offset5 } from "./Types"

export type ICalculatoreStore = {

}


export type INetsNode_CLS = {
    fn: CLS_NetFnCalc
    args: Fn_Args_nets
    type: Enum_NodesAction.nets
}


export type IOffset5Node_CLS = {
    fn: CLS_Offset5FnCalc
    args: Fn_Args_offset5
    type: Enum_NodesAction.offset5

}

export type DTO_CLS_NodesList =
    | INetsNode_CLS
    | IOffset5Node_CLS
