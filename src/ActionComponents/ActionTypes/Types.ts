import { _log } from "../../Helpers/HelpersFns";
import { ISize, ISizeFull } from "../../Interfaces/CommonTypes";
import { ANYfn, ANYobj } from "../../Interfaces/MathActionsTypes";
import { FnProperties, FnPropertyNames } from "./FnProperties";



export type Fn_Args_offset5 = {
    W: number,
    H: number,
    h: number,
    da: number,
    db: number
}


export type Fn_Output_offset5 = {
    angle: number;
    sumXY: number;
    deltaH: number;
    tgA: number;
    x: number;
    y: number;
}
export type Fn_offset5 = (arg: Fn_Args_offset5) => Fn_Output_offset5

type INetSKF = { skf: ISize }
type INetSimple = { simple: ISize }

export type Fn_Args_nets = { [K in keyof ISizeFull]: number }
export type Fn_Output_nets = INetSKF & INetSimple
export type Fn_nets = ({ width, height }: Fn_Args_nets) => Fn_Output_nets


export type getInit<A extends ANYobj> = (obj: A) => { [K in keyof A]: A[K] extends number ? 0 : A[K] extends string ? "" : never }


export enum Enum_NodesAction {
    nets = 'nets',
    offset5 = 'offset5'
}

type FnKeys = keyof typeof Enum_NodesAction
export interface ArgsList {
    nets: Fn_Args_nets
    offset5: Fn_Args_offset5
}

export interface FuncsList {
    nets: Fn_nets
    offset5: Fn_offset5
}
export type IFuncArgs = ArgsList[Enum_NodesAction]

export type IGetFields<Arg extends IFuncArgs> = (args: Arg) => (keyof Arg)[]

export type DTO_EXPORT = {
    fields: string[]
    fn: FuncsList[Enum_NodesAction]
}


export type INetsNode_DTO = {
    fn: Fn_nets
    payload: Fn_Args_nets
    type: Enum_NodesAction.nets
}

export type IOffset5Node_DTO = {
    fn: Fn_offset5
    payload: Fn_Args_offset5
    type: Enum_NodesAction.offset5

}

export type DTO_Nodes_list =
    | INetsNode_DTO
    | IOffset5Node_DTO