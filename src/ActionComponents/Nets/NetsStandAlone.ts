import { Enum_NodesAction, Fn_Args_nets, Fn_nets } from "../ActionTypes/Types";
import { CalcNetSize } from "./CalcNetSize";

export interface SA_Nets {
    id: Enum_NodesAction
    fields: readonly (keyof Fn_Args_nets)[]
    fn: Fn_nets

}

export const SA_InitState: SA_Nets = {
    id: Enum_NodesAction.nets,
    fields: ['width', 'height'],
    fn: CalcNetSize
}