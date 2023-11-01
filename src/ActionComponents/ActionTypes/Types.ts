import { _log } from "../../Helpers/HelpersFns";
import { ISize, ISizeFull } from "../../Interfaces/CommonTypes";
import { ANYfn, ANYobj } from "../../Interfaces/MathActionsTypes";
import { FnProperties, FnPropertyNames, StringifyProps } from "./FnProperties";

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





export enum Enum_NodesAction {
    nets = 'nets',
    offset5 = 'offset5'
}

export type FnKeys = keyof typeof Enum_NodesAction
export interface IC_ArgsList {
    nets: Fn_Args_nets
    offset5: Fn_Args_offset5
}

export interface IC_Functions {
    nets: Fn_nets
    offset5: Fn_offset5
}
export type IC_FuncArgs = IC_ArgsList[FnKeys]
export type IC_FuncsList = IC_Functions[FnKeys]

export type TypeSelector<T extends FnKeys> = {
    type: T
    fields: Array<keyof IC_ArgsList[T]>
    initstate: IC_ArgsList[T]
    arg: IC_ArgsList[T]
    fn: IC_Functions[T]
    output: ReturnType<IC_Functions[T]>
}
export type IC_StateSelect<K extends FnKeys> = {
    type: K
    payload: {
        initState: IC_ArgsList[K]
        arg?: IC_ArgsList[K]
        fn: IC_Functions[K]
        output?: ReturnType<IC_Functions[K]>
    }
}
export type GetFieldsName<T extends ANYobj> = (keyof T) extends infer propName ? propName : null

export type INETS = TypeSelector<Enum_NodesAction.nets>
export type IOFFSET5 = TypeSelector<Enum_NodesAction.offset5>
export type IFuncsState =
    | INETS
    | IOFFSET5

interface SelectorProps {
    type: FnKeys
    payload: unknown
}
// type _StateSelector = (action:SelectorProps)=>

// export type IGetFields<Arg extends IFuncArgs> = (args: Arg) => (keyof Arg)[]

export type DTO_EXPORT = {
    fn: IC_FuncsList
    fields: keyof IC_FuncArgs[]
    initState: IC_FuncArgs
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