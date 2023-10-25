import { FnDtoNames } from "..";
import { ANYfn } from "../../Interfaces/MathActionsTypes";
import { IOffset5Arg, IOffset5_Output } from "../Offset5/Offset5";

export interface ISizeFull {
    width: number
    height: number
}

export interface ISize {
    w: number
    h: number
}
type Fn_NetArgs = { width: number, height: number }
type Fn_NetOutput = { [K in 'skf' | 'simple']: { w: number, h: number } }

export type ICalcNetsFn = ({ width, height }: Fn_NetArgs) => Fn_NetOutput
export type IOffset5Fn = (arg: IOffset5Arg) => IOffset5_Output

export enum Enum_NodesAction {
    nets = 'nets',
    offset5 = 'offset5'
}
export type INetsNode_DTO = {
    fn: ICalcNetsFn
    args: Fn_NetArgs
    type: Enum_NodesAction.nets
}

export type IOffset5Node_DTO = {
    fn: IOffset5Fn
    args: IOffset5Arg
    type: Enum_NodesAction.offset5

}

export type DTO_Nodes_list =
    | INetsNode_DTO
    | IOffset5Node_DTO