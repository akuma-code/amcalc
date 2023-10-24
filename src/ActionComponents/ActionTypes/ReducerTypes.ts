import { ANYfn } from "../../Interfaces/MathActionsTypes"
import { CLS_NetFnCalc } from "../Nets/CalcNetNode"
import { IOffset5Arg } from "../Offset5/Offset5"
import { CLS_Offset5FnCalc } from "../Offset5/Offset5Node"
import { FnProperties } from "./FnProperties"
import { Enum_NodesAction, Fn_NetArgs } from "./Types"

export type ICalculatoreStore = {

}


export type INetsNode_CLS = {
    fn: CLS_NetFnCalc
    args: Fn_NetArgs
    type: Enum_NodesAction.nets
}


export type IOffset5Node_CLS = {
    fn: CLS_Offset5FnCalc
    args: IOffset5Arg
    type: Enum_NodesAction.offset5

}

export type DTO_CLS_NodesList =
    | INetsNode_CLS
    | IOffset5Node_CLS
