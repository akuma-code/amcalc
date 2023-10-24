import { FnDtoNames } from "..";
import { ISize, ISizeFull } from "../../Interfaces/CommonTypes";
import { ANYfn } from "../../Interfaces/MathActionsTypes";
import { CLS_NetFnCalc } from "../Nets/CalcNetNode";
import { IOffset5Arg, IOffset5_Output } from "../Offset5/Offset5";
import { CLS_Offset5FnCalc } from "../Offset5/Offset5Node";


export type Fn_NetArgs = ISizeFull
export type Fn_NetOutput = { [K in 'skf' | 'simple']: ISize }

export type ICalcNetsFn = ({ width, height }: Fn_NetArgs) => Fn_NetOutput
export type IOffset5Fn = (arg: IOffset5Arg) => IOffset5_Output

export enum Enum_NodesAction {
    nets = 'nets',
    offset5 = 'offset5'
}
export interface DTO {
    fn: unknown
    args: unknown
    type: unknown
}
export type INetsNode_DTO = {
    fn: ICalcNetsFn
    payload: Fn_NetArgs
    type: Enum_NodesAction.nets
}

export type IOffset5Node_DTO = {
    fn: IOffset5Fn
    payload: IOffset5Arg
    type: Enum_NodesAction.offset5

}

export type DTO_Nodes_list =
    | INetsNode_DTO
    | IOffset5Node_DTO